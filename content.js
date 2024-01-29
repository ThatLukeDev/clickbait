let imgUrls = ["https://tr.rbxcdn.com/a5d6e309dfaf0a7c7320c8e30326368b/420/420/Hat/Png"];

function overlayImages(imageUrlsArray) {
    let images = Array.from(document.getElementsByTagName("img"));

    images.forEach((image) => {
        let bounds = image.getBoundingClientRect();

        let overlay = document.createElement("img");

        image.classList.add("clickbaitOverlayBack");
        overlay.classList.add("clickbaitOverlayImg");

        overlay.src = imgUrls[Math.floor(Math.random() * imgUrls.length)];

        overlay.width = bounds.right - bounds.left;
        overlay.height = bounds.bottom - bounds.top;

        overlay.style.zIndex = 32767;
        overlay.style.position = "fixed";

        overlay.style.top = bounds.top + "px";
        overlay.style.left = bounds.left + "px";

        image.parentNode.insertBefore(overlay, image.nextSibling);
    });
}

chrome.storage.local.get("enabled", (result) => {
    if (!result.enabled) {
        return;
    }

    chrome.storage.local.get("imgUrls", (result) => {
        imgUrls = result.imgUrls.split(",");
        overlayImages(imgUrls);
    });

    setTimeout(() => {
        if (document.getElementsByClassName("clickbaitOverlayImg").length < 1) {
            overlayImages(imgUrls);
        }
    }, 100);
});
