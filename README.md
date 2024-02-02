# Clickbait
### Add an image over all images on a webpage.
---
![Image results for "test" with a red triangle overlaying all images](https://github.com/ThatLukeDev/clickbait/assets/76230394/b2384854-01c8-479d-962b-b2c9bcc6a146)

---

## Configuration
![Config window of app](https://github.com/ThatLukeDev/clickbait/assets/76230394/1512687c-28d1-43d9-a2a0-75916c03f28a)

- `Enabled` changes whether the program will affect websites.
- `Scale` changes how the image is sized.
  - `Auto` fits the image as large as possible without changing aspect ratio.
  - `Stretch` fits the image as large as possible while being able to change aspect ratio.
  - `Width` matches the width of both images.
  - `Height` matches the height of both images.
- `Lock` changes where the image is placed onto the background image.
  - `Top` and `Bottom` are exclusive.
  - `Left` and `Right` are exclusive.
- `URLs` is a list of URLs seperated by a `|` character.
  - Multiple images will result in one being chosen at random.
- `Sync` carries data across devices on the same google account.
  - Google has a limit to [sync](https://developer.chrome.com/docs/extensions/reference/api/storage#synchronous_response_to_storage_updates) so only URLs work as files are too large.
- `Choose file` allows the user to upload a file.
  - Uploaded images will be added as a [base64 data url](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs) to `URLs`.
- Selected images will be displayed at the bottom.
  - Hovering over an image makes it slightly white to show it is selected.
  - Clicking an image deletes it.

This config results in this:
![Youtube home page with pointing youtuber on every thumbnail](https://github.com/ThatLukeDev/clickbait/assets/76230394/ddae98eb-9585-4ddd-8db2-039063124057)

---

For any issues or feature requests, raise them in the *[github issues](https://github.com/ThatLukeDev/clickbait/issues)* tab.
