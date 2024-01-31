let imgUrls = ["https://tr.rbxcdn.com/a5d6e309dfaf0a7c7320c8e30326368b/420/420/Hat/Png"];
let scale = "stretch";
let posX = false;
let posY = false;

function overlayImage(imageUrlsArray, image) {
    let overlay = document.createElement("img");

    image.classList.add("clickbaitOverlayBack");
    overlay.classList.add("clickbaitOverlayImg");

    overlay.src = imgUrls[Math.floor(Math.random() * imgUrls.length)];

    overlay.style.cssText = image.style.cssText;

    switch (scale) {
        case "stretch":
            overlay.width = image.width;
            overlay.height = image.height;
            break;
        case "width":
            overlay.width = image.width;
            break;
        case "height":
            overlay.height = image.height;
            break;
        default:
            let aspectSrc = image.width / image.height;
            let aspect = overlay.width / overlay.height;
            if (aspect > aspectSrc) {
                overlay.width = image.width;
            }
            else {
                overlay.height = image.height;
            }
            break;
    }

    overlay.style.position = "absolute";

    if (posX) {
        overlay.style.right = "0px";
    }
    else {
        overlay.style.left = "0px";
    }
    if (posY) {
        overlay.style.bottom = "0px";
    }
    else {
        overlay.style.top = "0px";
    }

    let container = document.createElement("span");
    container.classList.add("clickbaitOverlaySpan");

    image.parentNode.insertBefore(container, image);
    container.appendChild(image);
    container.appendChild(overlay);
}

function overlayImages(imageUrlsArray) {
    chrome.storage.local.get("format", (result) => {
        scale = result.format;
    });
    chrome.storage.local.get("posX", (result) => {
        if (result.posX == "right") {
            posX = true;
        }
    });
    chrome.storage.local.get("posY", (result) => {
        if (result.posY == "bottom") {
            posY = true;
        }
    });

    setTimeout(() => {
        let images = Array.from(document.getElementsByTagName("img"));
        images.forEach((image) => overlayImage(imageUrlsArray, image));
    }, 10);
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
    }, 1000);
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
