const welcomeScreen = document.querySelector("#welcome-screen");
const content = document.querySelector("#content");
const backButton = document.querySelector("#backButton");
const boxLayer = document.querySelector("#box-layer");

async function GradualOpac(element, visible) {
    if (visible) {
        element.classList.remove("hidden");
        for (let i = 0; i <= 1; i += 0.1) {
            element.style.opacity = i;
            await new Promise(resolve => setTimeout(resolve, 50));
        };
    } else {
        for (let i = 1; i >= 0; i -= 0.1) {
            element.style.opacity = i;
            await new Promise(resolve => setTimeout(resolve, 50));
        };
        element.classList.add("hidden");
    };
};

function createBox() {
    const box = document.createElement("div");
    box.classList.add("thin-box");
    const maxTop = Math.max(0, boxLayer.clientHeight - 20);
    box.style.top = `${Math.random() * maxTop}px`;

    box.addEventListener("animationend", () => {
        box.remove(), {once: true}
    });

    boxLayer.appendChild(box);
};

welcomeScreen.addEventListener("click", async () => {
    await GradualOpac(welcomeScreen, false);
    GradualOpac(content, true);
    GradualOpac(backButton, true);
});

backButton.addEventListener("click", async() => {
    await Promise.all([
        GradualOpac(content, false),
        GradualOpac(backButton, false)
    ]);
    GradualOpac(welcomeScreen, true);
});

createBox();
setInterval(createBox, 400);