const showDetailCard = () => {
    const pieceDetail = document.getElementById("pieceDetailBody");
    pieceDetail.classList.toggle("show");
    pieceDetail.classList.toggle("hide");
}

const showSiteMenu = () => {
    const siteMenu = document.querySelector(".siteMenu");
    siteMenu.classList.toggle("siteMenuShow");
    // siteMenu.classList.toggle("hide");
}

const menuToggle = document.querySelector(".showNavButton")
menuToggle.addEventListener("click", showSiteMenu);

const cardToggle = document.querySelector(".pieceDetailToggle")
if (cardToggle) {
    cardToggle.addEventListener("click", showDetailCard);
}
