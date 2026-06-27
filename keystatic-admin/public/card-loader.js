/* ════════════════════════════════════════════════
   CARD LOADER
   Fetches data.json and populates the digital
   business card DOM. Keeps index.html structure
   intact — this only fills in the editable content.
════════════════════════════════════════════════ */

async function loadCardData() {
    try {
        const res = await fetch('data.json', { cache: 'no-store' });
        if (!res.ok) throw new Error('data.json not found');
        const data = await res.json();
        renderCard(data);
        window.__cardData = data; // expose for downloadVCard() / shareProfile()
        document.dispatchEvent(new CustomEvent('card-data-loaded'));
    } catch (err) {
        console.error('Failed to load card data:', err);
        // Still fire the event so type-writing.js's fallback can run
        document.dispatchEvent(new CustomEvent('card-data-loaded'));
    }
}

function renderCard(data) {
    const { profile, socials, featuredButton, linksHeading, links, vcard } = data;

    // PROFILE IMAGE
    const img = document.querySelector('.profile-pic');
    if (img) {
        const PLACEHOLDER = 'https://res.cloudinary.com/dq7dwhxqn/image/upload/v1782299989/profile-picture-placeholder_yvcbul.jpg';
        img.src = profile?.profilePicture || PLACEHOLDER;
        img.alt = `${profile?.name || 'User'} profile photo`;
    }

    // NAME
    const nameEl = document.querySelector('h1[itemprop="name"]');
    if (nameEl && profile?.name) nameEl.textContent = profile.name;

    // JOB TITLE
    const titleEl = document.querySelector('.career[itemprop="jobTitle"]');
    if (titleEl && profile?.jobTitle) titleEl.textContent = profile.jobTitle;

    // BIO — feeds the typing animation (type-writing.js reads data-bio if present)
    const bioEl = document.getElementById('typing-bio');
    if (bioEl && profile?.bio) {
        bioEl.setAttribute('data-bio', profile.bio);
    }
    const srBio = document.querySelector('.sr-only');
    if (srBio && profile?.bio) srBio.textContent = profile.bio;

    // SOCIAL ICONS
    const socialsWrap = document.querySelector('.socials');
    if (socialsWrap && Array.isArray(socials)) {
        socialsWrap.innerHTML = socials
            .filter(s => s.enabled !== false) // skip toggled-off entries
            .map(s => `
                <a href="${escapeAttr(s.url)}" target="_blank" rel="noopener noreferrer me" aria-label="${escapeAttr(profile?.name || '')} on ${escapeAttr(s.label || '')}">
                    <i class="${escapeAttr(s.icon)}"></i>
                </a>
            `).join('');
    }

    // FEATURED BUTTON (e.g. Spotify)
    const featuredLink = document.querySelector('.hover-button.link-card');
    if (featuredLink && featuredButton) {
        featuredLink.href = featuredButton.url;
        const hoverText = featuredLink.querySelector('.state-hover .text');
        const defaultText = featuredLink.querySelector('.state-default .text');
        if (hoverText) hoverText.textContent = featuredButton.hoverText;
        if (defaultText) defaultText.textContent = featuredButton.defaultText;
    }

    // LINKS HEADING + LINK LIST
    const headingEl = document.querySelector('.linkshead');
    if (headingEl && linksHeading !== undefined) headingEl.textContent = linksHeading;

    const linksWrap = document.querySelector('div.links-gap');
    if (linksWrap && Array.isArray(links)) {
        // Remove existing <a class="link-card"> entries but keep the heading
        linksWrap.querySelectorAll('a.link-card').forEach(a => a.remove());
        links.forEach(l => {
            const a = document.createElement('a');
            a.href = l.url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer nofollow';
            a.className = 'link-card';
            a.textContent = l.text;
            linksWrap.appendChild(a);
        });
    }

    // VCARD DATA — stashed for downloadVCard()
    if (vcard) window.__vcardData = vcard;
}

function escapeAttr(str) {
    if (str === undefined || str === null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

document.addEventListener('DOMContentLoaded', loadCardData);
