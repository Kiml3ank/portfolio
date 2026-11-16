# Phisith Thipphavong — CV & Portfolio

A one-page CV plus four work pages, built with plain HTML, CSS and JavaScript (no build step).

Sections "build themselves" as you scroll: a swarm of agent cursors flies to each block and types it in.
Design and build-animation reference: [@sahirveerancheri](https://www.instagram.com/sahirveerancheri/) ([original post](https://www.instagram.com/p/DfWWldaTQTz/)).

## Pages

| Page | File |
|---|---|
| Home / CV | `index.html` |
| Developer | `dev.html` |
| Graphic design | `graphic.html` |
| Photography | `photography.html` |
| Barista | `barista.html` |

## Editing

- **Projects, galleries, email, accent colours:** `js/content.js`
- **Page text:** the `.html` files
- **Images:** put them in `images/` and set `image: 'images/your-file.jpg'` in `js/content.js`
- **Styles:** `css/style.css` (site), `css/pages.css` (work pages), `css/build-animation.css` (agent-swarm animation)
- **Behaviour:** `js/main.js`

## Run locally

```bash
python -m http.server 8000
# open http://localhost:8000
```
