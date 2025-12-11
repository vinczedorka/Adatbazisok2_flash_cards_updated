## 1. Mit hívunk statikus, és mit dinamikus adatbázisnak? (1 pont) 

- Statikus adatbázis:
  - Ritkán módosul
  - A lekérdezések gyorsasága a fontosabb
- Dinamikus adatbázis:
  - Gyakran módosul
  - Ritkán végzünk lekérdezést

## 2. Fogalmazzunk meg 3 célt, amire az indexelés kiválasztásánál figyelni kell! (3 pont)

- Keresési idő
- Tárméret
- Módosítási idő
- Pl.: indexek használatával csökken a keresési idő, nő a tárméret, és nő a
  módosítási idő

## 3. Mit tételezünk fel, mivel arányos a beolvasás, kiírás költsége? (1 pont)

- Feltételezzük, hogy a beolvasás, kiírás költsége arányos a háttértároló és
  memória között mozgatott blokkok számával.

## 4. Adjuk meg az alábbi paraméterek jelentését! l, b, B, T, bf, M, I(A) (7 pont)

- `l` (_length_): rekordméret (bájtokban)
- `b`: blokkméret (bájtokban)
- `T` (_tuple_): rekordok száma 
- `B`: a fájl mérete blokkokban
- `bf`: blokkolási faktor
  - (mennyi rekord fér el egy blokkban: bf = &LeftFloor;b/l&RightFloor; (alsó egészrész)
- B = &LeftCeiling;T/bf&RightCeiling; (felső egészrész)
- `M`: memória mérete blokkokban
- `I(A)`: képméret, az A oszlopban szereplő különböző értékek száma
  - `I(A)` = | &Pi;<sub>A</sub> (R) |

## 5. Adjuk meg RxS méretét blokkokban kifejezve! (2 pont)

```text
B(RxS) = (T(R) * T(S)) * (l(R) + l(S)) / b =
       = (T(S) * T(R) * l(R)/b) + (T(R) * T(S) * l(S)/b) =
       = T(S) * B(R) + T(R) * B(S)
```

## 6. Mit jelent az egyenletességi feltétel? (1 pont)

- Fel szoktuk tenni, hogy az `A = a` feltételnek eleget tevő rekordokból
  nagyjából egyforma számú rekord szerepel.

## 7. Mekkora adategységet olvas az író-olvasó fej? (1 pont)

- Az író-olvasó fej nagyobb adategységeket (blokkokat) olvas be.

## 8. Mitől függhet a blokkméret? (1 pont)

- A blokkméret maga fix
- Adatbázis-kezelőtől, operációs rendszertől, hardvertől függ.
- Oracle esetén 8K az alapértelmezés.

## 9. Egyenletességi feltétel esetén hány blokkból áll a sA=a(R) lekérdezés eredménye? (1 pont)

- B(&sigma;<sub>A = a</sub>(R)) = B(R) / I(A)

## 10. Soroljunk fel legalább 7 különböző fájlszervezési módszert? (7 pont)

- Kupac (heap),
- Hasító index (hash),
- Rendezett állomány,
- Elsődleges index (ritka index),
- Másodlagos index (sűrű index),
- Többszintű index,
- B+-fa, B*-fa,

## 11. Kupac szervezés esetén mennyi a keresés költsége legrosszabb esetben? (1 pont)

- `A = a` keresési idő legrosszabb esetben `B`.

## 12. Kupac szervezés esetén mennyi a beszúrás költsége? (1 pont)

- Utolsó blokkba tesszük a rekordot, 1 olvasás + 1 írás
- Módosítás: 1 keresés + 1 írás
- Törlés: 1 keresés + 1 írás (üres hely marad, vagy a törlési bitet állítják át)
- Itt a keresés költsége `B` a legrosszabb esetben
  - `B/2` átlagos esetben az egyenletességi feltétel mellett

## 13. Mit mond meg a h(x) hasító függvény értéke? (1 pont)

- Egy h(x) &in; {1, …, K} hasító függvény értéke mondja meg, hogy melyik kosárba
  tartozik a rekord, ha `x` volt az indexmező értéke a rekordban

## 14. Mikor jó egy hasító függvény és ilyenkor milyen hosszúak a blokkláncok? (2 pont)

- Akkor jó egy hasító függvény, ha nagyjából egyforma hosszú blokkláncok
  keletkeznek, azaz egyenletesen sorolja be a rekordokat.

## 15. Mennyi az sA=a(R) lekérdezés keresési költsége jó hasító index esetén? (1 pont)

- Ha elég a `h(a)` sorszámú kosarat végignézni, amely `B/K` blokkból álló kupacnak
  felel meg, akkor legrosszabb esetben `B/K` a lekérdezés keresési költsége.

## 16. Ha túl nagynak választjuk a K-t hasításkor, akkor ez milyen problémát okozhat? (1 pont)

- Nagy K esetén sok olyan blokklánc lehet, amely egy blokkból fog állni, és a
  blokkban is csak 1 rekord lesz. Ekkor a keresési idő: 1 blokkbeolvasás, de B
  helyett T számú blokkban tároljuk az adatokat.

## 17. Milyen keresésre nem jó a hasító indexelés? (1 pont)

- Intervallumos típusú (`a < A < b`) keresésre nem jó.

## 18. Mit jelent a dinamikus hasító indexelés és milyen két fajtáját ismerjük? (3 pont)

- Előre nem rögzítjük a kosarak számát.
- A kosarak száma beszúráskor, törléskor változhat.
- Fajtái:
  - Kiterjeszthető hasító index
  - Lineáris hasító index:

## 19. Kiterjeszthető hasítás esetén a h(K) érték alapján melyik kosárba kerül a rekord? (2 pont)

- A `h(K)` `k` hosszú kódnak vegyük az `i` hosszú elejét, és azt kosarat, amelynek
  kódja a `h(K)` kezdő szelete. Ha van hely a kosárban, tegyük bele a rekordot,
  ha nincs, akkor nyissunk egy új kosarat, és a következő bit alapján osszuk
  ketté a telített kosár rekordjait. Ha ez a bit mindegyikre megegyezik, akkor
  a következő bitet vesszük a szétosztáshoz, és így tovább.

## 20. Milyen probléma keletkezhet kiterjeszthető hasító index esetén és mi rá a megoldás? (2 pont)

-  Probléma:
- Ha az új sorok hasító értékének eleje sok bitben megegyezik, akkor hosszú
  ágak keletkezhetnek (nincs kiegyensúlyozva a fa).
- Megoldás:
  - A bináris gráfot teljessé is tehetjük. A gráfot egy tömbbel ábrázolhatjuk.
    Ekkor minden kosár azonos szinten lesz, de közös blokkjai is lehetnek a
    kosaraknak. Túlcsordulás esetén a kosarak száma duplázódik.
  - Ábráért ld. http://people.inf.elte.hu/kiss/13ab2osz/fizika.ppt 14. dia

## 21. Lineáris hasító index esetén mikor nyitunk meg új kosarat? (1 pont)

- Új kosarat akkor nyitunk meg, ha egy előre megadott értéket elér a kosarakra
  jutó átlagos rekordszám.
- `(rekordok száma/kosarak száma > küszöb)`

## 22. Lineáris hasító index esetén a h(K) érték alapján melyik kosárba kerül a rekord? (2 pont)

- Ha `n` kosarunk van, akkor a hasító függvény értékének utolsó `log(n)` bitjével
  megegyező sorszámú kosárba tesszük, ha van benn hely. Ha nincs, akkor
  hozzáláncolunk egy új blokkot és abba tesszük.
- Ha nincs megfelelő sorszámú kosár, akkor abba a sorszámú kosárba tesszük,
  amely csak az első bitjében különbözik a keresett sorszámtól.

## 23. Rendezett állomány esetén adjuk meg a bináris (logaritmikus) keresés lépéseit! (4 pont)

- Ha a rendező mező és kereső mező egybeesik, akkor bináris (logaritmikus)
  keresést lehet alkalmazni:
  - Beolvassuk a középső blokkot,
  - Ha nincs benne az `A = a` értékű rekord, akkor eldöntjük, hogy a blokklánc
    második felében, vagy az első felében szerepelhet-e egyáltalán,
  - Beolvassuk a felezett blokklánc középső blokkját,
  - Addig folytatjuk, amíg megtaláljuk a rekordot, vagy a vizsgálandó maradék
    blokklánc már csak 1 blokkból áll

## 24. Mennyi a keresési költség rendezett mező esetében? (1 pont)

- log<sub>2</sub>(B)

## 25. Mennyi a keresési költség rendezett mező esetében, ha gyűjtő blokkokat is használunk? (1 pont)

- Összköltség log<sub>2</sub>(B - G) + G (Ha a gyűjtö blokkban találjuk meg)
  - Egyébként: log<sub>2</sub>(B - G)
- Részletesebb leírás: http://people.inf.elte.hu/kiss/13ab2osz/fizika.ppt 22. dia alja

## 26. Mennyi a keresési költség rendezett mező esetében, ha minden blokkot félig üresen hagyunk? (1 pont)

- 1 + log<sub>2</sub>(B)

## 27. Milyen mindig az indexrekord szerkezete? (1 pont)

- `(a, p)`, ahol `a` egy érték az indexelt oszlopban, `p` egy blokkmutató, arra
  a blokkra mutat, amelyben az `A = a` értékű rekordot tároljuk.
- Az index mindig rendezett az indexértékek szerint.

## 28. Adjuk meg az elsődleges index 5 jellemzőjét! (5 pont)

- Főfájl is rendezett
- Csak 1 elsődleges indexet lehet megadni (mert csak egyik mező szerint lehet
  rendezett a főfájl.
- Elég a főfájl minden blokkjának legkisebb rekordjához készíteni indexrekordot
- Indexrekordok száma: `T(I) = B` (ritka index)
- Indexrekordból sokkal több fér egy blokkba, mint a főfájl rekordjaiból:
  `bf(I) >> bf`, azaz az indexfájl sokkal kisebb rendezett fájl, mint a főfájl: 
- `B(I) = B / bf(I) << B = T / bf`

## 29. Mit hívunk fedőértéknek? (1 pont)

- A legnagyobb olyan indexérték, amely a keresett értéknél kisebb vagy egyenlő.

## 30. Mennyi a keresési költség elsődleges index esetén? (1 pont)

- 1 + log<sub>2</sub>(B(I))

## 31. Adjuk meg a másodlagos index 5 jellemzőjét! (5 pont)

- Főfájl rendezetlen (az indexfájl mindig rendezett)
- Több másodlagos indexet is meg lehet adni 
- A főfájl minden rekordjához kell készíteni indexrekordot
- Indexrekordok száma: `T(I) = T` (sűrű index)
- Indexrekordból sokkal több fér egy blokkba, mint a főfájl rekordjaiból:
  `bf(I) >> bf`, azaz az indexfájl sokkal kisebb rendezett fájl, mint a főfájl:
- `B(I) = T / bf(I) << B = T/bf`

## 32. Hogyan keresünk a másodlagos indexben és mennyi a keresés költsége? (5 pont)

- Az indexben keresés az index rendezettsége miatt bináris kereséssel történik:
  log<sub>2</sub>(B(I))
- A talált indexrekordban szereplő blokkmutatónak megfelelő blokkot még be kell
  olvasni
- 1 + log<sub>2</sub>(B(I)) << log<sub>2</sub>(B) (rendezett eset)  
- Az elsődleges indexnél rosszabb a keresési idő, mert több az indexrekord

## 33. Mit hívunk klaszterszervezésű táblának? (1 pont)

- Klaszter: nyaláb, fürt
- Klaszterszervezés egy tábla esetén egy A oszlopra: 
  - Az azonos A-értékű sorok fizikailag egymás utáni blokkokban helyezkednek el.
  - CÉL: az első találat után az összes találatot megkapjuk soros beolvasással

## 34. Mit hívunk klaszterindexnek? (1 pont)

- Klaszterszervezésű fájl esetén index az A oszlopra.

## 35. Mikor mondjuk, hogy 2 tábla klaszterszervezésű? (1 pont)

- Klaszterszervezés két tábla esetén az összes közös oszlopra:
  - A közös oszlopokon egyező sorok egy blokkban, vagy fizikailag egymás utáni
    blokkokban helyezkednek el.
  - CÉL: összekapcsolás esetén az összetartozó sorokat soros beolvasással
    megkaphatjuk.

## 36. Ha t szintű indexet használunk, mennyi a keresési költség blokkműveletek számában mérve? (1 pont)

- log<sub>2</sub>(B( I<sup>(t)</sup> )) + t db. blokkolvasás
- Mi `t`? → ld. következő kérdés

## 37. Ha t szintű indexet használunk, a legfelső szinten milyen keresést használunk? (1 pont)

- `t`: t-edik szinten I<sup>(t)</sup> bináris kereéssel keressük meg a fedő indexrekordot.

## 38. Ha t szintű indexet használunk és a legfelső szint 1 blokkból áll, akkor mennyi a keresési költség? (1 pont)

- Ha a legfelső szint 1 blokkból áll, akkor `t + 1` blokkolvasást jelent.
- log<sub>2</sub>(B(I<sup>(t)</sup>)) + t + 1

## 39. Ha t szintű indexet használunk, mennyi az indexszintek blokkolási faktora és miért? (2 pont)

- Minden szint blokkolási faktora megegyezik, mert egyforma hosszúak az
  indexrekordok.

## 40. Ha t szintű indexet használunk, vezessük le, hogy hány blokkból áll a legfelső szint! (12 pont)

- Főfájl: `B`
  - I. szint: `B / bf(I)`
  - II. szint: B / bf(I)<sup>2</sup>
  - …
  - t. szint: B / bf(I)<sup>t</sup>
- ld. bővebben http://people.inf.elte.hu/kiss/13ab2osz/fizika.ppt 48. oldal
  (táblázat)

## 41. Ha t szintű indexet használunk, és a legfelső szint 1 blokkból áll, abból milyen egyenlet következik és mi a megoldása t-re? (2 pont)

- Ha `t`-edik szinten 1 blokk: `1 = B / bf(I)`
- Azaz t = log<sub>bf(I)</sub>(B) < log<sub>2</sub>(B)

## 42. Mi a két legfontosabb jellemzője a B+-faindexnek? (2 pont)

- Minden blokk legalább 50%-ban telített
- A szerkezeten kívül a telítettséget biztosító karbantartó algoritmusokat is
  beleértjük

## 43. Egy példa alapján szemléltessük a köztes csúcs jellemzőit B+-fa index esetén! (8 pont)

- Köztes (nem-levél) csúcs szerkezete:

```text
     ┌───────────────────────────┐  
     │                           │  
     │                           │  
  ┌╶╶╶╶ 57╶╶╶╶┐    81╶╶╶┐    95╶╶╶╶┐
  ╎  │        ╎         ╎        │ ╎  
  ╎  │        ╎         ╎        │ ╎  
  ╎  └────────╎─────────╎────────┘ ╎  n+1 mutató
  ↓           ↓         ╎          ╎  n indexérték
k < 57   57 ≤ k < 81    ╎          ╎  
                        ╎          ╎  
                        ↓          ╎  
                   81 ≤ k < 95     ╎  
                                   ╎  
                                   ↓  
                                95 ≤ k  
```

- Ahol `k` a mutató által meghatározott részben (részgráfban) szereplő
  tetszőleges indexérték

## 44. Egy példa alapján szemléltessük a levél csúcs jellemzőit B+-fa index esetén! (5 pont)

- Levél csúcs szerkezete:

```text
             ┌╶╶╶╶╶╶Köztes csúcs               
             ╎                                 
             ↓                                 
 ┌───────────────────────────┐     A sorrendben
 │                         ╶╶╶╶╶╶→ következő   
 │                           │     levél       
 │  57         81        95  │                 
 │  ╎          ╎         ╎   │                 
 │  ╎          ╎         ╎   │                 
 └──╎──────────╎─────────╎───┘                 
    ╎          ╎         ╎                     
    ↓          ↓         ↓                     
 57 index-  81 index- 95 index-                
 értékű     értékű    értékű                   
 rekord     rekord    rekord                   

```

## 45. Mutassunk példát, mikor beszúráskor egy levélcsúcsot kettéosztunk B+-fa index esetén! (5 pont)


![45. kérdés, fizika.ppt, 53. dia](./images/45.png)

- Mit szúrunk be és a beszúrás előtti, majd utáni két fát kell lerajzolni

## 46. Mutassunk példát, mikor beszúráskor egy köztes csúcsot kettéosztunk B+-fa index esetén! (5 pont)

![46. kérdés, fizika.ppt, 54. dia](./images/46.png)

- Mit szúrunk be és a beszúrás előtti, majd utáni két fát kell lerajzolni

## 47. Mutassunk példát, mikor beszúráskor nő a B+-fa index magassága! (5 pont)

![47. kérdés, fizika.ppt, 55. dia](./images/47.png)

- Mit szúrunk be és a beszúrás előtti, majd utáni két fát kell lerajzolni

## 48. Mutassunk példát, mikor törléskor megszüntetünk egy levélcsúcsot B+-fa index esetén! (5 pont)

![48. kérdés, fizika.ppt, 56. dia](./images/48.png)

- Mit törlünk és a törlés előtti, majd utáni két fát kell lerajzolni

## 49. Mutassunk példát, mikor törléskor csökken a B+-fa index magassága! (5 pont)

![49. kérdés, fizika.ppt, 58. dia](./images/49.png)

- Mit törlünk és a törlés előtti, majd utáni két fát kell lerajzolni

## 50. Mutassunk példát arra, mikor egy kevés elemszámú oszlopra bitmap indexet készítünk! (2 pont)

![50. kérdés, 08-indexek-1.ppt, 33. dia](./images/50.png)

## 51. Mutassunk példát arra, mikor logikai feltételek kiértékelését bitmap vektorműveletekre vezetjük vissza! (7 pont)

```sql
SELECT COUNT(*)
FROM CUSTOMER
WHERE MARITAL_STATUS = 'married' AND
  REGION IN ('central', 'west');
```

![51. kérdés, 08-indexek-1.ppt, 34. dia](./images/51.png)

## 52. Mi a lekérdezések optimalizálásának a célja és miket használunk fel ehhez? (5 pont)

- CÉL: A lekérdezéseket gyorsabbá akarjuk tenni a táblákra vonatkozó
  paraméterek, statisztikák, indexek ismeretében és általános érvényű
  tulajdonságok, heurisztikák segítségével

## 53. Adjuk meg a lekérdezések optimalizálásának folyamatábráját! (19 pont)

![53. kérdés, algebrai opt.ppt, 100. dia](./images/53.png)

## 54. Adjuk meg egy egyszerű relációs algebrai kifejezést és gráfos ábrázolását! (4 pont)

![54. kérdés, algebrai opt.ppt, 95. dia](./images/54.png)

## 55. Milyen költségmodellt használunk relációs algebrai optimalizálás esetében? (2 pont)

- A kiszámítás költsége arányos a relációs algebrai kifejezés
  részkifejezéseinek megfelelő relációk tárolási méreteinek összegével

## 56. Mi a módszer lényege relációs algebrai optimalizálás esetében? (3 pont)

- A műveleti tulajdonságokon alapuló ekvivalens átalakításokat alkalmazunk,
  hogy várhatóan kisebb méretű relációk keletkezzenek

## 57. Miért mondjuk, hogy az eljárás heurisztikus relációs algebrai optimalizálás esetén? (2 pont)

- Azért, mert nem az argumentum relációk valódi méretével számol

## 58. Miért nem egyértelmű az eredmény relációs algebrai optimalizálás esetén? (4 pont)

- Az átalakítások sorrendje nem determinisztikus, így más sorrendben
  végrehajtva az átalakításokat más végeredményt kaphatunk, de mindegyik
  általában jobb költségű, mint amiből kiindultunk

## 59. A relációs algebrai kifejezésfában melyek az unáris csúcsok? (3 pont)

- &sigma;: kiválasztás
- &Pi;: vetítés
- &rho;: átnevezés

## 60. A relációs algebrai kifejezésfában melyek a bináris csúcsok? (3 pont)

- -: kivonás
- &cup;: unió
- x: szorzás

## 61. A relációs algebrai kifejezésfában mik a levélcsúcsok? (2 pont)

- Konstans relációk vagy relációs változók

## 62. Mit hívunk ekvivalens relációs algebrai kifejezéseknek? (3 pont)

- E1(r1,...,rk) és E2(r1,...,rk) relációs algebrai kifejezések ekvivalensek (E1
  ~= E2), ha tetszőleges r1,...,rk relációkat véve E1(r1,...,rk) ~=
  E2(r1,...,rk)

## 63. Hány szabálycsoportot adunk meg relációs algebrai optimalizáláskor és mi jellemző ezekre? (4 pont)

- 11 szabálycsoport
  - kifejezések ekvivalenciáját megfogalmazó állítások
  - bizonyításuk könnyen végiggondolható
  - az állítások egy részében a kifejezések szintaktikus helyessége egyben
    elégséges feltétele is az ekvivalenciának

## 64. Adjuk meg a relációs algebrai optimalizálás kommutatív szabályait! (3 pont)

- E1 x E2 ~= E2 x E1
- E1 |x| E2 ~= E2 |x| E1
- E1 |x|<sub>&theta;</sub> E2 ~= E2 |x|<sub>&theta;</sub> E1

## 65. Adjuk meg a relációs algebrai optimalizálás asszociatív szabályait! (3 pont)

- (E1 x E2) x E3 ~= E1 x (E2 x E3)
- (E1 |x| E2) |x| E3 ~= E1 |x| (E2 |x| E3)
- (E1 |x|<sub>&theta;</sub> E2) |x|<sub>&theta;</sub> E3 ~= E1
  |x|<sub>&theta;</sub> (E2 |x|<sub>&theta;</sub> E3)

## 66. Adjuk meg a vetítésre vonatkozó összevonási, bővítés szabályt relációs algebrai optimalizálás esetén! (2 pont)

- Legyen A és B két részhalmaza az E reláció oszlopainak úgy, hogy A &subseteq;
  B
- &Pi;<sub>A</sub>(&Pi;<sub>B</sub>(E)) ~= &Pi;<sub>A</sub>(E)

## 67. Adjuk meg a kiválasztások felcserélhetőségére, felbontására vonatkozó szabályt relációs algebrai optimalizálás esetén! (3 pont)

- Legyen F1 és F2 az E reláció oszlopain értelmezett kiválasztási feltétel
- &sigma;<sub>F1&and;F2</sub>(E) ~=
  &sigma;<sub>F1</sub>(&sigma;<sub>F2</sub>(E)) ~=
  &sigma;<sub>F2</sub>(&sigma;<sub>F1</sub>(E))

## 68. Adjuk meg a kiválasztás és vetítés felcserélhetőségére vonatkozó szabályt relációs algebrai optimalizálás esetén! (2 pont)

- Legyen F az E relációnak csak az A oszlopain értelmezett kiválasztási feltétel
- &Pi;<sub>A</sub>(&sigma;<sub>F</sub>(E)) ~=
  &sigma;<sub>F</sub>(&Pi;<sub>A</sub>(E))

## 69. Adjuk meg a kiválasztás és vetítés felcserélhetőségére vonatkozó általánosított szabályt rel. algebrai optimalizálás esetén! (2 pont)

- Általánosabban: Legyen F az E relációnak csak az A&cup;B oszlopain
  értelmezett kiválasztási feltétel, ahol A&cap;B = &empty;
- &Pi;<sub>A</sub>(&sigma;<sub>F</sub>(E)) ~=
  &Pi;<sub>A</sub>(&sigma;<sub>F</sub>(&Pi;<sub>A&cup;B</sub>(E)))

## 70. Adjuk meg a kiválasztás és szorzás felcserélhetőségére vonatkozó szabályt relációs algebrai optimalizálás esetén! (2 pont)

- Legyen F az E1 reláció oszlopainak egy részhalmazán értelmezett kiválasztási
  feltétel
- &sigma;<sub>F</sub>(E1 x E2) ~= &sigma;<sub>F</sub>(E1) x E2

## 71. Adjuk meg a kiválasztás és szorzás felcserélhetőségére vonatkozó speciális szabályt relációs algebrai optimalizálás esetén! (2 pont)

- Legyen i=1,2 esetén Fi az Ei reláció oszlopainak egy részhalmazán értelmezett
  kiválasztási feltétel, legyen továbbá F=F1&and;F2
- &sigma;<sub>F</sub>(E1 x E2) ~= &sigma;<sub>F1</sub>(E1) x
  &sigma;<sub>F2</sub>(E2)

## 72. Adjuk meg a kiválasztás és szorzás felcserélhetőségére vonatkozó általánosított szabályt rel. algebrai optimalizálás esetén! (3 pont)

- Legyen F1 az E1 reláció oszlopainak egy részhalmazán értelmezett kiválasztási
  feltétel, legyen F2 az E1xE2 reláció oszlopainak egy részhalmazán értelmezett
  kiválasztási feltétel, úgy hogy mindkét sémából legalább egy oszlop szerepel
  benne, legyen továbbá F=F1&and;F2
- &sigma;<sub>F</sub>(E1 x E2) ~= &sigma;<sub>F2</sub>(&sigma;<sub>F1</sub>(E1)
  x E2)

## 73. Adjuk meg a kiválasztás és egyesítés felcserélhetőségére vonatkozó szabályt relációs algebrai optimalizálás esetén! (2 pont)

- Legyen E1, E2 relációk sémája megegyező, és F a közös sémán értelmezett kiválasztási feltétel
- &sigma;<sub>F</sub>(E1 &cup; E2) ~= &sigma;<sub>F</sub>(E1) &cup;
  &sigma;<sub>F</sub>(E2)
- Kivonásra ugyan ez, de nincs rá külön kérdés

## 74. Adjuk meg a kiválasztás és természetes összekapcsolás felcserélhetőségére vonatkozó szabályt relációs algebrai optimalizálás esetén! (2 pont)

- Legyen F az E1 és E2 közös oszlopainak egy részhalmazán értelmezett
  kiválasztási feltétel
- &sigma;<sub>F</sub>(E1 |x| E2) ~= &sigma;<sub>F</sub>(E1) |x|
  &sigma;<sub>F</sub>(E2)

## 75. Adjuk meg a vetítés és szorzás felcserélhetőségére vonatkozó szabályt relációs algebrai optimalizálás esetén! (2 pont)

- Legyen i=1,2 esetén Ai az Ei reláció oszlopainak egy halmaza, valamint legyen
  A=A1&cup;A2
- &Pi;<sub>A</sub>(E1 x E2) ~= &Pi;<sub>A1</sub>(E1) x &Pi;<sub>A2</sub>(E2)

## 76. Adjuk meg a vetítés és egyesítés felcserélhetőségére vonatkozó szabályt relációs algebrai optimalizálás esetén! (2 pont)

- Legyen E1 és E2 relációk sémája megegyező, és legyen A a sémában szereplő oszlopok egy részhalmaza
- &Pi;<sub>A</sub>(E1 &cup; E2) ~= &Pi;<sub>A1</sub>(E1) &cup;
  &Pi;<sub>A2</sub>(E2)

## 77. Mutassunk példát, hogy a kivonás és a vetítés nem felcserélhető! (2 pont)

- &Pi;<sub>A</sub>(E1 - E2) ~= &Pi;<sub>A1</sub>(E1) - &Pi;<sub>A2</sub>(E2)
- E1:

  | A | B |
  | - | - |
  | 0 | 0 |
  | 0 | 1 |

- E2:

  | A | B |
  | - | - |
  | 0 | 0 |

- &Pi;<sub>A</sub>(E1 - E2) =

  | A |
  | - |
  | 0 |

- &Pi;<sub>A1</sub>(E1) - &Pi;<sub>A2</sub>(E2) = &empty;

## 78. Fogalmazzuk meg a relációs algebrai optimalizálás 4 heurisztikus elvét! (4 pont)

- Minél hamarabb szelektáljunk
- Próbáljunk természetes összekapcsolásokat képezni
- Vonjuk össze az egymás utáni unáris műveleteket
- Keressünk közös részkifejezéseket

## 79. Miért érdemes hamarabb szelektálni relációs algebrai optimalizálás esetén? (1 pont)

- Így a részkifejezések várhatóan kisebb relációk lesznek

## 80. Miért érdemes természetes összekapcsolásokat képezni szorzások helyett relációs algebrai optimalizálás esetén? (1 pont)

- Mert az összekapcsolás hatékonyabban kiszámolható, mint a szorzatból történő
  kiválasztás

## 81. Miért érdemes az unáris műveleteket összevonni relációs algebrai optimalizálás esetén? (1 pont)

- Így csökken a műveletek száma, és általában a kiválasztás kisebb relációt
  eredményez, mint a vetítés

## 82. Miért érdemes a közös részkifejezéseket megkeresni relációs algebrai optimalizálás esetén? (1 pont)

- Ezeket így elég csak egyszer kiszámolni a kifejezés kiértékelése során

## 83. A relációs algebrai optimalizálás algoritmusának mi az inputja és mi az outputja? (2 pont)

- INPUT: relációs algebrai kifejezés kifejezésfája
- OUTPUT: optimalizált kifejezésfa optimalizált kiértékelése

## 84. Mi a relációs algebrai optimalizálás algoritmusának 1. lépése (az alkalmazott szabályok felsorolása nélkül)? (2 pont)

- A kiválasztások felbontása

## 85. Mi a relációs algebrai optimalizálás algoritmusának 2. lépése (az alkalmazott szabályok felsorolása nélkül)? (2 pont)

- A kiválasztások minél mélyebbre vitele

## 86. Mi a relációs algebrai optimalizálás algoritmusának 3. lépése (az alkalmazott szabályok felsorolása nélkül)? (2 pont)

- A vetítések minél mélyebbre vitele

## 87. Mi a relációs algebrai optimalizálás algoritmusának 4. lépése (az alkalmazott szabályok felsorolása nélkül)? (2 pont)

- Egymás utáni kiválasztások / vetítések összevonása
- Lehetőleg kiválasztás utáni vetítéssé &Pi;(&sigma;(.))
- Eredmény: optimalizált kifejezésfa

## 88. Mi a relációs algebrai optimalizálás algoritmusának 5. lépése (az alkalmazott szabályok felsorolása nélkül)? (4 pont)

- A gráf bináris műveletek alapján való részgráfokra bontása
- Egy részgráf: egy bináris művelet

## 89. Mi a relációs algebrai optimalizálás algoritmusának 6. lépése (az alkalmazott szabályok felsorolása nélkül)? (2 pont)

- Az előző lépésben kapott részgráfok is fát alkotnak
- Ennek a fának az alulról felfele haladó, tetszőleges sorrendű kiértékelése

## 90. Adjunk meg egy példát, amiben a vetítések bővítése trükköt alkalmazzuk és indokoljuk, hogy mire jó ez! (8 pont)

![90. kérdés, algebrai opt.ppt, 122. dia](./images/90.png)

- A bővítésből kapott vetítéseket mélyebbre tudjuk vinni a fában, mint az eredeti vetítést

## 91. Mennyi az SC(A,R) szelektivitás értéke, ha A kulcs? (1 pont)

- SC(A,R) = 1, ha A kulcs

## 92. Mennyi az SC(A,R) szelektivitás értéke, ha A nem kulcs (a jelölések magyarázatát is adjuk meg)? (1 pont)

- SC(A,R) = N<sub>R</sub> / V(A,R)
  - N<sub>R</sub>: rekordok száma R-ben
  - V(A,R): A attribútum egyedi értékeinek száma R-ben

## 93. Mennyi rendezett táblában a bináris keresés átlagos költsége, ha minden találatot be kell olvasni (a jelölések magyarázatát is adjuk meg)? (3 pont)

- \|log<sub>2</sub> B<sub>R</sub>\| + m
  - m: a többlet beolvasandó lapok száma (additional pages to be read)
  - m = &LeftCeiling;SC(A,R) / F<sub>R</sub>&RightCeiling; - 1 (Felső egészrész)
    - F<sub>R</sub>: blokkolási tényező, rekordok száma egy lapon

## 94. Mennyi B+-fa típusú elsődleges index esetén az átlagos keresési költség, ha minden találatot be kell olvasni (a jelölések magyarázatát is adjuk meg)? (2 pont)

- HT<sub>i</sub> + &LeftCeiling;SC(A,R)/F<sub>R</sub>&RightCeiling;
  - HT<sub>i</sub>: szintek száma I indexben
  - F<sub>R</sub>: blokkolási tényező, rekordok száma egy lapon

## 95. Mennyi B+-fa típusú másodlagos index esetén az átlagos keresési költség, ha minden találatot be kell olvasni (a jelölések magyarázatát is adjuk meg)? (2 pont)

- Kulcs mező: HT<sub>i</sub> + 1
- Nem kulcs mező
  - legrosszabb eset: HT<sub>i</sub> + SC(A,R)
  - a lineáris keresés kedvezőbb, ha sok a megfelelő rekord

## 96. A &sigma;<sub>&theta;<sub>1</sub>&and;&theta;<sub>2</sub>&and;...&and;&theta;<sub>n</sub></sub> lekérdezésnek adjuk meg kétféle kiszámítási módját! (6 pont)

- Konjunkciós lekérdezésnek hívják
- végezzünk egyszerű kiválasztást a legkisebb költségű &theta;<sub>i</sub>-re
  - a fennmaradó &theta; feltételek szerint szűrjük az eredményt
- több index
  - válasszuk ki a &theta;<sub>i</sub>-khez tartozó indexeket
  - keressünk az indexekben és adjuk vissza a RID-ket
  - válasz: RID-k metszete

## 97. A &sigma;<sub>&theta;<sub>1</sub>&or;&theta;<sub>2</sub>&or;...&or;&theta;<sub>n</sub></sub> lekérdezésnek adjuk meg kétféle kiszámítási módját! (3 pont)

- Diszjunkciós lekérdezésnek hívják
- több index
  - RID-k uniója
- lineáris keresés

## 98. Milyen adatbázis műveletekhez kell rendezés? (5 pont)
Az alábbi adatbázis műveletekhez szükséges a rendezés:

**SELECT DISTINCT:** 
- a duplikált értékek kiszűrése érdekében szükséges a rendezés.
  - példa: `SELECT DISTINCT cid FROM takes`

**Projektálás (π):** 
- A duplikált értékek kiszűrése.

**Halmazműveletek:** 
- A duplikált értékek kiszűrése miatt:
  - 𝑅 ∩ 𝑆 (metszet)
  - 𝑅 ∪ 𝑆 (unió)


## 99. Milyen két fajtája van a rendezésnek? (2 pont)

- belső rendezés (ha a rekordok beférnek a memóriába)
- külső rendezés

## 100. Külső összefésülő rendezésnél mire jó a rendező lépés? (1 pont)

- Létrehozza a rendezett futamokat

## 101. Külső összefésülő rendezésnél mire jó az összevonási lépés? (1 pont)

- Összefésüli a rendezett futamokat

## 102. Külső összefésülő rendezésnél mikor kell több menetben végezni az összevonási lépést? (2 pont)

- Ha `N > M`
  - Ahol `N` a futamok száma, `M` a relációból a memóriába olvasott lapok száma
  - Ekkor több menetben végezzük az összevonási lépést
  - Minden menet `M-1` futamot von össze, amíg nincs feldolgozva a reláció
  - A következő menetben a futamok száma kisebb
  - A végső menetben keletkezik a végső kimenet

## 103. Külső összefésülő rendezésnél mennyi a rendező lépés költsége? (2 pont)

- 2 * B<sub>R</sub>
- Ahol B<sub>R</sub> az `R` reláció lapjainak száma

## 104. Külső összefésülő rendezésnél mennyi összevonandó futam van kezdetben? (2 pont)

- Kezdetben &LeftCeiling;B<sub>R</sub> / M&RightCeiling; (felső egészrész) darab összevonandó futam
- Ahol B<sub>R</sub> az `R` reláció lapjainak száma, `M` az `R` relációból a memóriába
  olvasott lapok száma

## 105. Külső összefésülő rendezésnél mennyi az összes menetek száma? (2 pont)

- |log<sub>M-1</sub>(B<sub>R</sub> / M)|
- Ahol B<sub>R</sub> az `R` reláció lapjainak száma, `M` az `R` relációból a memóriába
  olvasott lapok száma

## 106. Külső összefésülő rendezésnél mennyi blokkot olvasunk minden menetben? (2 pont)

- Minden menetben 2 * B<sub>R</sub> lapot olvasunk
- Ahol B<sub>R</sub> az `R` reláció lapjainak száma

## 107. Külső összefésülő rendezésnél mennyi a teljes költség, a végeredmény kiírása nélkül? (4 pont)

- 2 * B<sub>R</sub> + 2 * B<sub>R</sub> * |log<sub>M-1</sub>(B<sub>R</sub> /
  M)| - B<sub>R</sub>
- Ahol B<sub>R</sub> az `R` reláció lapjainak száma, `M` az `R` relációból a
  memóriába olvasott lapok száma

## 108. A vetítés milyen három lépés megvalósításából áll? (3 pont)

- Kezdeti átnézés, rendezés, végső átnézés

## 109. Soroljuk fel az összekapcsolás 5 megvalósítását! (5 pont)

- Skatulyázott ciklusos (_nested loop_) összekapcsolás
- Blokk-skatulyázott ciklusos (_block-nested loop_) összekapcsolás
- Indexelt skatulyázott ciklusos (_index-nested loop_) összekapcsolás
- Összefésüléses rendező (_sort-merge_) összekapcsolás
- Hasításos (_hash_) összekapcsolás

## 110. Skatulyázott (NestedLoop) összekapcsolásnál mennyi a költség legjobb esetben? (3 pont)

- A legjobb eset akkor áll fenn, ha a kisebb reláció elfér a memóriában
- Ezt használjuk belső relációnak
- B<sub>R</sub> + B<sub>S</sub> a költség
- Ahol B<sub>R</sub> és B<sub>S</sub> az `R` és `S` relációk lapjainak száma

## 111. Skatulyázott (NestedLoop) összekapcsolásnál mennyi a költség legrosszabb esetben? (3 pont)

- A legrosszabb eset akkor áll fenn, ha mindkét relációból csak 1-1 lap fér
  bele a memóriába
- S-t minden R-beli rekordnál végig kell olvasni
- N<sub>R</sub> * B<sub>S</sub> + B<sub>R</sub>
  - Ahol N<sub>R</sub> az `R` reláció rekordjainak száma

## 112. Blokk-Skatulyázott (BlockNestedLoop) összekapcsolásnál mennyi a költség legjobb esetben? (3 pont)

- A legjobb eset akkor áll fenn, ha a kisebb reláció elfér a memóriában
- Ezt használjuk belső relációnak
- B<sub>R</sub> + B<sub>S</sub>
  - Ahol B<sub>R</sub> és B<sub>S</sub> az `R` és `S` relációk lapjainak száma

## 113. Blokk-Skatulyázott (BlockNestedLoop) összekapcsolásnál mennyi a költség legrosszabb esetben? (3 pont)

- A legrosszabb eset akkor áll fenn, ha mindkét relációból csak 1-1 lap fér bele a memóriába
- S-t minden R-beli lapnál végig kell olvasni
- B<sub>R</sub> * B<sub>S</sub> + B<sub>R</sub>
  - Ahol B<sub>R</sub> és B<sub>S</sub> az `R` és `S` relációk lapjainak száma

## 114. Indexelt összekapcsolásnál mennyi a költség? (3 pont)

- B<sub>R</sub> + N<sub>R</sub> * c
  - Ahol `c` a belső relációból index szerinti kiválasztás költsége
  - B<sub>R</sub> az `R` reláció lapjainak száma
  - N<sub>R</sub> az `R` reláció rekordjainak száma
- A kevesebb rekordot tartalmazó reláció legyen a külső

## 115. Rendezéses-Összefésüléses összekapcsolásnál mennyi a költség? (3 pont)

- Rendezés költsége + B<sub>S</sub> + B<sub>R</sub>
  - Ahol B<sub>R</sub> és B<sub>S</sub> az `R` és `S` relációk lapjainak száma

## 116. Hasításos összekapcsolásnál mennyi a költség? (3 pont)

- 2 * (B<sub>R</sub> + B<sub>S</sub>) + (B<sub>R</sub> + B<sub>S</sub>)
  - Ahol B<sub>R</sub> és B<sub>S</sub> az `R` és `S` relációk lapjainak száma

## 117. Hasításos összekapcsolásnál mekkora méretű kosarakat képezünk? (2 pont)

- Alkalmazzuk `h1` hasítófüggvényt az összekapcsolási mezőre és felosztjuk a
  rekordokat a memóriában elférő részekre

## 118. Hány sora van a &sigma;<sub>A=v</sub>(R) lekérdezés eredményének? (2 pont)

- `SC(A, R)`
  - Azaz az `A` mező kiválasztási számossága `R`-ben
  - Ha pl. `A` kulcs: `S(A, R) = 1`
  - Ha pl. `A` nem kulcs: S(A, R) = N<sub>R</sub> / V(A, R)

## 119. Hány sora van a &sigma;<sub>A<=v</sub>(R) lekérdezés eredményének? (2 pont)

- N<sub>R</sub> * (v - min(A, R)) / (max(A, R) - min(A, R))

## 120. Hány sora van a &sigma;<sub>&theta;<sub>1</sub> &wedge; &theta;<sub>2</sub> &wedge; … &wedge; … &theta;<sub>n</sub></sub>(R) lekérdezés eredményének? (2 pont)

- Szorzódó valószínűségek
- N<sub>R</sub> * [(S<sub>1</sub> / N<sub>R</sub>) * (S<sub>2</sub> / N<sub>R</sub>) * … * (S<sub>n</sub> / N<sub>R</sub>)]

## 121. Hány sora van a &sigma;<sub>&theta;<sub>1</sub> &vee; &theta;<sub>2</sub> &vee; … &vee; &theta;<sub>n</sub></sub>(R)  lekérdezés eredményének? (2 pont)

- N<sub>R</sub> * (1 - [(1 - S<sub>1</sub> / N<sub>R</sub>) * (1 - S<sub>2</sub> / N<sub>R</sub>) * … * (1 - S<sub>n</sub> / N<sub>R</sub>)])

## 122. Hány sora van az R |X| S lekérdezés eredményének? (2 pont)

- N<sub>R</sub> * N<sub>S</sub>
  - N<sub>R</sub> és N<sub>S</sub> az `R` és `S` relációk rekordjainak száma

## 123. Hány sora van az R |X| S lekérdezés eredményének, ha R &cap; S = ø? (2 pont)

- N<sub>R</sub> * N<sub>S</sub>

## 124. Hány sora van az R |X| S lekérdezés eredményének, ha R &cap; S kulcs R-en? (2 pont)

- A kimenet maximális mérete N<sub>S</sub>

## 125. Hány sora van az R |X| S lekérdezés eredményének, ha R &cap; S idegen kulcs R-hez? (2 pont)

- Ns

## 126. Hány sora van az R |X| S lekérdezés eredményének, ha R &cap; S = {A} sem R-nek, sem S-nek nem kulcsa? (2 pont)

- {A}, sem R-nek, sem S-nek nem kulcsa

## 127. Mi a szabályos zárójelezések számának rekurzív képlete? (2 pont)

nEquivalent to number of ways to parenthesize n-way joins

nRecurrence: T(1) = 1

T(n) = &Sigma; T(i)T(n-i)

T(6) = 42

## 128. Mennyi n tagú Join fa van? (2 pont)

- `T(n)*n!`, ahol `T(n)` az `n` elem szabályos zárójelezéseinek száma

## 129. 5 tagú összekapcsolás sorrendjének legjobb tervét dinamikus programozási elvet alkalmazva hogyan számoljuk ki? (3 pont)

```
nBestPlan(A,B,C,D,E) = min of (
BestPlan(A,B,C,D) |X| E,
BestPlan(A,B,C,E) |X| D,
BestPlan(A,B,D,E) |X| C,
BestPlan(A,C,D,E) |X| B,
BestPlan(B,C,D,E) |X| A )
```

## 130. Több-tagú összekapcsolás suboptimális sorrendjét milyen algoritmussal lehet előállítani, és a tartalmazási hálón milyen irányban halad a kiértékelés? (2 pont)

- Selinger algoritmus, lentről felfele

## 131. A Q(A,B) JOIN R(B,C) JOIN S(C,D) lekérdezésnek melyik három kiértékelését hasonlítottuk össze, és melyik volt a legjobb ezek közül? (4 pont)

1. balról jobbra
2. balról jobbra és a memóriában összekapcsolva a harmadik táblával
3. a középső ténytábla soraihoz kapcsolva a szélső dimenziótáblákat.

- A fentiek közül a 3. volt a leghatékonyabb.

## 132. A Q(A,B) JOIN R(B,C) JOIN S(C,D) lekérdezésnek három kiértékelésénél milyen indexeket tételeztünk fel? (2 pont)

- Feltesszük, hogy `Q`, `R`, `S` paraméterei megegyeznek, `Q.B`-re és `S.C`-re
  klaszterindexünk van.

---

## A további pár kérdésnél használt jelölések:

- `T`: Sorok száma az alsó indexben lévő relációban
- `B`: Az alsó indexben lévő reláció által foglalt tárméret blokkokban
- `I`: Az alsó indexben lévő oszlop képmérete, azaz az oszlop lehetséges
  értékeinek száma

---

## 133. Az R(A,B) JOIN S(B,C) lekérdezés eredményében mennyi a sorok száma? (2 pont)

T<sub>R</sub> |X| S = T<sub>R</sub> * T<sub>S</sub> / I

## 134. Az R(A,B) JOIN S(B,C) lekérdezés eredménye hány blokkból áll? (2 pont)

(T<sub>R</sub>B<sub>S</sub> + T<sub>S</sub>B<sub>R</sub>) / I

## 135. A Q(A,B) JOIN R(B,C) JOIN S(C,D) lekérdezésnek balról jobbra (a) kiértékelésénél milyen költségek összege lesz a teljes költség, és mennyi a teljes költség? (5 pont)

- Az 1. join költsége B + T*B/I plusz
- Az 1. join kiírása (output mérete): 2TB/I plusz
- A 2. join költsége 2TB/I +[(T<sup>2</sup> /I)*B]/I plusz
- A teljes output kiírása: 3T<sup>2</sup> B/I<sup>2</sup>
- (a) végeredménye: B + 5TB/I + 4 T<sup>2</sup> B/I<sup>2</sup>

## 136. A Q(A,B) JOIN R(B,C) JOIN S(C,D) lekérdezésnek balról jobbra (b) kiértékelésénél mennyit lehet megspórolni és mennyi a teljes költség? (5 pont)

- 2 * (2T*B/I)
- (b) végeredménye: B + TB/I + 4 T<sup>2</sup> *B/I<sup>2</sup>

## 137. A Q(A,B) JOIN R(B,C) JOIN S(C,D) lekérdezésnek c) kiértékelésénél (középső ténytáblához indexek alapján kapcsoljuk a dimenziótáblákat) milyen költségek összege lesz a teljes költség, és mennyi a teljes költség? (4 pont)

- Q beolvasása B plusz
- Q és S olvasása R minden sorára: T*(B/I + B/I) plusz
- A teljes output kiírása: 3T<sup>2</sup> B/I<sup>2</sup>

## 138. A Q(A,B) JOIN R(B,C) JOIN S(C,D) lekérdezésnek c) és b) kiértékelésének költségei hogy aránylanak egymáshoz, és milyen feltétel szükséges ehhez? (2 pont)

Ha a c/b arányt tekintjük, akkor azt mondhatjuk, hogy ez az arány ¾-hez tart,
ha T/I tart a végtelenbe. Vagyis ha T/I elég nagy, akkor a c költsége nagyjából
¾-e a b-nek.

## 139. A legjobb átfutás mit optimalizál? (2 pont)

- Legjobb átfutás: minden sort minél hamarabb
- Először számoljon, aztán gyorsan térjen vissza

## 140. A legjobb válaszidő mit optimalizál? (2 pont)

- Legjobb válaszidő: az első sort minél hamarabb
- Számítás közben már térjen vissza (ha lehetséges)

## 141. Adjuk meg a ROWID szerkezetét, és egy példát is rá Oracle esetében! (2 pont)

- ROWID: `<Blokk>.<Sor>.<Fájl>`
- Rowid: 00000006.0000.000X

## 142. Mi az “Explain plan for<SQL-utasítás>” utasítás hatása?  (2 pont)

- Elmenti a tervet (sorforrások + műveletek) a Plan_Table-be

## 143.  Jellemezzük a SELECT *FROM empWHERE rowid= ‘00004F2A.00A2.000C’ utasítást!  (4 pont)

Táblaelérés rowid alapján:

- Egy sor megkeresése
- Azonnal a blokkra megy és kiszűri a sort
- A leggyorsabb módszer egy sor kinyerésére:
- Ha tudjuk a rowid-t
- A `000C` fájlban keresi a `00004F2A` blokkban a `00A2` sort

## 144. Mit jelent a konzisztens állapot és mit jelent a konzisztens adatbázis? (2 pont)

- Konzisztens állapot: kielégíti az összes feltételt (megszorítást)
- Konzisztens adatbázis: konzisztens állapotú adatbázis

## 145. Mit hívunk tranzakciónak és mi jellemző rá? (4 pont)

- Konzisztenciát megtartó adatkezelő műveletek sorozata
- Ezek után mindig feltesszük:
  - Ha `T` tranzakció konzisztens állapotból indul
  - \+ `T` tranzakció csak egyedül futna le
  - => `T`-t konzisztens állapotban hagyja az adatbázis

## 146. Mit jelent a tranzakció atomossági tulajdonsága? (2 pont)

Atomosság (atomicity): a tranzakció „mindent vagy semmit" jellegű végrehajtása
(vagy teljesen végrehajtjuk, vagy egyáltalán nem hajtjuk végre).

## 147. Mit jelent a tranzakció konzisztencia tulajdonsága? (2 pont)

Konzisztencia (consistency): az a feltétel, hogy a tranzakció megőrizze az
adatbázis konzisztenciáját, azaz a tranzakció végrehajtása után is
teljesüljenek az adatbázisban előírt konzisztenciamegszorítások (integritási
megszorítások), azaz az adatelemekre és a közöttük lévő kapcsolatokra vonatkozó
elvárások.

## 148. Mit jelent a tranzakció elkülönítési tulajdonsága? (2 pont)

Elkülönítés (isolation): az a tény, hogy minden tranzakciónak látszólag úgy
kell lefutnia, mintha ez alatt az idő alatt semmilyen másik tranzakciót sem
hajtanánk végre

## 149. Mit jelent a tranzakció tartóssági tulajdonsága? (2 pont)

Tartósság (durability): az a feltétel, hogy ha egyszer egy tranzakció
befejeződött, akkor már soha többé nem veszhet el a tranzakciónak az
adatbázison kifejtett hatása.

## 150. A tranzakció-feldolgozónak milyen három feladata van? (3 pont)

- Naplózás
- Konkurenciavezérlés
- Holtpont feloldása

## 151. A tranzakciók melyik tulajdonságát biztosítja a naplózás? (1 pont)

Annak érdekében, hogy a tartósságot biztosítani lehessen, az adatbázis minden
változását külön feljegyezzük (naplózzuk) lemezen.

## 152. A tranzakciók melyik tulajdonságát biztosítja a konkurenciakezelés? (1 pont)

A tranzakcióknak úgy kell látszódniuk, mintha egymástól függetlenül,
elkülönítve végeznénk el őket.

## 153. Mi az ütemező feladata? (2 pont)

Az ütemező (konkurenciavezérlés-kezelő) feladata, hogy meghatározza az
összetett tranzakciók résztevékenységeinek egy olyan sorrendjét, amely
biztosítja azt, hogy ha ebben a sorrendben hajtjuk végre a tranzakciók elemi
tevékenységeit, akkor az összhatás megegyezik azzal, mintha a tranzakciókat
tulajdonképpen egyenként és egységes egészként hajtottuk volna végre.

## 154. Mitől sérülhet a konzisztencia? (4 pont)

- Tranzakcióhiba
- Adatbázis-kezelési hiba
- Hardverhiba
- Adatmegosztásból származó hiba

## 155. A belső társérülés elleni védekezés milyen két lépésből áll? (4 pont)

1. Felkészülés a hibára: naplózás
2. Hiba után helyreállítás: a napló segítségével egy konzisztens állapot
   helyreállítása

## 156. Mit hívunk adatbáziselemnek? (2 pont)

Az adatbáziselem (database element) a fizikai adatbázisban tártolt adatok
egyfajta funkcionális egysége, amelynek értékét tranzakciókkal lehet elérni
(kiolvasni) vagy módosítani (kiírni).

## 157. A tranzakció és az adatbázis kölcsönhatásának milyen három fontos helyszíne van? (3 pont)

1. az adatbázis elemeit tartalmazó lemezblokkok területe; (D)
2. a pufferkezelő által használt virtuális vagy valós memóriaterület; (M)
3. a tranzakció memóriaterülete. (M)

## 158. Mit jelent az INPUT(X) művelet? (2 pont)

INPUT(X): Az X adatbáziselemet tartalmazó lemezblokk másolása a memóriapufferbe

## 159. Mit jelent a READ(X,t) művelet? (4 pont)

READ(X,t): Az X adatbáziselem bemásolása a tranzakció t lokális változójába.
Részletesebben: ha az X adatbáziselemet tartalmazó blokk nincs a
memóriapufferben, akkor előbb végrehajtódik INPUT(X). Ezután kapja meg a t
lokális változó X értékét.

## 160. Mit jelent a Write(X,t) művelet? (4 pont)

WRITE(X,t): A t lokális változó tartalma az X adatbáziselem memóriapufferbeli
tartalmába másolódik. Részletesebben: ha az X adatbáziselemet tartalmazó blokk
nincs a memóriapufferben, akkor előbb végrehajtódik INPUT(X). Ezután másolódik
át a t lokális változó értéke a pufferbeli X-be.

## 161. Mit jelent az Output(X) művelet? (2 pont)

OUTPUT(X): Az X adatbáziselemet tartalmazó puffer kimásolása lemezre.

## 162. Adjuk meg az Undo naplózás U1 és U2 szabályát! (4 pont)

- U1. -->Ha a T tranzakció módosítja az X adatbáziselemet, akkor a (T, X, régi
  érték) naplóbejegyzést azelőtt kell a lemezre írni, mielőtt az X új értékét a
  lemezre írná a rendszer.
- U2. --> Ha a tranzakció hibamentesen befejeződött, akkor a COMMIT
  naplóbejegyzést csak azután szabad a lemezre írni, ha a tranzakció által
  módosított összes adatbáziselem már a lemezre íródott, de ezután rögtön.

## 163. Adjunk meg egy példát Undo naplózás esetén a lemezre írás sorrendjére! (6 pont)

| Lépés | Tevékenység | t | M-A | M-B | D-A | D-B | Napló |
| - | - | - | - | - | - | - | - |
| 1 | | | | | | | <T,START> |
| 2 | READ(A,t) | 8 | 8 | | 8 | 8 | |
| 3 | t := t*2 | 16 | 8 | | 8 | 8 | |
| 4 | WRITE(A,t) | 16 | 16 | | 8 | 8 | <T,A,8> |
| 5 | READ(B,t) | 8 | 16 | 8 | 8 | 8 | |
| 6 | t := t*2 | 16 | 16 | 8 | 8 | 8 | |
| 7 | WRITE(B,t) | 16 | 16 | 16 | 8 | 8 | <T,B,8> |
| 8 | FLUSH LOG | | | | | | |
| 9 | OUTPUT(A) | 16 | 16 | 16 | 16 | 8 | |
| 10 | OUTPUT(B) | 16 | 16 | 16 | 16 | 16 | |
| 11 | | | | | | | <T,COMMIT> |
| 12 | FLUSH LOG | | | | | | |

## 164. Adjuk meg Undo naplózás esetén a helyreállítás algoritmusát! (8 pont)

 - Let S = set of transactions with	
  <Ti, start> in log, but no
  <Ti, commit> (or <Ti, abort>) record in log
- For each <Ti, X, v> in log,
    in reverse order (latest -> earliest) do:
    - if Ti &in; S then
      - write(X, v)
      - output(X)
- For each Ti &in; S do
    - write <Ti, abort> to log
- Flush log

Saját szavakkal: A naplóban visszafelé haladva minden T<sub>i</sub>
tranzakciónál, amihez tartozik `<Ti, start>` naplóbejegyzés, de nem tartozik
`<Ti, commit>` vagy `<Ti, abort>`, `Write(X, v)`, majd `Output(X)` műveletekkel
visszaírjuk az adott X adatelemre a napló szerinti régi értékét. Miután
visszaérünk minden megszakadt T<sub>i</sub> tranzakciónál a `<Ti, start>`
bejegyzéshez, `<Ti, abort>`-ot írunk a naplóba, aztán `Flush log`-gal lemezre
írunk, és ürítjük a naplót.

## 165. Adjunk meg a működés közbeni ellenőrzőpont képzésének lépéseit Undo naplózás esetén! (6 pont)

1. <START CKPT(T1,...,Tk)> naplóbejegyzés készítése, majd lemezre írása (FLUSH
   LOG), ahol T1,...,Tk az éppen aktív tranzakciók nevei.
2. Meg kell várni a T1,...,Tk tranzakciók mindegyikének normális vagy
   abnormális befejeződését, nem tiltva közben újabb tranzakciók indítását.
3. Ha a T1,...,Tk tranzakciók mindegyike befejeződött, akkor `<END CKPT>`
   naplóbejegyzés elkészítése, majd lemezre írása (FLUSH LOG).

## 166. Ha UNDO naplózás utáni helyreállításkor előbb `<ENDCKPT>` naplóbejegyzéssel találkozunk, akkor meddig kell visszamenni a napló olvasásában? (2 pont)

Ha előbb az `<END CKPT>` naplóbejegyzéssel találkozunk, akkor tudjuk, hogy az
összes még be nem fejezett tranzakcióra vonatkozó naplóbejegyzést a
legközelebbi korábbi `<START CKPT(T1,...,Tk)>` naplóbejegyzésig megtaláljuk. Ott
viszont megállhatunk, az annál korábbiakat akár el is dobhatjuk.

## 167. Ha UNDO naplózás utáni helyreállításkor előbb `<STARTCKPT(T1,…,Tk)>` naplóbejegyzéssel találkozunk, akkor meddig kell visszamenni a napló olvasásában? (2 pont)

- Ha a `<START CKPT(T1,...,Tk)>` naplóbejegyzéssel találkozunk előbb, az azt
  jelenti, hogy a katasztrófa az ellenőrzőpont-képzés közben fordult elő, ezért
  a `T1, ..., Tk` tranzakciók nem fejeződtek be a hiba fellépéséig.
- Ekkor a be nem fejezett tranzakciók közül a legkorábban (t) kezdődött
  tranzakció indulásáig kell a naplóban visszakeresnünk, annál korábbra nem.

## 168. Adjuk meg a REDO naplózás esetén a lemezre írás sorrendjét 5 lépésben! (5 pont)

1. Ha egy T tranzakció v-re módosítja egy X adatbáziselem értékét, akkor egy
   <T,X,v> bejegyzést kell a naplóba írni.
2. Az adatbáziselemek módosítását leíró naplóbejegyzések lemezre írása.
3. A COMMIT naplóbejegyzés lemezre írása. (2. és 3. egy lépésben történik.)
4. Az adatbáziselemek értékének cseréje a lemezen.
5. A <T,end>-t bejegyezzük a naplóba, majd kiírjuk lemezre a naplót.

## 169. Adjuk meg a REDO naplózás esetén az R1 szabályt! (2 pont)

R1. Mielőtt az adatbázis bármely X elemét a lemezen módosítanánk, az X
módosítására vonatkozó összes naplóbejegyzésnek, azaz <T,X,v>-nek és <T,
COMMIT>-nak a lemezre kell kerülnie.

## 170. Adjunk meg egy példát REDO naplózás esetén a lemezre írás sorrendjére! (6 pont)

| Lépés | Tevékenység | t | M-A | M-B | D-A | D-B | Napló |
| - | - | - | - | - | - | - | - |
| 1 | | | | | | | <T,START> |
| 2 | READ(A,t) | 8 | 8 | | 8 | 8 | |
| 3 | t := t*2 | 16 | 8 | | 8 | 8 | |
| 4 | WRITE(A,t) | 16 | 16 | | 8 | 8 | <T,A,16> |
| 5 | READ(B,t) | 8 | 16 | 8 | 8 | 8 | |
| 6 | t := t*2 | 16 | 16 | 8 | 8 | 8 | |
| 7 | WRITE(B,t) | 16 | 16 | 16 | 8 | 8 | <T,B,16> |
| 8 | | | | | | | <T,COMMIT> |
| 9 | FLUSH LOG | | | | | | |
| 10 | OUTPUT(A) | 16 | 16 | 16 | 16 | 8 | |
| 11 | OUTPUT(B) | 16 | 16 | 16 | 16 | 16 | |
| 12 | | | | | | | <T,END> |
| 13 | FLUSH LOG | | | | | | |

## 171. Adjunk meg REDO naplózás esetén a helyreállítás algoritmusát! (8 pont)

- Let S = set of transactions with <Ti, commit> (and no <Ti, end>) in log
- For each <Ti, X, v> in log, in forward
     order (earliest -> latest) do:
    - if Ti &in; S then
      - write(X, v)
      - output(X)
- For each Ti &in; S, write <Ti, end>

Saját szavakkal: minden tranzakciót, melyhez tartozik `<Ti, commit>`
naplóbejegyzés, de nem tartozik `<Ti, end>`, begyűjtjük egy halmazba. Ezen a
halmazon végigiterálva a régebbi bejegyzésektől az újabbakig minden, az adott
T<sub>i</sub> tranzakcióhoz tartozó `<Ti, X, v>` naplóbejegyzésre `Write(X, v)`
majd `Output(X)` műveletekkel még egyszer elvégezzük a módosításokat. Zárásképp
minden, a halmzaban lévő T<sub>i</sub> tranzakcióra `<Ti, end>` bejegyzést
írunk a naplóba, majd `Flush log`.

## 172. Mi jellemző a módosított REDO naplózásra? (8 pont)

Nem használunk `<Ti, end>` bejegyzést a befejezett tranzakciókra, helyette a be
nem fejezetteket jelöljük meg `<Ti, abort>`-tal. (Módosított REDO napló)

## 173. Fogalmazzunk meg 3 különbséget az UNDO és REDO naplózás esetén! (3 pont)

- Redo: Az adat változás utáni értékét jegyezzük fel a naplóba
  - Undo: A változás előttit
- Máshová rakjuk a COMMIT-ot
  - Undo: Output műveletek (kiírás) előtt
    - Megtelhet a puffer
  - Redo: Output műveletek után
- Az UNDO protokoll esetleg túl gyakran akar írni => itt el lehet halasztani az
  írást

## 174. Mit hívunk piszkos puffereknek? (1 pont)

Dirty buffers: melyekben már végrehajtott, de lemezre még ki nem írt
módosításokat tárol.

## 175. Adjuk meg a működés közbeni ellenőrzőpont képzésének lépéseit REDO naplózás esetén! (6 pont)

1. <START CKPT(T1,…,Tk)> naplóbejegyzés elkészítése és lemezre írása, ahol
   T1,…,Tk az összes éppen aktív tranzakció.
2. Az összes olyan adatbáziselem kiírása lemezre, melyeket olyan tranzakciók
   írtak pufferekbe, melyek a START CKPT naplóba írásakor már befejeződtek, de
   puffereik lemezre még nem kerültek.
3. <END CKPT> bejegyzés naplóba írása, és a napló lemezre írása

## 176. Adjuk meg az UNDO/REDO naplózás esetén az UR1 szabályt! (2 pont)

- UR1: Mielőtt az adatbázis bármely X elemének értékét - valamely T tranzakció
  által végzett módosítás miatt - a lemezen módosítanánk, ezt megelőzően a
  <T,X,v,w> naplóbejegyzésnek lemezre kell kerülnie.

## 177. Adjuk meg az UNDO/REDO naplózás esetén a WAL elvet! (2 pont)

- WAL – _Write After Log_ elv: előbb naplózunk, utána módosítunk

## 178. Hová kerülhet a COMMIT az UNDO/REDO naplózás esetén? (2 pont)

NAGYOBB SZABADSÁG: A <T, COMMIT> bejegyzés megelőzheti, de követheti is az
adatbáziselemek lemezen történő bármilyen megváltoztatását

## 179. Adjunk meg egy példát UNDO/REDO naplózás esetén a lemezre írás sorrendjére! (6 pont)

| Lépés | Tevékenység | t | M-A | M-B | D-A | D-B | Napló |
| - | - | - | - | - | - | - | - |
| 1 | | | | | | | <T,START> |
| 2 | READ(A,t) | 8 | 8 | | 8 | 8 | |
| 3 | t := t*2 | 16 | 8 | | 8 | 8 | |
| 4 | WRITE(A,t) | 16 | 16 | | 8 | 8 | <T,A,8,16> |
| 5 | READ(B,t) | 8 | 16 | 8 | 8 | 8 | |
| 6 | t := t*2 | 16 | 16 | 8 | 8 | 8 | |
| 7 | WRITE(B,t) | 16 | 16 | 16 | 8 | 8 | <T,B,8,16> |
| 8 | FLUSH LOG | | | | | | |
| 9 | OUTPUT(A) | 16 | 16 | 16 | 16 | 8 | |
| 10 | | | | | | | <T,COMMIT> |
| 11 | OUTPUT(B) | 16 | 16 | 16 | 16 | 16 | |

- A <T,COMMIT> naplóbejegyzés kiírása kerülhetett volna a 9. lépés elé vagy a 11. lépés mögé is

## 180. Mi az UNDO/REDO naplózás esetén a helyreállítás 2 alapelve? (4 pont)

1. (REDO): A legkorábbitól kezdve állítsuk helyre minden befejezett tranzakció
   hatását.
2. (UNDO): A legutolsótól kezdve tegyük semmissé minden be nem fejezett
   tranzakció tevékenységeit.

## 181. Mi lehet probléma az UNDO/REDO naplózás esetén? (2 pont)

Probléma (befejezett változtatást is megsemmisítünk): Az UNDO naplózáshoz
hasonlóan most is előfordulhat, hogy a tranzakció a felhasználó számára
korrekten befejezettnek tűnik, de még a <T,COMMIT> naplóbejegyzés lemezre
kerülése előtt fellépett hiba utáni helyreállítás során a rendszer a tranzakció
hatásait semmissé teszi ahelyett, hogy helyreállította volna.

## 182. Adjuk meg az UR2 szabályt az UNDO/REDO naplózás esetén? (2 pont)

- UR2: A <T,COMMIT> naplóbejegyzést nyomban lemezre kell írni, amint megjelenik
  a naplóban.


## 183. Adjunk meg a működés közbeni ellenőrzőpont képzésének lépéseit UNDO/REDO naplózás esetén! (6 pont)

1. Írjunk a naplóba `<START CKPT(T1,...,Tk)>` naplóbejegyzést, ahol `T1,...,Tk` az
   aktív tranzakciók, majd írjuk a naplót lemezre.
2. Írjuk lemezre az összes piszkos puffert, tehát azokat, melyek egy vagy több
   módosított adatbáziselemet tartalmaznak. A helyrehozó naplózástól eltérően
   itt az összes piszkos puffert lemezre írjuk, nem csak a már befejezett
   tranzakciók által módosítottakat.
3. Írjunk `<END CKPT>` naplóbejegyzést a naplóba, majd írjuk a naplót lemezre

## 184. Adjunk meg a működés közbeni mentés 5 lépését! (5 pont)

1. A <START DUMP> bejegyzés naplóba írása.
2. A REDO vag UNDO/REDO naplózási módnak megfelelő ellenőrzőpont kialakítása.
3. Az adatlemez(ek) teljes vagy növekményes mentése.
4. A napló mentése. A mentett naplórész tartalmazza legalább a 2. pontbeli
   ellenőrzőpont-képzés közben keletkezett naplóbejegyzéseket, melyeknek túl
   kell élniük az adatbázist hordozó eszköz meghibásodását.
5. <END DUMP> bejegyzés naplóba írása.

## 185. Az Oracle milyen naplózást valósít meg? (2 pont)

Az Oracle az UNDO és a REDO naplózás egy speciális keverékét valósítja meg.

## 186. Az Oracle mit használ UNDO naplózás céljára? (3 pont)

A tranzakciók hatásainak semmissé tételéhez szükséges információkat a rollback
szegmensek tartalmazzák. Minden adatbázisban van egy vagy több rollback
szegmens, amely a tranzakciók által módosított adatok régi értékeit tárolja
attól függetlenül, hogy ezek a módosítások lemezre íródtak vagy sem. A rollback
szegmenseket használjuk az olvasási konzisztencia biztosítására, a tranzakciók
visszagörgetésére és az adatbázis helyreállítására is.

## 187. Az Oracle mit használ REDO naplózás céljára? (2 pont)

A helyreállítás a napló (redo log) alapján történik. A napló olyan állományok
halmaza, amelyek az adatbázis változásait tartalmazzák, akár lemezre kerültek,
akár nem. Két részből áll: az online és az archivált naplóból

## 188. Mit tartalmaz az Oracle rollback szegmense? (4 pont)

A rollback szegmens rollback bejegyzésekből áll. Egy rollback bejegyzés többek
között a megváltozott blokk azonosítóját (fájlsorszám és a fájlon belüli
blokkazonosító) és a blokk régi értékét tárolja. A rollback bejegyzés mindig
előbb kerül a rollback szegmensbe, mint ahogy az adatbázisban megtörténik a
módosítás. Az ugyanazon tranzakcióhoz tartozó bejegyzések össze vannak
láncolva, így könnyen visszakereshetők, ha az adott tranzakciót vissza kell
görgetni.

## 189. Milyen problémát kell megoldania a konkurrencia-vezérlésnek? (4 pont)

A tranzakciók közötti egymásra hatás az adatbázis-állapot inkonzisztenssé
válását okozhatja, még akkor is, amikor a tranzakciók külön-külön megőrzik a
konzisztenciát, és rendszerhiba sem történt.

## 190. Mit hívunk ütemezőnek? (2 pont)

- A tranzakciós lépések szabályozásának feladatát az adatbázis-kezelő rendszer
  ütemező (scheduler) része végzi.

## 191. Mit hívunk ütemezésnek? (2 pont)

- Az ütemezés (schedule) egy vagy több tranzakció által végrehajtott lényeges
  műveletek időrendben vett sorozata, amelyben az egy tranzakcióhoz tartozó
  műveletek sorrendje megegyezik a tranzakcióban megadott sorrenddel.


## 192. Milyen 2 módon biztosítja az ütemező a sorbarendezhetőséget? (2 pont)

Várakoztat, abortot rendel el, hogy a sorbarendezhetőséget biztosítsa.

## 193. Mit hívunk konfliktuspárnak? (2 pont)

- A konfliktus (conflict) vagy konfliktuspár olyan egymást követő műveletpár az
  ütemezésben, amelynek ha a sorrendjét felcseréljük, akkor legalább az egyik
  tranzakció viselkedése megváltozhat.

## 194. Milyen 3 esetben nem cserélhetjük fel a műveletek sorrendjét, mert inkonzisztenciát okozhatna? (3 pont)

1. r<sub>i</sub>(X); w<sub>i</sub>(Y) konfliktus,
2. w<sub>i</sub>(X); w<sub>j</sub>(X) konfliktus,
3. r<sub>i</sub>(X); w<sub>j</sub>(X) és w<sub>i</sub>(X); r<sub>j</sub>(X) is konfliktus

## 195. Mikor konfliktus-ekvivalens 2 ütemezés? (2 pont)

Azt mondjuk, hogy két ütemezés konfliktusekvivalens (conflict-equivalent), ha
szomszédos műveletek nem konfliktusos cseréinek sorozatával az egyiket
átalakíthatjuk a másikká.

## 196. Mikor konfliktus-sorbarendezhető egy ütemezés? (2 pont)

Azt mondjuk, hogy egy ütemezés konfliktus-sorbarendezhető
(conflict-serializable schedule), ha konfliktusekvivalens valamely soros
ütemezéssel

## 197. Mi a konfliktus-sorbarendezhetőség elve? (3 pont)

Nem konfliktusos cserékkel az ütemezést megpróbáljuk soros ütemezéssé
átalakítani. Ha ezt meg tudjuk tenni, akkor az eredeti ütemezés sorbarendezhető
volt, ugyanis az adatbázis állapotára való hatása változatlan marad minden nem
konfliktusos cserével.

## 198. Mi a kapcsolat a sorbarendezhetőség és a konfliktus-sorbarendezhetőség között? (2 pont)

- Azt mondjuk, hogy egy ütemezés konfliktus-sorbarendezhető
  (conflict-serializable schedule), ha konfliktusekvivalens valamely soros
  ütemezéssel.
- A konfliktus-sorbarendezhetőség elégséges feltétel a sorbarendezhetőségre,
  vagyis egy konfliktus-sorbarendezhető ütemezés sorbarendezhető ütemezés is
  egyben.

## 199. Az `r1(A); w1(A); r2(A); w2(A); r1(B); w1(B); r2(B); w2(B);` ütemezést alakítsuk soros ütemezéssé (5 pont)

1. `r1(A); w1(A); r2(A); w2(A); r1(B); w1(B); r2(B); w2(B);`
2. `r1(A); w1(A); r2(A); r1(B); w2(A); w1(B); r2(B); w2(B);`
3. `r1(A); w1(A); r1(B); r2(A); w2(A); w1(B); r2(B); w2(B);`
4. `r1(A); w1(A); r1(B); r2(A); w1(B); w2(A); r2(B); w2(B);`
5. `r1(A); w1(A); r1(B); w1(B); r2(A); w2(A); r2(B); w2(B);`

## 200. Adjunk példát sorbarendezhető, de nem konfliktus-sorbarendezhető ütemezésre (4 pont)
`S2: w1(Y); w2(Y); w2(X); w1(X); w3(X);`

## 201. Mi a konfliktus-sorbarendezhetőség tesztelésének alapötlete? (2 pont)

Ha valahol konfliktusban álló műveletek szerepelnek S-ben, akkor az ezeket a
műveleteket végrehajtó tranzakcióknak ugyanabban a sorrendben kell
előfordulniuk a konfliktus-ekvivalens soros ütemezésekben, mint ahogyan az
S-ben voltak.

## 202. Mikor mondjuk, hogy egy S ütemezés alapján T<sub>1</sub> megelőzi T<sub>2</sub>-t? (5 pont)

Adott a T<sub>1</sub> és T<sub>2</sub>, esetleg további tranzakcióknak egy S ütemezése. Azt mondjuk,
hogy T<sub>1</sub> megelőzi T<sub>2</sub>‑t, ha van a T<sub>1</sub>-ben olyan A<sub>1</sub> művelet és a T<sub>2</sub>-ben olyan A<sub>2</sub>
művelet, hogy:

1. A<sub>1</sub> megelőzi A<sub>2</sub>-t S-ben,
2. A<sub>1</sub> és A<sub>2</sub> ugyanarra az adatbáziselemre vonatkoznak, és
3. A<sub>1</sub> és A<sub>2</sub> közül legalább az egyik írás művelet.

## 203. Adjuk meg egy S ütemezéshez tartozó megelőzési gráf definícióját! (5 pont)

Ezeket a megelőzéseket a megelőzési gráfban (precedence graph) összegezhetjük.
A megelőzési gráf csúcsai az S ütemezés tranzakciói. Ha a tranzakciókat Ti-vel
jelöljük, akkor a Ti-nek megfelelő csúcsot az i egész jelöli. Az i csúcsból a j
csúcsba akkor vezet irányított él, ha Ti <s Tj.

## 204. Milyen kapcsolat van a konfliktus-ekvivalencia és a megelőzési gráfok között? (4 pont)

- S1, S2 konfliktusekvivalens => gráf(S1)=gráf(S2)
- gráf(S1) = gráf(S2) =/=> S1, S2 konfliktusekvivalens

## 205. Adjunk példát arra, hogy két ütemezés megelőzési gráfja megegyezik, de nem konfliktus-ekvivalensek!(4 pont)

- `S1=w1(A) r2(A) w2(B) r1(B)`
- `S2=r2(A) w1(A) r1(B) w2(B)`
- Nem lehet semmit sem cserélni!

## 206. Mit hívunk egy irányított, körmentes gráf esetében a csúcsok topologikus sorrendjének? (4 pont)

Egy körmentes gráf csúcsainak topologikus sorrendje a csúcsok bármely olyan
rendezése, amelyben minden a -> b élre az a csúcs megelőzi a b csúcsot a
topologikus rendezésben.

## 207. Hogyan lehet tesztelni a megelőzési gráf alapján egy ütemezés konfliktus-sorbarendezhetőségét? (4 pont)

Ha az S megelőzési gráf tartalmaz irányított kört, akkor S nem
konfliktus-sorbarendezhető, ha nem tartalmaz irányított kört, akkor S
konfliktus-sorbarendezhető, és a csúcsok bármelyik topologikus sorrendje
megadja a konfliktusekvivalens soros sorrendet.

## 208. Mi jellemző a passzív ütemezésre? (4 pont)

- Hagyjuk a rendszert működni,
- Az ütemezésnek megfelelő gráfot tároljuk,
- Egy idő után megnézzük, hogy van-e benne kör,
- És ha nincs, akkor szerencsénk volt, jó volt az ütemezés.

## 209. Mi jellemző az aktív ütemezésre és milyen 3 módszert lehet erre használni? (5 pont)

Aktív módszer: az ütemező beavatkozik, és megakadályozza, hogy kör alakuljon ki

1. Zárak (ezen belül is még: protokoll elemek, pl. 2PL)
2. Időbélyegek (time stamp)
3. Érvényesítés

## 210. Mit hívunk a tranzakciók konzisztenciájának zárolási ütemező esetén? (2 pont)

1. A tranzakció csak akkor olvashat vagy írhat egy elemet, ha már korábban
   zárolta azt, és még nem oldotta fel a zárat.
2. Ha egy tranzakció zárol egy elemet, akkor később azt fel kell szabadítania.

## 211. Mit hívunk a zárolási ütemező jogszerűségének? (1 pont)

1. Nem zárolhatja két tranzakció ugyanazt az elemet, csak úgy, ha az egyik
   előbb már feloldotta a zárat.

## 212. Adjunk példát konzisztens tranzakciók jogszerű ütemezésére, ami mégsem sorbarendezhető! (6 pont)

| T1 | T2 | A | B |
| - | - | - | - |
| l1(A); r1(A); | | 25 | |
| A := A+100; | | | |
| w1(A); u1(A); | | 125 | |
| | l2(A); r2(A); | 125 | |
| | A := A*2; | | |
| | w2(A); u2(A); | 250 | |
| | l2(B); r2(B); | | 25 |
| | B := B*2; | | |
| | w2(B); u2(B); | | 50 |
| l1(B); r1(B); | | | 50 |
| B := B+100; | | | |
| w1(B); u1(B); | | | 150 |

## 213. Mit hívunk kétfázisú zárolásnak és szemléltessük rajzban is? (2 pont)

![213. kérdés, konkurencia.ppt, 39. dia](./images/213.png)

## 214. Adjunk a tranzakciókra 2, az ütemezésre 1 feltételt, ami elegendő a konfliktus-sorbarendezhetőség bizonyítására! Milyen módon bizonyítható a tétel? (5 pont)

- Tétel: Konzisztens, kétfázisú zárolású tranzakciók bármely S jogszerű
  ütemezését át lehet alakítani konfliktusekvivalens soros ütemezéssé.
- Bizonyítás: S-ben részt vevő tranzakciók száma (n) szerinti indukcióval.

## 215. Mi a várakozási gráf és hogyan segít a holtpont felismerésében? (4 pont)

A felismerésben segít a zárkérések sorozatához tartozó várakozási gráf: csúcsai
a tranzakciók és akkor van él T<sub>i</sub>-ből T<sub>j</sub>-be, ha T<sub>i</sub> vár egy olyan zár
elengedésére, amit T<sub>j</sub> tart éppen.

Ha ebben a gráfban irányított kör van,
akkor kialakult egy holtpont.

## 216. Milyen két lehetőséggel védekezhetünk a holtpont ellen? (4 pont)

1. Minden egyes tranzakció előre elkéri az összes zárat, ami neki kelleni fog.
   Ha nem kapja meg az összeset, akkor egyet se kér el, el se indul.
2. Feltesszük, hogy van egy sorrend az adategységeken és minden egyes
   tranzakció csak eszerint a sorrend szerint növekvően kérhet újabb zárakat.
   Itt lehet, hogy lesz várakozás, de holtpont biztos nem lesz

## 217. Mi a kiéheztetés problémája és milyen megoldás van rá? (2 pont)

- Tegyük fel, hogy T1,..., Tn irányított kört alkot, ahol Ti vár Ti+1-re az Ai adatelem miatt. 
  Ha mindegyik tranzakció betartotta, hogy egyre nagyobb indexű adatelemre kért zárat,
  akkor A1 < A2 < A3 < An < A1 áll fenn, ami ellentmondás.
  Tehát ez a protokoll is megelőzi a holtpontot, de itt is előre kell tudni, hogy milyen zárakat fog kérni egy tranzakció.

- Még egy módszer, ami szintén optimista, mint az első:
  Időkorlát alkalmazása: ha egy tranzakció kezdete óta túl sok idő telt el, akkor ABORT-áljuk.
  Ehhez az kell, hogy ezt az időkorlátot jól tudjuk megválasztani.


## 218. Osztott és kizárólagos zárak esetén mit hívunk a tranzakció konzisztenciájának? (2 pont)

Tranzakciók konzisztenciája: Nem írhatunk kizárólagos zár fenntartása nélkül,
és nem olvashatunk valamilyen zár fenntartása nélkül.

## 219. Osztott és kizárólagos zárak esetén mit hívunk az ütemezés jogszerűségének? (2 pont)

Egy elemet vagy egyetlen tranzakció zárol kizárólagosan, vagy több is
zárolhatja osztottan, de a kettő egyszerre nem lehet.

## 220. Osztott és kizárólagos zárak esetén adjunk meg feltételeket az ütemezés konfliktus-sorbarendezhetőségére? (4 pont)

Konzisztens 2PL tranzakciók jogszerű ütemezése konfliktus-sorbarendezhető.

## 221. Osztott és kizárólagos zárak esetén adjuk meg a kompatibilitási mátrixot! (4 pont)

![221. kérdés, konkurencia.ppt, 62. dia](./images/221.png)

## 222. Többmódú zárak kompatibilitási mátrixa segítségével hogyan definiáljuk a megelőzési gráfot? (5 pont)

- A megelőzési gráf csúcsai a tranzakciók és akkor van él T<sub>i</sub>-ből T<sub>j</sub>-be, ha van
  olyan A adategység, amelyre az ütemezés során Z<sub>k</sub> zárat kért és kapott T<sub>i</sub>,
  ezt elengedte, majd:
- Ezután A-ra legközelebb T<sub>j</sub> kért és kapott olyan Z<sub>l</sub> zárat, hogy a mátrixban a
  Z<sub>k</sub> sor Z<sub>l</sub> oszlopában _NEM_ áll.

## 223. Többmódú zárak esetén a megelőzési gráf segítségével hogy lehet eldönteni a sorbarendezhetőséget? (3 pont)

Egy csak zárkéréseket és zárelengedéseket tartalmazó jogszerű ütemezés
sorbarendezhető akkor és csak akkor, ha a kompatibilitási mátrix alapján
felrajzolt megelőzési gráf nem tartalmaz irányított kört.

## 224. Adjunk példát arra, hogy egy zárolási ütemező elutasít sorbarendezhető ütemezést? (4 pont)

- l1(A); r1(A); u1(A); l2(A); r2(A); u2(A); l1(A); w1(A); u1(A); l2(B); r2(B); u2(B)
- Ha megnézzük az írás/olvasás műveleteket (r1(A); r2(A); w1(A); r2(B)), akkor látszik, hogy az ütemezés hatása azonos a T2T1 soros ütemezés hatásával, vagyis ez egy
  sorbarendezhető ütemezés zárak nélkül
- Zárakra vonatkozó megelőzési gráf:

![224. kérdés, konkurencia.ppt, 65. dia](./images/224.png)

- Mivel tartalmaz irányított kört a megelőzési gráf, ezért elvetné az ütemező
  - Nem lesz sorbarendezhető az az ütemezés, amiben már csak a zárak vannak benne

## 225. Adjunk feltételt az ütemezés sorbarendezhetőségére tetszőleges zármodellben! (4 pont)

Ha valamilyen zármodellben egy jogszerű ütemezésben minden tranzakció követi a
2PL-t, akkor az ütemezéshez tartozó megelőzési gráf nem tartalmaz irányított
kört, azaz az ütemezés sorbarendezhető.

## 226. Mikor mondjuk, hogy egyik zár erősebb a másiknál? (4 pont)

L2 erősebb L1-nél, ha a kompatibilitási mátrixban L2 sorában/oszlopában minden
olyan pozícióban „NEM" áll, amelyben L1 sorában/oszlopában „NEM" áll.

## 227. Adjuk meg a módosítási zár kompatibilitási mátrixát és értelmezzük röviden!(4 pont)
||S|X|U|
|:--:|:--:|:--:|:--:|
|S|igen|nem|igen|
|X|nem|nem|nem|
|U|nem|nem|nem|

- Az U módosítási zár úgy néz ki, mintha osztott zár lenne, amikor kérjük, és úgy néz ki, mintha kizárólagos zár lenne, amikor már megvan. 

## 228. Mi az inci(X) művelet és adjuk meg a növelési zár kompatibilitási mátrixát! (4 pont)

Az inci(X) művelet:

- A Ti tranzakció megnöveli az X adatbáziselemet valamely konstanssal.
  (Annak, hogy pontosan mennyi ez a konstans, nincs jelentősége.)

||S|X|I|
|:--:|:--:|:--:|:--:|
|S|igen|nem|nem|
|X|nem|nem|nem|
|I|nem|nem|igen|

## 229. Adjunk meg a zártábla egy lehetséges formáját, a mezők tartalmát magyarázzuk is el! (8 pont)

![229. kérdés, konkurencia.ppt, 83. dia](./images/229.png)

A várakozási bit (waiting bit) azt adja meg, hogy van‑e legalább egy
tranzakció, amely az A zárolására várakozik.

Az összes olyan tranzakciót leíró lista, amelyek vagy jelenleg zárolják A‑t,
vagy A zárolására várakoznak. 

## 230. A zárfeloldások sorrendje milyen elvek alapján történhet? (3 pont)

- Első beérkezett első kiszolgálása
- Elsőbbségadás az osztott záraknak
- Elsőbbségadás a felminősítésnek

## 231. Hierarchikus adatok esetén mi a figyelmeztető zárak használatának három alapelve? (3 pont)

- A kért zárnak megfelelő figyelmeztető zárakat kérünk az útvonal mentén a
  gyökérből kiindulva az adatelemig.
- Addig nem megyünk lejjebb, amíg a figyelmeztető zárat meg nem kapjuk.
- Így a konfliktusos helyzetek alsóbb szintekre kerülnek a fában.

## 232. Hierarchikus adatok esetén adjuk meg az osztott, kizárólagos és figyelmeztető zárakra vonatkozó kompatibilitási mátrixot? (5 pont)

- `IS < IX` és `S < X`, de `IX` és `S` nem összehasonlítható (< csak parciális
  rendezés).
- A csoportos mód használatához vezessünk be egy `SIX` új zárat, (ami azt
  jelenti, hogy ugyanaz a tranzakció `S` és `IX` zárat is tett egy adatelemre).
  Ekkor `SIX` mindkettőnél erősebb, de ez a legkisebb ilyen.

## 233. Hierarchikus adatok esetén miért vezetjük be az SIX zártípust és mi jellemző rá? (4 pont)

![233. kérdés, konkurencia.ppt, 100. dia](./images/232-233.png)

Ez a dia érvényes az előző (232.) kérdésre is.

## 234. Adjuk meg a csoportos móddal kiegészített figyelmeztető zárakra vonatkozó kompatibilitási mátrixot! (5 pont)

![234. kérdés, konkurencia.ppt, 102. dia](./images/234.png)

## 235. Mit hívunk nem ismételhető olvasásnak és mi a probléma vele? (4 pont)

- Tegyük fel, hogy van egy T1 tranzakció, amely egy adott feltételnek eleget
  tevő sorokat válogat ki egy relációból. Ezután hosszas számításba kezd, majd
  később újra végrehajtja a fenti lekérdezést.
- Tegyük fel továbbá, hogy a lekérdezés két végrehajtása között egy T2
  tranzakció módosít vagy töröl a táblából néhány olyan sort, amely eleget tesz
  a lekérdezés feltételének.
- A T1 tranzakció lekérdezését ilyenkor nem ismételhető (fuzzy) olvasásnak
  nevezzük.
- A nem ismételhető olvasással az a probléma, hogy mást eredményez a lekérdezés
  másodszori végrehajtása, mint az első.

## 236. Mit hívunk fantom soroknak? (3 pont)

Ugyanez a helyzet akkor is, ha a T2 tranzakció beszúr olyan sorokat, amelyek
eleget tesznek a lekérdezés feltételének. A lekérdezés másodszori futtatásakor
most is más eredményt kapunk, mint az első alkalommal. Ennek az az oka, hogy
most olyan sorokat is figyelembe kellett venni, amelyek az első futtatáskor még
nem is léteztek. Az ilyen sorokat nevezzük fantomoknak (phantom).

## 237. Mikor követi egy tranzakció a faprotokollt? Adjuk meg a faprotokoll 4 szabályát! (4 pont)

A Ti tranzakció követi a faprotokollt, ha:

1. Az első zárat bárhova elhelyezheti.
2. A későbbiekben azonban csak akkor kaphat zárat A-n, ha ekkor zárja van A
   apján.
3. Zárat bármikor fel lehet oldani (nem 2PL).
4. Nem lehet újrazárolni, azaz ha Ti elengedte egy A adategység zárját, akkor
   később nem kérhet rá újra (még akkor sem, ha A apján még megvan a zárja).

## 238. Hierarchiák, például B*-fa elemeinek zárolása esetén milyen feltétel adható az ütemezés sorbarendezhetőségére? (4 pont)

Ha minden tranzakció követi a faprotokollt egy jogszerű ütemezésben, akkor az
ütemezés sorbarendezhető lesz, noha nem feltétlenül lesz 2PL.

## 239. Mi az időbélyegzési módszer lényege? Használunk-e ilyenkor zárakat? (4 pont)

- Minden tranzakcióhoz hozzárendelünk egy „időbélyegzőt".
- Minden adatbáziselem utolsó olvasását és írását végző tranzakció
  időbélyegzőjét rögzítjük, és összehasonlítjuk ezeket az értékeket, hogy
  biztosítsuk, hogy a tranzakciók időbélyegzőinek megfelelő soros ütemezés
  ekvivalens legyen a tranzakciók aktuális ütemezésével. (nem használunk
  zárakat)

## 240. Adjunk meg három jellemzőt az Oracle konkurenciavezérlésére vonatkozóan! (3 pont)

- Az Oracle alkalmazza a kétfázisú zárolást, a figyelmeztető protokollt és a
  többváltozatú időbélyegzőket is némi módosítással.

## 241. Milyen olvasási konzisztenciát biztosít az Oracle és mivel éri ezt el? (3 pont)

- Utasítás szintű olvasási konzisztencia
  - A lekérdezés által olvasott adatok egy időpillanatból (a lekérdezés
    kezdetének pillanatából) származnak
- Tranzakció szintű olvasási konzisztencia.
  - A tranzakciót sorbarendezhető vagy csak olvasás módban futtatjuk
- Ezeknek az eléréséhez az Oracle a rollback szegmensekben található
  információkat használja fel.

## 242. Adjuk meg az SQL92 ANSI/ISO szabványbanszereplő tranzakciós elkülönítési szinteket! (4 pont)

- Nem olvasásbiztos
- Olvasásbiztos
- Megismételhető olvasás
- Sorbarendezhető

## 243. Mi jellemező a nem olvasásbiztos elkülönítési szintre a piszkos, fantom, nem ismételhető olvasásokra vonatkozóan? (3 pont)

- Piszkos olvasás: lehetséges
- Nem ismételhető olvasás: lehetséges
- Fantomok olvasása: lehetséges

## 244. Mi jellemző az olvasásbiztos elkülönítési szintre a piszkos, fantom, nem ismételhető olvasásokra vonatkozóan? (3 pont)

- Piszkos olvasás: nem lehetséges
- Nem ismételhető olvasás: lehetséges
- Fantomok olvasása: lehetséges

## 245. Mi jellemző a megismételhető olvasás elkülönítési szintre a piszkos, fantom, nem ismételhető olvasásokra vonatkozóan? (3 pont)

- Piszkos olvasás: nem lehetséges
- Nem ismételhető olvasás: nem lehetséges
- Fantomok olvasása: lehetséges

## 246. Mi jellemző a sorbarendezhető elkülönítési szintre a piszkos, fantom, nem ismételhető olvasásokra vonatkozóan? (3 pont)

- Piszkos olvasás: nem lehetséges
- Nem ismételhető olvasás: nem lehetséges
- Fantomok olvasása: nem lehetséges

## 247. Milyen DML szintű zárakat használ az Oracle? (2 pont)

DML-zárakat két szinten kaphatnak a tranzakciók:

- Sorok szintjén
- És teljes táblák szintjén.

## 248. Milyen zártípusokat használ az Oracle sorokra és táblákra? (6 pont)

Sorok szintjén csak egyféle zármód létezik: a kizárólagos (írási - X).

1. row share (RS) vagy subshare (SS),
2. row exclusive (RX) vagy subexclusive (SX),
3. share (S),
4. share row exclusive (SRX) vagy share-subexclusive (SSX)
5. és exclusive (X).

## 249. Mit nevezünk felejtő és nem felejtő tárolónak? [2025/26/1, Beugró] (1 pont)

- **Felejtő (volatile) tároló:** 
  - Áramszünet esetén elvesznek az adatok
  - Példa: RAM memória, cache memória
  - Gyors hozzáférés, de nem tartós tárolás
- **Nem felejtő (non-volatile) tároló:**
  - Áramszünet esetén megmaradnak az adatok
  - Példa: merevlemez (HDD), SSD, flash memória
  - Lassabb hozzáférés, de tartós adattárolás

## 250. Mi az a RAID? [2025/26/1, Beugró] (1 pont)

- **RAID (Redundant Array of Independent Disks):** több merevlemez együttes használata
- **Célja:**
  - Nagyobb teljesítmény elérése (párhuzamos olvasás/írás)
  - Megbízhatóság növelése (redundancia, hibatűrés)
  - Adatvédelem lemez meghibásodás esetén
- **Főbb RAID szintek:** RAID 0, RAID 1, RAID 5, RAID 6, RAID 10

## 251. Mit nevezünk puffernek? [2025/26/1, Beugró] (1 pont)

- **Puffer (buffer):** a memóriában lévő terület, ahol az adatbázis blokkokat tárolunk
- **Célja:** csökkenteni a lassú háttértár-hozzáférések számát
- A pufferkezelő (buffer manager) kezeli a memória és háttértár közötti adatmozgatást
- INPUT(X): blokk beolvasása háttértárról memóriába
- OUTPUT(X): blokk kiírása memóriából háttértárra

## 252. Mi az a lapcsere (lapozás, paging)? [2025/26/1, Beugró] (1 pont)

- **Lapcsere (paging):** amikor a memória megtelt, és új blokkot kell beolvasni
- Ilyenkor egy régi blokkot ki kell választani és eltávolítani
- Ha a blokk módosult (piszkos puffer), akkor ki kell írni a háttértárra
- **Lapcsere algoritmusok:**
  - LRU (Least Recently Used): a legrégebben használt lapot cseréljük
  - FIFO (First In First Out): a legrégebben beolvasott lapot cseréljük
  - Clock algoritmus: körkörösen választunk

## 253. Mit nevezünk piszkos puffernek? [2025/26/1, Beugró] (1 pont)

- **Piszkos puffer (dirty buffer):** olyan memóriabeli blokk, amely módosult, de még nem lett kiírva a háttértárra
- A tranzakció által módosított, de még nem lemezre írt adatokat tartalmaz
- A piszkos puffereket időnként ki kell írni a háttértárra (OUTPUT művelet)
- **Kapcsolódik:** UNDO/REDO naplózáshoz, ahol a piszkos pufferek kezelése kritikus a helyreállításhoz

## 254. Milyen fájlszervezési módok vannak? [2025/26/1, Beugró] (1 pont)

**Fájlszervezési módok (legalább 7):**
1. Kupac (heap) - rendezetlen tárolás
2. Rendezett állomány - kulcs szerint rendezett
3. Hasító index (hash) - hasítófüggvénnyel kosarakat képezünk
4. Elsődleges index (ritka index) - rendezett főfájlra
5. Másodlagos index (sűrű index) - rendezetlen főfájlra
6. Többszintű index - indexre is index
7. B+-fa, B*-fa - kiegyensúlyozott fastruktúra

## 255. Mit jelent a kupac fájlszervezés? [2025/26/1, Beugró] (1 pont)

- **Kupac (heap):** a rekordok tetszőleges sorrendben vannak tárolva
- **Beszúrás:** 
  - Az utolsó blokkba kerül az új rekord
  - Költség: 1 olvasás + 1 írás
- **Keresés (A = a):**
  - Lineáris keresés szükséges
  - Legrosszabb esetben: B blokk beolvasása
  - Átlagos esetben (egyenletességi feltétellel): B/2 blokk
- **Előny:** gyors beszúrás
- **Hátrány:** lassú keresés

## 256. Mit jelent a rendezett fájlszervezés? [2025/26/1, Beugró] (1 pont)

- **Rendezett állomány:** a rekordok valamilyen kulcs szerint rendezve vannak tárolva
- **Keresés:**
  - Bináris (logaritmikus) keresés használható
  - Költség: log₂(B) blokk beolvasása
- **Beszúrás/törlés:**
  - Költséges, mert fenn kell tartani a rendezettséget
  - Beszúrás: keresés + rekordok eltolása + írás
- **Optimalizálások:**
  - Gyűjtő blokkok használata
  - Blokkok félig üresen hagyása (költség: 1 + log₂(B))

## 257. Mi az a memóriahozzáférés igazítás (word-alignment)? [2025/26/1, Beugró] (1 pont)

- **Word-alignment (memória igazítás):** a memóriában az adatok címe osztható a szó (word) méretével
- **Célja:** gyorsabb memória-hozzáférés (a processzor hatékonyabban dolgozik)
- **Padding:** üres helyek (kitöltő bájtok) beszúrása a rekordokba az igazítás miatt
- **Példa:** 64 bites rendszeren 8 bájtos igazítás
- **Hátrány:** tárhelyigény növekedése a padding miatt

## 258. Milyen céljaink vannak a fájlszervezés kiválasztásánál? [2025/26/1, Beugró] (1 pont)

**Három fő cél:**
1. **Keresési idő minimalizálása** - minél gyorsabb lekérdezések
2. **Tárméret minimalizálása** - minél kevesebb tárhely
3. **Módosítási idő minimalizálása** - gyors beszúrás, törlés, frissítés

**Fontos:**
- Ezek a célok általában ellentmondanak egymásnak
- Pl. indexek használatával csökken a keresési idő, de nő a tárméret és a módosítási idő
- Kompromisszumot kell kötni az alkalmazás igényei alapján

## 259. Mit nevezünk egyenletességi feltételnek a lekérdezések esetén? [2025/26/1, Beugró] (1 pont)

- **Egyenletességi feltétel:** feltesszük, hogy az A = a feltételnek eleget tevő rekordokból nagyjából egyforma számú rekord szerepel
- Az értékek egyenletesen oszlanak el az oszlop értéktartományában
- **Példa:** ha egy oszlopban I(A) = 100 különböző érték van T = 10000 rekordban, akkor minden értékhez átlagosan T/I(A) = 100 rekord tartozik
- **Használat:** költségbecsléshez és lekérdezés-optimalizáláshoz

## 260. Milyen algoritmussal kereshetünk rendezett állományban? [2025/26/1, Beugró] (1 pont)

- **Bináris (logaritmikus) keresés:**
  - Beolvassuk a középső blokkot
  - Ha nincs benne az A = a értékű rekord, eldöntjük melyik félben keressünk
  - Beolvassuk a felezett blokklánc középső blokkját
  - Folytatjuk, amíg megtaláljuk vagy csak 1 blokk marad
- **Költség:** log₂(B) blokk beolvasása
  - Ahol B: a blokkok száma
- **Feltétel:** a keresőmező legyen a rendező mező

## 261. Milyen hasításokat különböztetünk meg a kosarak száma szerint? [2025/26/1, Beugró] (1 pont)

- **Statikus hasítás:**
  - A kosarak száma (K) előre rögzített, nem változik
  - Probléma: ha túl sok rekord kerül, lassú lesz; ha túl kevés, pazarló
- **Dinamikus hasítás:**
  - A kosarak száma változhat az adatbázis méretének függvényében
  - Alkalmazkodik az adatmennyiség változásához
  - Típusai: kiterjeszthető hasítás, lineáris hasítás

## 262. Mit nevezünk statikus hasításnak? [2025/26/1, Beugró] (1 pont)

- **Statikus hasítás:** a kosarak száma (K) előre rögzített, nem változik
- **Működés:** h(x) ∈ {1, …, K} hasítófüggvény mondja meg, melyik kosárba kerül a rekord
- **Keresési költség jó hasító függvény esetén:** B/K (egy kosár átlagos mérete)
- **Problémák:**
  - Ha K túl kicsi: hosszú blokkláncok, lassú keresés
  - Ha K túl nagy: sok üres kosár, tárhely pazarlás (B helyett T blokkban tárolunk)

## 263. Mit nevezünk dinamikus hasításnak? [2025/26/1, Beugró] (1 pont)

- **Dinamikus hasítás:** előre nem rögzítjük a kosarak számát
- A kosarak száma beszúráskor, törléskor változhat
- **Célja:** 
  - Elkerülni a túl hosszú blokkláncokat
  - Alkalmazkodni az adatbázis méretének változásához
  - Jó keresési teljesítmény fenntartása
- **Típusai:** kiterjeszthető hasítás, lineáris hasítás

## 264. Milyen dinamikus hasításokat ismerünk? [2025/26/1, Beugró] (1 pont)

**Két típus:**

1. **Kiterjeszthető hasítás (extendible hashing):**
   - h(K) k hosszú kódnak vegyük az i hosszú elejét
   - Túlcsorduláskor a kosár kettéosztása bitenkénti szétosztással
   - Minden kosár azonos szinten lehet (teljes bináris gráf)

2. **Lineáris hasítás (linear hashing):**
   - Új kosarat akkor nyitunk, ha rekordok száma/kosarak száma > küszöb
   - h(K) értékének utolsó log(n) bitjével azonosítjuk a kosarat
   - Szekvenciálisan növeljük a kosarak számát

## 265. Milyen szempontok alapján kell hasító függvényt választanunk (2 szempont)? [2025/26/1, Beugró] (2 pont)

**Két fő szempont:**

1. **Egyenletes eloszlás:**
   - A rekordok egyenletesen oszoljanak el a kosarak között
   - Nagyjából egyforma hosszú blokkláncok keletkezzenek
   - Elkerüljük, hogy néhány kosár túlterhelt, mások üresek legyenek

2. **Gyors számítás:**
   - A hasító függvény értéke gyorsan kiszámítható legyen
   - Minimális számítási költség
   - Egyszerű matematikai műveletek (pl. modulo, bitműveletek)

## 266. Mikor jó egy hasító függvény és ilyenkor milyen hosszúak a blokkláncok? [2025/26/1, Beugró] (2 pont)

- **Jó hasító függvény kritériuma:**
  - Egyenletes eloszlást eredményez
  - Nagyjából egyforma hosszú blokkláncok keletkeznek
  - Egyenletesen sorolja be a rekordokat a kosarak közé

- **Blokkláncok hossza jó hasító függvény esetén:**
  - Minden kosár átlagosan **B/K** blokkból áll
  - Ahol B: összes blokkok száma, K: kosarak száma
  - **Keresési költség ekkor:** B/K (egy kosár végignézése)

## 267. Ha túl nagynak választjuk K-t hasításkor, akkor ez milyen problémát okozhat? [2025/26/1, Beugró] (1 pont)

- **Ha K túl nagy:**
  - Sok olyan blokklánc lesz, amely egy blokkból áll
  - És a blokkban is csak 1 rekord lesz
  - **Keresési idő:** továbbra is 1 blokkbeolvasás (jó)
  - **DE: tárhely pazarlás:** B helyett T számú blokkban tároljuk az adatokat
- **Következmény:** tárméret jelentősen megnő, pazarló tárolás

## 268. Milyen keresésre nem jó a hasító indexelés? [2025/26/1, Beugró] (1 pont)

- **Intervallumos (tartomány) keresésre nem jó**
- **Példa:** a < A < b típusú feltételek
  - "Keress minden rekordot, ahol 10 < x < 20"
  - "Keress minden rekordot, ahol x > 100"
- **Oka:** a hasítófüggvény szétszórja az egymáshoz közeli értékeket
- **Hasítás csak egyenlőség keresésre jó:** A = a típusú feltételekre
- **Intervallumos kereséshez:** rendezett állomány vagy B+-fa használandó

## 269. Lineáris hasító index esetén mikor nyitunk meg új kosarat? [2025/26/1, Beugró] (1 pont)

- **Új kosarat akkor nyitunk meg, ha:**
  - A kosarakra jutó átlagos rekordszám elér egy előre megadott küszöbértéket
  - **Feltétel:** rekordok száma / kosarak száma > küszöb
  
- **Terhelési tényező (load factor):**
  - load factor = rekordok száma / (kosarak száma × kosár kapacitása)
  
- **Megjegyzés:** nem túlcsorduláskor nyitunk új kosarat, hanem átlagos terhelés alapján

## 270. Mire használhatjuk a hasító táblákat az adatbázisban? [2025/26/1, Beugró] (1 pont)

**Hasító táblák felhasználása:**

1. **Gyors keresés** egyenlőség feltételre (A = a)
2. **Hash join megvalósítása** - összekapcsolások hatékony végrehajtása
3. **Duplikátumok eltávolítása** - SELECT DISTINCT műveletnél
4. **Csoportosítás (GROUP BY)** - azonos értékű rekordok gyors megtalálása
5. **Halmazműveletek** - unió, metszet, különbség esetén

**Előny:** O(1) átlagos keresési idő egyenlőség feltételre

## 271. Mit nevezünk elsődleges indexnek? [2025/26/1, Beugró] (1 pont)

- **Elsődleges index:** az adatállomány (főfájl) rendezett a kulcs szerint
- **Jellemzők:**
  - Az index a kulcsokra és blokkok címére mutat
  - **Ritka index:** elég a főfájl minden blokkjának legkisebb rekordjához indexrekordot készíteni
  - Indexrekordok száma: T(I) = B (ahol B: főfájl blokkjainak száma)
  - Csak 1 elsődleges index lehet (mert csak 1 mező szerint rendezett a főfájl)
- **Keresési költség:** 1 + log₂(B(I))

## 272. Mit nevezünk másodlagos indexnek? [2025/26/1, Beugró] (1 pont)

- **Másodlagos index:** az adatállomány (főfájl) nincs rendezve az index kulcsa szerint
- **Jellemzők:**
  - Főfájl rendezetlen
  - **Sűrű index:** minden rekordhoz kell index bejegyzést készíteni
  - Indexrekordok száma: T(I) = T (ahol T: rekordok száma)
  - Több másodlagos index is megadható (különböző mezőkre)
- **Keresési költség:** 1 + log₂(B(I)) << log₂(B)
- Lassabb, mint az elsődleges index (több indexrekord)

## 273. Mit nevezünk sűrű indexnek? [2025/26/1, Beugró] (1 pont)

- **Sűrű index (dense index):** minden rekordhoz van index bejegyzés
- **Jellemzők:**
  - Indexrekordok száma: T(I) = T (főfájl rekordjainak száma)
  - Általában másodlagos indexeknél használjuk
  - Minden értékhez tartozik indexrekord, még ha nem is szerepel a főfájlban
- **Előny:** minden rekord közvetlenül megtalálható az indexből
- **Hátrány:** nagyobb indexfájl méret

## 274. Mit nevezünk ritka indexnek? [2025/26/1, Beugró] (1 pont)

- **Ritka index (sparse index):** csak minden blokkhoz van egy index bejegyzés
- **Jellemzők:**
  - Indexrekordok száma: T(I) = B (főfájl blokkjainak száma)
  - Csak rendezett állománynál használható
  - Elég a főfájl minden blokkjának legkisebb rekordjához indexrekordot készíteni
- **Előny:** kevesebb helyet foglal (kisebb indexfájl)
- **Használat:** elsődleges indexeknél alkalmazzuk

## 275. Mit hívunk fedőértéknek? [2025/26/1, Beugró] (1 pont)

- **Fedőérték:** a legnagyobb olyan indexérték, amely a keresett értéknél kisebb vagy egyenlő
- **Másképp:** egy blokkban lévő legkisebb kulcsérték
- **Használat:** ritka indexeknél a fedőértékeket tároljuk az indexben
- **Keresés:** megkeressük a fedőértéket az indexben, majd a hozzá tartozó blokkban keresünk tovább
- **Példa:** ha keresett érték = 57, és az indexben 50, 60, 70 van, akkor fedőérték = 50

## 276. Mit nevezünk többszintű indexnek? [2025/26/1, Beugró] (1 pont)

- **Többszintű index:** az indexre is készítünk indexet (index az indexről)
- **Célja:** gyorsabb keresés nagy indexek esetén
- **Hierarchikus szerkezet:**
  - I. szint (főfájl indexe): B / bf(I) blokk
  - II. szint (I. szint indexe): B / bf(I)² blokk
  - ...
  - t. szint: B / bf(I)ᵗ blokk
- **Ha a legfelső szint 1 blokk:** keresési költség = t + 1
- **Szintek száma:** t = log_{bf(I)}(B)

## 277. Mit jelent a B+ fában a „B"? [2025/26/1, Beugró] (1 pont)

- **B = Balanced (kiegyensúlyozott)**
- **Jellemzők:**
  - Minden levél ugyanolyan mélységben van (kiegyensúlyozott fa)
  - A fa magassága garantáltan logaritmikus
  - Minden blokk legalább 50%-ban telített
- **Következmény:** 
  - Garantálja a logaritmikus keresési időt
  - Beszúrás és törlés is logaritmikus költségű
  - Karbantartó algoritmusok biztosítják a kiegyensúlyozottságot

## 278. Hány kulcsot és mutatót tartalmaz egy B+ fa csúcs? [2025/26/1, Beugró] (1 pont)

**Köztes (nem-levél) csúcsok:**
- **n kulcs és n+1 mutató**
- A mutatók a részfákra mutatnak
- Példa: 3 kulcs (57, 81, 95) esetén 4 mutató: k<57, 57≤k<81, 81≤k<95, 95≤k

**Levél csúcsok:**
- **n kulcs és n mutató**
- A mutatók a tényleges rekordokra mutatnak
- Plusz 1 mutató a sorrendben következő levélre (láncolás)

**n:** a csúcs kapacitása (maximális kulcsok száma)

## 279. Hogyan érdemes tárolni az ismétlődő értékeket a B+ fában? [2025/26/1, Beugró] (1 pont)

**Több megoldás az ismétlődő értékek tárolására:**

1. **Egy kulcshoz több mutató:**
   - Az adott kulcsérték után több mutató következik
   - A mutatók a különböző rekordokra mutatnak

2. **Mutatók listája:**
   - Külön tároljuk a kulcsot és a hozzá tartozó mutatók listáját
   - Egy indexbejegyzés: (kulcs, mutatólista)

3. **Kulcs-RID párok:**
   - Minden előforduláshoz külön indexbejegyzés (kulcs, RID)
   - Több azonos kulcsú bejegyzés lehet

## 280. Milyen költséget veszünk figyelembe a fizikai operátorok esetén? [2025/26/1, Beugró] (1 pont)

- **IO költség (I/O cost):** a háttértár és memória között mozgatott blokkok száma
- **Ez a domináns költség az adatbázis műveleteknél**
- **Feltételezés:** a beolvasás, kiírás költsége arányos a mozgatott blokkok számával
- **CPU költség:** általában elhanyagoljuk, mert az IO sokkal lassabb
- **Költségmodell:** blokkműveletek száma (block accesses)
- **Jelölés:** B<sub>R</sub> (R reláció blokkjainak száma)

## 281. Milyen relációs algebrai műveleteket vezethetünk vissza rendezésre? [2025/26/1, Beugró] (1 pont)

**Az alábbi műveletek igényelnek rendezést:**

1. **SELECT DISTINCT** - duplikátumok kiszűrése
2. **Projektálás (π)** - duplikátumok kiszűrése
3. **Halmazműveletek:**
   - R ∩ S (metszet)
   - R ∪ S (unió)
   - R - S (különbség)
4. **Rendezett összekapcsolás (sort-merge join)**
5. **GROUP BY** - csoportosítás
6. **ORDER BY** - rendezett kimenet

## 282. A rendezés milyen két fajtáját különböztetjük meg? [2025/26/1, Beugró] (1 pont)

**Két típus:**

1. **Belső rendezés (internal sorting):**
   - Ha a rekordok beférnek a memóriába
   - Minden adat egyszerre a memóriában van
   - Gyors rendezési algoritmusok használhatók (quicksort, mergesort)
   - IO költség: 0 (feltesszük, hogy már memóriában van)

2. **Külső rendezés (external sorting):**
   - Ha a rekordok NEM férnek be a memóriába
   - Háttértár használata szükséges
   - Általában külső összefésülő rendezés (external merge sort)

## 283. Mennyi a belső rendezés IO költsége? [2025/26/1, Beugró] (1 pont)

- **Belső rendezés IO költsége: 0**
- **Feltételezés:** az adatok már a memóriában vannak
- Csak akkor használható, ha az összes adat belefér a memóriába
- A CPU költség nem elhanyagolható, de IO költséget nem okoz
- **Példa:** ha B<sub>R</sub> < M (reláció mérete kisebb, mint memória mérete)

## 284. Külső összefésülő rendezésnél mit csinál a rendezési (sort) lépés? [2025/26/1, Beugró] (1 pont)

- **Sort (rendezési) lépés: létrehozza a rendezett futamokat**
- **Működés:**
  - M blokkos darabokat beolvasunk a memóriába
  - Minden darabot belső rendezéssel rendezünk
  - A rendezett futamokat (runs) kiírjuk a háttértárra
- **M:** a memória mérete blokkokban (R relációból memóriába olvasott lapok száma)
- **Eredmény:** ⌈B<sub>R</sub> / M⌉ darab rendezett futam
- **Költség:** 2 * B<sub>R</sub> (beolvasás + kiírás)

## 285. Külső összefésülő rendezésnél mit csinál az összevonási (merge) lépés? [2025/26/1, Beugró] (1 pont)

- **Merge (összevonási) lépés: összefésüli a rendezett futamokat**
- **Működés:**
  - Egyszerre M-1 futamot fésülünk össze
  - 1 buffer kimenetnek, M-1 buffer bemenetnek
  - Minden futamból a legkisebb elemet választjuk
  - Az eredményt kiírjuk a háttértárra
- **Ha N > M:** több menet szükséges
  - N: futamok száma
  - Minden menetben 2 * B<sub>R</sub> lapot olvasunk/írunk

## 286. Külső összefésülő rendezéskor mikor kell több menetben végezni az összevonási lépést? [2025/26/1, Beugró] (1 pont)

- **Ha N > M** több menetben végezzük az összevonási lépést
  - Ahol N: futamok száma = ⌈B<sub>R</sub> / M⌉
  - M: memória mérete blokkokban

- **Menetek száma:** ⌈log<sub>M-1</sub>(B<sub>R</sub> / M)⌉
- **Minden menet:**
  - M-1 futamot von össze
  - 2 * B<sub>R</sub> lapot olvasunk/írunk
  - A következő menetben kevesebb futam lesz
  - A végső menetben keletkezik a végső rendezett kimenet

- **Teljes költség:** 2*B<sub>R</sub> + 2*B<sub>R</sub>*⌈log<sub>M-1</sub>(B<sub>R</sub>/M)⌉ - B<sub>R</sub>

## 287. A vetítés milyen három lépés megvalósításából áll? [2025/26/1, Beugró] (3 pont)

**A vetítés három lépése:**

1. **Kezdeti átnézés:**
   - Az oszlopok kiválasztása
   - A vetítendő attribútumok kiolvasása

2. **Rendezés:**
   - A kiválasztott rekordok rendezése
   - Szükséges a duplikátumok hatékony eltávolításához

3. **Végső átnézés:**
   - Duplikátumok eltávolítása (ha DISTINCT)
   - Az egymás utáni azonos rekordokat töröljük
   - Eredmény kiírása

## 288. Az összekapcsolásoknak milyen megvalósításait használjuk (5 algoritmus)? [2025/26/1, Beugró] (5 pont)

**Öt összekapcsolási algoritmus:**

1. **Skatulyázott ciklusos (Nested Loop) összekapcsolás:**
   - Két egymásba ágyazott ciklus
   - Legrosszabb: N<sub>R</sub> * B<sub>S</sub> + B<sub>R</sub>

2. **Blokk-skatulyázott ciklusos (Block Nested Loop):**
   - Blokkonként dolgozik, nem rekordonként
   - Legrosszabb: B<sub>R</sub> * B<sub>S</sub> + B<sub>R</sub>

3. **Indexelt skatulyázott ciklusos (Index Nested Loop):**
   - Index használata a belső relációra
   - Költség: B<sub>R</sub> + N<sub>R</sub> * c

4. **Összefésüléses rendező (Sort-Merge) összekapcsolás:**
   - Mindkét reláció rendezése, majd összefésülés
   - Költség: rendezés + B<sub>S</sub> + B<sub>R</sub>

5. **Hasításos (Hash) összekapcsolás:**
   - Hasítás a join mezőre, majd kosarak összekapcsolása
   - Költség: 3 * (B<sub>R</sub> + B<sub>S</sub>)

## 289. Az összekapcsolásoknál melyik táblát választjuk külső táblának általában? [2025/26/1, Beugró] (1 pont)

- **A kisebb táblát választjuk külső (outer) táblának**
- **Oka:** így kevesebb blokkot kell beolvasni a külső ciklusban
- **Nested Loop esetén:**
  - Külső: R, Belső: S
  - Ha R kisebb: kevesebb iteráció a külső ciklusban
  - Költség: B<sub>R</sub> + N<sub>R</sub> * B<sub>S</sub>
- **Block Nested Loop esetén:**
  - A kisebb reláció legyen a belső, ha elfér a memóriában
  - Legjobb eset: B<sub>R</sub> + B<sub>S</sub>

## 290. Milyen esetekben érdemes a sort-merge összekapcsolást használni? [2025/26/1, Beugró] (1 pont)

**Sort-merge join előnyös esetei:**

1. **Ha mindkét tábla már rendezett** az összekapcsolási kulcs szerint
   - Ekkor nem kell rendezni, csak összefésülni
   - Költség: B<sub>S</sub> + B<sub>R</sub>

2. **Ha az eredményt rendezve szeretnénk**
   - ORDER BY van a lekérdezésben
   - A sort-merge automatikusan rendezett eredményt ad

3. **Nagy táblák esetén**
   - Ahol a hash join nem fér el a memóriában
   - És nincs megfelelő index

4. **Egyenlőség join esetén** közös attribútumon

## 291. Milyen típusú összekapcsolásokra nem használható a hash-join? [2025/26/1, Beugró] (1 pont)

- **Nem egyenlőség (non-equijoin) összekapcsolásokra NEM használható**
- **Példák, ahol NEM működik:**
  - R.A < S.B (kisebb, mint)
  - R.A > S.B (nagyobb, mint)
  - R.A ≠ S.B (nem egyenlő)
  - R.A ≤ S.B (kisebb vagy egyenlő)

- **Csak egyenlőség (equijoin) összekapcsolásra használható:**
  - R.A = S.B típusú feltételre
  - Vagy természetes összekapcsolásra (⋈)

- **Oka:** hasítás csak egyenlő értékeket tesz azonos kosárba

## 292. Mi a lekérdezések optimalizálásának a célja és miket használunk fel ehhez? [2025/26/1, Beugró] (2 pont)

- **CÉL:** A lekérdezéseket gyorsabbá akarjuk tenni

**Mit használunk fel:**
1. **Táblákra vonatkozó paraméterek:**
   - T(R): rekordok száma
   - B(R): blokkok száma
   - l(R): rekordméret

2. **Statisztikák:**
   - I(A,R): A oszlop képmérete (különböző értékek száma)
   - Egyenletességi feltétel

3. **Indexek ismerete:**
   - Milyen indexek vannak
   - Index típusok (B+-fa, hash, stb.)

4. **Általános érvényű tulajdonságok:**
   - Relációs algebrai ekvivalenciák
   - Heurisztikák

## 293. Mi az a relációs algebrai kifejezésfa? [2025/26/1, Beugró] (1 pont)

- **Relációs algebrai kifejezésfa:** a lekérdezés fa struktúrában ábrázolva
- **Levélcsúcsok:** táblák (relációs változók vagy konstans relációk)
- **Belső csúcsok:** műveletek
  - Unáris: σ (kiválasztás), π (vetítés), ρ (átnevezés)
  - Bináris: ⋈ (join), × (szorzat), ∪ (unió), - (kivonás)
- **Használat:** 
  - Lekérdezés reprezentációja
  - Optimalizálás alapja (fa átalakításokkal)

## 294. Milyen költségmodellt használunk relációs algebrai optimalizálás esetében? [2025/26/1, Beugró] (1 pont)

- **Költségmodell:** a kiszámítás költsége arányos a relációs algebrai kifejezés részkifejezéseinek megfelelő relációk tárolási méreteinek összegével
- **Alapelvek:**
  - IO költség: beolvasott/kiírt blokkok száma
  - Egyenletességi feltétel alkalmazása
  - Statisztikák használata:
    - B(R): táblák mérete blokkokban
    - T(R): rekordok száma
    - I(A,R): oszlopok értéktartománya (képméret)
- **Cél:** kisebb méretű köztes relációk létrehozása

## 295. Milyen módszert használ a szabály alapú (relációs) optimalizáció? [2025/26/1, Beugró] (1 pont)

- **Heurisztikus szabályok alkalmazása** (tapasztalati alapú)
- **Módszer:** műveleti tulajdonságokon alapuló ekvivalens átalakítások
- **Főbb heurisztikák:**
  - Minél hamarabb szelektáljunk (σ műveletek mélyebbre vitele)
  - Próbáljunk természetes összekapcsolásokat képezni szorzások helyett
  - Vonjuk össze az egymás utáni unáris műveleteket
  - Keressünk közös részkifejezéseket
- **Jellemző:** nem számol pontos költségeket, csak heurisztikákat alkalmaz

## 296. Miért mondjuk, hogy az eljárás heurisztikus relációs algebrai optimalizálás esetén? [2025/26/1, Beugró] (1 pont)

- **Heurisztikus:** azért, mert nem az argumentum relációk valódi méretével számol
- **Jellemzők:**
  - Tapasztalati szabályokat használ (rule of thumb)
  - Nem garantálja az optimális megoldást
  - De gyors és általában jó eredményt ad
  - Nem próbál minden lehetséges tervet (túl sok lenne)
- **Ellentét:** költségalapú optimalizálás, ami konkrét költségeket számol

## 297. Miért nem egyértelmű az eredmény relációs algebrai optimalizálás esetén? [2025/26/1, Beugró] (1 pont)

- **Az átalakítások sorrendje nem determinisztikus**
- Más sorrendben végrehajtva az átalakításokat más végeredményt kaphatunk
- **De:** mindegyik általában jobb költségű, mint amiből kiindultunk
- **Okok:**
  - Több ekvivalens kifejezésfa létezik
  - Különböző végrehajtási tervek lehetségesek
  - Költségbecslés pontatlan lehet (egyenletességi feltétel, statisztikák)
- Több optimális vagy közel optimális megoldás is lehet

## 298. A relációs algebrai kifejezésfában melyek az unáris csúcsok? [2025/26/1, Beugró] (1 pont)

**Három unáris művelet (egy bemenet, egy kimenet):**

1. **σ (szigma) - Kiválasztás (selection)**
   - Sorok szűrése feltétel alapján
   - σ<sub>A=a</sub>(R)

2. **π (pi) - Vetítés (projection)**
   - Oszlopok kiválasztása
   - π<sub>A,B</sub>(R)

3. **ρ (ró) - Átnevezés (rename)**
   - Relációs változó vagy oszlopok átnevezése
   - ρ<sub>S(A,B)</sub>(R)

## 299. A relációs algebrai kifejezésfában melyek a bináris csúcsok? [2025/26/1, Beugró] (1 pont)

**Bináris műveletek (két bemenet, egy kimenet):**

1. **× - Szorzás (Descartes-szorzat)**
   - R × S

2. **⋈ - Természetes összekapcsolás (natural join)**
   - R ⋈ S

3. **∪ - Unió (union)**
   - R ∪ S

4. **∩ - Metszet (intersection)**
   - R ∩ S (nem alapművelet)

5. **- - Kivonás (difference)**
   - R - S

## 300. A relációs algebrai kifejezésfában mik a levélcsúcsok? [2025/26/1, Beugró] (1 pont)

- **Levélcsúcsok:** a táblák (relációk)
- **Két típus:**
  - Relációs változók (pl. R, S)
  - Konstans relációk (konkrét értékek)
- **Jellemző:** 
  - Nincsenek gyerek csúcsaik
  - Ezek az alapadatok, amiből a lekérdezés indul
  - A kifejezésfa kiértékelése a levélcsúcsoktól indul és felfele halad

## 301. Mik azok a relációs algebrai ekvivalencia szabályok? [2025/26/1, Beugró] (1 pont)

- **Ekvivalencia szabályok:** kifejezések ekvivalenciáját megfogalmazó állítások
- **Két kifejezés ekvivalens (E1 ≃ E2), ha:**
  - Tetszőleges r₁,...,rₖ relációkra E1(r₁,...,rₖ) ≃ E2(r₁,...,rₖ)
  
- **Szabályok használata:**
  - Átírhatjuk a kifejezést
  - Az eredmény ugyanaz marad
  - De a végrehajtási költség változhat

- **Példák:**
  - Kommutatív: E1 × E2 ≃ E2 × E1
  - Asszociatív: (E1 × E2) × E3 ≃ E1 × (E2 × E3)
  - Szelekciók felcserélhetők: σ<sub>F1</sub>(σ<sub>F2</sub>(E)) ≃ σ<sub>F2</sub>(σ<sub>F1</sub>(E))

## 302. Miért érdemes hamarabb szelektálni relációs algebrai optimalizálás esetén? [2025/26/1, Beugró] (1 pont)

- **Csökkenti a köztes eredmények méretét** (részkifejezések várhatóan kisebb relációk lesznek)
- **Kevesebb adatot kell feldolgozni** a későbbi műveletekben
- **Költségcsökkenés:** 
  - Kisebb relációk → kevesebb blokk
  - Gyorsabb összekapcsolások
  - Kevesebb memóriaigény
- **Heurisztika:** σ műveleteket minél mélyebbre visszük a kifejezésfában
- **Alapelv:** minél hamarabb szűrjük ki a nem kell sorokat

## 303. Miért érdemes természetes összekapcsolásokat képezni szorzások helyett relációs algebrai optimalizálás esetén? [2025/26/1, Beugró] (1 pont)

- **Természetes összekapcsolás hatékonyabban kiszámolható,** mint a szorzatból történő kiválasztás
- **Méret különbség:**
  - Szorzat: T(R) × T(S) rekord (nagyon nagy!)
  - Összekapcsolás: általában sokkal kevesebb rekord
- **Költség:**
  - R × S majd σ: először óriási szorzat, aztán szűrés
  - R ⋈ S: csak a megfelelő rekordokat kapcsoljuk össze
- **Átalakítás:** σ<sub>F</sub>(R × S) → R ⋈<sub>F</sub> S

## 304. Miért érdemes az unáris műveleteket összevonni relációs algebrai optimalizálás esetén? [2025/26/1, Beugró] (1 pont)

- **Csökken a műveletek száma**
- **Egy menetben végrehajthatók** (pipeline-olás)
- **Kevesebb IO művelet** - nem kell köztes eredményt kiírni
- **Példák:**
  - Több szelekció: σ<sub>F1</sub>(σ<sub>F2</sub>(R)) → σ<sub>F1∧F2</sub>(R)
  - Több vetítés: π<sub>A</sub>(π<sub>B</sub>(E)) → π<sub>A</sub>(E) (ha A ⊆ B)
  - Szelekció + vetítés: π<sub>A</sub>(σ<sub>F</sub>(E)) egy menetben
- **Általában a kiválasztás kisebb relációt eredményez, mint a vetítés**

## 305. Miért érdemes a közös részkifejezéseket megkeresni relációs algebrai optimalizálás esetén? [2025/26/1, Beugró] (1 pont)

- **Közös részkifejezéseket elég csak egyszer kiszámolni** a kifejezés kiértékelése során
- **Többször felhasználjuk** a köztes eredményt
- **Csökkenti a számítási költséget:**
  - Nem számoljuk ki többször ugyanazt
  - Memóriában tartjuk a köztes eredményt
- **Kapcsolódó fogalmak:**
  - Common subexpression elimination (CSE)
  - Materialized view (előre kiszámított nézettábla)
- **Példa:** ha E részkifejezés többször is szerepel, egyszer számoljuk ki és tároljuk

## 306. Hogyan néz ki a bal-mély összekapcsolási fa? [2025/26/1, Beugró] (1 pont)

- **Bal-mély fa (left-deep tree):** lineáris lánc balra (left-linear)
- **Szerkezet:** ((R1 ⋈ R2) ⋈ R3) ⋈ R4
  - Mindig a bal oldali részfa az összetett
  - Jobb oldal mindig egy bázis reláció
- **Előny:** pipeline-olható
  - Az eredmény közvetlenül továbbadható a következő műveletnek
  - Nem kell köztes eredményt materializálni
- **Használat:** a legtöbb optimalizáló csak bal-mély fákat vizsgál (kevesebb lehetőség)

## 307. Hogyan néz ki a bozótszerű összekapcsolási fa? [2025/26/1, Beugró] (1 pont)

- **Bozótszerű fa (bushy tree):** kiegyensúlyozott fa szerkezet
- **Szerkezet:** (R1 ⋈ R2) ⋈ (R3 ⋈ R4)
  - Mindkét oldal lehet összetett részfa
  - Több bázis reláció is szerepelhet mindkét ágban
- **Előny:** párhuzamosítható
  - A bal és jobb részfa egyszerre számolható
  - Jobb multiprocesszor kihasználás
- **Hátrány:** 
  - Köztes eredményeket materializálni kell
  - Több lehetséges fa (exponenciális)

## 308. Milyen típusú összekapcsolási fákat érdemes vizsgálni? [2025/26/1, Beugró] (1 pont)

- **Bal-mély fákat (left-deep trees) érdemes vizsgálni**
- **Okok:**
  - Pipeline-olhatók (nem kell materializálni köztes eredményeket)
  - Kevesebb lehetőség, mint az összes fa → gyorsabb optimalizálás
  - A legtöbb adatbázis-kezelő ezt használja
- **Számosság:**
  - n tábla esetén összes join fa: T(n) * n!
  - Bal-mély fák száma: n! (sokkal kevesebb)
- **Alternatíva:** bozótszerű fák (párhuzamosításhoz)

## 309. Mit nevezünk az adatbázisban tranzakciónak? [2025/26/1, Beugró] (1 pont)

- **Tranzakció:** konzisztenciát megtartó adatkezelő műveletek sorozata
- **Jellemzők:**
  - Egy logikai egységet alkot
  - Vagy teljesen végrehajtódik (COMMIT)
  - Vagy egyáltalán nem (ROLLBACK/ABORT)
  - "Mindent vagy semmit" elv (atomosság)
- **Feltételezés:**
  - Ha T konzisztens állapotból indul
  - + T csak egyedül futna le
  - ⇒ T konzisztens állapotban hagyja az adatbázist

## 310. Mi az ACID betűszó egyes betűinek a jelentése? [2025/26/1, Beugró] (4 pont)

**ACID - a tranzakciók négy alapvető tulajdonsága:**

**A - Atomicity (Atomosság):**
- A tranzakció „mindent vagy semmit" jellegű végrehajtása
- Vagy teljesen végrehajtjuk, vagy egyáltalán nem

**C - Consistency (Konzisztencia):**
- A tranzakció megőrizze az adatbázis konzisztenciáját
- Konzisztens állapotból konzisztens állapotba visz

**I - Isolation (Elkülönítés/Izoláltság):**
- Minden tranzakciónak látszólag úgy kell lefutnia, mintha semmilyen másik tranzakciót sem hajtanánk végre közben

**D - Durability (Tartósság):**
- Ha egyszer egy tranzakció befejeződött, akkor már soha többé nem veszhet el a tranzakciónak az adatbázison kifejtett hatása

## 311. Mit jelent a tranzakció ACID-ból az A-hoz tartozó tulajdonsága? [2025/26/1, Beugró] (1 pont)

- **Atomicity (Atomosság):** a tranzakció „mindent vagy semmit" jellegű végrehajtása
- **Jelentés:**
  - Vagy teljesen végrehajtjuk a tranzakciót (COMMIT)
  - Vagy egyáltalán nem hajtjuk végre (ROLLBACK/ABORT)
  - Nincs részleges végrehajtás
- **Biztosítja:** a naplózás (UNDO/REDO)
- **Példa:** banki átutalásnál vagy mindkét művelet (levonás és hozzáadás) végrehajtódik, vagy egyik sem

## 312. Mit jelent a tranzakció ACID-ból az C-hez tartozó tulajdonsága? [2025/26/1, Beugró] (1 pont)

- **Consistency (Konzisztencia):** az a feltétel, hogy a tranzakció megőrizze az adatbázis konzisztenciáját
- **Jelentés:**
  - Konzisztens állapotból konzisztens állapotba visz
  - A tranzakció végrehajtása után is teljesülnek az adatbázisban előírt konzisztenciamegszorítások
- **Megszorítások:**
  - Integritási megszorítások (pl. kulcs, idegen kulcs)
  - Adatelemekre és kapcsolatokra vonatkozó elvárások
- **Példa:** egyenleg nem lehet negatív, hivatkozási integritás megmarad

## 313. Mit jelent a tranzakció ACID-ból az I-hez tartozó tulajdonsága? [2025/26/1, Beugró] (1 pont)

- **Isolation (Elkülönítés/Izoláltság):** az a tény, hogy minden tranzakciónak látszólag úgy kell lefutnia, mintha ez alatt az idő alatt semmilyen másik tranzakciót sem hajtanánk végre
- **Jelentés:**
  - A tranzakciók egymástól függetlenül futnak
  - Egy tranzakció nem látja a másik részleges eredményeit
  - Párhuzamos végrehajtás úgy néz ki, mintha soros lenne
- **Biztosítja:** konkurenciavezérlés (zárak, időbélyegek)
- **Szintek:** különböző elkülönítési szintek (serializable, repeatable read, read committed, read uncommitted)

## 314. Mit jelent a tranzakció ACID-ból az D-hez tartozó tulajdonsága? [2025/26/1, Beugró] (1 pont)

- **Durability (Tartósság):** az a feltétel, hogy ha egyszer egy tranzakció befejeződött (COMMIT), akkor már soha többé nem veszhet el a tranzakciónak az adatbázison kifejtett hatása
- **Jelentés:**
  - A commitált tranzakció eredménye megmarad
  - Még rendszerhiba (pl. áramszünet) esetén is
  - Az adatok tartósan a háttértáron tárolódnak
- **Biztosítja:** naplózás (a napló alapján helyreállítható)
- **Garanciák:** COMMIT után az adat biztonságban van

## 315. A tranzakciók melyik tulajdonságát biztosítja a naplózás? [2025/26/1, Beugró] (1 pont)

**A naplózás két ACID tulajdonságot biztosít:**

1. **Atomosság (Atomicity):**
   - UNDO: ha tranzakció megszakad, vissza tudjuk vonni a hatásait
   - Napló alapján visszaállítjuk a régi értékeket

2. **Tartósság (Durability):**
   - REDO: ha tranzakció commit után törik össze a rendszer, újra elvégezzük
   - Napló alapján újra végrehajtjuk a műveleteket

**Naplózási módszerek:**
- UNDO naplózás
- REDO naplózás
- UNDO/REDO naplózás

## 316. A tranzakciók melyik tulajdonságát biztosítja a konkurenciakezelés? [2025/26/1, Beugró] (1 pont)

**A konkurenciavezérlés (concurrency control) két ACID tulajdonságot biztosít:**

1. **Izoláltság (Isolation):**
   - A tranzakcióknak úgy kell látszódniuk, mintha egymástól függetlenül, elkülönítve végeznénk el őket
   - Sorbarendezhetőség biztosítása

2. **Konzisztencia (Consistency):**
   - Az adatmegosztásból származó hibák elkerülése
   - Konzisztens állapot fenntartása párhuzamos végrehajtás esetén

**Módszerek:**
- Zárolás (locks)
- Időbélyegzés (timestamps)
- Érvényesítés (validation)

## 317. Milyen típusú hibák fordulhatnak elő? [2025/26/1, Beugró] (1 pont)

**Négy típusú hiba sértheti a konzisztenciát:**

1. **Tranzakcióhiba:**
   - Programhiba, felhasználó által kezdeményezett ROLLBACK
   - Üzleti logika hiba
   - Megoldás: UNDO (visszagörgetés)

2. **Adatbázis-kezelési hiba:**
   - Szoftver hiba az DBMS-ben
   - Deadlock feloldása miatti ABORT

3. **Hardverhiba (rendszerhiba):**
   - Áramszünet, memória hiba
   - Megoldás: napló alapú helyreállítás

4. **Adatmegosztásból származó hiba:**
   - Konkurens tranzakciók közötti interferencia
   - Megoldás: konkurenciavezérlés (zárak)

## 318. Mit tekinthetünk adatbáziselemnek? [2025/26/1, Beugró] (1 pont)

- **Adatbáziselem (database element):** a fizikai adatbázisban tárolt adatok egyfajta funkcionális egysége
- **Tulajdonságok:**
  - Amelynek értékét tranzakciókkal lehet elérni (kiolvasni)
  - Vagy módosítani (kiírni)
- **Lehet:**
  - Rekord (sor)
  - Blokk (lap, oldal)
  - Tábla
  - Attribútum értéke
- **Zárolás szemcsézettség:** milyen szintű adatbáziselemet zárolunk

## 319. A tranzakció és az adatbázis kölcsönhatásának milyen három fontos helyszíne van? [2025/26/1, Beugró] (3 pont)

**Három helyszín:**

1. **Háttértár (Disk - D):**
   - Az adatbázis elemeit tartalmazó lemezblokkok területe
   - Tartós tárolás
   - Lassú hozzáférés

2. **Memória (Memory - M):**
   - A pufferkezelő által használt virtuális vagy valós memóriaterület
   - A pufferek, ahol blokkokat tárolunk
   - Gyors hozzáférés, de felejtő

3. **Tranzakció lokális változói:**
   - A tranzakció memóriaterülete (lokális változók)
   - A tranzakció által olvasott/írt értékek
   - Példa: READ(X,t) - t lokális változó

## 320. Mit jelent az INPUT(X) művelet? [2025/26/1, Beugró] (1 pont)

- **INPUT(X):** az X adatbáziselemet tartalmazó lemezblokk másolása a memóriapufferbe
- **Működés:**
  - Háttértárról (D) → Memóriába (M)
  - Blokk szintű művelet
  - Ha már a memóriában van, nem csinál semmit
- **Példa:** egy blokkot beolvasunk, amely tartalmazza az X adatelemet

## 321. Mit jelent az OUTPUT(X) művelet? [2025/26/1, Beugró] (1 pont)

- **OUTPUT(X):** az X adatbáziselemet tartalmazó puffer kimásolása lemezre
- **Működés:**
  - Memóriából (M) → Háttértárra (D)
  - Blokk szintű művelet
  - A piszkos puffer tartalmát írjuk ki
- **Példa:** egy módosított blokkot kiírunk a lemezre

## 322. Mit jelent a READ(X,t) művelet? [2025/26/1, Beugró] (1 pont)

- **READ(X,t):** az X adatbáziselem bemásolása a tranzakció t lokális változójába
- **Részletesen:**
  1. Ha az X-et tartalmazó blokk nincs a memóriapufferben, előbb végrehajtódik INPUT(X)
  2. Ezután kapja meg a t lokális változó X értékét
- **Működés:** Memóriából (M) → Tranzakció lokális változójába
- **Példa:** READ(A,t) - az A értékét beolvassuk t-be

## 323. Mit jelent a WRITE(X,t) művelet? [2025/26/1, Beugró] (1 pont)

- **WRITE(X,t):** a t lokális változó tartalma az X adatbáziselem memóriapufferbeli tartalmába másolódik
- **Részletesen:**
  1. Ha az X-et tartalmazó blokk nincs a memóriapufferben, előbb végrehajtódik INPUT(X)
  2. Ezután másolódik át a t lokális változó értéke a pufferbeli X-be
- **Működés:** Tranzakció lokális változójából → Memóriába (M)
- **Fontos:** még NEM írjuk ki a háttértárra! (az OUTPUT(X)-szel történik)
- **Példa:** WRITE(A,t) - a t értékét írjuk A-ba a memóriában

## 324. Miből áll a napló? [2025/26/1, Beugró] (1 pont)

- **Napló (log):** a tranzakciók műveleteit rögzítő fájl
- **Naplóbejegyzések tartalma:**
  - `<T, start>` - tranzakció kezdete
  - `<T, X, v>` - UNDO: T módosította X-et, régi érték v
  - `<T, X, v>` - REDO: T módosította X-et, új érték v
  - `<T, X, v, w>` - UNDO/REDO: régi érték v, új érték w
  - `<T, commit>` - tranzakció sikeres befejezése
  - `<T, abort>` - tranzakció megszakítása
- **Célja:** helyreállítás (recovery) rendszerhiba után

## 325. Milyen naplózási megközelítéseket ismerünk? [2025/26/1, Beugró] (1 pont)

**Három naplózási megközelítés:**

1. **UNDO naplózás:**
   - Régi értékeket naplózzuk: `<T, X, régi_érték>`
   - COMMIT előtt ki kell írni az adatokat
   - Helyreállítás: visszaírjuk a régi értékeket

2. **REDO naplózás:**
   - Új értékeket naplózzuk: `<T, X, új_érték>`
   - COMMIT után írjuk ki az adatokat
   - Helyreállítás: újra végrehajtjuk a műveleteket

3. **UNDO/REDO naplózás:**
   - Mindkét értéket naplózzuk: `<T, X, régi, új>`
   - COMMIT előtt vagy után is kiírhatunk
   - Legnagyobb szabadság

## 326. Mi az UNDO naplózás hátránya? [2025/26/1, Beugró] (1 pont)

- **Hátrány:** a módosított blokkokat a COMMIT előtt ki kell írni a lemezre (U2 szabály)
- **Problémák:**
  - Ez lassítja a tranzakciót
  - Megtelhet a puffer → kényszerített kiírás
  - Túl gyakran akar írni
  - Várni kell a lemez IO-ra commit előtt
- **U2 szabály:** Ha a tranzakció hibamentesen befejeződött, akkor a COMMIT naplóbejegyzést csak azután szabad a lemezre írni, ha a tranzakció által módosított összes adatbáziselem már a lemezre íródott

## 327. Mi a REDO naplózás hátránya? [2025/26/1, Beugró] (1 pont)

- **Hátrány:** a módosított blokkokat a COMMIT után kell kiírni a lemezre (R1 szabály)
- **Problémák:**
  - Több memóriát foglal (piszkos pufferek felhalmozódnak)
  - Hosszú ideig nem írhatók ki a módosított blokkok
  - Több piszkos puffert kell kezelni
- **R1 szabály:** Mielőtt az adatbázis bármely X elemét a lemezen módosítanánk, az X módosítására vonatkozó összes naplóbejegyzésnek (`<T,X,v>` és `<T, COMMIT>`) a lemezre kell kerülnie
- **Előny:** el lehet halasztani az írást (több szabadság)

## 328. Mit jelent a WAL elv? [2025/26/1, Beugró] (1 pont)

- **WAL (Write-Ahead Logging):** előbb naplózunk, utána módosítunk
- **Szabály:** a napló bejegyzést a módosított blokk előtt kell kiírni a lemezre
- **UNDO/REDO esetén (UR1 szabály):**
  - Mielőtt az adatbázis bármely X elemének értékét a lemezen módosítanánk, ezt megelőzően a `<T,X,v,w>` naplóbejegyzésnek lemezre kell kerülnie
- **Cél:** biztosítja a helyreállíthatóságot
  - Mindig megvan a napló, amiből helyreállíthatunk
  - Kritikus a recovery-hez

## 329. Milyen naplózást használ az Oracle? [2025/26/1, Beugró] (1 pont)

- **Oracle:** az UNDO és a REDO naplózás egy speciális keverékét valósítja meg
- **Két komponens:**
  1. **Redo log (REDO naplózás):**
     - Helyreállítás a napló alapján történik
     - Online és archivált naplóból áll
     - Az adatbázis változásait tartalmazza (új értékek)
  
  2. **Rollback szegmensek (UNDO naplózás):**
     - A tranzakciók hatásainak semmissé tételéhez szükséges információk
     - Módosított adatok régi értékeit tárolja
     - Használat: ROLLBACK, olvasási konzisztencia

- **Előny:** mindkét irány helyreállítása lehetséges

## 330. Mi a különbség az ARCHIVELOG és NOARCHIVELOG működés között? [2025/26/1, Beugró] (1 pont)

**ARCHIVELOG mód:**
- A redo log-okat archiváljuk (mentjük)
- **Teljes helyreállítás lehetséges** (point-in-time recovery)
- Bármely időpontra visszaállítható az adatbázis
- A teljes adatvesztés nélküli mentés/helyreállítás
- **Használat:** production környezetben kötelező

**NOARCHIVELOG mód:**
- Nem archiváljuk a redo log-okat
- **Csak az utolsó teljes mentésig állítható vissza**
- A mentés óta történt változások elvesznek
- **Használat:** csak teszt/fejlesztési környezetben

## 331. Mik azok a rollback szegmensek az Oracle adatbázisban? [2025/26/1, Beugró] (1 pont)

- **Rollback szegmensek:** a tranzakciók hatásainak semmissé tételéhez szükséges információkat tárolják
- **Tartalom:**
  - Rollback bejegyzésekből áll
  - Módosított adatok **régi értékeit** tárolja
  - Megváltozott blokk azonosítója és régi értéke
  - Az ugyanazon tranzakcióhoz tartozó bejegyzések össze vannak láncolva

- **Használat:**
  1. **ROLLBACK művelet** - tranzakció visszagörgetése
  2. **Olvasási konzisztencia** - konzisztens snapshot biztosítása
  3. **Helyreállítás** - adatbázis recovery

- **Fontos:** minden adatbázisban van egy vagy több rollback szegmens

## 332. Mit jelent a naplózás naplózása? [2025/26/1, Beugró] (1 pont)

- **Naplózás naplózása (logging the log):** a napló műveleteket (metaadat műveleteket) is naplózzuk
- **Példák:**
  - `<START CKPT(T1,...,Tk)>` - ellenőrzőpont kezdete
  - `<END CKPT>` - ellenőrzőpont vége
  - `<START DUMP>` - mentés kezdete
  - `<END DUMP>` - mentés vége
- **Cél:**
  - A helyreállítási algoritmus hatékonyabbá tétele
  - Tudjuk, meddig kell visszamenni a naplóban
  - Ellenőrzőpont után korábbi naplóbejegyzések eldobhatók

## 333. Milyen két típusa van az adatbázis mentésének? [2025/26/1, Beugró] (2 pont)

**Két mentési típus:**

1. **Teljes mentés (full backup):**
   - Az egész adatbázist mentjük
   - Minden adat lemásolása
   - **Előny:** egyszerű helyreállítás
   - **Hátrány:** időigényes, nagy tárhely

2. **Inkrementális mentés (incremental/növekményes backup):**
   - Csak a változásokat mentjük (az utolsó mentés óta)
   - Csak a módosult blokkok másolása
   - **Előny:** gyorsabb, kevesebb tárhely
   - **Hátrány:** helyreállításhoz több mentés kell (teljes + összes inkrementális)

**Működés közbeni mentés:** `<START DUMP>` ... ellenőrzőpont ... adatlemez mentése ... napló mentése ... `<END DUMP>`

## 334. Mit hívunk ütemezésnek? [2025/26/1, Beugró] (1 pont)

- **Ütemezés (schedule):** egy vagy több tranzakció által végrehajtott lényeges műveletek időrendben vett sorozata
- **Jellemzők:**
  - Meghatározza, hogy a műveletek milyen sorrendben hajtódnak végre
  - Az egy tranzakcióhoz tartozó műveletek sorrendje megegyezik a tranzakcióban megadott sorrenddel
  - Lényeges műveletek: READ, WRITE, COMMIT, ABORT
- **Példa:** r₁(A); w₁(A); r₂(A); w₂(A);
- **Cél:** helyes (sorbarendezhető) ütemezést találni

## 335. Mit hívunk soros ütemezésnek? [2025/26/1, Beugró] (1 pont)

- **Soros ütemezés (serial schedule):** a tranzakciók egymás után, átfedés nélkül hajtódnak végre
- **Jellemzők:**
  - Először T₁ összes művelete, majd T₂ összes művelete, stb.
  - Nincs időbeli átfedés
  - **Mindig helyes eredményt ad** (konzisztens)
- **Példa:** T1T2 vagy T2T1
- **Hátrány:** lassú, nem használja ki a párhuzamosságot, rossz válaszidő
- **Cél:** olyan nem-soros ütemezést találni, amely ekvivalens egy soros ütemezéssel

## 336. Mi a soros ütemezés hátránya? [2025/26/1, Beugró] (1 pont)

**Soros ütemezés hátrányai:**

1. **Lassú végrehajtás:**
   - A tranzakciók egymásra várnak
   - Nincs párhuzamos feldolgozás

2. **Nem használja ki a párhuzamosságot:**
   - CPU, IO eszközök kihasználatlansága
   - Egy időben csak egy tranzakció fut

3. **Rossz válaszidő:**
   - Hosszú várakozási idő
   - Alacsony throughput (áteresztőképesség)

**Megoldás:** nem-soros, de sorbarendezhető ütemezések használata

## 337. Mikor konfliktus-ekvivalens két ütemezés? [2025/26/1, Beugró] (1 pont)

- **Két ütemezés konfliktus-ekvivalens, ha:**
  - Szomszédos műveletek nem konfliktusos cseréinek sorozatával az egyiket átalakíthatjuk a másikká

- **Konfliktáló műveletek (conflict pair):**
  - Különböző tranzakciók (i ≠ j)
  - Ugyanaz az adatelem (X)
  - Legalább az egyik írás művelet
  - **Három eset:**
    1. r<sub>i</sub>(X); w<sub>j</sub>(X)
    2. w<sub>i</sub>(X); r<sub>j</sub>(X)
    3. w<sub>i</sub>(X); w<sub>j</sub>(X)

- **Nem konfliktus:** r<sub>i</sub>(X); r<sub>j</sub>(X) - felcserélhető

## 338. Milyen két megközelítése van az ütemezések sorbarendezhetőségének az elérésére? [2025/26/1, Beugró] (2 pont)

**Két megközelítés:**

1. **Passzív módszer:**
   - Hagyjuk a rendszert működni
   - Az ütemezésnek megfelelő gráfot tároljuk (megelőzési gráf)
   - Egy idő után megnézzük, hogy van-e benne kör
   - Ha nincs kör, akkor szerencsénk volt, jó volt az ütemezés
   - **Hátrány:** csak utólag derül ki, ha rossz volt

2. **Aktív módszer:**
   - Az ütemező beavatkozik és megakadályozza, hogy kör alakuljon ki
   - **Eszközök:**
     1. Zárak (locks) - ezen belül 2PL protokoll
     2. Időbélyegek (timestamps)
     3. Érvényesítés (validation)
   - **Előny:** eleve nem engedi a rossz ütemezést

## 339. Az aktív módszer milyen eszközöket használhat a sorbarendezhetőség elérésére? [2025/26/1, Beugró] (1 pont)

**Három eszköz az aktív konkurenciavezérléshez:**

1. **Zárak (locks):**
   - Tranzakció zárolják az adatelemeket
   - Protokollok: 2PL (kétfázisú zárolás)
   - Zártípusok: osztott (S), kizárólagos (X), módosítási (U), növelési (I)
   - **Legelterjedtebb módszer**

2. **Időbélyegek (timestamps):**
   - Minden tranzakció kap egy időbélyeget
   - Műveletek sorrendje az időbélyegek szerint
   - Nem használ zárakat

3. **Érvényesítés (validation/optimista):**
   - Tranzakció szabadon fut
   - Commit előtt ellenőrzi, hogy nem sértette-e a sorbarendezhetőséget
   - Ha sértette: ABORT

## 340. Mi az a holtpont? [2025/26/1, Beugró] (1 pont)

- **Holtpont (deadlock):** két vagy több tranzakció körkörösen egymásra vár
- **Jellemzők:**
  - Egyik sem tud tovább haladni
  - Végtelen várakozás
  - Zárak miatt alakul ki
- **Példa:** 
  - T1 zárolta A-t, vár B-re
  - T2 zárolta B-t, vár A-ra
  - → T1 és T2 kölcsönösen várakoznak
- **Felismerés:** várakozási gráfban irányított kör van
- **Megoldás:** egyik tranzakció ABORT-ja (victim selection)

## 341. Milyen két megközelítése van a holtpont kezelésének? [2025/26/1, Beugró] (2 pont)

**Két megközelítés:**

1. **Holtpont megelőzés (prevention):**
   - Nem engedjük, hogy holtpont alakuljon ki
   - **Módszerek:**
     - Minden tranzakció előre elkéri az összes zárat
     - Sorrend az adategységeken - csak növekvő sorrendben kérhetünk zárat
     - Időkorlát (timeout) alkalmazása
   - **Hátrány:** konzervatív, korlátozza a párhuzamosságot

2. **Holtpont felismerés és feloldás (detection and recovery):**
   - Várakozási gráf építése
   - Kör keresése a gráfban
   - Ha van kör: egyik tranzakció ABORT-ja (victim kiválasztás)
   - **Előny:** nagyobb párhuzamosság

## 342. Mit jelent az éhezés a tranzakciók esetén? [2025/26/1, Beugró] (1 pont)

- **Éhezés (starvation/kiéheztetés):** egy tranzakció soha nem jut hozzá az erőforráshoz
- **Oka:**
  - Mindig más tranzakciók előnyt élveznek
  - Rossz prioritási rendszer
  - Holtpont feloldásakor mindig ugyanaz a tranzakció lesz az áldozat
- **Példa:** 
  - T1 mindig vár egy zárra
  - De más tranzakciók mindig előnyt kapnak
  - T1 soha nem fut le
- **Megoldás:** 
  - Időkorlát alkalmazása
  - Fair zárkérés kiszolgálás (FIFO)
  - Prioritás aging

## 343. Milyen típusú zárakat használunk többmódú zárolás esetén? [2025/26/1, Beugró] (1 pont)

**Alapvető zártípusok:**

1. **S (Shared) - Osztott/Olvasási zár:**
   - Több tranzakció egyidejűleg tarthatja
   - Olvasáshoz szükséges
   - Kompatibilis más S zárakkal

2. **X (eXclusive) - Kizárólagos/Írási zár:**
   - Csak egy tranzakció tarthatja
   - Íráshoz szükséges
   - Nem kompatibilis semmilyen más zárral

3. **U (Update) - Módosítási/Frissítési zár:**
   - Átmeneti zár olvasáskor, ha írni is fogunk
   - Elkerüli a konverziós holtpontot
   - Később X-re minősíthető fel

**További:** I (Increment) - növelési zár

## 344. Milyen elemeit zárolhatjuk az adatbázisnak többféle szemcsézettségű zárral? [2025/26/1, Beugró] (1 pont)

**Zárolás szemcsézettség szintjei (durván → finoman):**

1. **Adatbázis szint:**
   - Az egész adatbázis zárolása
   - Legdurvább szemcsézettség

2. **Tábla (táblázat) szint:**
   - Egy teljes tábla zárolása
   - Például: tábla-szintű DML zár

3. **Oldal/Blokk (page) szint:**
   - Egy oldal (blokk) zárolása

4. **Sor (row/tuple) szint:**
   - Egy rekord zárolása
   - Legfinomabb gyakori szemcsézettség

5. **Attribútum (mező) szint:**
   - Egy mezőérték zárolása
   - Ritkán használt

**Figyelmeztető zárak:** hierarchikus zároláshoz (IS, IX, SIX)

## 345. Mi az a nem ismételhető olvasás? [2025/26/1, Beugró] (1 pont)

- **Nem ismételhető olvasás (non-repeatable/fuzzy read):** egy tranzakció kétszer olvassa ugyanazt az adatot, de közben másik tranzakció módosította
- **Szekvencia:**
  1. T1 beolvassa X-et (érték: 100)
  2. T2 módosítja X-et (új érték: 200)
  3. T2 commit
  4. T1 újra beolvassa X-et (érték: 200) ← **különböző érték!**
  
- **Probléma:** a lekérdezés másodszori végrehajtása mást eredményez
- **Megoldás:** 
  - Repeatable Read elkülönítési szint
  - Olvasási zár megtartása commit-ig (2PL)

## 346. Mik azok a fantom sorok? [2025/26/1, Beugró] (1 pont)

- **Fantom sorok (phantom rows):** olyan sorok, amelyek az első futtatáskor még nem léteztek, de a második futtatáskor már igen (vagy fordítva)
- **Szekvencia:**
  1. T1 futtat egy lekérdezést feltétellel (pl. WHERE age > 30) → 10 sor
  2. T2 beszúr olyan sorokat, amelyek eleget tesznek a feltételnek
  3. T2 commit
  4. T1 újra futtatja a lekérdezést → 15 sor ← **különböző számú sor!**

- **Probléma:** a lekérdezés másodszori futtatásakor más eredményt kapunk
- **Megoldás:**
  - Serializable elkülönítési szint
  - Predikátum zárolás (range locking)
- **Hasonló:** nem ismételhető olvasás, de itt beszúrás/törlés okozza

## 347. Milyen optimista módjai vannak a sorbarendezhetőség elérésének? [2025/26/1, Beugró] (1 pont)

**Optimista konkurenciavezérlési módszerek:**

1. **Időbélyeg alapú (timestamp-based):**
   - Minden tranzakció kap egy időbélyeget
   - Minden adatelemhez rögzítjük az utolsó olvasás és írás időbélyegét
   - Összehasonlítjuk az időbélyegeket → sorbarendezhetőség biztosítása
   - Nem használ zárakat

2. **Érvényesítés alapú (validation-based):**
   - Három fázis: olvasás, érvényesítés, írás
   - Tranzakció szabadon fut (optimista)
   - Commit előtt ellenőrzi, hogy nincs konfliktus
   - Ha konfliktus: ABORT

3. **Többverziós konkurenciakezelés (MVCC - Multiversion Concurrency Control):**
   - Minden adatelemnek több verziója van
   - Olvasás mindig egy konzisztens snapshotot lát
   - Írás új verziót hoz létre

## 348. Fizikai tárolás (másodlagos tárolók, RAID, lift algoritmus, pufferkezelő, lapcsere algoritmusok) [2025/26/1, Tételek] (12 pont)

### a. Hogyan működik a RAID X. szint?

**RAID (Redundant Array of Independent Disks) szintek:**

**RAID 0 - Sávozás (striping):**
- Adatok szétosztása több lemezen
- Nincs redundancia, nincs hibatűrés
- Előny: nagy sebesség (párhuzamos írás/olvasás)
- Hátrány: egy lemez meghibásodása → teljes adatvesztés

**RAID 1 - Tükrözés (mirroring):**
- Minden adat duplikálva van (teljes másolat)
- Előny: hibatűrés (egy lemez hiba OK), gyors olvasás
- Hátrány: 50% tárhely hatékonyság

**RAID 5 - Forgó paritás:**
- Adatok és paritás szétosztva (n+1 lemez, 1 paritás)
- Egy lemez meghibásodás elviselhető
- Előny: jobb tárhely hatékonyság mint RAID 1
- Hátrány: írás lassabb (paritás újraszámítás)

**RAID 6 - Dupla paritás:**
- Két független paritásblokk
- Két lemez meghibásodás elviselhető
- Még biztonságosabb

**RAID 10 (1+0):**
- RAID 1 és RAID 0 kombinációja
- Tükrözött stripek

### b. Hogyan működik a helyreállítás paritásblokk használata esetén?

**Helyreállítás RAID 5-ben:**
1. **Meghibásodott lemez azonosítása**
2. **Adatok rekonstrukciója:**
   - Paritás = A ⊕ B ⊕ C ⊕ D (XOR művelet)
   - Ha B meghibásodik: B = A ⊕ C ⊕ D ⊕ Paritás
3. **Minden hiányzó blokk újraszámítása** a maradék adatokból és paritásból
4. **Hot spare:** tartalék lemez automatikus bekapcsolása
5. **Rebuild:** adatok másolása az új lemezre

**XOR tulajdonság:** A ⊕ A = 0, A ⊕ 0 = A → bármelyik elem helyreállítható

### c. Hogyan lehet optimalizálni a blokkolvasásokat lemez esetén? Lift algoritmus működése.

**Lemez optimalizálás:**
- **Cél:** minimalizálni a fejmozgást (seek time)
- **Módszerek:**
  - Blokkok rendezése hengerszám szerint
  - Több kérés összevonása
  - Lift (elevator/SCAN) algoritmus

**Lift algoritmus működése:**
1. **Kezdeti irány:** válasszunk egy irányt (be vagy ki)
2. **Mozgás:** haladunk az aktuális irányban
3. **Kiszolgálás:** minden hengert kiszolgálunk, amíg elérjük
4. **Irányváltás:** ha elértük a végpontot, irány megfordítása
5. **Folytatás:** vissza ugyanígy

**Előny:**
- Nincs éheztetés (minden kérés kiszolgálásra kerül)
- Optimális fejmozgás
- Fair (igazságos) kiszolgálás

**Variánsok:** C-SCAN, LOOK, C-LOOK

### d. Milyen lapcsere algoritmusok vannak, hogyan működnek?

**Lapcsere algoritmusok:**

**1. LRU (Least Recently Used):**
- A legrégebben használt lapot cseréljük
- Minden laphoz időbélyeg
- **Működés:** válasszuk a legkisebb időbélyegű lapot
- **Előny:** jó találati arány
- **Hátrány:** költséges nyomon követés

**2. FIFO (First In First Out):**
- A legrégebben beolvasott lapot cseréljük
- Sor (queue) tárolás
- **Működés:** kivesszük a sor elejéről
- **Előny:** egyszerű
- **Hátrány:** nem veszi figyelembe a használatot

**3. Clock (óra) algoritmus:**
- Körkörös puffer, minden laphoz 1 bit (reference bit)
- **Működés:**
  - Forgó mutató (óra)
  - Ha bit=1: bit=0, továbblépünk
  - Ha bit=0: ezt cseréljük
- **Előny:** LRU közelítése, de egyszerűbb

**4. LRU-K:**
- K-adik legutóbbi hozzáférés időpontja
- Előtérbe hozza a gyakran használt lapokat

**5. MRU (Most Recently Used):**
- Speciális esetekben (szekvenciális szkennelés)

## 349. Adattárolás (blokkok, fájlok, fájlszervezés, rekordok felépítése, rendszerkatalógusok, rekord azonosítók) [2025/26/1, Tételek] (12 pont)

### a. Hasonlítsa össze a kupac és rendezett fájlszervezést (előnyök, hátrányok).

| Szempont | Kupac (Heap) | Rendezett Állomány |
|----------|--------------|-------------------|
| **Beszúrás** | Gyors: 1 olvasás + 1 írás | Lassú: log₂(B) + B/2 (átlagban) |
| **Keresés (A=a)** | Lassú: B/2 (átlagban) | Gyors: log₂(B) |
| **Tartomány keresés** | B blokk (teljes szkennelés) | log₂(B) + találatok |
| **Törlés** | B/2 + 1 | log₂(B) + B/2 |
| **Tárméret** | Optimális (B blokk) | Optimális (B blokk) |
| **Módosítás költsége** | Alacsony | Magas (rendezettség) |

**Kupac előnyök:**
- Gyors beszúrás
- Nincs overhead
- Egyszerű implementáció

**Kupac hátrányok:**
- Lassú keresés
- Teljes szkennelés szükséges

**Rendezett előnyök:**
- Gyors keresés (bináris)
- Jó tartomány lekérdezésekhez
- Klaszterezés előnye

**Rendezett hátrányok:**
- Lassú beszúrás/törlés
- Rendezettség fenntartása költséges

### b. Milyen memóriahozzáférés igazítás (word-alignment) módszereket ismer? Hogyan működnek?

**Word-alignment célja:** processzor hatékonyabban dolgozik, ha az adatok címe osztható a szó (word) méretével

**Módszerek:**

**1. Padding (kitöltés):**
- Üres bájtok beszúrása a mezők között
- **Példa:** 32 bites rendszer (4 bájt word)
  ```
  struct {
    char a;    // 1 bájt
    // 3 bájt padding
    int b;     // 4 bájt (4 bájthoz igazítva)
  }
  ```

**2. Mezők átrendezése:**
- Nagyobb mezők előre
- Minimalizálja a padding-et
- Kevesebb pazarlás

**3. Packed struktúrák:**
- Nem használunk alignment-et
- Szorosabb tárolás
- Lassabb hozzáférés

**4. Natural alignment:**
- n bájtos típus n bájt határra igazítva
- 1 bájt: bárhol
- 2 bájt: páros címre
- 4 bájt: 4-gyel osztható címre
- 8 bájt: 8-cal osztható címre

### c. Hogyan lehet tárolni a rögzített hosszúságú rekordokat a blokkokban? Hogyan lehet kezelni a törléseket?

**Rögzített hosszúságú rekordok tárolása:**

**1. Egymás után (szekvenciális):**
```
[Rekord1][Rekord2][Rekord3][Rekord4]...
```
- Egyszerű
- Blokk elején: rekordok száma
- i-edik rekord címe: base + i * record_size

**2. Törlések kezelése:**

**Módszer 1: Tömörítés (compaction)**
- Törlés után összetoljuk a rekordokat
- Nincs lyuk
- Hátrány: költséges (rekordok mozgatása)

**Módszer 2: Törölt flag**
- Rekord elején 1 bit: törölt-e
- Törölt rekordok helye ott marad
- Beszúráskor felhasználható
- Hátrány: fragmentáció

**Módszer 3: Szabad hely lista**
- Törölt rekordok listába fűzése
- Első szabad rekord mutatója a blokk fejlécében
- Törölt rekordok: következő szabad mutató
- Beszúrás: első szabad helyre

**Blokkfejléc tartalmazza:**
- Rekordok száma
- Szabad hely mutatója
- Blokk mérete

### d. Hogyan tároljuk a változó hosszúságú mezőket a rekordokban, és a rekordokat a blokkokban?

**Változó hosszúságú mezők a rekordban:**

**1. Fixrész + Változórész:**
```
[Fix mezők][Hosszok tömbje][Változó mező 1][Változó mező 2]...
```
- Fix részben: rögzített méretű mezők
- Hosszok tömbje: minden változó mező hossza és pozíciója
- Változó rész: tényleges adatok

**2. Mutatók használata:**
- Fix részben: mutatók a változó mezőkre
- Változó mezők a rekord végén vagy külön területen

**Változó hosszúságú rekordok blokkban:**

**1. Slotted page (slotos lap):**
```
[Fejléc][Slot tömb][...szabad hely...][Rekord3][Rekord2][Rekord1]
```
- Fejléc: rekordok száma, szabad hely
- Slot tömb: (offset, length) párok
- Rekordok a blokk végétől visszafelé
- Szabad hely a közepén

**Előnyök:**
- Rugalmas
- Törlés: csak slot érvénytelenítése
- Tömörítés: rekordok eltolása, slotok frissítése
- Stabil RID: (blokk_cím, slot_szám)

## 350. Kupac és rendezett fájlszervezés, hasítótáblák [2025/26/1, Tételek] (12 pont)

### a. Mennyi a keresési idő kupac és rendezett fájlszervezés esetén? Hogyan működik a keresés?

**Kupac fájlszervezés:**

**Keresés (A = a):**
- **Algoritmus:** Lineáris keresés - végigmegyünk minden blokkon
- **Legrosszabb eset:** B blokk beolvasása
- **Átlagos eset (egyenletességi feltétellel):** B/2 blokk
- **Tartomány keresés (a < A < b):** B blokk (teljes szkennelés)

**Rendezett fájlszervezés:**

**Keresés (A = a):**
- **Algoritmus:** Bináris keresés
- **Költség:** log₂(B) blokk beolvasása
- **Működés:**
  1. Középső blokk beolvasása
  2. Ha nem találtuk: eldöntjük melyik félben
  3. Folytatjuk a felezett részen
  4. log₂(B) lépésben megtaláljuk

**Tartomány keresés (a < A < b):**
- **Költség:** log₂(B) + találatok blokkjai
- Bináris kereséssel megtaláljuk 'a'-t, majd szekvenciálisan olvassuk

### b. Hogyan működik a beszúrás rendezett állományba? Milyen megközelítések vannak?

**Három megközelítés:**

**1. Azonnali beszúrás (immediate insertion):**
- Bináris kereséssel megkeressük a helyet: log₂(B)
- Rekordokat eltoljuk: átlagban B/2 blokk módosítása
- Beszúrjuk az új rekordot
- **Költség:** log₂(B) + B/2
- **Hátrány:** nagyon költséges

**2. Gyűjtő blokk (overflow block):**
- Új rekordokat gyűjtő blokkba írjuk
- Időnként reorganizáció (merge)
- **Keresés:** ellenőrizzük a gyűjtő blokkot is
- **Költség beszúrás:** 1 (gyűjtő blokkba)
- **Keresés:** log₂(B) + gyűjtő_blokk mérete

**3. Blokkok félig üresen hagyása:**
- Minden blokkban hagyunk szabad helyet
- Lokális beszúrás lehetséges
- **Költség:** 1 + log₂(B)
- **Hátrány:** 2B blokkban tárolunk (tárhely pazarlás)
- Időnként reorganizáció szükséges

### c. A (láncolt) statikus hasítás működése (beszúrás, törlés), példával.

**Statikus hasítás:**
- K kosár (fix szám)
- h(kulcs) ∈ {1, 2, ..., K} hasítófüggvény
- Minden kosár blokkláncból áll

**Beszúrás:**
1. Kiszámítjuk h(kulcs) → kosár_szám
2. A kosár utolsó blokkját beolvassuk
3. Ha van hely: beszúrjuk
4. Ha nincs hely: új blokk allokálása, láncolás, beszúrás
**Költség:** 1 olvasás + 1 írás (ha új blokk: +1 írás)

**Törlés:**
1. Kiszámítjuk h(kulcs) → kosár_szám
2. Végigmegyünk a blokkláncon
3. Megkeressük a rekordot
4. Töröljük (törölt flag vagy tömörítés)
5. Ha a blokk üres lesz: felszabadítható
**Költség:** blokkláncok átlagos hossza (B/K)

**Példa:**
```
K = 3 kosár, h(x) = x mod 3

Kulcsok: 5, 8, 11, 14, 17, 20

Kosár 0: → [3,6,9]
Kosár 1: → [4,7] → [10]
Kosár 2: → [5,8,11,14] → [17,20]

Beszúrás 23: h(23) = 2 → Kosár 2-höz hozzáfűzés
Törlés 14: h(14) = 2 → Kosár 2-ben keresés és törlés
```

### d. Kiterjeszthető hasító tábla működése (beszúrás, törlés, előnyök, hátrányok stb.), példával.

**Kiterjeszthető hasítás (Extendible Hashing):**

**Alapötlet:**
- h(kulcs) → k bites bináris sztring
- Első i bitje határozza meg a kosarat
- i: globális mélység (directory szintje)

**Struktúra:**
- **Directory (könyvtár):** 2^i bejegyzés, mutatók a kosárblokk láncokra
- **Kosárblokkok:** tényleges adatok, lokális mélység (j ≤ i)

**Beszúrás:**
1. Kiszámítjuk h(kulcs) első i bitjét → kosár
2. Ha van hely a kosárban: beszúrjuk
3. **Ha nincs hely (túlcsordulás):**
   - **Ha j < i (lokális < globális):**
     - Kosár kettéosztása
     - Rekordok átrendezése j+1. bit szerint
     - Directory mutatók frissítése
   - **Ha j = i:**
     - Directory megduplázása (i := i+1)
     - Kosár kettéosztása
     - Rekordok átrendezése

**Törlés:**
- Rekord törlése
- Ha kosár üres: összevonható a párjával
- Ha minden j < i: directory összevonható

**Példa:**
```
h(x) kód, i=2 (4 bejegyzés)

Directory:    Kosarak (j=2):
00 → [00xx rekordok] j=2
01 → [01xx rekordok] j=2
10 → [10xx rekordok] j=2
11 → [11xx rekordok] j=2

Túlcsordulás 00 kosárban:
→ i=3 (8 bejegyzés)
000, 001 külön kosarak
```

**Előnyök:**
- Dinamikus méret
- Minimális reorganizáció
- Log₂ keresés a directory-ban

**Hátrányok:**
- Directory memóriaigénye
- Túlcsorduláskor reorganizáció

### e. Lineáris hasító tábla működése (beszúrás, törlés, előnyök, hátrányok stb.), példával.

**Lineáris hasítás (Linear Hashing):**

**Alapötlet:**
- Kezdetben n kosár (n = 2^i)
- Két hasítófüggvény:
  - h<sub>i</sub>(x) = x mod 2^i
  - h<sub>i+1</sub>(x) = x mod 2^(i+1)
- Jelző: m (következő osztandó kosár)

**Beszúrás:**
1. Beszúrás h<sub>i</sub>(kulcs) vagy h<sub>i+1</sub>(kulcs) kosárba
2. **Ha terhelés > küszöb:**
   - m-edik kosár kettéosztása (0-tól számozva)
   - h<sub>i+1</sub> szerint szétválogatás
   - m := m + 1
3. **Ha m = 2^i:**
   - Egy kör véget ért
   - i := i + 1, m := 0

**Törlés:**
- Rekord törlése
- Ha terhelés < alsó küszöb: kosár összevonás

**Példa:**
```
Kezdet: n=4, i=2, m=0, küszöb=0.75
Kosarak: K0, K1, K2, K3

Beszúrás, terhelés > küszöb:
→ K0 osztása (m=0)
→ K0a (h=0,4,8...), K0b (h=2,6,10...)
→ m=1

Újabb beszúrás, terhelés > küszöb:
→ K1 osztása (m=1)
→ m=2

Ha m=4: i=3, m=0
```

**Előnyök:**
- Nincs directory
- Fokozatos növekedés
- Memóriahatékony

**Hátrányok:**
- Aszimmetrikus (nem minden kosár azonos szinten)
- Túlcsordulási láncok

## 351. Indexek (sűrű, ritka, elsődleges, másodlagos, több szintű, bittérkép index) [2025/26/1, Tételek] (12 pont)

### a. Hogyan keresünk sűrű indexben (algoritmus, költség)?

**Sűrű index jellemzői:**
- Minden rekordhoz van indexrekord
- T(I) = T (indexrekordok száma = főfájl rekordjainak száma)
- Használat: másodlagos indexeknél

**Keresési algoritmus (A = a):**
1. Bináris keresés az indexben: log₂(B(I))
2. Megtaláljuk az (a, mutató) indexrekordot
3. A mutató alapján beolvassuk a főfájl blokkját: +1
4. A blokkban megkeressük a rekordot

**Költség:** 
- **1 + log₂(B(I))** blokk beolvasás
- Ahol B(I): indexfájl blokkjainak száma

**Előny:** log₂(B(I)) << log₂(B), mert:
- Indexrekordok kisebbek
- bf(I) > bf (több indexrekord fér egy blokkba)
- B(I) << B (kevesebb indexblokk)

**Példa:** 
- T = 100,000 rekord, B = 10,000 blokk
- Index: 10 bájt/rekord, 400/blokk → B(I) = 250
- Költség: 1 + log₂(250) ≈ 9 vs. kupac: 5000

### b. Hogyan keresünk ritka indexben (algoritmus, költség)?

**Ritka index jellemzői:**
- Csak minden blokkhoz egy indexrekord (fedőérték)
- T(I) = B (indexrekordok száma = főfájl blokkjainak száma)
- Csak rendezett főfájlon használható
- Használat: elsődleges indexeknél

**Keresési algoritmus (A = a):**
1. Bináris keresés az indexben: log₂(B(I))
2. Megkeressük a legnagyobb fedőértéket (k ≤ a)
3. A hozzá tartozó blokk beolvasása: +1
4. A blokkban szekvenciális keresés (a blokk rendezett)

**Költség:**
- **1 + log₂(B(I))** blokk beolvasás
- Ahol B(I) = B / bf(I)

**Példa:** 
- B = 10,000 blokk főfájl
- bf(I) = 100 (100 indexrekord/blokk)
- B(I) = 100 indexblokk
- Költség: 1 + log₂(100) ≈ 8

**Megjegyzés:** B(I) < B → gyorsabb, mint főfájlon bináris keresés

### c. Hogyan működnek a többszintű indexek (szintek száma, keresés költsége)?

**Többszintű index (multilevel index):**
- Index az indexről (hierarchia)
- Minden szint: ritka index a következő szintről

**Struktúra:**
- **I. szint:** főfájl indexe → B / bf(I) blokk
- **II. szint:** I. szint indexe → B / bf(I)² blokk
- **III. szint:** II. szint indexe → B / bf(I)³ blokk
- ...
- **t. szint:** 1 blokk (gyökér)

**Szintek száma:**
- **t = ⌈log<sub>bf(I)</sub>(B)⌉**
- Ahol bf(I): blokkban elfér ennyi indexrekord

**Keresési algoritmus:**
1. Gyökérblokk (t. szint) beolvasása: 1
2. Bináris keresés a blokkban → következő szint blokkja
3. Következő szint blokkjának beolvasása: +1
4. Folytatjuk t szinten keresztül
5. Végül: főfájl blokkjának beolvasása: +1

**Keresés költsége:**
- **t + 1** blokk beolvasás
- **t + 1 = ⌈log<sub>bf(I)</sub>(B)⌉ + 1**

**Példa:**
- B = 10,000 blokk, bf(I) = 100
- I. szint: 10,000/100 = 100 blokk
- II. szint: 100/100 = 1 blokk ← gyökér
- t = 2
- Költség: 2 + 1 = 3 blokk

**Előny:** log<sub>bf(I)</sub>(B) + 1 << log₂(B)

### d. Bittérkép indexek működése (elkészítés, használat, hasznosság).

**Bittérkép (bitmap) index:**

**Elkészítés:**
- Minden különböző értékhez (v₁, v₂, ..., v<sub>k</sub>) egy bittérkép
- Bittérkép: T hosszú bitvéktor
- i-edik bit = 1, ha i-edik rekord értéke = v<sub>j</sub>
- Minden értékhez egy bitmap: k * T bit

**Példa:**
```
Tábla (Nem oszlop):
Rekord 1: Férfi
Rekord 2: Nő
Rekord 3: Férfi
Rekord 4: Férfi
Rekord 5: Nő

Bitmap indexek:
Férfi: [1,0,1,1,0]
Nő:    [0,1,0,0,1]
```

**Használat lekérdezésben:**

**Egyenlőség (Nem = 'Férfi'):**
- Bitmap['Férfi'] használata → [1,0,1,1,0]

**Összetett feltétel (Nem = 'Férfi' AND Kor > 30):**
- Bitmap['Férfi'] AND Bitmap[Kor>30]
- Bitenkénti AND művelet

**Előnyök:**
- Kis értéktartomány esetén hatékony
- Gyors bitműveletek (AND, OR, NOT)
- Több feltétel kombinálása egyszerű
- Tömörítés lehetséges (run-length encoding)

**Hátrányok:**
- Nagy értéktartomány: sok bitmap
- Gyakori módosításoknál költséges
- Tárigényes, ha I(A,R) nagy

**Hasznosság:**
- Alacsony kardinalitású oszlopok (pl. nem, aktív/inaktív)
- Data warehouse környezet
- Olvasás-intenzív műveletek

## 352. B-fák [2025/26/1, Tételek] (12 pont)

### a. A B+ fa csúcsainak (gyökér, köztes, levél) jellemzői.

**B+ fa alapelvek:**
- n: csúcs kapacitása (max kulcsok száma)
- Kiegyensúlyozott: minden levél azonos mélységben
- Minden csúcs legalább 50%-ban telített

**1. Gyökércsúcs:**
- **Ha nem levél:** 2 és n+1 közötti mutató
- **Ha levél:** 1 és n közötti kulcs
- Speciális: lehet üres is (üres fa)

**2. Köztes (belső) csúcsok:**
- **Tartalom:** n kulcs, n+1 mutató
- **Struktúra:** [P₀|K₁|P₁|K₂|P₂|...|Kₙ|Pₙ]
- **Feltöltöttség:** ⌈n/2⌉ és n közötti kulcs
- **Keresési tartományok:**
  - P₀: kulcs < K₁
  - P₁: K₁ ≤ kulcs < K₂
  - ...
  - Pₙ: Kₙ ≤ kulcs
- Mutatók részfákra mutatnak

**3. Levélcsúcsok:**
- **Tartalom:** n kulcs, n mutató + következő levél mutatója
- **Struktúra:** [K₁|P₁|K₂|P₂|...|Kₙ|Pₙ|Next]
- **Feltöltöttség:** ⌈n/2⌉ és n közötti kulcs
- Mutatók a tényleges rekordokra (RID-re)
- **Láncolás:** Next mutató → következő levél (rendezett szkenneléshez)

**Magasság:** h = ⌈log<sub>⌈n/2⌉</sub>(T)⌉

### b. Hogyan keresünk B+ fában (példával)?

**Keresési algoritmus (A = a):**

**Lépések:**
1. **Kezdés a gyökérnél**
2. **Köztes csúcsban:**
   - Bináris keresés a kulcsok között
   - Meghatározzuk melyik tartományba esik 'a'
   - Követjük a megfelelő P<sub>i</sub> mutatót
3. **Ismételjük** amíg levelet nem érünk
4. **Levélben:**
   - Megkeressük a kulcsot
   - Követjük a mutatót a rekordhoz

**Költség:** h + 1
- h: fa magassága
- +1: főfájl blokkja

**Példa:** n=3 (max 3 kulcs/csúcs)

```
Keresés: 27

         [40]           ← Gyökér
        /    \
    [20,30]  [50,60]    ← Köztes
    /  |  \     ...
[10,15][25,27,28][35,38] ← Levelek

Lépések:
1. Gyökér: 27 < 40 → bal oldal
2. [20,30]: 20 ≤ 27 < 30 → középső
3. [25,27,28]: megtaláltuk 27-et
4. Mutató alapján rekord beolvasása

Költség: 3 + 1 = 4 blokk
```

**Tartomány keresés (20 ≤ A ≤ 35):**
1. Keresés: 20 (mint fent)
2. Láncolás: Next mutatók követése
3. Megállás: ha kulcs > 35
**Költség:** h + 1 + találatok leveleinek száma

### c. Beszúrás B+ fába, példával (levél és köztes csúcs osztás).

**Beszúrási algoritmus:**

**1. Keresés:** megkeressük a megfelelő levelet
**2. Beszúrás a levélbe:**
   - **Ha van hely (kulcsok száma < n):**
     - Beszúrjuk rendezett sorrendben
     - Kész
   - **Ha nincs hely (kulcsok száma = n):**
     - **Levél osztása**

**Levél osztás:**
1. Új levelet allokálunk
2. n+1 kulcsot (n régi + 1 új) elosztjuk:
   - Első ⌈(n+1)/2⌉ kulcs: régi levélbe
   - Maradék: új levélbe
3. Középső kulcsot **felmásoljuk** a szülőbe
4. Szülő mutatóinak frissítése
5. Láncolás frissítése (Next mutató)

**Köztes csúcs osztás:**
- Ha szülő is megtelt: köztes csúcs osztása
- Középső kulcsot **felviszük** (nem másoljuk)
- Rekurzív osztás a gyökérig
- **Ha gyökér osztódik:** fa magassága nő

**Példa:** n=3, beszúrjuk 27-et

```
Előtte:
    [30]
   /    \
[10,20] [35,40,50]  ← tele!

Beszúrás 27:
1. Levél [35,40,50] tele
2. Osztás: [27,35,40,50] → [27,35] és [40,50]
3. Középső (40) felmásolása

Utána:
      [30,40]
     /   |   \
[10,20] [27,35] [40,50]
```

**Gyökér osztás példa:**
```
Ha gyökér [30] tele lenne és 25-öt beszúrnánk:

         [25]        ← új gyökér
        /    \
     [15]    [30]    ← régi gyökér osztva
```

### d. Törlés működése a B+ fában, példával.

**Törlési algoritmus:**

**1. Keresés:** megkeressük a kulcsot a levélben
**2. Törlés a levélből:**
   - **Ha telítettség OK (≥ ⌈n/2⌉):**
     - Töröljük a kulcsot
     - Kész
   - **Ha alultelítettség (<⌈n/2⌉):**
     - **Kölcsönzés** vagy **összevonás**

**Kölcsönzés (redistribution):**
- **Feltétel:** testvérnek van elegendő kulcsa (> ⌈n/2⌉)
- **Lépések:**
  1. Átveszünk kulcsot a testvértől
  2. Szülőben kulcs frissítése (új határérték)

**Összevonás (merge):**
- **Feltétel:** testvér is minimum telítettségű
- **Lépések:**
  1. Két levél összevonása
  2. Szülőből kulcs törlése
  3. **Ha szülő alultelített:** rekurzív összevonás

**Gyökér összevonás:**
- Ha gyökérnek csak 1 mutatója marad
- Gyökér törlése → fa magassága csökken

**Példa:** n=3, töröljük 35-öt

```
Előtte:
      [30,40]
     /   |   \
[10,20] [27,35] [40,50]

Törlés 35:
[27,35] → [27] (alultelített!)

Kölcsönzés balról ([10,20] → 20):
      [27,40]
     /   |   \
[10] [20,27] [40,50]

Vagy összevonás jobbbal:
      [40]
     /    \
[10,20,27] [40,50]
```

**Kulcs másolás vs. felvitel:**
- **Levél osztás:** kulcsot MÁSOLJUK (marad a levélben is)
- **Köztes osztás:** kulcsot FELVISSZÜK (nem marad a csúcsban)

## 353. Műveletek költségei, méretbecslés (kiválasztás, vetítés, rendezés, halmazműveletek) [2025/26/1, Tételek] (12 pont)

### a. Add meg a konjunkciós összetett kiválasztás kiszámítási módjait.

**Konjunkciós kiválasztás:** σ<sub>F₁ ∧ F₂ ∧ ... ∧ Fₖ</sub>(R)

**Módszer 1: Szekvenciális szkennelés**
- Végigmegyünk minden rekordón
- Minden feltételt ellenőrzünk
- **Költség:** B<sub>R</sub>
- Mindig működik

**Módszer 2: Index használata egy feltételre**
- Válasszunk egy F<sub>i</sub> feltételt, amelyhez van index
- Index alapján megkeressük a rekordokat
- Többi feltételt ellenőrizzük a rekordokon
- **Költség:** index_költség + találatok
- **Válasszuk** a legszelektívebb feltételt!

**Módszer 3: Több index használata (index intersection)**
- Minden F<sub>i</sub>-hez van index
- Lekérdezzük a RID halmazokat mindegyikből
- **Metszet:** RID₁ ∩ RID₂ ∩ ... ∩ RIDₖ
- Csak a metszet RID-jait olvassuk be
- **Költség:** indexek + |metszet| rekordok

**Módszer 4: Összetett index**
- Van index több oszlopra: (A, B)
- Használható, ha feltételek erre vonatkoznak
- **Költség:** index_költség

**Példa:**
```
σ<sub>age>30 ∧ city='Budapest' ∧ salary>5000</sub>(Employee)

- Ha van index age-re: használjuk + ellenőrizzük city, salary
- Ha van index (age, city)-re: ideális
- Ha van index mindháromra: intersection
```

### b. Add meg a diszjunkciós összetett kiválasztás kiszámítási módjait.

**Diszjunkciós kiválasztás:** σ<sub>F₁ ∨ F₂ ∨ ... ∨ Fₖ</sub>(R)

**Módszer 1: Szekvenciális szkennelés**
- Végigmegyünk minden rekordon
- Bármelyik feltétel teljesül → kiválasztjuk
- **Költség:** B<sub>R</sub>
- Mindig működik

**Módszer 2: Minden feltételhez van index (index union)**
- Minden F<sub>i</sub>-hez van index
- Lekérdezzük a RID halmazokat
- **Unió:** RID₁ ∪ RID₂ ∪ ... ∪ RIDₖ
- Az unió RID-jait olvassuk be (duplikátumok nélkül)
- **Költség:** indexek + |unió| rekordok

**Ha nincs minden feltételhez index:**
- Szekvenciális szkennelés szükséges
- Vagy: index + szűrés a többire

**Példa:**
```
σ<sub>age<20 ∨ age>65</sub>(Employee)

Ha van index age-re:
- Két tartomány lekérdezés: [0,20) ∪ (65,∞)
- Index unió

Ha nincs index:
- Teljes szkennelés: B<sub>R</sub>
```

**Fontos:** diszjunkció általában drágább, mint konjunkció

### c. A kiválasztás művelet méretbecslése (egyenlőségi feltétel, intervallumra vonatkozó feltétel, összetett kiválasztás).

**Méretbecslés: hány rekord lesz a kimenetben?**

**1. Egyenlőségi feltétel (A = a):**
- **T(σ<sub>A=a</sub>(R)) = T(R) / I(A,R)**
- Egyenletességi feltétel: minden érték egyformán gyakori
- **Példa:** T=10,000, I(A,R)=100 → kimenet: 100 rekord

**2. Intervallumos feltétel (a < A < b):**
- **Ha A folytonos:** T(R) × (b-a)/(max-min)
- **Ha A diszkrét:** T(R) × (különböző értékek az intervallumban) / I(A,R)
- **Példa:** Age intervallum [30,40] 100 lehetséges értékből:
  - T(R) × 11/100 (ha [30,40] inclusive)

**3. Negálás (A ≠ a):**
- **T(σ<sub>A≠a</sub>(R)) = T(R) × (I(A,R)-1) / I(A,R)**
- Majdnem minden rekord

**4. Konjunkció (F₁ ∧ F₂):**
- **Független feltételek:** T(R) × sel(F₁) × sel(F₂)
- sel(F): szelektivitás (0 és 1 közötti érték)
- **Példa:** 
  - T(σ<sub>A=a ∧ B=b</sub>(R)) = T(R) / (I(A,R) × I(B,R))

**5. Diszjunkció (F₁ ∨ F₂):**
- **T(σ<sub>F₁∨F₂</sub>(R)) = T(σ<sub>F₁</sub>(R)) + T(σ<sub>F₂</sub>(R)) - T(σ<sub>F₁∧F₂</sub>(R))**
- Inklúzió-exklúzió elv

**Blokkok száma:**
- **B(σ(R)) = T(σ(R)) / bf(R)**

### d. Add meg a vetítés költségét és méretbecslését.

**Vetítés:** π<sub>A₁,A₂,...,Aₖ</sub>(R)

**Költség (DISTINCT esetén):**

**Módszer 1: Rendezés alapú**
1. Kezdeti átnézés: B<sub>R</sub> (oszlopok kiolvasása)
2. Rendezés: 2*B<sub>R</sub> + 2*B<sub>R</sub>*⌈log<sub>M-1</sub>(B<sub>R</sub>/M)⌉ - B<sub>R</sub>
3. Végső átnézés: B<sub>R</sub> (duplikátumok eltávolítása)
**Összkötség:** 3*B<sub>R</sub> + rendezés_költsége

**Módszer 2: Hash alapú**
1. Hasítás: 2*B<sub>R</sub> (partition)
2. Duplikátumok eltávolítása kosáronként: B<sub>R</sub>
**Összkötség:** 3*B<sub>R</sub>

**Vetítés nélküli DISTINCT esetén:**
- **Költség:** B<sub>R</sub> (csak egy átnézés)

**Méretbecslés:**

**DISTINCT nélkül:**
- T(π(R)) = T(R) (ugyanannyi rekord)
- B(π(R)) = T(R) × l(π(R)) / B (kisebb rekordméret)

**DISTINCT esetén:**
- **T(π<sub>A₁,...,Aₖ</sub>(R)) ≈ min(T(R), I(A₁,R) × ... × I(Aₖ,R))**
- Legfeljebb I értékek szorzata
- De max T(R) (nem lehet több, mint az eredeti)

**Példa:**
- T(R) = 10,000
- I(Gender,R) = 2, I(City,R) = 50
- T(π<sub>Gender,City</sub>(R)) ≈ min(10,000, 2×50) = 100

### e. Külső összefésülő rendezés algoritmusa.

**External Merge Sort algoritmus:**

**Bemenet:** 
- R reláció, B<sub>R</sub> blokk
- M memória méret (blokokban)

**Fázis 1: SORT (rendezett futamok létrehozása)**
```
FOR i := 0 TO ⌈B_R/M⌉ - 1 DO
  1. Olvass be M blokkot a memóriába
  2. Rendezd belső rendezéssel (quicksort)
  3. Írd ki rendezett futamként a lemezre
ENDFOR
```
**Eredmény:** N = ⌈B<sub>R</sub>/M⌉ rendezett futam
**Költség:** 2*B<sub>R</sub> (beolvasás + kiírás)

**Fázis 2: MERGE (futamok összefésülése)**
```
WHILE (futamok száma > 1) DO
  1. Válassz ki legfeljebb M-1 futamot
  2. Fésüld össze őket:
     - M-1 buffer bemenet (mindegyik futamból)
     - 1 buffer kimenet
     - Mindig a legkisebb elem megy a kimenetbe
  3. Írd ki az új futamot
  4. Ismételd, amíg egy futam nem marad
ENDFOR
```

**Menetek száma:** ⌈log<sub>M-1</sub>(N)⌉ = ⌈log<sub>M-1</sub>(B<sub>R</sub>/M)⌉
**Költség menetenként:** 2*B<sub>R</sub>

**Összefésülés részletesen:**
- M-1 input buffer, 1 output buffer
- Minden input bufferből a minimum
- Output buffer megtelik → kiírás

### f. Külső összefésülő rendezés költsége.

**Teljes költség:**

**SORT fázis:** 2*B<sub>R</sub>

**MERGE menetek:**
- **Menetek száma:** P = ⌈log<sub>M-1</sub>(B<sub>R</sub>/M)⌉
- **Költség menetenként:** 2*B<sub>R</sub>
- **Utolsó menet:** csak írás, ha pipeline-oljuk
- **MERGE összesen:** 2*B<sub>R</sub>*P - B<sub>R</sub>

**Teljes költség:**
**2*B<sub>R</sub> + 2*B<sub>R</sub>*⌈log<sub>M-1</sub>(B<sub>R</sub>/M)⌉ - B<sub>R</sub>**

**Egyszerűsítve:** 
**3*B<sub>R</sub> * (1 + ⌈log<sub>M-1</sub>(B<sub>R</sub>/M)⌉) - B<sub>R</sub>**

**Példa:**
- B<sub>R</sub> = 1,000 blokk
- M = 101 (101 blokk memória)
- N = ⌈1000/101⌉ = 10 futam
- P = ⌈log₁₀₀(10)⌉ = 1 (1 merge menet elég!)
- Költség: 2*1000 + 2*1000*1 - 1000 = 3,000 blokk

**Optimális eset:** B<sub>R</sub> ≤ M
- Minden adat memóriában → belső rendezés
- Költség: 0 (ha már memóriában van)

### g. Add meg az unió/különbség/metszet költségét és kimenet méretét (sorok száma, blokkok száma).

**Halmazműveletek: R ∪ S, R - S, R ∩ S**

**Feltételezés:** Duplikátumok eltávolítása (set semantics)

**Módszer 1: Rendezés alapú**

**Algoritmus:**
1. Rendezd R-t: rendezés_költsége(R)
2. Rendezd S-t: rendezés_költsége(S)
3. Egy menetben összefésülés:
   - Merge-szerű algoritmus
   - Unió: mind a kettő
   - Metszet: csak a közös
   - Különbség: csak R-ben
4. Költség összefésülés: B<sub>R</sub> + B<sub>S</sub>

**Teljes költség:** rendezés(R) + rendezés(S) + B<sub>R</sub> + B<sub>S</sub>

**Módszer 2: Hash alapú**

**Algoritmus:**
1. Hash R-t és S-t ugyanazzal a hash függvénnyel
2. Párban dolgozzuk fel a kosarakat
3. Minden kosárpárra alkalmazzuk a műveletet
**Költség:** 3*(B<sub>R</sub> + B<sub>S</sub>)

**Kimenet mérete (sorok száma):**

**Unió (R ∪ S):**
- **T(R ∪ S) ≈ T(R) + T(S) - T(R ∩ S)**
- Worst case: T(R) + T(S) (diszjunkt)
- Best case: max(T(R), T(S)) (egyik részhalmaza)

**Metszet (R ∩ S):**
- **T(R ∩ S) ≈ min(T(R), T(S))**
- Worst case: min(T(R), T(S))
- Best case: 0 (diszjunkt)

**Különbség (R - S):**
- **T(R - S) ≤ T(R)**
- Worst case: T(R) (diszjunkt)
- Best case: 0 (S ⊇ R)

**Kimenet mérete (blokkok száma):**
- **B(output) = T(output) / bf**
- Függ a rekordmérettől és blokkmérettől

## 354. Összekapcsolások költségei, méretbecslés [2025/26/1, Tételek] (12 pont)

### a. Egyszerű nested loops algoritmusa és költsége.

**Skatulyázott ciklusos (Nested Loop) összekapcsolás:**

**Algoritmus:** R ⋈ S
```
FOR EACH rekord r IN R DO          -- külső ciklus
  FOR EACH rekord s IN S DO        -- belső ciklus
    IF r és s összeilleszthetők THEN
      kimenet r ⋈ s
    ENDIF
  ENDFOR
ENDFOR
```

**Költség:**
- **Legrosszabb eset:** B<sub>R</sub> + N<sub>R</sub> × B<sub>S</sub>
  - B<sub>R</sub>: R beolvasása
  - Minden R rekordra: S teljes beolvasása
  - N<sub>R</sub>: R rekordjainak száma

**Javítás: blokkolással**
- R minden blokkját egyszer olvassuk: B<sub>R</sub>
- Minden R blokkra S-t beolvassuk: B<sub>R</sub> × B<sub>S</sub>
- **Költség:** B<sub>R</sub> + B<sub>R</sub> × B<sub>S</sub>

**Megjegyzés:**
- R legyen a kisebb reláció (külső)
- Nagyon lassú nagy táblákra

### b. Block nested-loop algoritmusa és költsége.

**Blokk-skatulyázott ciklusos összekapcsolás:**

**Algoritmus:** R ⋈ S
```
FOR EACH blokk Br IN R DO          -- külső ciklus (blokkok)
  FOR EACH blokk Bs IN S DO        -- belső ciklus (blokkok)
    FOR EACH rekord r IN Br DO
      FOR EACH rekord s IN Bs DO
        IF r és s összeilleszthetők THEN
          kimenet r ⋈ s
        ENDIF
      ENDFOR
    ENDFOR
  ENDFOR
ENDFOR
```

**Költség:**
- **B<sub>R</sub> + B<sub>R</sub> × B<sub>S</sub>**

**Javítás: több blokk R-ből egyszerre (M-2 blokk)**
```
R-ből M-2 blokk, S-ből 1 blokk, 1 output
```
**Jobb költség:** B<sub>R</sub> + ⌈B<sub>R</sub>/(M-2)⌉ × B<sub>S</sub>

**Legjobb eset:** ha B<sub>R</sub> < M-2
- R elfér a memóriában
- **Költség:** B<sub>R</sub> + B<sub>S</sub>
- Ezért R legyen a kisebb!

### c. Index nested-loop join algoritmusa és költsége.

**Indexelt skatulyázott ciklusos összekapcsolás:**

**Feltétel:** S relációra van index a join attribútumon

**Algoritmus:** R ⋈<sub>A=B</sub> S
```
FOR EACH rekord r IN R DO
  Használd az indexet S.B-re
  Keress minden s-t, ahol s.B = r.A
  Minden találat: kimenet r ⋈ s
ENDFOR
```

**Költség:**
- **B<sub>R</sub> + N<sub>R</sub> × c**
- Ahol c: egy S rekord megtalálásának költsége indexszel
  - B+-fa index: c = h + 1 (fa magassága + 1)
  - Hash index: c = 1 (átlagban)

**Példa:**
- N<sub>R</sub> = 10,000 rekord
- B+-fa magasság: h = 3
- Költség: B<sub>R</sub> + 10,000 × 4 = B<sub>R</sub> + 40,000

**Fontos:**
- R legyen a kisebb reláció
- Index legyen S-en (nagyobb reláció)
- Jó, ha index clustering (adatok rendezettek)

### d. Sort-merge join algoritmusa és költsége.

**Összefésüléses összekapcsolás:**

**Algoritmus:** R ⋈<sub>A=B</sub> S

**Lépések:**
1. **Rendezés:**
   - R rendezése A szerint
   - S rendezése B szerint
2. **Összefésülés:**
   ```
   Párhuzamosan végigmegyünk R-en és S-en
   Amikor r.A = s.B:
     kimenet r ⋈ s
     továbblépünk mindkettőben
   Amikor r.A < s.B:
     továbblépünk R-ben
   Amikor r.A > s.B:
     továbblépünk S-ben
   ```

**Költség:**

**Ha már rendezett mindkét reláció:**
- **B<sub>R</sub> + B<sub>S</sub>** (egy átnézés)

**Ha nem rendezett:**
- **Rendezés(R) + Rendezés(S) + B<sub>R</sub> + B<sub>S</sub>**
- Rendezés költsége: 3*B * (1 + ⌈log<sub>M-1</sub>(B/M)⌉) - B

**Legjobb eset:** mindkét reláció rendezett
**Worst case:** sok azonos értékű rekord (nested loop szükséges)

**Előny:**
- Jó nagy táblákhoz
- Ha eredmény is rendezett kell
- Ekvijoin-ra

### e. Hash-join algoritmusa és költsége.

**Hasításos összekapcsolás:**

**Algoritmus:** R ⋈<sub>A=B</sub> S

**Fázis 1: Partition (hasítás)**
1. Hash R-t h(A) szerint → k kosár (R₁, R₂, ..., Rₖ)
2. Hash S-t h(B) szerint → k kosár (S₁, S₂, ..., Sₖ)
**Költség:** 2*(B<sub>R</sub> + B<sub>S</sub>)

**Fázis 2: Probe (összekapcsolás)**
```
FOR i := 1 TO k DO
  Töltsd be R_i-t memóriába (hash tábla)
  FOR EACH rekord s IN S_i DO
    Keress az R_i hash táblában
    IF találat THEN kimenet r ⋈ s
  ENDFOR
ENDFOR
```
**Költség:** B<sub>R</sub> + B<sub>S</sub>

**Teljes költség:**
- **3*(B<sub>R</sub> + B<sub>S</sub>)**

**Feltétel:**
- A legnagyobb kosár beférjen a memóriába
- B<sub>R</sub>/k < M vagy B<sub>S</sub>/k < M

**Előnyök:**
- Gyors nagy táblákra
- Csak ekvijoin-ra
- Nincs index szükséges

**Hátrányok:**
- Csak egyenlőség join-ra
- Memóriaigényes

**Optimalizálás: Hybrid hash join**
- Első kosár memóriában marad
- Nincs kiírás/beolvasás

### f. Összekapcsolások méretbecslése (három eset).

**Összekapcsolás kimenetének mérete: T(R ⋈ S)**

**1. eset: Nincs közös attribútum (Descartes-szorzat)**
- **T(R × S) = T(R) × T(S)**
- **B(R × S) = T(R) × T(S) / bf**
- Legnagyobb méret

**2. eset: R.A = S.B természetes összekapcsolás**

**2a. Ha A kulcs R-ben, B idegen kulcs S-ben:**
- **T(R ⋈ S) = T(S)**
- Minden S rekord max 1 R rekorddal kapcsolódik
- **B(R ⋈ S) = T(S) / bf**

**2b. Általános eset (egyenletességi feltétel):**
- **T(R ⋈<sub>A=B</sub> S) = T(R) × T(S) / max(I(A,R), I(B,S))**
- Ahol I(A,R): A képmérete R-ben
- **Indoklás:** 
  - Minden R rekord átlagosan T(S)/I(B,S) S rekorddal illeszkedik
  - Szimmetrikusan S-re is

**Példa:**
- T(R) = 1,000, T(S) = 10,000
- I(A,R) = 100, I(B,S) = 50
- T(R ⋈ S) = 1,000 × 10,000 / max(100,50) = 100,000

**3. eset: Több közös attribútum**
- **T(R ⋈ S) = T(R) × T(S) / (I(A₁,R) × I(A₂,R) × ...)**
- Minden közös attribútumra szelektivitás

**Blokkok száma:**
**B(R ⋈ S) = T(R ⋈ S) × (l(R) + l(S)) / B**
- Rekordméret: összeillesztett rekord mérete

## 355. Relációs algebrai ekvivalencia szabályok [2025/26/1, Tételek] (12 pont)

### a. Mikor mondjuk azt, hogy két relációs algebrai kifejezés ekvivalens?

**Definíció:**

Két E₁ és E₂ relációs algebrai kifejezés **ekvivalens (E₁ ≃ E₂)**, ha:
- **Tetszőleges r₁, r₂, ..., rₖ relációkra E₁(r₁,...,rₖ) = E₂(r₁,...,rₖ)**
- Azaz: bármilyen adatbázisállapotra ugyanazt az eredményt adják

**Jelentősége:**
- Ekvivalens kifejezések **különböző költségűek** lehetnek
- Optimalizálás: ekvivalens átalakításokkal olcsóbb kifejezést keresünk
- Az eredmény ugyanaz, de a végrehajtás gyorsabb

**Példa:**
- σ<sub>A=a</sub>(R ⋈ S) ≃ σ<sub>A=a</sub>(R) ⋈ S (ha A ∈ R attribútuma)
- Mindkét kifejezés ugyanazt adja
- De a második olcsóbb (kisebb R-rel kapcsol)

### b. Adjuk meg a relációs algebrai ekvivalencia szabályokat!

**1. Kommutatív szabályok:**
- E₁ × E₂ ≃ E₂ × E₁ (szorzás)
- E₁ ⋈ E₂ ≃ E₂ ⋈ E₁ (összekapcsolás)
- E₁ ⋈<sub>F</sub> E₂ ≃ E₂ ⋈<sub>F</sub> E₁ (theta join)
- E₁ ∪ E₂ ≃ E₂ ∪ E₁ (unió)
- E₁ ∩ E₂ ≃ E₂ ∩ E₁ (metszet)

**2. Asszociatív szabályok:**
- (E₁ × E₂) × E₃ ≃ E₁ × (E₂ × E₃) (szorzás)
- (E₁ ⋈ E₂) ⋈ E₃ ≃ E₁ ⋈ (E₂ ⋈ E₃) (összekapcsolás)
- (E₁ ∪ E₂) ∪ E₃ ≃ E₁ ∪ (E₂ ∪ E₃) (unió)
- (E₁ ∩ E₂) ∩ E₃ ≃ E₁ ∩ (E₂ ∩ E₃) (metszet)

**3. Kiválasztás (σ) szabályok:**
- **Konjunkció szétbontása:**
  - σ<sub>F₁∧F₂</sub>(E) ≃ σ<sub>F₁</sub>(σ<sub>F₂</sub>(E))
- **Kommutativitás:**
  - σ<sub>F₁</sub>(σ<sub>F₂</sub>(E)) ≃ σ<sub>F₂</sub>(σ<sub>F₁</sub>(E))
- **Kaszkádos kiválasztás:**
  - σ<sub>F</sub>(σ<sub>G</sub>(E)) ≃ σ<sub>F∧G</sub>(E)

**4. Vetítés (π) szabályok:**
- **Kaszkád:**
  - π<sub>A</sub>(π<sub>B</sub>(E)) ≃ π<sub>A</sub>(E), ha A ⊆ B
- **Vetítések összevonása:**
  - Ha csak A attribútumok kellenek, korai vetítés

**5. Kiválasztás + Szorzat/Join:**
- **σ<sub>F</sub>(E₁ × E₂) ≃ σ<sub>F</sub>(E₁) × E₂**, ha F csak E₁ attribútumait említi
- **σ<sub>F</sub>(E₁ ⋈ E₂) ≃ σ<sub>F</sub>(E₁) ⋈ E₂**, ha F csak E₁ attribútumait említi
- **σ<sub>F₁∧F₂</sub>(E₁ × E₂) ≃ σ<sub>F₁</sub>(E₁) × σ<sub>F₂</sub>(E₂)**
- **Join konverzió:**
  - σ<sub>F</sub>(E₁ × E₂) ≃ E₁ ⋈<sub>F</sub> E₂, ha F join feltétel

**6. Vetítés + Join:**
- **π<sub>A</sub>(E₁ ⋈<sub>F</sub> E₂) ≃ π<sub>A</sub>(π<sub>A∪B</sub>(E₁) ⋈<sub>F</sub> π<sub>A∪C</sub>(E₂))**
  - Ahol B: E₁-ből F-ben szereplő attribútumok
  - C: E₂-ből F-ben szereplő attribútumok
- Korai vetítés → kisebb relációk

**7. Halmazműveletek:**
- **Kommutativitás:** E₁ ∪ E₂ ≃ E₂ ∪ E₁
- **Asszociativitás:** (E₁ ∪ E₂) ∪ E₃ ≃ E₁ ∪ (E₂ ∪ E₃)
- **Kiválasztás elosztása:**
  - σ<sub>F</sub>(E₁ ∪ E₂) ≃ σ<sub>F</sub>(E₁) ∪ σ<sub>F</sub>(E₂)
  - σ<sub>F</sub>(E₁ - E₂) ≃ σ<sub>F</sub>(E₁) - σ<sub>F</sub>(E₂)
- **Vetítés elosztása:**
  - π<sub>A</sub>(E₁ ∪ E₂) ≃ π<sub>A</sub>(E₁) ∪ π<sub>A</sub>(E₂)

## 356. Szabály alapú optimalizáció [2025/26/1, Tételek] (12 pont)

### a. Melyek a szabály alapú optimalizálás heurisztikus alapelvei?

**Heurisztikus alapelvek (általános érvényű szabályok):**

**1. Minél hamarabb szelektáljunk:**
- σ műveleteket minél mélyebbre visszük a kifejezésfában
- Csökkenti a köztes eredmények méretét
- **Szabály:** σ<sub>F</sub>(E₁ ⋈ E₂) → σ<sub>F</sub>(E₁) ⋈ E₂ (ha F csak E₁-et érinti)

**2. Próbáljunk természetes összekapcsolásokat képezni szorzások helyett:**
- σ<sub>F</sub>(R × S) → R ⋈<sub>F</sub> S
- Összekapcsolás hatékonyabban számolható

**3. Vonjuk össze az egymás utáni unáris műveleteket:**
- σ<sub>F₁</sub>(σ<sub>F₂</sub>(E)) → σ<sub>F₁∧F₂</sub>(E)
- π<sub>A</sub>(π<sub>B</sub>(E)) → π<sub>A</sub>(E)
- Egy menetben végrehajtható

**4. Keressünk közös részkifejezéseket:**
- Egyszer számoljuk ki, többször használjuk
- Materialization vagy pipelining

**5. Korai vetítés:**
- π műveleteket vigyük mélyebbre
- Csak a szükséges attribútumokat tartjuk meg
- **De:** figyelni kell a későbbi műveletekre szükséges attribútumokra

**6. Használjunk indexeket:**
- Ha van megfelelő index, használjuk
- Index nested loop join

**Cél:** kisebb köztes relációk → olcsóbb végrehajtás

### b. Add meg a szabály alapú optimalizációs algoritmus lépéseit.

**Szabály alapú optimalizáció algoritmusa:**

**1. lépés: Kifejezésfa felépítése**
- SQL vagy más nyelv → relációs algebrai kifejezésfa
- Levélek: táblák
- Csúcsok: műveletek

**2. lépés: Kiválasztások felbontása és mélyebbre vitele**
- σ<sub>F₁∧F₂∧...∧Fₖ</sub> → σ<sub>F₁</sub>, σ<sub>F₂</sub>, ..., σ<sub>Fₖ</sub>
- Minden σ-t minél mélyebbre visszük
- Alkalmazható szabályok:
  - σ<sub>F</sub>(E₁ ⋈ E₂) → σ<sub>F</sub>(E₁) ⋈ E₂ (ha F csak E₁-et érinti)
  - σ<sub>F</sub>(E₁ × E₂) → σ<sub>F</sub>(E₁) × E₂

**3. lépés: Vetítések mélyebbre vitele**
- Csak a szükséges attribútumokat tartjuk meg
- Vigyük közel a levélcsúcsokhoz
- **Figyelem:** join és egyéb műveletek attribútumai is kellenek!

**4. lépés: Válasszuk ki a legszelektívebb szelekciót**
- Először a legszelektívebb feltételt hajtsuk végre
- Ezzel minimalizáljuk a köztes eredmény méretet

**5. lépés: Egymást követő unáris műveletek összevonása**
- Több σ → egy σ konjunkcióval
- Több π → egy π (ha lehetséges)
- **Pipeline:** egy menetben végrehajtás

**6. lépés: Szorzások átalakítása összekapcsolásokká**
- σ<sub>F</sub>(E₁ × E₂) → E₁ ⋈<sub>F</sub> E₂
- Hatékonyabb végrehajtás

**7. lépés: Bináris műveletek sorrendjének meghatározása**
- Join sorrend kiválasztása (a legjobb méretű köztes eredmények)
- Bal-mély fa építése

**8. lépés: Közös részkifejezések azonosítása**
- Materializálás vagy pipelining

**Eredmény:** Optimalizált kifejezésfa

### c. Mutass részletes példát a szabály alapú optimalizáció lépéseire.

**Kiindulási SQL lekérdezés:**
```sql
SELECT Student.name
FROM Student, Enrolled, Course
WHERE Student.sid = Enrolled.sid
  AND Enrolled.cid = Course.cid
  AND Course.dept = 'CS'
  AND Student.age < 20
```

**Kezdeti kifejezésfa:**
```
π<sub>name</sub>(
  σ<sub>S.sid=E.sid ∧ E.cid=C.cid ∧ C.dept='CS' ∧ S.age<20</sub>(
    Student × Enrolled × Course
  )
)
```

**1. lépés: Kifejezésfa felépítése**
```
         π_name
           |
      σ_(összes feltétel)
           |
         × 
       /   \
      ×     Course
    /   \
Student  Enrolled
```

**2. lépés: Kiválasztások szétbontása és mélyebbre vitele**

Bontás:
- σ<sub>S.sid=E.sid</sub>
- σ<sub>E.cid=C.cid</sub>
- σ<sub>C.dept='CS'</sub>
- σ<sub>S.age<20</sub>

Mélyebbre vitel:
```
         π_name
           |
          ⋈_(S.sid=E.sid)
        /              \
σ_(S.age<20)      ⋈_(E.cid=C.cid)
    |                  /        \
  Student        Enrolled    σ_(C.dept='CS')
                                  |
                               Course
```

**3. lépés: Szorzások → természetes összekapcsolások**
- Már megtörtént (σ feltételek join-okká alakultak)

**4. lépés: Vetítések mélyebbre vitele**
```
         π_name
           |
      ⋈_(S.sid=E.sid)
      /              \
π_(name,sid)     ⋈_(E.cid=C.cid)
    |                /          \
σ_(age<20)    π_(sid,cid)    π_(cid)
    |              |              |
Student        Enrolled     σ_(dept='CS')
                                 |
                              Course
```

**5. lépés: Unáris műveletek összevonása**
```
         π_name
           |
      ⋈_(sid)
      /        \
π_name,sid   ⋈_(cid)
σ_age<20      /        \
    |    π_sid,cid    π_cid
Student   Enrolled   σ_dept='CS'
                     Course
```

**Végső optimalizált fa:**
- Korai szelekciók (σ)
- Korai vetítések (π)
- Join-ok bal-mély fában
- Kisebb köztes relációk

**Előny becslése:**
- Student: 10,000 rekord → σ után: 1,000 (10%)
- Course: 1,000 rekord → σ után: 100 (CS dept)
- Enrolled: 50,000 rekord
- Összekötések kisebb relációkkal történnek!

## 357. Többtáblás lekérdezések optimalizációja [2025/26/1, Tételek] (12 pont)

### a. Milyen feladatként értelmezhetjük az összekapcsolási sorrend kiválasztását? Mi a lényege?

**Feladat:** Adott n reláció összekapcsolása - milyen sorrendben kapcsoljuk össze őket a leghatékonyabban?

**Probléma megfogalmazása:**
- **Input:** R₁, R₂, ..., Rₙ relációk
- **Output:** optimális összekapcsolási sorrend
- **Cél:** minimalizálni a végrehajtási költséget

**Lényege:**

**1. Költségminimalizálás:**
- Különböző sorrendek → különböző köztes eredmények
- Köztes eredmények mérete → összköltség
- **Cél:** legkisebb köztes relációk

**2. Kombinatorikai robbanás:**
- n tábla → n! lehetséges sorrend
- n=10: 3,628,800 lehetőség
- Nem próbálhatunk ki mindent!

**3. Dinamikus programozás vagy mohó algoritmus:**
- Hatékony keresés a jó megoldásra
- Nem minden lehetőséget vizsgálunk

**Példa:**
```
R₁ ⋈ R₂ ⋈ R₃

Lehetőségek:
1. (R₁ ⋈ R₂) ⋈ R₃
2. (R₁ ⋈ R₃) ⋈ R₂
3. (R₂ ⋈ R₃) ⋈ R₁

Ha T(R₁)=100, T(R₂)=10,000, T(R₃)=1,000
→ Érdemes először R₁ ⋈ R₃ (kisebbek)
```

**Kulcsfontosságú megfigyelés:** a join sorrend nagyban befolyásolja a teljesítményt!

### b. Mik azok az összekapcsolási fák? Milyen típusú összekapcsolási fákat rajzolhatunk?

**Összekapcsolási fa (join tree):**
- A join műveletek végrehajtási sorrendjét ábrázoló fa
- Levélek: bázis relációk
- Belső csúcsok: join műveletek

**Típusok:**

**1. Bal-mély fa (left-deep tree):**
```
       ⋈
      / \
     ⋈   R₄
    / \
   ⋈   R₃
  / \
 R₁  R₂
```
- Lineáris lánc balra
- ((R₁ ⋈ R₂) ⋈ R₃) ⋈ R₄
- Jobb oldal mindig bázis reláció

**Előnyök:**
- Pipeline-olható (nincs materializáció)
- Kevesebb lehetőség (n!)
- Legtöbb optimalizáló ezt használja

**2. Jobb-mély fa (right-deep tree):**
```
    ⋈
   / \
  R₁  ⋈
     / \
    R₂  ⋈
       / \
      R₃  R₄
```
- Lineáris lánc jobbra
- R₁ ⋈ (R₂ ⋈ (R₃ ⋈ R₄))
- Bal oldal mindig bázis reláció

**3. Bozótszerű fa (bushy tree):**
```
      ⋈
    /   \
   ⋈     ⋈
  / \   / \
 R₁ R₂ R₃ R₄
```
- Kiegyensúlyozott fa
- (R₁ ⋈ R₂) ⋈ (R₃ ⋈ R₄)
- Mindkét ág lehet összetett

**Előnyök:**
- Párhuzamosítható
- Jobb multiprocesszor kihasználás

**Hátrányok:**
- Materializáció szükséges
- Több lehetőség (exponenciális)

**4. Zig-zag fa:**
- Vegyes szerkezet
- Kombinációja az előzőeknek

### c. Hány féle összekapcsolási fa lehetséges N tábla esetén?

**Összes join fa:**
- **T(n) × n!** lehetőség
- Ahol T(n): Catalan-szám = C(2n-2, n-1) / n
- **T(n) ≈ 4ⁿ / (n^(3/2) × √π)**

**Számok:**
- n=3: T(3)×3! = 2×6 = 12
- n=4: T(4)×4! = 5×24 = 120  
- n=5: T(5)×5! = 14×120 = 1,680
- n=10: ~176,000,000 (176 millió!)

**Bal-mély fák száma:**
- **n!** lehetőség
- n=3: 6
- n=4: 24
- n=5: 120
- n=10: 3,628,800

**Jobb-mély fák száma:**
- Szintén **n!**

**Bozótszerű fák:**
- Még több (minden lehetséges fastruktúra)

**Következtetés:**
- Exponenciális növekedés
- Nem vizsgálhatunk meg mindent
- **Megoldás:** csak bal-mély fákat vizsgálunk (n! helyett T(n)×n!)
- Vagy heurisztikus algoritmusok (mohó, dinamikus programozás)

### d. Hogyan működik a mohó algoritmus az összekapcsolási sorrend kiválasztására?

**Mohó (greedy) algoritmus:**

**Alapelv:** minden lépésben a lokálisan legjobb döntést hozzuk

**Algoritmus:**

```
Rendelkezésre álló relációk: {R₁, R₂, ..., Rₙ}
Eredmény := üres

WHILE (rendelkezésre álló relációk nem üres) DO
  Válasszunk két relációt Rᵢ, Rⱼ:
    - Amelyek összekapcsolhatók
    - És a Rᵢ ⋈ Rⱼ költsége + kimenet mérete minimális
  
  Eredmény := Eredmény ⋈ (Rᵢ ⋈ Rⱼ)
  Vegyük ki Rᵢ-t és Rⱼ-t
  Tegyük be (Rᵢ ⋈ Rⱼ)-t
ENDWHILE
```

**Részletesen:**

**1. lépés:** Válasszuk a két relációt, amelyek összekapcsolásának költsége + eredmény mérete minimális
**2. lépés:** Kapcsoljuk össze őket → köztes reláció
**3. lépés:** Köztes relációt tekintjük egy új relációnak
**4. lépés:** Ismételjük, amíg egy relációnk van

**Példa:**
```
R₁(100), R₂(1000), R₃(50), R₄(500)

Lépés 1: R₁ ⋈ R₃ = 200 (legkisebb)
Lépés 2: (R₁⋈R₃) ⋈ R₄ = 500
Lépés 3: ((R₁⋈R₃)⋈R₄) ⋈ R₂
```

**Hátrány:** nem garantál optimális megoldást (lokális optimum ≠ globális)

**Előny:** gyors (polinomiális idő)

### e. Mi a Selinger-féle optimalizálás?

**Selinger algoritmus (System R):**
- **Dinamikus programozás alapú**
- **Teljes költség alapú optimalizálás**

**Alapötlet:**

**1. Részhalmazokra optimalizálunk:**
- k elemű részhalmazok optimális join-ja
- Építkezünk: 1 → 2 → 3 → ... → n elemű részhalmazok

**2. Dinamikus programozás:**
```
FOR méret := 1 TO n DO
  FOR EACH S ⊆ {R₁,...,Rₙ}, |S| = méret DO
    Ha méret = 1:
      Költség(S) := 0 (bázis reláció)
    Különben:
      FOR EACH S = S₁ ∪ S₂ felosztás DO
        Költség := Költség(S₁) + Költség(S₂) + 
                   Költség(S₁ ⋈ S₂)
        Ha ez jobb: frissítsd Költség(S)-t
      ENDFOR
  ENDFOR
ENDFOR
```

**Kulcselemek:**

**1. Interesting orders (érdekes rendezések):**
- Nemcsak költséget, hanem rendezést is figyelembe vesz
- Egy rendezett köztes eredmény később hasznos lehet

**2. Csak bal-mély fákat vizsgál:**
- Csökkenti a keresési teret n!-ra

**3. Költségmodell:**
- IO költség + CPU költség
- Statisztikák használata

**4. Memoizáció:**
- Minden részprobléma optimumát tároljuk
- Nem számoljuk újra

**Komplexitás:**
- O(n × 2ⁿ) helyett n! teljes keresés
- Exponenciális, de kezelhető n≤15-ig

**Példa n=3:**
```
Méret 1: {R₁}, {R₂}, {R₃} - költség: 0
Méret 2: 
  {R₁,R₂}: R₁⋈R₂ vagy R₂⋈R₁ - választ jobbat
  {R₁,R₃}: R₁⋈R₃ vagy R₃⋈R₁
  {R₂,R₃}: R₂⋈R₃ vagy R₃⋈R₂
Méret 3:
  {R₁,R₂,R₃}: 
    (R₁⋈R₂)⋈R₃
    (R₁⋈R₃)⋈R₂
    (R₂⋈R₃)⋈R₁
  → választ legolcsóbbat
```

**Eredmény:** optimális bal-mély fa a legkisebb költséggel

## 358. UNDO naplózás [2025/26/1, Tételek] (12 pont)

### a. Add meg az UNDO naplózás U1 és U2 szabályát.

**UNDO naplózás szabályai:**

**U1 szabály (naplózás előtt módosítás):**
- Ha a T tranzakció módosítja az X adatbáziselemet, akkor a `<T, X, v>` naplóbejegyzésnek **a lemezen kell lennie mielőtt** az X új értékét a lemezre írnánk
- **Jelentés:** először naplózzunk, aztán írjuk ki az adatot
- **WAL elv része:** Write-Ahead Logging

**U2 szabály (COMMIT előtt adatkiírás):**
- Ha egy T tranzakció **hibamentesen befejeződött**, akkor a `<T, COMMIT>` naplóbejegyzést **csak azután** szabad a lemezre írni, hogy a T által módosított **összes adatbáziselem már a lemezre íródott**
- **Jelentés:** COMMIT előtt minden módosítást ki kell írni

**Következmények:**
- Piszkos puffereket COMMIT előtt ki kell írni
- COMMIT utáni összeomlás: nem kell helyreállítani (már lemezen van)
- COMMIT előtti összeomlás: UNDO kell

### b. Mi a lemezre írás sorrendje UNDO naplózás esetén?

**Lemezre írási sorrend UNDO esetén:**

**Tranzakció futása során:**
1. **`<T, START>` napló** → lemezre
2. **`<T, X, régi_érték>` napló** → lemezre (minden módosításnál)
3. **Módosított X** → lemezre (piszkos puffer kiírása)
4. **OUTPUT(X)** bármikor végrehajtható (akár COMMIT előtt is)
5. **Minden módosított adat** → lemezre (U2 miatt!)
6. **`<T, COMMIT>` napló** → lemezre (csak minden adat után!)

**Kritikus sorrend:**
```
Napló: <T,X,v>  →  Adat: X  →  Napló: <COMMIT>
       [disk]         [disk]      [disk]
```

**Fontos szabályok:**
- `<T,X,v>` előbb, mint X kiírása (U1)
- X kiírása előbb, mint `<COMMIT>` (U2)

**Flush (FLUSH LOG):**
- Napló puffer kiürítése lemezre
- Garantálja, hogy napló lemezen van

### c. Add meg a helyreállítás algoritmusát UNDO naplózás esetén.

**UNDO helyreállítási algoritmus:**

**Cél:** visszavonni a be nem fejezett tranzakciók hatásait

**Algoritmus:**

```
1. Azonosítsuk a be nem fejezett tranzakciókat:
   UNDO_list := {T | <T,START> van, de nincs <T,COMMIT>}

2. Lépjünk végig a naplón hátrafelé (végéről az elejére):
   FOR EACH <T, X, v> bejegyzés DO
     IF T ∈ UNDO_list THEN
       WRITE(X, v)        -- régi érték visszaírása
       OUTPUT(X)          -- lemezre írás
     ENDIF
   ENDFOR
   
   FOR EACH <T, START> bejegyzés DO
     IF T ∈ UNDO_list THEN
       Töröljük T-t UNDO_list-ből
       (opcionális: írjunk <T, ABORT> bejegyzést)
     ENDIF
   ENDFOR

3. Ha UNDO_list üres: helyreállítás kész
```

**Részletesen:**
- **Hátrafelé haladunk** a naplóban (legutolsó módosítástól visszafelé)
- Minden be nem fejezett T tranzakcióra:
  - Megkeressük a `<T, X, v>` bejegyzéseket
  - Visszaírjuk X régi értékét (v)
- **Idempotencia:** többször is futtatható (mindig ugyanazt csinálja)

**Példa:**
```
Napló:
<T1,START>
<T1,A,5>
<T1,B,10>
<T2,START>
<T2,C,15>
<T1,COMMIT>
<T2,D,20>
[ÖSSZEOMLÁS]

Helyreállítás:
- UNDO_list = {T2} (nincs COMMIT)
- Hátrafelé: <T2,D,20> → D:=20
- Hátrafelé: <T2,C,15> → C:=15
- T1 COMMIT-olt → nem kell UNDO
```

### d. Egyszerű ellenőrzőpont képzés lépései (ellenőrzőpont leállítással).

**Egyszerű ellenőrzőpont (leállításos checkpoint):**

**Cél:** korlátozzuk, meddig kell visszamenni a helyreállításban

**Lépések:**

**1. Új tranzakciók leállítása**
- Nem engedünk új tranzakciókat indulni

**2. Várakozás a futó tranzakciók befejeződésére**
- Amíg minden aktív tranzakció be nem fejeződik (COMMIT vagy ABORT)

**3. Piszkos pufferek kiírása**
- OUTPUT(X) minden piszkos X-re
- Minden módosított blokk lemezre

**4. Checkpoint napló bejegyzés kiírása**
- `<CHECKPOINT>` bejegyzés a naplóba
- Napló lemezre írása (FLUSH LOG)

**5. Folytatás**
- Új tranzakciók indulhatnak

**Helyreállítás ellenőrzőponttal:**
```
IF van <CHECKPOINT> a naplóban THEN
  Csak a legutolsó CHECKPOINT után kezdődött tranzakciókat kell vizsgálni
  (Minden korábbi tranzakció befejezett és adatai lemezen vannak)
ELSE
  A napló elejétől kell helyreállítani
ENDIF
```

**Hátrány:**
- Leállítja a rendszert
- Nem használható production környezetben
- Lassú

**Előny:**
- Egyszerű implementáció
- Garantáltan konzisztens

### e. Működés közbeni ellenőrzőpont képzés UNDO esetén, helyreállítás.

**Működés közbeni (non-quiescent) checkpoint UNDO-hoz:**

**Lépések (nem állunk le):**

**1. Napló bejegyzés a futó tranzakciókról:**
- `<START CKPT(T₁, T₂, ..., Tₖ)>` a naplóba
- T₁, ..., Tₖ: az aktív (még nem commitált) tranzakciók

**2. Piszkos pufferek kiírása (háttérben):**
- Új tranzakciók közben is futhatnak!
- OUTPUT(X) minden piszkos X-re

**3. Checkpoint lezárása:**
- `<END CKPT>` bejegyzés a naplóba
- Napló kiírása (FLUSH LOG)

**Működés közben:**
- Új tranzakciók indulhatnak
- Futó tranzakciók folytatódnak
- Nem blokkolunk

**Helyreállítási algoritmus:**

```
1. Keressük a legutolsó <END CKPT>-t

2. Ha van <END CKPT>:
   - Keressük a hozzá tartozó <START CKPT(T₁,...,Tₖ)>-t
   - UNDO_list := {T₁, T₂, ..., Tₖ}
   - Helyreállítás kezdete: START CKPT
   
3. Ha nincs <END CKPT>, de van <START CKPT>:
   - Keressük a hozzá tartozó <START CKPT(T₁,...,Tₖ)>-t
   - UNDO_list := {T₁, T₂, ..., Tₖ}
   - Helyreállítás kezdete: START CKPT
   
4. Ha nincs CKPT:
   - UNDO_list := üres
   - Helyreállítás kezdete: napló eleje

5. Előre haladva a naplóban (START CKPT-től):
   - <T,START>: T hozzáadása UNDO_list-hez
   - <T,COMMIT>: T eltávolítása UNDO_list-ből

6. Hátrafelé haladva végezzük az UNDO-t:
   FOR EACH T ∈ UNDO_list DO
     Visszaírjuk a régi értékeket
   ENDFOR
```

**Példa:**
```
<T1,START>
<T1,A,5>
<START CKPT(T1)>
<T2,START>
<T1,B,10>
<T2,C,15>
<END CKPT>
<T1,COMMIT>
<T2,D,20>
[ÖSSZEOMLÁS]

Helyreállítás:
- Van END CKPT → START CKPT(T1)
- UNDO_list kezdetben: {T1}
- Előrefelé: +T2, -T1 (commit) → {T2}
- UNDO T2: D:=20, C:=15
```

**Előny:**
- Nem állítja le a rendszert
- Gyorsabb checkpoint
- Production-ready

## 359. REDO naplózás [2025/26/1, Tételek] (12 pont)

### a. Add meg a REDO naplózás R1 szabályát.

**R1 szabály (COMMIT előtt napló, COMMIT után adat):**

**Teljes szabály:**
Mielőtt az adatbázis bármely X elemét a lemezen módosítanánk, az X módosítására vonatkozó **összes naplóbejegyzésnek** (`<T, X, v>` és `<T, COMMIT>`) **a lemezre kell kerülnie**.

**Röviden:** 
- Naplóbejegyzések → lemez
- COMMIT bejegyzés → lemez
- **Csak ezután:** módosított X → lemez

**Következmények:**
- Piszkos pufferek **NEM írhatók ki COMMIT előtt**
- COMMIT után kezdhetjük el az adatok kiírását
- COMMIT előtti összeomlás: nem maradt nyom az adatokban (nem kell UNDO)
- COMMIT utáni összeomlás: napló alapján REDO

**Sorrend:**
```
<T,X,új> → <T,COMMIT> → X kiírása
 [disk]      [disk]      [disk]
```

### b. Mi a lemezre írás sorrendje REDO naplózás esetén?

**Lemezre írási sorrend REDO esetén:**

**Tranzakció futása során:**
1. **`<T, START>` napló** → lemezre
2. **`<T, X, új_érték>` napló** → lemezre (minden módosításnál)
3. **Módosítások memóriában** (piszkos pufferek)
4. **`<T, COMMIT>` napló** → lemezre (**FLUSH LOG**)
5. **Módosított adatok** → lemezre (piszkos pufferek kiírása)

**Kritikus sorrend:**
```
Napló: <T,X,v>  →  Napló: <COMMIT>  →  Adat: X
       [disk]          [disk]            [disk]
```

**Fontos különbség UNDO-tól:**
- **UNDO:** adat kiírás COMMIT **előtt**
- **REDO:** adat kiírás COMMIT **után**

**Piszkos pufferek:**
- COMMIT előtt felhalmozódhatnak
- COMMIT után fokozatosan kiírhatók
- Több memória kell

**Flush log:**
- COMMIT előtt kötelező
- Garantálja, hogy napló lemezen van

### c. Add meg a helyreállítás algoritmusát REDO naplózás esetén.

**REDO helyreállítási algoritmus:**

**Cél:** újra elvégezni a commitált tranzakciók műveleteit

**Algoritmus:**

```
1. Azonosítsuk a commitált tranzakciókat:
   REDO_list := {T | <T,START> és <T,COMMIT> is van}

2. Lépjünk végig a naplón előre (elejétől a végéig):
   FOR EACH <T, X, v> bejegyzés DO
     IF T ∈ REDO_list THEN
       WRITE(X, v)        -- új érték kiírása
       OUTPUT(X)          -- lemezre írás
     ENDIF
   ENDFOR

3. Helyreállítás kész
   (opcionálisan: írjunk <T,END> bejegyzéseket)
```

**Részletesen:**
- **Előrefelé haladunk** a naplóban
- Csak commitált tranzakciókat REDO-zzuk
- Be nem fejezett tranzakciók: nem maradt nyomuk az adatokban
- Minden `<T,X,v>` esetén: X := v (új érték)

**Idempotencia:** 
- Többször is futtatható
- Mindig ugyanaz az eredmény

**Példa:**
```
Napló:
<T1,START>
<T1,A,50>
<T1,B,100>
<T1,COMMIT>
<T2,START>
<T2,C,150>
[ÖSSZEOMLÁS]

Helyreállítás:
- REDO_list = {T1} (van COMMIT)
- Előre: <T1,A,50> → A:=50
- Előre: <T1,B,100> → B:=100
- T2 nincs REDO_list-ben → nem írunk semmit
```

**Megjegyzés:**
- T2 módosításai nem kerültek lemezre (nincs COMMIT)
- Nem kell UNDO, mert nem íródtak ki

### d. Mi a különbség a REDO és a módosított REDO napló között?

**Normál REDO napló:**
- `<T, X, új_érték>`
- Minden módosításnál új bejegyzés
- **Probléma:** ha ugyanazt az X-et sokszor módosítjuk → sok naplóbejegyzés

**Módosított REDO napló:**
- Csak a **végső értéket** naplózzuk
- Ha X-et többször módosítjuk:
  - Első módosítás: `<T, X, v₁>`
  - Második módosítás: **frissítjük** a bejegyzést: `<T, X, v₂>`
  - ...
  - Végül: `<T, X, v_végső>`

**Különbségek:**

| Szempont | Normál REDO | Módosított REDO |
|----------|-------------|-----------------|
| Naplóméret | Nagy (minden módosítás) | Kisebb (csak végső) |
| Helyreállítás | Szekvenciális REDO | Gyorsabb (kevesebb) |
| Implementáció | Egyszerű (append) | Bonyolultabb (update) |
| Idempotencia | Igen | Igen |

**Módosított REDO előnyei:**
- Kisebb naplóméret
- Gyorsabb helyreállítás
- Kevesebb IO

**Hátrányok:**
- Bonyolultabb implementáció
- Naplóbejegyzéseket módosítani kell (nem csak append)

**Példa:**
```
Normál REDO:
<T,X,10>
<T,X,20>
<T,X,30>
<T,COMMIT>

Módosított REDO:
<T,X,30>   (csak a végső érték)
<T,COMMIT>
```

### e. Ellenőrzőpont képzés REDO esetén, helyreállítás.

**Működés közbeni checkpoint REDO-hoz:**

**Checkpoint lépései:**

**1. `<START CKPT(T₁,...,Tₖ)>` napló kiírása:**
- T₁, ..., Tₖ: aktív tranzakciók
- Napló → lemezre (FLUSH LOG)

**2. Piszkos pufferek kiírása (háttérben):**
- OUTPUT(X) minden piszkos X-re
- **Figyelem:** csak a checkpoint előtti tranzakciók piszkos pufferjeit!
- Új tranzakciók futhatnak közben

**3. `<END CKPT>` napló kiírása:**
- Piszkos pufferek kiírása befejeződött
- Napló → lemezre

**Helyreállítási algoritmus REDO checkpointtal:**

```
1. Keressük a legutolsó <END CKPT>-t

2. Ha van <END CKPT>:
   Keressük a hozzá tartozó <START CKPT(T₁,...,Tₖ)>-t
   Helyreállítás kezdete: START CKPT
   
3. Ha nincs <END CKPT>, de van <START CKPT>:
   Keressük az előző <END CKPT>-t
   Helyreállítás kezdete: előző START CKPT
   
4. Ha nincs CKPT:
   Helyreállítás kezdete: napló eleje

5. START CKPT-től a napló végéig:
   REDO_list := {T₁, ..., Tₖ}  (START CKPT-ben)
   
   FOR EACH bejegyzés START CKPT után DO
     <T,START>: T hozzáadása REDO_list-hez
     <T,COMMIT>: T marad REDO_list-ben
   ENDFOR

6. Előrefelé REDO a START CKPT-től:
   FOR EACH <T,X,v> DO
     IF T commitált (van <T,COMMIT>) THEN
       X := v (REDO)
     ENDIF
   ENDFOR
```

**Példa:**
```
<T1,START>
<START CKPT(T1)>
<T1,A,50>
<T2,START>
<T2,B,100>
<END CKPT>
<T1,COMMIT>
<T2,C,150>
<T2,COMMIT>
[ÖSSZEOMLÁS]

Helyreállítás:
- Van END CKPT → START CKPT(T1)
- REDO_list = {T1} (majd +T2)
- T1 és T2 commitált → REDO mindkettő
- REDO: A:=50, B:=100, C:=150
```

**Előny:**
- Nem állítja le a rendszert
- Korlátozza a helyreállítási időt
- Csak START CKPT után kezdődött/folytatódott tranzakciókat kell vizsgálni

## 360. UNDO/REDO naplózás [2025/26/1, Tételek] (12 pont)

### a. Add meg az UNDO/REDO naplózás UR1 szabályát.

**UR1 szabály (WAL - Write-Ahead Logging):**

**Teljes szabály:**
Mielőtt az adatbázis bármely X elemének értékét a lemezen módosítanánk, ezt megelőzően a `<T, X, v, w>` naplóbejegyzésnek **lemezre kell kerülnie**.

**Röviden:**
- **Napló előbb, adat utána**
- `<T, X, régi, új>` → lemez
- **Csak ezután:** X → lemez

**Jelentősége:**
- Biztosítja a helyreállíthatóságot
- Mindig megvan a napló, ha az adat módosul
- **WAL elv alapköve**

**v:** régi érték (UNDO-hoz)  
**w:** új érték (REDO-hoz)

**Sorrend:**
```
Napló: <T,X,régi,új>  →  Adat: X
       [disk]               [disk]
```

### b. Add meg az UNDO/REDO naplózás UR2 szabályát.

**UR2 szabály (COMMIT után napló):**

**Nincs UR2 korlátozás!**

**Szabadság:**
- A `<T, COMMIT>` bejegyzés **bármikor kiírható** a lemezre
- **Előtte vagy utána** is kiírhatjuk a módosított adatokat
- Legnagyobb rugalmasság

**Lehetőségek:**

**1. Adatok COMMIT előtt:**
- Piszkos pufferek korán kiírhatók
- Ha összeomlás COMMIT előtt: UNDO
- Ha összeomlás COMMIT után: elvileg nem kell semmi (de REDO is működik)

**2. Adatok COMMIT után:**
- Piszkos pufferek felhalmozódnak
- Ha összeomlás COMMIT után: REDO szükséges

**3. Vegyes:**
- Néhány piszkos puffer előtte, néhány utána
- Mindkét irány támogatott

**Előny:**
- Legnagyobb szabadság
- Pufferkezelő dönthet
- Nincs kényszerített írás
- Optimális IO stratégia

### c. Add meg a helyreállítás algoritmusát UNDO/REDO naplózás esetén.

**UNDO/REDO helyreállítási algoritmus:**

**Cél:** 
- UNDO: be nem fejezett tranzakciók visszavonása
- REDO: commitált tranzakciók újra végrehajtása

**Algoritmus:**

```
1. Azonosítsuk a tranzakciókat:
   UNDO_list := {T | <T,START> van, de nincs <T,COMMIT>}
   REDO_list := {T | <T,START> és <T,COMMIT> is van}

2. REDO fázis (előrefelé a naplóban):
   FOR EACH <T, X, v, w> bejegyzés DO
     IF T ∈ REDO_list THEN
       WRITE(X, w)        -- új érték kiírása
       OUTPUT(X)          -- lemezre írás
     ENDIF
   ENDFOR

3. UNDO fázis (hátrafelé a naplóban):
   FOR EACH <T, X, v, w> bejegyzés (visszafelé) DO
     IF T ∈ UNDO_list THEN
       WRITE(X, v)        -- régi érték visszaírása
       OUTPUT(X)          -- lemezre írás
     ENDIF
   ENDFOR

4. Helyreállítás kész
```

**Miért mindkét irány?**
- **REDO:** commitált, de ki nem írt módosítások
- **UNDO:** be nem fejezett módosítások

**Idempotencia:** mindkét fázis újrafuttatható

**Példa:**
```
Napló:
<T1,START>
<T1,A,5,50>
<T1,B,10,100>
<T1,COMMIT>
<T2,START>
<T2,C,15,150>
<T2,D,20,200>
[ÖSSZEOMLÁS]

Helyreállítás:
- REDO_list = {T1}
- UNDO_list = {T2}
- REDO előre: A:=50, B:=100
- UNDO hátra: D:=20, C:=15
```

### d. Ellenőrzőpont képzés UNDO/REDO esetén, helyreállítás.

**Működés közbeni checkpoint UNDO/REDO-hoz:**

**Checkpoint lépései:**

**1. `<START CKPT(T₁,...,Tₖ)>` napló:**
- T₁, ..., Tₖ: aktív (még nem commitált) tranzakciók
- Napló → lemezre (FLUSH LOG)

**2. Piszkos pufferek kiírása:**
- OUTPUT(X) minden piszkos X-re
- **Fontos:** minden piszkos puffer (nem csak a checkpoint előttiek!)
- Háttérben végrehajtható

**3. `<END CKPT>` napló:**
- Piszkos pufferek kiírása befejeződött
- Napló → lemezre

**Működés közben:**
- Új tranzakciók indulhatnak
- Futó tranzakciók folytatódnak
- Legnagyobb rugalmasság

**Helyreállítási algoritmus checkpointtal:**

```
1. Keressük a legutolsó <END CKPT>-t

2. Ha van <END CKPT>:
   - Keressük a hozzá tartozó <START CKPT(T₁,...,Tₖ)>-t
   - Helyreállítás kezdete: START CKPT
   - Kezdeti listák:
     REDO_list := üres
     UNDO_list := {T₁, ..., Tₖ}
   
3. Ha nincs <END CKPT>, de van <START CKPT>:
   - Keressük az előző <END CKPT>-t (ha van)
   - Helyreállítás kezdete: előző START CKPT (vagy napló eleje)
   
4. Előrefelé szkennelés (START CKPT-től):
   FOR EACH bejegyzés DO
     <T,START>: 
       T hozzáadása UNDO_list-hez
     <T,COMMIT>:
       T áthelyezése UNDO_list-ből REDO_list-be
   ENDFOR

5. REDO fázis (előrefelé START CKPT-től):
   FOR EACH <T,X,v,w> WHERE T ∈ REDO_list DO
     X := w (REDO)
   ENDFOR

6. UNDO fázis (hátrafelé napló végéről):
   FOR EACH <T,X,v,w> WHERE T ∈ UNDO_list DO
     X := v (UNDO)
   ENDFOR
```

**Példa:**
```
<T1,START>
<T1,A,5,50>
<START CKPT(T1)>
<T2,START>
<T1,B,10,100>
<T2,C,15,150>
<END CKPT>
<T1,COMMIT>
<T3,START>
<T2,D,20,200>
<T3,E,25,250>
[ÖSSZEOMLÁS]

Helyreállítás:
- Van END CKPT → START CKPT(T1)
- Kezdeti: UNDO={T1}
- Szkennelés: +T2, +T3, T1→REDO
- REDO_list = {T1}
- UNDO_list = {T2, T3}
- REDO (START CKPT-től): A:=50, B:=100
- UNDO (hátrafelé): E:=25, D:=20, C:=15, B:=10
  STOP (B az utolsó T1 művelet, T1 commitált)
```

**Előnyök:**
- Legnagyobb rugalmasság
- Nem állítja le a rendszert
- Leggyakrabban használt módszer
- START CKPT korlátozza a helyreállítási időt

## 361. Ütemezések (soros, sorbarendezhető, konfliktusok, megelőzési gráf stb.) [2025/26/1, Tételek] (12 pont)

### a. Mit nevezünk konfliktusnak?

**Konfliktus (conflict pair):** két művelet konfliktál, ha:

**Feltételek (mind teljesül):**
1. **Különböző tranzakciókhoz tartoznak:** i ≠ j
2. **Ugyanazon adatbáziselemen dolgoznak:** ugyanaz az X
3. **Legalább az egyik írás:** READ-WRITE, WRITE-READ vagy WRITE-WRITE

**Három konfliktusos pár:**

**1. READ-WRITE konfliktus (r<sub>i</sub>(X); w<sub>j</sub>(X)):**
- T<sub>i</sub> olvassa X-et
- T<sub>j</sub> írja X-et
- **Probléma:** olvasás függ az írás sorrendjétől

**2. WRITE-READ konfliktus (w<sub>i</sub>(X); r<sub>j</sub>(X)):**
- T<sub>i</sub> írja X-et
- T<sub>j</sub> olvassa X-et
- **Probléma:** piszkos olvasás (dirty read) lehetséges

**3. WRITE-WRITE konfliktus (w<sub>i</sub>(X); w<sub>j</sub>(X)):**
- T<sub>i</sub> írja X-et
- T<sub>j</sub> írja X-et
- **Probléma:** végső érték függ a sorrendtől

**NEM konfliktus:**
- **r<sub>i</sub>(X); r<sub>j</sub>(X)** - két olvasás
- Felcserélhető, nem befolyásolja az eredményt

**Miért fontos:**
- Konfliktusos műveletek sorrendje nem cserélhető fel
- Meghatározza az ütemezés sorbarendezhetőségét

### b. Mit nevezünk sorbarendezhető és konfliktus-sorbarendezhető ütemezésnek?

**Sorbarendezhető ütemezés (serializable schedule):**

**Definíció:**
Egy S ütemezés **sorbarendezhető**, ha hatása (végeredménye) **ekvivalens** valamely **soros ütemezés** hatásával.

**Jelentés:**
- Az eredmény ugyanaz, mintha a tranzakciókat sorosan hajtottuk volna végre
- **De:** párhuzamosan futhatnak (jobb teljesítmény)
- Garantálja a konzisztenciát

**Több ekvivalencia fogalom:**
- Végállapot-ekvivalens
- Nézet-ekvivalens  
- Konfliktus-ekvivalens

**Konfliktus-sorbarendezhető ütemezés:**

**Definíció:**
Egy S ütemezés **konfliktus-sorbarendezhető**, ha **konfliktus-ekvivalens** valamely **soros ütemezéssel**.

**Két ütemezés konfliktus-ekvivalens, ha:**
- Szomszédos, **nem konfliktáló** műveletek cseréinek sorozatával az egyiket átalakíthatjuk a másikká

**Kapcsolat:**
- Konfliktus-sorbarendezhető ⊆ Sorbarendezhető
- Minden konfliktus-sorbarendezhető → sorbarendezhető
- **De nem fordítva!** (vannak sorbarendezhető, de nem konfliktus-sorbarendezhető ütemezések)

**Példa konfliktus-sorbarendezhető:**
```
S: r₁(A); w₁(A); r₂(A); w₂(A);

Átírható:
r₁(A); w₁(A); r₂(A); w₂(A);  (eredeti)
→ soros: T1, T2 vagy T2, T1?

Konfliktusok: w₁(A) → r₂(A), w₁(A) → w₂(A)
→ T1 < T2
Tehát T1T2 soros ütemezéssel ekvivalens
```

**Példa NEM konfliktus-sorbarendezhető:**
```
w₁(X); w₂(X); w₂(Y); w₁(Y);

Konfliktusok: 
w₁(X) → w₂(X): T1 < T2
w₂(Y) → w₁(Y): T2 < T1
→ Kör! Nem konfliktus-sorbarendezhető
```

### c. Mi az a megelőzési gráf?

**Megelőzési gráf (precedence graph):**

**Definíció:**
- **Csúcsok:** tranzakciók (T₁, T₂, ..., Tₙ)
- **Élek:** T<sub>i</sub> → T<sub>j</sub>, ha T<sub>i</sub> megelőzi T<sub>j</sub>-t
- **Megelőzés:** ha van konfliktusos műveleti pár, ahol T<sub>i</sub> művelete előbb van

**Él létrehozása:**

Ha az ütemezésben:
- p<sub>i</sub>(X) megelőzi q<sub>j</sub>(X) műveleteket
- És p<sub>i</sub>, q<sub>j</sub> **konfliktál**
- **Akkor:** T<sub>i</sub> → T<sub>j</sub> él a gráfban

**Konfliktusos párok → élek:**
1. r<sub>i</sub>(X) < w<sub>j</sub>(X) → T<sub>i</sub> → T<sub>j</sub>
2. w<sub>i</sub>(X) < r<sub>j</sub>(X) → T<sub>i</sub> → T<sub>j</sub>
3. w<sub>i</sub>(X) < w<sub>j</sub>(X) → T<sub>i</sub> → T<sub>j</sub>

**Tulajdonságok:**
- Irányított gráf (DAG, ha nincs kör)
- Tranzakciók közötti függőségeket ábrázolja

**Példa:**
```
Ütemezés: r₁(A); w₂(A); r₂(B); w₁(B);

Konfliktusok:
- r₁(A) < w₂(A): T1 → T2
- r₂(B) < w₁(B): T2 → T1

Gráf:
T1 ⇄ T2  (kör!)
```

### d. Hogyan működik a megelőzési gráf, mire használjuk?

**Megelőzési gráf működése:**

**Építés:**
```
1. Csúcsok létrehozása: minden tranzakcióhoz egy csúcs

2. Végigmegyünk az ütemezésen:
   FOR EACH konfliktusos pár (p_i(X), q_j(X)) DO
     IF p_i(X) < q_j(X) (p_i előbb van) THEN
       Adj hozzá T_i → T_j élt
     ENDIF
   ENDFOR

3. Kör keresése a gráfban (DFS vagy topologikus rendezés)
```

**Használat:**

**1. Konfliktus-sorbarendezhetőség tesztelése:**

**Tétel:** Egy ütemezés pontosan akkor konfliktus-sorbarendezhető, ha a megelőzési gráfja **aciklikus** (nincs irányított kör).

**Algoritmus:**
```
Építsd fel a megelőzési gráfot
IF van kör THEN
  NEM konfliktus-sorbarendezhető
ELSE
  Konfliktus-sorbarendezhető
  Ekvivalens soros ütemezés: topologikus sorrend
ENDIF
```

**2. Ekvivalens soros ütemezés megtalálása:**
- Ha nincs kör: topologikus rendezés
- **Topologikus sorrend:** T<sub>i</sub> → T<sub>j</sub> él esetén T<sub>i</sub> előbb van a sorrendben
- Ez az ekvivalens soros ütemezés!

**Példa 1: Sorbarendezhető**
```
Ütemezés: r₁(A); r₂(B); w₁(A); w₂(B);

Konfliktusok:
- r₁(A) < w₁(A): nincs él (ugyanaz a tranzakció)
- Nincs konfliktus T1 és T2 között

Gráf: T1    T2  (nincs él, nincs kör)

→ Konfliktus-sorbarendezhető
→ Ekvivalens: T1T2 vagy T2T1
```

**Példa 2: NEM sorbarendezhető**
```
Ütemezés: w₁(A); r₂(A); w₂(B); r₁(B);

Konfliktusok:
- w₁(A) < r₂(A): T1 → T2
- w₂(B) < r₁(B): T2 → T1

Gráf: T1 ⇄ T2  (kör!)

→ NEM konfliktus-sorbarendezhető
→ Rossz ütemezés!
```

**Komplexitás:**
- Gráf építés: O(n²) (n: műveletek száma)
- Kör keresés: O(V+E) (DFS)

**Használat gyakorlatban:**
- Passzív konkurenciavezérlés
- Utólagos ellenőrzés
- Ritkán használt (aktív módszerek jobbak)

## 362. Zárak (jogszerűség, konzisztencia, 2PL, várakozási gráf, holtpont) [2025/26/1, Tételek] (12 pont)

### a. Mit jelent a jogszerűség, konzisztencia?

**Jogszerűség (legality):**

Egy tranzakció **jogszerű**, ha:
1. **Zárolás olvasás/írás előtt:**
   - READ(X) előtt: l<sub>i</sub>(X) vagy sl<sub>i</sub>(X)
   - WRITE(X) előtt: l<sub>i</sub>(X) vagy xl<sub>i</sub>(X)
2. **Feloldás a művelet után:**
   - Miután végzett X-szel: u<sub>i</sub>(X)
3. **Nem kér zárat, amit már tart:**
   - Kétszer nem zárolja ugyanazt
4. **Nem old fel olyan zárat, amit nem tart:**
   - Csak saját zárait oldja fel

**Jelölések:**
- l<sub>i</sub>(X): T<sub>i</sub> zárolja X-et
- u<sub>i</sub>(X): T<sub>i</sub> feloldja X zárat
- sl<sub>i</sub>(X): shared lock
- xl<sub>i</sub>(X): exclusive lock

**Konzisztencia (consistency):**

Egy ütemezés **konzisztens**, ha:
- **Minden benne szereplő tranzakció jogszerű**

**Jelentés:**
- Minden tranzakció követi a zárolási protokollt
- Nincs szabálysértés (zár nélküli hozzáférés)
- De ettől még lehet holtpont vagy rossz ütemezés!

**Példa:**

**Jogszerű:**
```
T1: l₁(A); r₁(A); w₁(A); u₁(A);
```

**NEM jogszerű:**
```
T1: r₁(A); l₁(A); w₁(A); u₁(A);  -- olvasás zár előtt!
T2: l₂(X); w₂(X); u₂(Y);         -- mást old fel!
```

### b. Mit nevezünk kétfázisú zárolásnak?

**Kétfázisú zárolás (2PL - Two-Phase Locking):**

**Definíció:**
Egy tranzakció **kétfázisú**, ha a zárolási műveletek megelőzik a feloldási műveleteket.

**Két fázis:**

**1. Növekedési fázis (growing phase):**
- Új zárakat kérhet
- **NEM oldhat fel** egyetlen zárat sem
- Fokozatosan szerez zárakat

**2. Zsugorodási fázis (shrinking phase):**
- Feloldhat zárakat
- **NEM kérhet** új zárat
- Fokozatosan feloldja a zárakat

**Szabály:**
- Ha T<sub>i</sub> feloldott egy zárat: **soha többé nem kérhet új zárat**
- **Zár pont (lock point):** az első feloldás időpontja

**Változatok:**

**Szigorú 2PL (Strict 2PL):**
- **Minden zárat csak COMMIT-kor (vagy ABORT-kor) oldunk fel**
- Leggyakrabban használt
- Elkerüli a kaszkádos visszagörgetést

**Erős 2PL (Strong/Rigorous 2PL):**
- Kizárólagos zárakat COMMIT-kor oldunk fel
- Osztott zárakat korábban is lehet

**Konzervatív 2PL:**
- Minden zárat előre elkérünk
- Vagy megkapjuk mindet, vagy egyiket sem
- Nincs holtpont

**Példa:**

**2PL:**
```
T1: l₁(A); r₁(A); l₁(B); w₁(B); u₁(A); l₁(C); u₁(B); w₁(C); u₁(C);
    [------- növekedési ------][-------- zsugorodási --------]
                         zár pont ↑
```

**NEM 2PL:**
```
T1: l₁(A); u₁(A); l₁(B); u₁(B);  -- újra zár feloldás után!
```

**Szigorú 2PL:**
```
T1: l₁(A); r₁(A); l₁(B); w₁(B); COMMIT; u₁(A); u₁(B);
    [-------- minden zár --------][feloldás]
```

### c. A kétfázisú zárolás tétele.

**2PL Tétel:**

**Tétel:** Ha egy ütemezés konzisztens és az ütemezésben szereplő összes tranzakció kétfázisú, akkor az ütemezés **konfliktus-sorbarendezhető**.

**Bizonyítás vázlat:**
1. Feltesszük: van kör a megelőzési gráfban
2. Kör: T₁ → T₂ → ... → Tₖ → T₁
3. Minden él: konfliktusos műveletpár
4. T₁ → T₂: T₁ művelet előbb → T₁ feloldja a zárat → T₂ megkapja
5. Kör mentén: T₁ előbb old fel, mint kér → nem 2PL → **ellentmondás!**

**Következmények:**
- 2PL garantálja a sorbarendezhetőséget
- **De:** nem garantálja a holtpont-mentességet
- **De:** nem garantálja a kaszkád-mentességet (strict 2PL kell)

**Fordított irány NEM igaz:**
- Vannak sorbarendezhető, de nem 2PL ütemezések

**Jelentősége:**
- 2PL: egyszerű protokoll → garantált helyesség
- Szinte minden DBMS 2PL-t vagy strict 2PL-t használ

### d. Mi az a várakozási gráf?

**Várakozási gráf (wait-for graph):**

**Definíció:**
- **Csúcsok:** aktív tranzakciók
- **Élek:** T<sub>i</sub> → T<sub>j</sub>, ha T<sub>i</sub> **vár** egy zárra, amit T<sub>j</sub> tart

**Él létrehozása:**
- T<sub>i</sub> kér egy zárat X-re
- T<sub>j</sub> tartja X-et (inkompatibilis mód)
- T<sub>i</sub> várakozik → T<sub>i</sub> → T<sub>j</sub> él

**Dinamikus gráf:**
- Folyamatosan változik
- Új zár kérés → új él
- Zár feloldás → él törlése
- Tranzakció befejezés → csúcs törlése

**Példa:**
```
T1: xl₁(A); ...tart A-t...
T2: xl₂(B); ...tart B-t...
T1: xl₁(B); -- vár B-re (T2 tartja)
T2: xl₂(A); -- vár A-ra (T1 tartja)

Várakozási gráf:
T1 → T2  (T1 vár T2-re, B miatt)
T2 → T1  (T2 vár T1-re, A miatt)

Kör! → Holtpont
```

**Különbség a megelőzési gráftól:**
- **Megelőzési:** tranzakciók végrehajtási sorrendje (post hoc elemzés)
- **Várakozási:** aktuális várakozások (runtime elemzés)

### e. Hogyan segít a várakozási gráf a holtpont felismerésében?

**Holtpont felismerés várakozási gráffal:**

**Alapelv:**
**Holtpont ⟺ Irányított kör a várakozási gráfban**

**Algoritmus:**
```
1. Építsd a várakozási gráfot:
   - Minden aktív tranzakció → csúcs
   - Zárvárás → él

2. Kör keresése (DFS vagy ciklus detektálás):
   IF van kör THEN
     HOLTPONT detektálva!
     Válassz egy áldozat tranzakciót (victim)
     ABORT(victim)
     Töröld a csúcsot és éleit
     Próbáld újra a tranzakciót később
   ELSE
     Nincs holtpont (egyelőre)
   ENDIF

3. Periodikusan futtassuk (pl. minden pár másodpercben)
```

**Áldozat kiválasztás (victim selection):**
- Legkevesebb munkát végzett tranzakció
- Legkevesebb zárat tartó
- Legalacsonyabb prioritású
- **Cél:** minimalizálni a veszteséget

**Példa:**
```
Várakozási gráf:
T1 → T2 → T3 → T1  (kör!)

Holtpont!

Áldozat: T2 (pl. legkevesebb munkát végzett)
→ ABORT(T2)
→ T2 zárai feloldódnak
→ T1 vagy T3 folytathatja
→ T2 újra indul később
```

**Gyakorlati implementáció:**
- Timeout kombinációval
- Ha túl sokáig vár: lehet holtpont
- Periodikus kör keresés (minden 10s)

**Komplexitás:**
- Gráf építés: O(T) (T: tranzakciók száma)
- Kör keresés: O(T + E) (DFS)

**Előny:**
- Felismeri a holtpontot
- Aktívan feloldja

**Hátrány:**
- Extra költség (gráf építés, kör keresés)
- Victim újraindítása (pazarlás)

### f. Mit nevezünk a csúcsok topologikus sorrendjének?

**Topologikus sorrend (topological order):**

**Definíció:**
Egy **irányított aciklikus gráf** (DAG) csúcsainak olyan T₁, T₂, ..., Tₙ sorrendje, amelyben:
- **Ha van T<sub>i</sub> → T<sub>j</sub> él, akkor T<sub>i</sub> előbb van a sorrendben, mint T<sub>j</sub>**

**Tulajdonságok:**
- Csak aciklikus gráfra létezik
- Nem egyértelmű (több is lehet)
- Lineáris kiterjesztése a részben rendezett halmaznak

**Algoritmus (Kahn):**
```
1. Számoljuk meg a befokszámokat (in-degree)
2. Queue := {csúcsok, amiknek befok = 0}
3. WHILE Queue nem üres DO
     v := Queue.pop()
     Output v
     FOR EACH v → w él DO
       Csökkentsd w befokszámát
       IF w befok = 0 THEN
         Queue.add(w)
       ENDIF
     ENDFOR
   ENDWHILE
4. Ha minden csúcs kimenetben: kész
   Különben: van kör (nem DAG)
```

**Használat megelőzési gráfnál:**
- Ha nincs kör: topologikus sorrend = ekvivalens soros ütemezés
- **Ez mutatja meg, milyen sorrendben "kellene" futniuk a tranzakcióknak**

**Példa:**
```
Gráf:
T1 → T2 → T4
T1 → T3 → T4

Topologikus rendezések:
1. T1, T2, T3, T4
2. T1, T3, T2, T4

Mindkettő helyes ekvivalens soros ütemezés!
```

**DFS alapú algoritmus:**
```
Reverz post-order DFS bejárás
→ topologikus sorrend
```

**Alkalmazások:**
- Build rendszerek (függőségek)
- Feladatütemezés
- **Adatbázis:** ekvivalens soros ütemezés meghatározása

## 363. További zármódok (osztott, kizárólagos, növelési, módosítási, kompatibilitási mátrix, felminősítés) [2025/26/1, Tételek] (12 pont)

### a. Hogyan működik a zárolás, ha két típusú zárunk van (osztott és kizárólagos)?

**Két zármód:**

**S (Shared) - Osztott zár:**
- **Olvasáshoz** használjuk
- **Több tranzakció egyidejűleg** tarthatja
- Nem akadályozza más tranzakciók olvasását
- **Kompatibilis:** más S zárakkal
- **Inkompatibilis:** X zárral

**X (eXclusive) - Kizárólagos zár:**
- **Íráshoz** használjuk
- **Csak egy tranzakció** tarthatja
- Akadályozza más tranzakciók olvasását és írását
- **Inkompatibilis:** minden más zárral (S és X is)

**Működés:**

**Zár kérés:**
```
T_i kér L_i(X) zárat:
  IF van T_j, ami tartja L_j(X)-et és L_i inkompatibilis L_j-vel THEN
    T_i vár, amíg T_j fel nem oldja
  ELSE
    T_i megkapja a zárat
  ENDIF
```

**Protokoll:**
```
Olvasás előtt:
  sl_i(X)  -- shared lock
  r_i(X)
  
Írás előtt:
  xl_i(X)  -- exclusive lock
  w_i(X)

Commit-kor (strict 2PL):
  u_i(X)   -- unlock minden X-re
```

**Példa:**
```
T1: sl₁(A); r₁(A); ...
T2: sl₂(A); r₂(A); ...  OK! (mindkettő S)

T1: xl₁(B); w₁(B); ...
T2: sl₂(B); ...         VÁR! (X és S inkompatibilis)
T1: u₁(B);
T2: ...folytatódik...   (megkapja B S zárát)
```

**Előnyök:**
- Egyszerű
- Hatékony
- Legtöbb DBMS ezt használja

### b. Mi az a kompatibilitási mátrix, mire használhatjuk?

**Kompatibilitási mátrix (compatibility matrix):**

**Definíció:** 
Táblázat, amely megmutatja, **mely zármódok kompatibilisek** egymással (egyidejűleg tarthatók).

**Kétzártípus mátrixa (S, X):**

|     | S | X |
|-----|---|---|
| **S** | ✓ | ✗ |
| **X** | ✗ | ✗ |

- ✓ = kompatibilis (egyidejűleg tartható)
- ✗ = inkompatibilis (egyik várnia kell)

**Négyzártípus mátrixa (-, S, U, X):**

|     | - | S | U | X |
|-----|---|---|---|---|
| **-** | ✓ | ✓ | ✓ | ✓ |
| **S** | ✓ | ✓ | ✓ | ✗ |
| **U** | ✓ | ✓ | ✗ | ✗ |
| **X** | ✓ | ✗ | ✗ | ✗ |

- **-**: nincs zár
- **S**: shared (osztott)
- **U**: update (módosító)
- **X**: exclusive (kizárólagos)

**Hierarchikus zárak mátrixa (IS, IX, S, SIX, X):**

|       | IS | IX | S | SIX | X |
|-------|----|----|---|-----|---|
| **IS**  | ✓  | ✓  | ✓ | ✓   | ✗ |
| **IX**  | ✓  | ✓  | ✗ | ✗   | ✗ |
| **S**   | ✓  | ✗  | ✓ | ✗   | ✗ |
| **SIX** | ✓  | ✗  | ✗ | ✗   | ✗ |
| **X**   | ✗  | ✗  | ✗ | ✗   | ✗ |

**Használat:**

**1. Zár kérés ellenőrzése:**
```
IF mátrix[L_meglévő][L_kért] = ✓ THEN
  Zár megadható
ELSE
  Várni kell
ENDIF
```

**2. Konkurenciavezérlés implementációja:**
- Gyors döntés: kompatibilis-e
- Zártábla karbantartása

**3. Protokoll tervezés:**
- Új zártípusok hozzáadása
- Kompatibilitás definiálása

**Példa használat:**
```
X-en van S zár (T1 tartja)
T2 kér U zárat X-re

Mátrix[S][U] = ✓ → T2 megkapja
(S és U kompatibilis!)
```

### c. Hogyan működik a zárak felminősítése?

**Zár felminősítés (lock upgrade/promotion):**

**Probléma:**
- Tranzakció olvassa X-et (S zár)
- Később írni akarja X-et (X zár kell)
- Hogyan cseréljük S-t X-re?

**Felminősítés:**
- **S zár → X zár** átalakítása
- Csak akkor lehetséges, ha nincs más tranzakció S zárral X-en

**Protokoll:**
```
1. T_i tartja sl_i(X)-et
2. T_i kéri xl_i(X)-et (felminősítés)
3. IF van más T_j, ami tartja sl_j(X)-et THEN
     T_i vár
   ELSE
     sl_i(X) → xl_i(X) átalakítás
   ENDIF
```

**Konverziós holtpont:**
- T₁ és T₂ is tartja X S zárát
- Mindkettő fel akarja minősíteni X-re
- **Holtpont:** mindkettő vár a másikra!

**Megoldás: U (Update) zár**
```
Tranzakció:
  ul_i(X)  -- update lock (olvasáskor, ha írni is fogunk)
  r_i(X)
  ...
  (U-t X-re lehet minősíteni, ha írunk)
  xl_i(X)  -- felminősítés
  w_i(X)
```

**U zár tulajdonságai:**
- Kompatibilis: S zárral ✓
- Inkompatibilis: U zárral ✗, X zárral ✗
- **Csak egy tranzakció tarthat U zárat** → nincs konverziós holtpont

**Felminősítési hierarchia:**
```
S → U → X
  ↘   ↗
    X

Megengedett:
S → X (direct)
S → U → X (two-step)
U → X
```

**Példa konverziós holtpont:**
```
T1: sl₁(A); r₁(A);
T2: sl₂(A); r₂(A);  -- mindkettő tartja S-t
T1: xl₁(A); ...     -- vár T2-re (T2 tartja S-t)
T2: xl₂(A); ...     -- vár T1-re (T1 tartja S-t)
→ Holtpont!
```

**Megoldás U zárral:**
```
T1: ul₁(A); r₁(A); xl₁(A); w₁(A);  -- OK
T2: sl₂(A); ...                    -- OK (U és S kompatibilis)
T2: ul₂(A); ...                    -- VÁR (U és U inkompatibilis)
→ Nincs holtpont!
```

### d. Mire jó a növelési művelet és a növelési zár?

**Növelési művelet (INC - Increment):**

**Probléma:**
- Számlálók, összegek növelése: X := X + c
- Klasszikus megközelítés: READ, módosítás, WRITE (X zár kell)
- **De:** több növelési művelet kommutatív! w<sub>i</sub>(X+5); w<sub>j</sub>(X+3) ≃ w<sub>j</sub>(X+3); w<sub>i</sub>(X+5)

**Növelési zár (I - Increment lock):**

**Tulajdonságok:**
- Speciális zártípus növelési művelethez
- **Kompatibilis:** más I zárakkal ✓ (párhuzamos növelés OK!)
- **Inkompatibilis:** S és X zárakkal ✗

**Kompatibilitási mátrix (S, X, I):**

|     | S | X | I |
|-----|---|---|---|
| **S** | ✓ | ✗ | ✗ |
| **X** | ✗ | ✗ | ✗ |
| **I** | ✗ | ✗ | ✓ |

**Protokoll:**
```
Növelés (X := X + c):
  il_i(X)
  INC(X, c)  -- atomikus növelés
  u_i(X)

(Nincs szükség X olvasására és visszaírására)
```

**Előny:**
- **Párhuzamos növelések** engedélyezése
- Több tranzakció egyidejűleg növelheti
- Jobb párhuzamosság számláló oszlopoknál

**Példa:**
```
T1: il₁(X); INC(X,5); u₁(X);   -- X := X+5
T2: il₂(X); INC(X,3); u₂(X);   -- X := X+3  egyidejűleg!

Végeredmény: X := X+8 (függetlenül a sorrendtől)
```

**Használati területek:**
- Számláló oszlopok (pl. nézettség, like-ok)
- Összegző műveletek
- Statisztikák

**Implementáció:**
- Atomikus növelési művelet szükséges
- Hardver támogatás vagy mutex

### e. Mi az a módosító zár?

**Módosító zár (U - Update lock):**

**Cél:** konverziós holtpont elkerülése

**Probléma:**
```
Tipikus minta:
1. Olvasás (SELECT): S zár
2. Döntés: módosítjuk?
3. Írás (UPDATE): X zár kell
→ S-ről X-re felminősítés → konverziós holtpont veszély
```

**Módosító zár megoldása:**

**Protokoll:**
```
Ha olvasunk, de írni is fogunk:
  ul_i(X)        -- U zár (nem S!)
  r_i(X)
  ...döntés...
  xl_i(X)        -- felminősítés U→X
  w_i(X)
  u_i(X)
```

**U zár tulajdonságai:**

**Kompatibilitás:**
- **U és S:** ✓ kompatibilis (olvasás együtt OK)
- **U és U:** ✗ inkompatibilis (csak egy U lehet)
- **U és X:** ✗ inkompatibilis

**Jellemzők:**
- Olvasási jogot ad (mint S)
- De **kizárólagos frissítési szándékot** jelez
- Csak **egy tranzakció tarthat U zárat** egy adatelemen

**Miért nincs konverziós holtpont:**
```
T1: ul₁(A); r₁(A); ...
T2: sl₂(A); r₂(A); ...  -- OK (U és S kompatibilis)
T2: ul₂(A); ...         -- VÁR (U és U inkompatibilis!)
T1: xl₁(A); w₁(A);      -- felminősítés OK (nincs más U)
T1: u₁(A);
T2: ...folytatódik, U-t kap...
```

**Összehasonlítás:**

| Művelet | S zárral | U zárral |
|---------|----------|----------|
| Olvasás | sl(X); r(X) | ul(X); r(X) |
| Írás előtt | xl(X) kérés (vár!) | xl(X) felminősítés |
| Konverziós holtpont | Igen (2 S → X) | Nem (1 U → X) |
| Párhuzamos olvasás | Igen | Igen (U+S OK) |

**Példa - SELECT FOR UPDATE (SQL):**
```sql
SELECT * FROM Account WHERE id = 123 FOR UPDATE;
-- U zár, nem S
-- Jelzi: módosítani fogjuk
UPDATE Account SET balance = balance + 100 WHERE id = 123;
-- U → X felminősítés
```

**Használat:**
- UPDATE műveletek optimalizálása
- SQL: SELECT ... FOR UPDATE
- Konverziós holtpont megelőzés

### További információ:

**Zármódok hierarchiája:**
```
  S (csak olvasás)
  ↓
  U (olvasás + írás szándék)
  ↓
  X (írás)
```

**Felminősítési lánc:**
- S → U: megengedett
- S → X: megengedett
- U → X: megengedett (gyakori)
- **X → bármi:** értelmetlen (már kizárólagos)

## 364. Zárolási ütemező, hierarchikus zárak, időbélyegzés és érvényesítés (zártábla, faprotokoll, szemcsézettség, figyelmeztető zárak) [2025/26/1, Tételek] (12 pont)

### a. Hogyan működik a zárolási ütemező?

**Zárolási ütemező (lock scheduler):**

**Feladata:**
- Tranzakciók zár kéréseit kezeli
- Eldönti: megadható-e a zár vagy várakozni kell
- Holtpont kezelés

**Architektúra:**
```
Tranzakció → Zár kérés → Ütemező → Zártábla
                          ↓
                   Megadás/Várakozás
                          ↓
                    Művelet végrehajtása
```

**Működés:**

**1. Zár kérés érkezik:** l<sub>i</sub>(X) vagy u<sub>i</sub>(X)

**2. Ütemező ellenőrzi:**
```
IF l_i(X) kérés THEN
  IF X nincs zárva THEN
    Adj zárat T_i-nek
    Frissítsd zártáblát
  ELSE IF X zárva, de kompatibilis zármód THEN
    Adj zárat T_i-nek (megosztott)
    Frissítsd zártáblát
  ELSE
    T_i várakozási sorba
    Frissítsd várakozási gráfot
  ENDIF
ENDIF

IF u_i(X) feloldás THEN
  Töröld T_i zárát X-ről
  IF van várakozó T_j THEN
    Ébreszd fel T_j-t
    Add meg a zárat T_j-nek
  ENDIF
ENDIF
```

**3. Várakozás kezelése:**
- Várakozási sor (FIFO) per adatelem
- Ébresztés feloldáskor

**4. Holtpont kezelés:**
- Várakozási gráf frissítése
- Periodikus kör keresés
- Áldozat kiválasztás és ABORT

**Komponensek:**
- **Zártábla:** aktuális zárak
- **Várakozási sor:** várakozó tranzakciók per adatelem
- **Várakozási gráf:** holtpont detektáláshoz

**Pszeudokód:**
```
FUNCTION request_lock(T_i, X, mode):
  IF compatible(X, mode) THEN
    grant_lock(T_i, X, mode)
    update_lock_table(T_i, X, mode)
  ELSE
    enqueue(T_i, X, mode)
    update_wait_graph(T_i, holder(X))
    IF detect_deadlock() THEN
      victim := select_victim()
      ABORT(victim)
    ENDIF
    WAIT(T_i)
  ENDIF
END FUNCTION

FUNCTION release_lock(T_i, X):
  remove_lock(T_i, X)
  IF has_waiter(X) THEN
    T_j := dequeue(X)
    request_lock(T_j, X, T_j.mode)
  ENDIF
END FUNCTION
```

### b. Mi az a zártábla? Hogyan épül fel?

**Zártábla (lock table):**

**Definíció:** 
Az adatbáziselemek aktuális zárait tartalmazó adatszerkezet.

**Struktúra:**

**1. Objektum szintű szervezés:**
```
Hash tábla: adatelem → zárlista

Adatelem X:
  - Tartók listája: [(T1, S), (T2, S)]
  - Várakozók sora: [T3(X), T4(S)]
  - Zár mód: S vagy X vagy U
```

**2. Bejegyzés felépítése:**
```
Lock Table Entry:
  - object: X (adatelem azonosítója)
  - mode: S / X / U / IS / IX
  - holders: [(T_i, mode_i), ...]
  - waiters: Queue<(T_j, mode_j)>
```

**3. Globális struktúra:**
```
Lock_Table = {
  X: {mode: S, holders: [T1, T2], waiters: []},
  Y: {mode: X, holders: [T3], waiters: [T4, T5]},
  Z: {mode: U, holders: [T6], waiters: []},
  ...
}
```

**Műveletek:**

**1. Zár kérés (grant_lock):**
```
1. Hash(X) → zártábla bejegyzés
2. Ellenőrzés: kompatibilis?
3. Ha igen: hozzáadás holders-hoz
4. Ha nem: hozzáadás waiters-hoz
```

**2. Zár feloldás (release_lock):**
```
1. Hash(X) → zártábla bejegyzés
2. Törlés holders-ból
3. Waiters ellenőrzése
4. Következő kompatibilis várakozó ébresztése
```

**Optimalizálások:**
- **Hash tábla:** gyors keresés (O(1))
- **Hierarchikus zárak:** fa szerkezet
- **Zár eszkalálás:** sok kis zár → egy nagy zár (pl. 1000 sor zár → tábla zár)

**Példa:**
```
T1: sl₁(A)
T2: sl₂(A)
T3: xl₃(A) -- vár

Lock_Table[A]:
  mode: S
  holders: [T1, T2]
  waiters: [T3(X)]

T1: u₁(A) -- feloldja

Lock_Table[A]:
  mode: S
  holders: [T2]
  waiters: [T3(X)]  -- T3 még vár (T2 még tartja)

T2: u₂(A) -- feloldja

Lock_Table[A]:
  mode: X
  holders: [T3]  -- T3 ébredt, megkapta
  waiters: []
```

### c. Mit jelent a zárak szemcsézettsége?

**Zárolás szemcsézettsége (lock granularity):**

**Definíció:** milyen méretű adategységet zárolunk

**Szemcsézettségi szintek (durvától finomig):**

**1. Adatbázis szint:**
- Az egész adatbázis zárolása
- **Használat:** backup, DDL műveletek
- **Előny:** egyszerű, egy zár
- **Hátrány:** nincs párhuzamosság

**2. Tábla szint:**
- Egy teljes tábla zárolása
- **Használat:** LOCK TABLE, ALTER TABLE
- **Előny:** kevés zár, egyszerű
- **Hátrány:** alacsony párhuzamosság

**3. Oldal/Blokk szint:**
- Egy blokk (pl. 8KB) zárolása
- **Használat:** középút
- **Előny:** közepes párhuzamosság
- **Hátrány:** közepes zárszám

**4. Sor szint:**
- Egy rekord zárolása
- **Használat:** legtöbb modern DBMS alapértelmezett
- **Előny:** maximális párhuzamosság
- **Hátrány:** sok zár (nagy zártábla)

**5. Attribútum szint:**
- Egy mezőérték zárolása
- **Használat:** ritka
- **Előny:** legfinomabb
- **Hátrány:** nagyon sok zár

**Trade-off:**

| Szempont | Durva (tábla) | Finom (sor) |
|----------|---------------|-------------|
| Párhuzamosság | Alacsony | Magas |
| Zárszám | Kevés | Sok |
| Overhead | Kicsi | Nagy |
| Zártábla méret | Kicsi | Nagy |
| Konfliktus esélye | Nagy | Kicsi |

**Dinamikus szemcsézettség:**
- Kezdjük finoman (sor zárak)
- Ha sok sor zár → eszkaláció (tábla zár)
- **Zár eszkaláció (lock escalation):** 1000+ sor zár → tábla zár

**Példa:**
```
Nagy tömeges művelet:
UPDATE Employee SET salary = salary * 1.1;

Sor zárakkal: 100,000 zár!
→ Eszkaláció: 1 tábla zár
```

### d. Hogyan működik a figyelmeztető protokoll?

**Figyelmeztető (intent) protokoll:**

**Probléma:** hierarchikus zárolás
- Tábla több oldalból áll
- Oldal több sorból áll
- Hogyan zároljunk hatékonyan?

**Megoldás: figyelmeztető zárak**

**Figyelmeztető zártípusok:**

**IS (Intent Shared):**
- Szándék: később S zárat kérünk alacsonyabb szinten
- Figyelmeztető: "valaki lejjebb fog olvasni"

**IX (Intent eXclusive):**
- Szándék: később X zárat kérünk alacsonyabb szinten
- Figyelmeztető: "valaki lejjebb fog írni"

**SIX (Shared + Intent eXclusive):**
- S zár ezen a szinten + IX alacsonyabb szinten
- Egész tábla olvasása + néhány sor írása

**Protokoll szabályok:**

**Felülről lefelé (top-down):**
```
1. Gyökértől indulunk (adatbázis szint)
2. Akarunk zárat X-en n. szinten:
   a. IS/S zárhoz: IS vagy IX minden felmenőn (1..n-1 szint)
   b. IX/SIX/X zárhoz: IX vagy SIX minden felmenőn
3. Kérjük a zárat X-en
```

**Alulról felfelé (bottom-up) feloldás:**
```
1. Fel kell oldani az összes leszármazott zárát
2. Csak utána oldható fel a szülő zár
```

**Kompatibilitási mátrix:**

|       | IS | IX | S | SIX | X |
|-------|----|----|---|-----|---|
| **IS**  | ✓  | ✓  | ✓ | ✓   | ✗ |
| **IX**  | ✓  | ✓  | ✗ | ✗   | ✗ |
| **S**   | ✓  | ✗  | ✓ | ✗   | ✗ |
| **SIX** | ✓  | ✗  | ✗ | ✗   | ✗ |
| **X**   | ✗  | ✗  | ✗ | ✗   | ✗ |

**Példa:**
```
Hierarchia: Adatbázis → Tábla → Oldal → Sor

T1 akar írni sor R₁-et:
1. IX zár az adatbázison
2. IX zár a táblán
3. IX zár az oldalon
4. X zár R₁ soron
5. Írás

T2 akar olvasni sor R₂-t (másik oldal):
1. IS zár az adatbázison  -- kompatibilis T1 IX-jével!
2. IS zár a táblán        -- kompatibilis T1 IX-jével!
3. IS zár a másik oldalon
4. S zár R₂ soron
5. Olvasás

→ Párhuzamosan futhatnak!
```

**Előnyök:**
- Hatékony hierarchikus zárolás
- Ütközések gyors detektálása
- Különböző szemcsézettségek együtt

### e. Mire használjuk a faprotokollt? Hogyan működik?

**Faprotokoll (tree protocol):**

**Cél:** 
- Sorbarendezhetőség biztosítása **holtpont nélkül**
- Nem kell 2PL (lehet nem kétfázisú!)

**Feltétel:**
- Adatelemek fa struktúrában (pl. B+-fa, hierarchia)
- Csak X zárakat használunk

**Szabályok:**

**1. Első zár szabály:**
- T<sub>i</sub> **első zárkérése bármelyik csúcs lehet**
- Nem kell a gyökérnél kezdeni

**2. Későbbi zárak szabálya:**
- T<sub>i</sub> csak akkor zárolhatja X-et, ha **jelenleg tartja X szülőjének zárát**
- Szülő → gyerek irány kell

**3. Feloldás szabály:**
- T<sub>i</sub> bármikor feloldhatja bármelyik zárát
- **De:** ha feloldotta, nem zárolhatja újra!

**4. Újrazárolás tilalma:**
- Egyszer feloldott csúcsot nem zárolhatunk újra

**Tulajdonságok:**
- **NEM 2PL** (feloldás és zárolás keverhető)
- **Holtpont-mentes** (nincs kör a várakozási gráfban)
- **Sorbarendezhető** (konfliktus-sorbarendezhető)

**Algoritmus:**
```
Tranzakció útja a fában:
1. Válassz gyökér vagy belső csúcsot
2. Zárold
3. Haladj lefelé (gyerekek zárolása)
4. Feloldhatod a szülőt, ha végzel vele
5. Nem mehetsz vissza (nincs újrazárolás)
```

**Példa:**
```
       A
      / \
     B   C
    / \
   D   E

T1 útja: A → B → D
  l₁(A); l₁(B); u₁(A); l₁(D); u₁(B); u₁(D);

T2 útja: C → E
  l₂(C); l₂(E); u₂(C); u₂(E);

Nem ütköznek, párhuzamosak!
```

**Holtpont-mentesség bizonyítása:**
- Ha lenne holtpont: T₁ → T₂ → ... → T₁ kör
- Ez azt jelenti: T₁ vár T₂-re stb.
- **De:** fa struktúra → nem lehet kör a zárolási útban
- Ellentmondás!

**Használat:**
- B+-fa index zárolás
- Hierarchikus adatstruktúrák
- Speciális optimalizálás

**Hátrány:**
- Több zárat tarthatunk, mint kell (szülők is)
- Nem általános (csak fa struktúrára)

### f. Hogyan biztosítható a sorbarendezhetőség időbélyegzéssel?

**Időbélyegzés alapú konkurenciavezérlés:**

**Alapelv:**
- Nem használunk zárakat
- Minden tranzakcióhoz időbélyeg (timestamp): TS(T<sub>i</sub>)
- Időbélyegek szerint határozunk meg soros sorrendet

**Időbélyegek:**
- **TS(T<sub>i</sub>):** T<sub>i</sub> indulási időpontja
- Rendszer óra, számláló, vagy hibrid
- **Egyedi** minden tranzakciónak

**Adatelemek időbélyegei:**
- **RT(X):** X utolsó olvasásának időbélyege
- **WT(X):** X utolsó írásának időbélyege

**Protokoll:**

**READ(X) művelet T<sub>i</sub> által:**
```
IF TS(T_i) < WT(X) THEN
  -- T_i később írt tranzakció értékét akarná olvasni
  -- Késői olvasás
  REJECT: ABORT(T_i)
  Restart T_i with new timestamp
ELSE
  Allow READ
  RT(X) := max(RT(X), TS(T_i))
ENDIF
```

**WRITE(X) művelet T<sub>i</sub> által:**
```
IF TS(T_i) < RT(X) THEN
  -- T_i később olvasó tranzakció régi értékét írná felül
  -- Késői írás
  REJECT: ABORT(T_i)
  Restart T_i with new timestamp
ELSE IF TS(T_i) < WT(X) THEN
  -- Régebbi írás (Thomas Write Rule)
  IGNORE (nem írjuk ki)
ELSE
  Allow WRITE
  WT(X) := TS(T_i)
ENDIF
```

**Sorbarendezhetőség bizonyítása:**
- Soros sorrend: TS szerint
- Konfliktusok: időbélyeg szerint rendeződnek
- Ha TS(T₁) < TS(T₂): T₁ művelete előbb (vagy ABORT)

**Példa:**
```
T1: TS=100
T2: TS=200

Kezdet: RT(X)=0, WT(X)=0

T1: r₁(X)  -- OK, RT(X):=100
T2: w₂(X)  -- OK, WT(X):=200
T1: w₁(X)  -- TS(T1)=100 < WT(X)=200 
           -- Késői írás!
           -- ABORT(T1), újraindítás TS=300

Ekvivalens soros: T1' (TS=300), T2 (TS=200)
→ Valójában: T2, T1' sorrend
```

**Thomas Write Rule:**
- TS(T<sub>i</sub>) < WT(X): írást figyelmen kívül hagyjuk
- Egy későbbi írás már felülírta
- Optimalizálás: kevesebb ABORT

**Előnyök:**
- Nincs zár → nincs holtpont
- Nincs várakozás (ABORT vagy engedélyezés)
- Jó read-heavy workload-ra

**Hátrányok:**
- Sok ABORT hosszú tranzakcióknál
- Újraindítás költséges
- Éhezés lehetséges (mindig újraindul)

**Többverziós időbélyegzés (MVTO):**
- Minden írás új verziót hoz létre
- Olvasás: megfelelő verzió kiválasztása
- Kevesebb ABORT
- Oracle, PostgreSQL alapja (MVCC)
