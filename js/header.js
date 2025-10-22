const burger = document.querySelector(".burger");

const liens = document.querySelectorAll(".page");

burger.addEventListener("click", () => {
    liens.forEach(lien => {
        lien.classList.toggle("mobile");
    });
    
});

