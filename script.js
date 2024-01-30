let enabled = document.getElementById("enabled");
let imgUrls = document.getElementById("images");
let imgDisplay = document.getElementById("imgDisplay");
let imgUpload = document.getElementById("upload");

function refreshImgDisplay() {
    imgDisplay.innerHTML = "";
    imgUrls.value.split("|").forEach((imgSrc) => {
        let img = document.createElement("img");
        img.src = imgSrc;
        imgDisplay.appendChild(img);
        img.addEventListener("click", () => {
            imgUrls.value = imgUrls.value.replace(imgSrc + "|", "");
            imgUrls.value = imgUrls.value.replace(imgSrc, "");
            chrome.storage.local.set({"imgUrls": imgUrls.value});
            refreshImgDisplay();
        });
    });
}

chrome.storage.local.get("enabled", (result) => {
    enabled.checked = result.enabled;
});

enabled.addEventListener("change", (e) => {
    if (e.currentTarget.checked) {
        chrome.storage.local.set({"enabled": true});
    }
    else {
        chrome.storage.local.set({"enabled": false});
    }
});

chrome.storage.local.get("imgUrls", (result) => {
    imgUrls.value = result.imgUrls;
    refreshImgDisplay();
});

imgUrls.addEventListener("change", (e) => {
    chrome.storage.local.set({"imgUrls": imgUrls.value});
    refreshImgDisplay();
});

imgUpload.addEventListener("change", (e) => {
    let reader = new FileReader();

    reader.addEventListener("load", () => {
        if (imgUrls.value.length > 0) {
            imgUrls.value += "|";
        }
        imgUrls.value += reader.result;

        chrome.storage.local.set({"imgUrls": imgUrls.value});
        refreshImgDisplay();
    });

    reader.readAsDataURL(e.currentTarget.files[0]);
});
