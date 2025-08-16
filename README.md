# Testamentegenerator - Danish Will Generator

En simpel og brugervenlig testamentegenerator designet specifikt til ældre danske borgere. Dette er en MVP (Minimum Viable Product) der hjælper brugere med at oprette et udkast til et testamente.

## 🎯 Formål

Testamentegeneratoren er designet til at:
- Gøre det nemt for ældre danske borgere at oprette et testamente
- Guide brugeren gennem en simpel, trin-for-trin proces
- Generere et juridisk struktureret udkast til et testamente
- Give tydelige advarsler om juridisk rådgivning

## ✨ Funktioner

### 6 Trin Process
1. **Personlige Oplysninger** - Navn, CPR, adresse, civilstand
2. **Familierelationer** - Tilføj ægtefælle, børn og andre familiemedlemmer
3. **Arvefordeling** - Vælg mellem standard fordeling eller tilpasset
4. **Særlige Ønsker** - Tilføj eventuelle særlige instruktioner
5. **Gennemgang** - Se alle oplysninger før generering
6. **Download** - Få dit testamente som PDF

### Brugervenlige Funktioner
- Store, læsbare skrifttyper til ældre brugere
- Høj kontrast og tydelige knapper
- Touch-venlige grænseflader
- Dansk sprog gennem hele applikationen
- Responsivt design til alle enheder

### Juridiske Advarsler
- Tydelige advarsler om at dokumentet kun er et udkast
- Information om notar-krav
- GDPR-compliance med automatisk data-sletning

## 🚀 Installation og Kørsel

### Forudsætninger
- Node.js (version 14 eller højere)
- npm eller yarn

### Installation
```bash
# Klon projektet
git clone [repository-url]
cd testamentur

# Installer dependencies
npm install

# Start udviklings-serveren
npm start
```

Applikationen vil åbne på `http://localhost:3000`

### Build til produktion
```bash
npm run build
```

## 📁 Projektstruktur

```
src/
├── components/          # React komponenter
│   ├── Step1PersonalInfo.tsx
│   ├── Step2FamilyRelations.tsx
│   ├── Step3InheritanceDistribution.tsx
│   ├── Step4SpecialWishes.tsx
│   ├── Step5Review.tsx
│   ├── Step6Download.tsx
│   └── StepWrapper.tsx
├── types.ts            # TypeScript interfaces
├── utils/
│   └── willGenerator.ts # PDF generering
├── App.tsx             # Hovedkomponent
└── index.tsx           # Entry point
```

## 🛠️ Teknologier

- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Styled Components** - CSS-in-JS styling
- **jsPDF** - PDF generering
- **React Router** - Navigation (for fremtidige udvidelser)

## 📋 MVP Begrænsninger

Som specificeret i MVP'en er følgende funktioner **ikke** inkluderet:
- Brugerkonti eller login
- Betalingsfunktioner
- Komplekse arveforhold
- Database lagring
- Server-side funktionalitet

## 🔒 Sikkerhed og Privatliv

- Alle data slettes umiddelbart efter PDF download
- Ingen data sendes til eksterne servere
- GDPR-compliant databehandling
- Ingen persistering af brugerdata

## ⚖️ Juridisk Ansvarsfraskrivelse

**VIGTIGT:** Dette er kun et udkast til et testamente og er ikke juridisk bindende. For at et testamente skal være gyldigt i Danmark, skal det:

1. Underskrives foran en notar
2. Have to vidner til stede
3. Deponeres hos en notar

Vi anbefaler stærkt at konsultere en advokat for professionel juridisk rådgivning.

## 🎨 Designprincipper

### Tilgængelighed
- Store skrifttyper (minimum 16px)
- Høj kontrast farver
- Touch-venlige knapper (minimum 44px)
- Tydelige fokus-indikatorer
- Keyboard navigation support

### Brugervenlighed
- Trin-for-trin proces
- Tydelige instruktioner
- Eksempler og hjælpetekster
- Progress bar
- Mulighed for at gå tilbage

## 📈 Fremtidige Udvidelser

Potentielle funktioner for fremtidige versioner:
- Brugerkonti og gemme funktionalitet
- Integration med notar-systemer
- Flere testamente-typer
- Digital signering
- Backup og synkronisering
- Flersproget support

## 🤝 Bidrag

Dette er et MVP-projekt. For forespørgsler om bidrag eller udvidelser, kontakt projekt-ejeren.

## 📄 Licens

Dette projekt er udviklet som en MVP for testamentegenerator-konceptet.

---

**Bemærk:** Dette er et udkast til et testamente. Konsulter altid en advokat for juridisk rådgivning.
