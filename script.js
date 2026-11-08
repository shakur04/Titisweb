// ========================================
// WELCOME SCREEN
// ========================================
const welcomeScreen = document.getElementById("welcome-screen");
const enterButton = document.getElementById("enter-button");
enterButton.addEventListener("click", () => {
    welcomeScreen.classList.add("hidden");
});
// ========================================
// MOBILE NAVIGATION
// ========================================
const menuToggle = document.getElementById("menu-toggle");
const navigation = document.getElementById("navigation");
menuToggle.addEventListener("click", () => {
    navigation.classList.toggle("open");
    const isOpen = navigation.classList.contains("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
});
document.querySelectorAll(".navigation a").forEach((link) => {
    link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
    });
});
// ========================================
// REASONS I LOVE YOU
// ========================================
const reasonCards = document.querySelectorAll(".reason-card");
const reasonCounter = document.getElementById("reason-counter");
function updateReasonCounter() {
    const revealedCount = document.querySelectorAll(
        ".reason-card.revealed"
    ).length;
    reasonCounter.textContent =
        `${revealedCount} of ${reasonCards.length} reasons revealed`;
}
reasonCards.forEach((card) => {
    card.addEventListener("click", () => {
        card.classList.toggle("revealed");
        updateReasonCounter();
    });
});
updateReasonCounter();
// ========================================
// RANDOM LOVE NOTES
// ========================================
const loveNotes = [
    "You're my favourite person to annoy for the rest of my life. ♡",
    "You deserve a love that makes you feel safe, heard, and appreciated.",
    "If I could save one feeling, it would be the feeling of being with you.",
    "You don't have to be okay every second. You can be yourself with me.",
    "I hope you never forget how special you are to me.",
    "Somehow, even ordinary moments feel different when you're part of them.",
    "I would still choose getting to know you, even if I had to start all over again.",
    "You're pretty. This is not a debate. The court has ruled.",
    "I love the little things about you that you probably don't even notice.",
    "One day, we're going to look back at these days and smile at how far we've come.",
    "You're allowed to have bad days. They don't make you any less lovable.",
    "Asake at our wedding. This is a legally binding joke. ♡"
];
const loveNoteText = document.getElementById("love-note-text");
const loveNoteButton = document.getElementById("love-note-button");
loveNoteButton.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * loveNotes.length);
    loveNoteText.textContent = loveNotes[randomIndex];
});
// ========================================
// OUR LITTLE MUSEUM
// ========================================
const museumItems = Array.from(
    document.querySelectorAll(".museum-item")
);
const museumButtons = Array.from(
    document.querySelectorAll(".museum-photo")
);
const photoViewer = document.getElementById("photo-viewer");
const viewerImage = document.getElementById("viewer-image");
const viewerImageWrap = document.querySelector(".viewer-image-wrap");
const viewerPlaceholderLabel = document.getElementById(
    "viewer-placeholder-label"
);
const viewerTitle = document.getElementById("viewer-title");
const viewerCaption = document.getElementById("viewer-caption");
const viewerClose = document.getElementById("viewer-close");
const viewerPrev = document.getElementById("viewer-prev");
const viewerNext = document.getElementById("viewer-next");
let currentPhotoIndex = 0;
// Get the details for a selected photo.
function getPhotoDetails(index) {
    const item = museumItems[index];
    const image = item.querySelector("img");
    const title = item.querySelector(".museum-caption h3");
    const caption = item.querySelector(".museum-caption p");
    return {
        image: image,
        title: title.textContent,
        caption: caption.textContent,
        placeholder: image.dataset.placeholder
    };
}
// Display a photo in the full-screen viewer.
function showPhoto(index) {
    currentPhotoIndex =
        (index + museumItems.length) % museumItems.length;
    const photo = getPhotoDetails(currentPhotoIndex);
    const imageSource = photo.image.getAttribute("src");
    viewerTitle.textContent = photo.title;
    viewerCaption.textContent = photo.caption;
    if (imageSource && imageSource.trim() !== "") {
        viewerImage.src = imageSource;
        viewerImage.alt = photo.image.alt;
        viewerImageWrap.classList.add("has-image");
        viewerPlaceholderLabel.textContent = "";
    } else {
        viewerImage.removeAttribute("src");
        viewerImage.alt = "";
        viewerImageWrap.classList.remove("has-image");
        viewerPlaceholderLabel.textContent = photo.placeholder;
    }
}
// Open the viewer when a photo slot is clicked.
museumButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        showPhoto(index);
        photoViewer.classList.add("open");
        photoViewer.setAttribute("aria-hidden", "false");
        document.body.classList.add("no-scroll");
        viewerClose.focus();
    });
});
// Close the viewer.
function closePhotoViewer() {
    photoViewer.classList.remove("open");
    photoViewer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
}
viewerClose.addEventListener("click", closePhotoViewer);
// Previous photo.
viewerPrev.addEventListener("click", () => {
    showPhoto(currentPhotoIndex - 1);
});
// Next photo.
viewerNext.addEventListener("click", () => {
    showPhoto(currentPhotoIndex + 1);
});
// Close the viewer when the dark background is clicked.
photoViewer.addEventListener("click", (event) => {
    if (event.target === photoViewer) {
        closePhotoViewer();
    }
});
// Keyboard controls.
document.addEventListener("keydown", (event) => {
    if (!photoViewer.classList.contains("open")) {
        return;
    }
    if (event.key === "Escape") {
        closePhotoViewer();
    }
    if (event.key === "ArrowLeft") {
        showPhoto(currentPhotoIndex - 1);
    }
    if (event.key === "ArrowRight") {
        showPhoto(currentPhotoIndex + 1);
    }
});
// Keep the photo slots empty until you add pictures.
museumItems.forEach((item) => {
    const image = item.querySelector("img");
    const imageButton = item.querySelector(".museum-photo");
    if (!image.getAttribute("src") || image.getAttribute("src").trim() === "") {
        imageButton.classList.remove("has-image");
    }
});