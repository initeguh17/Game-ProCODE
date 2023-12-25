function getLoadingTime() {
    return 550;
}

const loadingBarContainer = document.querySelector(".loading-bar-container");
const loadingBar = document.querySelector(".loading-bar");

let progress = 0;

const updateProgress = () => {
    if (progress >= 100) {
        clearInterval(interval);
        window.location.href = "../main/index.html";
        return;
    }

    progress += 0.1;
    loadingBar.Style.width = '${progress}';
};

const interval = setInterval(updateProgress, 10);