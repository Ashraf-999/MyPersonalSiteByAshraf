const welcomeScreen = document.querySelector("#welcome-screen");
const content = document.querySelector("#content");
const backButton = document.querySelector("#backButton");
const boxLayer = document.querySelector("#box-layer");
const aboutMe = document.querySelector("#AboutMe");
const projects = document.querySelector("#Projects");
const Achievement = document.querySelector("#Achievements");
const projectContent = document.querySelector("#projectContent");
const AchievementContent = document.querySelector("#achievementContent");
const projectLink = [
    document.querySelector("#project1link"),
    document.querySelector("#project2link"),
    document.querySelector("#project3link"),
    document.querySelector("#project4link")
];
const bottomText = document.querySelector(".bottom-text");
const Dino = document.querySelector("#Dino");
const Dino2 = document.querySelector("#Dino2");

function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
};


async function GradualOpac(element, visible) {
    if (visible) {
        element.classList.remove("hidden");
        for (let i = 0; i <= 1; i += 0.1) {
            element.style.opacity = i;
            await wait(50);
        };
    } else {
        for (let i = 1; i >= 0; i -= 0.1) {
            element.style.opacity = i;
            await wait(50);
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

function projectOpener(id, link) {
    id.addEventListener("click", () => {
        window.open(
            link,
            "_blank",
            "noopener,noreferrer"
        )
    });
};

async function blinking() {
    // wait random sec, set eye visible, wait 500 sec, make eye non visible
    while (true) {
        let random_num = Math.floor(Math.random() * 1000) + 1500;
        await wait(random_num);
        Dino2.classList.remove("hidden");
        await wait(300);
        Dino2.classList.add("hidden");
    };
};

aboutMe.addEventListener("click", async () => {
    await Promise.all([
        GradualOpac(welcomeScreen, false),
        GradualOpac(bottomText, false),
        GradualOpac(pet, false)
    ])
    GradualOpac(content, true);
    GradualOpac(backButton, true);
});

projects.addEventListener("click", async () => {
    await Promise.all([
        GradualOpac(welcomeScreen, false),
        GradualOpac(bottomText, false),
        GradualOpac(pet, false)
    ])
    GradualOpac(projectContent, true);
    GradualOpac(backButton, true);
});

Achievement.addEventListener("click", async () => {
    await Promise.all([
        GradualOpac(welcomeScreen, false),
        GradualOpac(backButton, false),
        GradualOpac(pet, false)
    ])
    GradualOpac(AchievementContent, true);
    GradualOpac(backButton, true);
});

backButton.addEventListener("click", async() => {
    await Promise.all([
        GradualOpac(content, false),
        GradualOpac(projectContent, false),
        GradualOpac(AchievementContent, false),
        GradualOpac(backButton, false)
    ]);
    GradualOpac(welcomeScreen, true);
    GradualOpac(bottomText, true);
    GradualOpac(pet, true);
});

window.addEventListener("pointermove", (event) => {
    const Obj = Dino.getBoundingClientRect();
    const centerX = Obj.left + Obj.width / 2;
    const centerY = Obj.top + Obj.height / 2;

    const x = event.clientX - centerX;
    const y = event.clientY - centerY;
    const angle = Math.atan2(y, x) * (180 / Math.PI);

    Dino.style.transform = `rotate(${angle}deg)`;
    Dino2.style.transform = `rotate(${angle}deg)`;
});

blinking();

projectOpener(projectLink[0], "https://www.roblox.com/games/82414288448522/Obby-but-a-cat-chases-you");
projectOpener(projectLink[1], "https://ashraf-999.github.io/DeepWorkClock/");
projectOpener(projectLink[2], "https://ashrafmahin.itch.io/super-minigame");
projectOpener(projectLink[3], "https://ashraf-999.github.io/Shortcut-Os/");


createBox();
setInterval(createBox, 400);