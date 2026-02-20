const bioText = "Mily Wayz | Songwriter & Recording Artist. Gearing up for my first official track release this year. For now? Follow the journey and vibe with my curated Spotify Playlist below.";
const speed = 40; // Speed in milliseconds
let i = 0;

function typeWriter() {
    if (i < bioText.length) {
        document.getElementById("typing-bio").innerHTML += bioText.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    } else {
        // Find ALL sections with the extra-content class
        const sections = document.querySelectorAll(".extra-content");
        
        sections.forEach(section => {
            // Adding this class triggers the CSS animation we defined above
            section.classList.add("show-now");
        });
    }
}

// Start the effect when the page loads
window.addEventListener('load', typeWriter);