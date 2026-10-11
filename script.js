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