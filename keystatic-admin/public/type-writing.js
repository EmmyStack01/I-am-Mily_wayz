const speed = 40; // Speed in milliseconds
let i = 0;
let bioText = "";

function typeWriter() {
    // Add the class at the very start of typing
    if (i === 0) {
        document.body.classList.add("typing-active");
    }

    if (i < bioText.length) {
        document.getElementById("typing-bio").innerHTML += bioText.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    } else {
        // 1. Remove the unclickable state so everything works again
        document.body.classList.remove("typing-active");

        // 2. Find ALL sections with the extra-content class
        const sections = document.querySelectorAll(".extra-content");
        sections.forEach(section => {
            section.classList.add("show-now");
        });
    }
}

function startTyping() {
    const bioEl = document.getElementById("typing-bio");
    bioText = (bioEl && bioEl.getAttribute("data-bio")) || "";
    if (!bioText) return; // nothing to type — bail safely
    bioEl.innerHTML = ""; // clear any static fallback text
    i = 0;
    typeWriter();
}

// card-loader.js dispatches this once data.json is fetched and the DOM
// (including the data-bio attribute) is populated.
document.addEventListener('card-data-loaded', startTyping);

// Fallback: if card-loader.js never fires the event (e.g. data.json
// missing), still attempt to type after page load using whatever is
// already in data-bio (or the static sr-only text as last resort).
window.addEventListener('load', () => {
    setTimeout(() => {
        if (i === 0 && !bioText) startTyping();
    }, 300);
});
