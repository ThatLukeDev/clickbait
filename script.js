let enabled = document.getElementById("enabled");
let imgUrls = document.getElementById("images");

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
});

imgUrls.addEventListener("change", (e) => {
    chrome.storage.local.set({"imgUrls": imgUrls.value});
});
