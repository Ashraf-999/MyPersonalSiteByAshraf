const welcomeScreen = document.querySelector("#welcome-screen");
const content = document.querySelector("#content");
const backButton = document.querySelector("#backButton");

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