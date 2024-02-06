const showDetailCard = () => {
    const pieceDetail = document.querySelector(".pieceDetailCard");
    const pieceDetailToggle = document.querySelector(".pieceDetailToggle");
    pieceDetail.classList.toggle("pieceDetailShow");
    pieceDetailToggle.classList.toggle("pieceDetailShow");
}

const showSiteMenu = () => {
    const siteMenu = document.querySelector(".siteMenu");
    siteMenu.classList.toggle("siteMenuShow");
}

const menuToggle = document.querySelector(".showNavButton")
menuToggle.addEventListener("click", showSiteMenu);

const cardToggle = document.querySelector(".pieceDetailToggle")
if (cardToggle) {
    cardToggle.addEventListener("click", showDetailCard);
}
