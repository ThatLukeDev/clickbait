let enabled = document.getElementById("enabled");
let imgUrls = document.getElementById("images");
let imgDisplay = document.getElementById("imgDisplay");
let imgUpload = document.getElementById("upload");
let syncBtn = document.getElementById("sync");
let sync = false;

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
            if (sync) {
                chrome.storage.sync.set({"imgUrls": imgUrls.value});
            }

            refreshImgDisplay();
        });
    });
}

if (sync) {
    chrome.storage.sync.get("enabled", (result) => {
        enabled.checked = result.enabled;
    });
}
else {
    chrome.storage.local.get("enabled", (result) => {
        enabled.checked = result.enabled;
    });
}

enabled.addEventListener("change", (e) => {
    if (e.currentTarget.checked) {
        chrome.storage.local.set({"enabled": true});
        chrome.storage.sync.set({"enabled": true});
    }
    else {
        chrome.storage.local.set({"enabled": false});
        chrome.storage.sync.set({"enabled": false});
    }
});

{
    let main = (result) => {
        imgUrls.value = result.imgUrls;
        refreshImgDisplay();
    };
    if (sync) {
        chrome.storage.sync.get("imgUrls", main);
    }
    else {
        chrome.storage.local.get("imgUrls", main);
    }
}

imgUrls.addEventListener("change", (e) => {
    chrome.storage.local.set({"imgUrls": imgUrls.value});
    if (sync) {
        chrome.storage.sync.set({"imgUrls": imgUrls.value});
    }
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
        if (sync) {
            chrome.storage.sync.set({"imgUrls": imgUrls.value});
        }
        refreshImgDisplay();
    });

    reader.readAsDataURL(e.currentTarget.files[0]);
});

Array.from(document.getElementsByClassName("format")).forEach((btn) => {
    btn.addEventListener("change", (e) => {
        if (btn.checked) {
            chrome.storage.local.set({"format": btn.value});
            chrome.storage.sync.set({"format": btn.value});
        }
    });
});

Array.from(document.getElementsByClassName("posX")).forEach((btn) => {
    btn.addEventListener("change", (e) => {
        if (btn.checked) {
            chrome.storage.local.set({"posX": btn.value});
            chrome.storage.sync.set({"posX": btn.value});
        }
    });
});
Array.from(document.getElementsByClassName("posY")).forEach((btn) => {
    btn.addEventListener("change", (e) => {
        if (btn.checked) {
            chrome.storage.local.set({"posY": btn.value});
            chrome.storage.sync.set({"posY": btn.value});
        }
    });
});

{
    let main = (result) => {
        Array.from(document.getElementsByClassName("format")).forEach((btn) => {
            if (result.format == btn.value) {
                btn.checked = true;
            }
        });

        Array.from(document.getElementsByClassName("posX")).forEach((btn) => {
            if (result.posX == btn.value) {
                btn.checked = true;
            }
        });
        Array.from(document.getElementsByClassName("posY")).forEach((btn) => {
            if (result.posY == btn.value) {
                btn.checked = true;
            }
        });
    };
    if (sync) {
        chrome.storage.sync.get(["format", "posX", "posY"], main);
    }
    else {
        chrome.storage.local.get(["format", "posX", "posY"], main);
    }
}

chrome.storage.sync.get("sync", (result) => {
    syncBtn.checked = result.sync;
});

syncBtn.addEventListener("change", (e) => {
    if (e.currentTarget.checked) {
        chrome.storage.sync.set({"sync": true});
    }
    else {
        chrome.storage.sync.set({"sync": false});
    }
});
