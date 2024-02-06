// Display and hide detail for artwork
const showDetailCard = () => {
    const pieceDetail = document.querySelector(".pieceDetailCard");
    const pieceDetailToggle = document.querySelector(".pieceDetailToggle");
    pieceDetail.classList.toggle("pieceDetailShow");
    pieceDetailToggle.classList.toggle("pieceDetailShow");
}

// Display and hide nav menu
const showSiteMenu = () => {
    const siteMenu = document.querySelector(".siteMenu");
    siteMenu.classList.toggle("siteMenuShow");
}

const menuToggle = document.querySelector(".showNavButton")
menuToggle.addEventListener("click", showSiteMenu);

// Add eventListener only if button is present on screen
const cardToggle = document.querySelector(".pieceDetailToggle")
if (cardToggle) {
    cardToggle.addEventListener("click", showDetailCard);
}
