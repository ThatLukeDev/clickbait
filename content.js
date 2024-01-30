let imgUrls = ["https://tr.rbxcdn.com/a5d6e309dfaf0a7c7320c8e30326368b/420/420/Hat/Png"];

function overlayImage(imageUrlsArray, image) {
    let bounds = image.getBoundingClientRect();

    let overlay = document.createElement("img");

    image.classList.add("clickbaitOverlayBack");
    overlay.classList.add("clickbaitOverlayImg");

    overlay.src = imgUrls[Math.floor(Math.random() * imgUrls.length)];

    overlay.width = bounds.right - bounds.left;
    overlay.height = bounds.bottom - bounds.top;

    overlay.style.zIndex = 32767;
    overlay.style.position = "absolute";

    overlay.style.top = "0px";
    overlay.style.left = "0px";

    let container = document.createElement("span");
    container.classList.add("clickbaitOverlaySpan");

    image.parentNode.insertBefore(container, image);
    container.appendChild(image);
    container.appendChild(overlay);
}

function overlayImages(imageUrlsArray) {
    let images = Array.from(document.getElementsByTagName("img"));

    images.forEach((image) => overlayImage(imageUrlsArray, image));
}

chrome.storage.local.get("enabled", (result) => {
    if (!result.enabled) {
        return;
    }

    chrome.storage.local.get("imgUrls", (result) => {
        imgUrls = result.imgUrls.split("|");
        overlayImages(imgUrls);
    });

    setTimeout(() => {
        if (document.getElementsByClassName("clickbaitOverlayImg").length < 1) {
            overlayImages(imgUrls);
        }
    }, 100);
});

let instanceOverlayObserver = new MutationObserver(mutations => {
    mutations.forEach((mutation) => {
        Array.from(mutation.addedNodes).forEach((element) => {
            if (element instanceof HTMLImageElement && element.parentElement.classList) {
                if (!element.parentElement.classList.contains("clickbaitOverlaySpan")) {
                    chrome.storage.local.get("enabled", (result) => {
                        if (result.enabled) {
                            overlayImage(imgUrls, element);
                        }
                    });
                }
            }
        });
    });
});
instanceOverlayObserver.observe(document.body, {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true,
});
