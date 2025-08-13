# WH40K Damage Calculator – Vanilla JS Edition

Ez a projekt a Warhammer 40,000 dobás- és sebzéskalkulátor új, moduláris, **vanilla JavaScript** alapú változata.
Célja egy tiszta architektúra (domain / engine / ui) és a könnyű bővíthetőség.

## Prerequisites

- Statikus webszerver (példák: `python3 -m http.server`, `npx serve`)
- Opcionális: Firebase CLI, ha hostingra szeretnéd feltölteni

## Installation

1. Klónozd a repót vagy töltsd le ZIP-ben.
2. Lépj a projekt gyökérmappájába.

## Usage

### Helyi futtatás

**Python**
```
python3 -m http.server 5173
```
**Node.js***
```
npx serve -l 5173 .
```
Nyisd meg a böngészőben:
http://localhost:5173/

**Firebase deploy (opcionális)**
```
npm i -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## Troubleshooting
Port already in use: futtasd másik porton, pl. python3 -m http.server 8080
404 vagy üres oldal: ellenőrizd, hogy a public/index.html létezik
Cache gondok: frissíts kényszerítve (Ctrl/Cmd+Shift+R)

## License
Ez a projekt a LICENSE fájlban meghatározott feltételek szerint használható.
