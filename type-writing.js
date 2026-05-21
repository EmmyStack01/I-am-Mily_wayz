const bioText = "Mily Wayz | Songwriter & Recording Artist. Gearing up for my first official track release this year. For now? Follow the journey and vibe with my curated Spotify Playlist below.";
const speed = 40; // Speed in milliseconds
let i = 0;

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

// Start the effect when the page loads
window.addEventListener('load', typeWriter);
