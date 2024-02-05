const showDetailCard = () => {
    const pieceDetail = document.getElementById("pieceDetailBody");
    pieceDetail.classList.toggle("show");
    pieceDetail.classList.toggle("hide");
}

const cardToggle = document.querySelector(".pieceDetailToggle")
cardToggle.addEventListener("click", showDetailCard);
