const welcomeScreen = document.querySelector("#welcome-screen");
const content = document.querySelector("#content");
const backButton = document.querySelector("#backButton");
const boxLayer = document.querySelector("#box-layer");
const aboutMe = document.querySelector("#AboutMe");
const projects = document.querySelector("#Projects");
const projectContent = document.querySelector("#projectContent");
const projectLink = [
    document.querySelector("#project1link")
];



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
    const boxHeight = 20;
    const box = document.createElement("div");
    const laneCount = Math.max(
        1,
        Math.floor(boxLayer.clientHeight / boxHeight)
    );

    const occupiedLanes = new Set(
        Array.from(boxLayer.querySelectorAll(".thin-box"))
            .map(existingBox =>
                Math.round(parseFloat(existingBox.style.top) / boxHeight)
            )
    );

    const freeLanes = Array.from(
        {length: laneCount},
        (_, lane) => lane
    ).filter(lane => !occupiedLanes.has(lane));

    if (freeLanes.length === 0) return;

    const randomIndex = Math.floor(Math.random() * freeLanes.length);
    const lane = freeLanes[randomIndex];

    box.classList.add("thin-box");
    box.style.top = `${lane * boxHeight}px`;

    box.addEventListener("animationend", () => {
        box.remove();
    }, { once: true });

    boxLayer.appendChild(box);
};

aboutMe.addEventListener("click", async () => {
    await GradualOpac(welcomeScreen, false);
    GradualOpac(content, true);
    GradualOpac(backButton, true);
});

projects.addEventListener("click", async () => {
    await GradualOpac(welcomeScreen, false);
    GradualOpac(projectContent, true);
    GradualOpac(backButton, true);
})

backButton.addEventListener("click", async() => {
    await Promise.all([
        GradualOpac(content, false),
        GradualOpac(projectContent, false),
        GradualOpac(backButton, false)
    ]);
    GradualOpac(welcomeScreen, true);
});


projectLink[0].addEventListener("click", () => {
    window.open(
        "https://www.roblox.com/games/82414288448522/Obby-but-a-cat-chases-you",
        "_blank",
        "noopener,noreferrer"
    )
});

createBox();
setInterval(createBox, 400);