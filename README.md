# 🌌 AstroTrapez

Profesjonalna strona astronomiczna zbudowana w HTML, CSS i JavaScript.  
Zawiera transmisje live, dane o ISS, galerię zdjęć oraz aktualne rozbłyski słoneczne.

---

## ✨ Funkcje

- 🎥 **Transmisja Live**  
  Wbudowany odtwarzacz YouTube – możesz wkleić swój link do transmisji.

- 🖼 **Galeria**  
  Przykładowe astrofotografie, działająca w **Lightbox** (kliknięcie otwiera powiększenie).

- 🚀 **ISS**  
  - Live stream z ISS (NASA, SpaceVideos).  
  - Interaktywna mapa **Leaflet.js** pokazująca aktualną pozycję stacji.  
  - Dane na żywo: szerokość/długość geograficzna, wysokość, prędkość.  

- ☀️ **Solar flares** *(w przygotowaniu)*  
  Dane z API NASA DONKI (ostatnie rozbłyski).

- 💜 **Tiply**  
  Pływający przycisk wsparcia w prawym dolnym rogu.  

- 🔑 **Logowanie** *(lokalne)*  
  Modal logowania zapisujący dane w `localStorage`.

---
astrotrapez/
│── index.html
│── css/
│ └── styles.css
│── js/
│ └── app.js
│── libs/
│ ├── leaflet.css
│ ├── leaflet.js
│ ├── lightbox.css
│ ├── lightbox.js
│ └── images/
│ ├── marker-icon.png
│ ├── marker-icon-2x.png
│ └── marker-shadow.png
│── assets/
│ ├── bg-stars.png
│ └── gallery/
│ ├── astro_01.jpg … astro_08.jpg
│── CNAME (jeśli korzystasz z własnej domeny)


---

## 🚀 Uruchomienie na GitHub Pages

1. Wejdź w **Settings → Pages**.  
2. Ustaw:  
   - **Branch:** `main`  
   - **Folder:** `/ (root)`  
3. Kliknij **Save**.  
4. Strona będzie dostępna pod:  


https://twojlogin.github.io/astrotrapez/

lub pod własną domeną (jeśli używasz pliku `CNAME`).

---

## 📸 Podgląd

![AstroTrapez screenshot](assets/gallery/astro_01.jpg)

---

### 👨‍🚀 Autor
Projekt przygotowany dla **AstroTrapez** – pasjonatów kosmosu i astrofotografii.
## 📂 Struktura repo

