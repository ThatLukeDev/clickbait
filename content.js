let srcUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/800px-Google_2015_logo.svg.png";

let images = Array.from(document.getElementsByTagName("img"));

images.forEach((image) => {
    let bounds = image.getBoundingClientRect();

    let overlay = document.createElement("img");

    overlay.src = srcUrl;

    overlay.width = bounds.right - bounds.left;
    overlay.height = bounds.bottom - bounds.top;

    overlay.style.zIndex = 32767;
    overlay.style.position = "fixed";

    overlay.style.top = bounds.top + "px";
    overlay.style.left = bounds.left + "px";

    image.parentNode.insertBefore(overlay, image.nextSibling);
})
