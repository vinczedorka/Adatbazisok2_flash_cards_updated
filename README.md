# Adatbázisok 2 Tanulókártya Alkalmazás
Modern, interaktív tanulókártya alkalmazás az Adatbázisok 2 vizsgakérdések gyakorlásához.Felhasználva az https://github.com/BeanieBarrow/adatb2_kerdesek adatbázisok vizsgakérdéseire vonatkozó megoldásokat.
Az alkalmazás React és TypeScript alapokon nyugszik, sötét témával és markdown támogatással.

### Telepítés nélkül github PWA

Elérhető https://attila121.github.io/Adatbazisok2_flash_cards/

### Telepítési lépések

```bash
# Projekt klónozása
git clone [repository-url]
cd flashcards

# Függőségek telepítése
npm install

# Fejlesztői szerver indítása
npm run dev
```

Az alkalmazás ezután elérhető a következő címen: `http://localhost:5173`


## Főbb funkciók

### Tanulási módok
- **Kétféle nézet**:
  - Lapozható kártyák: Klasszikus flashcard élmény kérdés-válasz váltással
  - Párhuzamos megjelenítés: Kérdés és válasz egyidejű megtekintése
- **Tanulási módok**:
  - Összes kérdés gyakorlása
  - Csak ismeretlen kérdések gyakorlása
  - Megjelölt kérdések gyakorlása
  - Vizsga mód: Kiválasztott számú kérdés véletlenszerű sorrendben
- **Testreszabható gyakorlás**:
  - Kérdések tartományának kiválasztása
  - Véletlenszerű vagy sorrendben haladó kérdések
  - Vizsga mód beállítható kérdésszámmal és tartománnyal

### Haladáskövetés
- **Részletes statisztikák**:
  - Ismert/nem ismert kártyák száma
  - Helyes/helytelen válaszok követése kártyánként
  - Utolsó gyakorlás időpontja
  - Megjelölt kártyák száma
  - Vizsga eredmények azonnali kiértékelése
- **Folyamatos mentés**:
  - Automatikus haladásmentés
  - Utolsó pozíció megjegyzése
  - Megjelölt kártyák perzisztens tárolása
  - Vizsga és tartomány beállítások megjegyzése

### Offline Támogatás (Opcionális)
- **Offline mód kapcsoló**:
  - Kapcsolható be/ki a felhő ikon gombbal (☁️/☁️🚫) a fejlécben
  - Mobilon a menüben található "Offline Mode: ON/OFF" opció
  - Zöld háttér jelzi ha be van kapcsolva
  - Teljesen opcionális funkció - döntsd el, hogy szeretnéd-e használni
- **Automatikus gyorsítótárazás** (ha be van kapcsolva):
  - Az első betöltéskor az összes kérdés és válasz mentésre kerül helyben
  - Az alkalmazás ezután internetkapcsolat nélkül is használható
  - A haladás és statisztikák mindig mentésre kerülnek
  - Az offline mód kikapcsolásakor a gyorsítótár automatikusan törlődik
- **Cache státusz jelző** (ha be van kapcsolva):
  - Kompakt státusz jelző az oldal alján
  - Mutatja az utolsó szinkronizáció időpontját
  - Zöld jelzés: offline módban működik
  - Kék jelzés: internetkapcsolat aktív
- **Manuális frissítés** (ha be van kapcsolva):
  - Frissítés gomb (⟳) csak offline mód bekapcsolása után jelenik meg
  - Mobilon a menüben található "Refresh Questions" opció
  - Új kérdések letöltése amikor internetkapcsolat elérhető
  - Toast értesítés mutatja a státuszt
- **Modern értesítési rendszer**:
  - Szép, modern toast értesítések minden műveletről
  - Színkódolt visszajelzések (siker, hiba, info)
  - Nem zavaró, automatikusan eltűnő üzenetek

### Navigáció és szűrés
- **Kérdéslista**: Gyors navigáció a kérdések között
- **Tartományválasztó**: 
  - Specifikus kérdéscsoportok gyakorlása
  - Beállítható véletlenszerű sorrend
  - Utolsó beállítások megjegyzése
- **Vizsga mód**:
  - Testreszabható kérdésszám
  - Választható kérdéstartomány
  - Részletes eredményértékelés
- **Kérdések megjelölése**: Fontos vagy ismétlést igénylő kérdések kiemelése
- **Haladásjelző**: Vizuális visszajelzés a gyakorlás előrehaladásáról

### Tartalom megjelenítés
- Markdown formázás támogatása
- Kódrészletek szintaxis kiemelése
- Képek és diagramok beágyazása
- Táblázatok és listák formázott megjelenítése

### Felhasználói felület
- Reszponzív dizájn: Működik asztali és mobil eszközökön
- Sötét téma
- Intuitív kezelőfelület
- Elegáns animációk és átmenetek

## Technológiák

- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui komponensek
- Lucide ikonok
- Sonner toast értesítések
- Local Storage API a haladás mentéséhez és offline támogatáshoz

## Telepítés és Futtatás

### Követelmények
- Node.js >= 16.0.0
- npm >= 7.0.0

## Kérdések szerkesztése

A kérdések a `kerdesek.md` fájlban találhatók, az alábbi formátumban:

```markdown
## 1. Kérdés címe
Kérdés szövege

Válasz szövege
- Tartalmazhat listákat
- Kódrészleteket
- Táblázatokat

![Diagram leírása](./images/diagram.png)
```

### Képek hozzáadása
- A képeket a `/public/images/` mappába kell helyezni
- A képekre a markdown szintaxissal lehet hivatkozni
- A képek automatikusan megjelennek a válaszokban


Készítette: Mielec Attila - 2024