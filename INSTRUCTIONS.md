# Testamentegenerator - Brugsanvisning

## 🚀 Hurtig Start

### 1. Start applikationen
```bash
./start.sh
```

Eller manuelt:
```bash
export PATH="/opt/homebrew/opt/node@18/bin:$PATH"
npm start
```

### 2. Åbn i browser
Gå til: http://localhost:3000

## 📱 Sådan bruger du applikationen

### Trin 1: Personlige Oplysninger
- Indtast dit fornavn og efternavn
- Skriv dit CPR-nummer (format: DDMMÅÅ-XXXX)
- Fyld din adresse, postnummer og by ud
- Vælg din civilstand

### Trin 2: Familierelationer
- Tilføj dine familiemedlemmer (ægtefælle, børn, etc.)
- For hver person: navn, relation og valgfrit CPR-nummer
- Du kan tilføje og fjerne familiemedlemmer efter behov

### Trin 3: Arvefordeling
Vælg mellem tre muligheder:
- **Ægtefælle arver mest**: Din ægtefælle får størstedelen
- **Lige fordeling mellem børn**: Alle børn får lige store dele
- **Blandet fordeling**: Du specificerer præcise procentdele

### Trin 4: Særlige Ønsker (valgfrit)
- Beskriv eventuelle særlige ønsker
- F.eks. specifikke gaver, betingelser eller velgørenhed
- Dette trin kan springes over

### Trin 5: Gennemgang
- Se alle dine indtastede oplysninger
- Læs de vigtige advarsler om juridisk rådgivning
- Gå tilbage og ret eventuelle fejl

### Trin 6: Download
- Dit testamente genereres automatisk som PDF
- Filnavnet indeholder dit navn og dato
- Dokumentet downloades til din computer

## ⚠️ Vigtige Advarsler

**DETTE ER KUN ET UDKAST!**

For at dit testamente skal være juridisk bindende, skal du:

1. **Kontakte en notar** - Dokumentet skal underskrives foran en notar
2. **Have to vidner** - Der skal være to vidner til stede
3. **Deponere dokumentet** - Det underskrevne testamente skal deponeres hos notaren

**Vi anbefaler stærkt at konsultere en advokat** for professionel juridisk rådgivning.

## 🎨 Designfunktioner

### Tilgængelighed for ældre brugere:
- Store, læsbare skrifttyper (minimum 16px)
- Høj kontrast farver
- Store, touch-venlige knapper
- Tydelige instruktioner og hjælpetekster
- Mulighed for at gå tilbage og rette fejl

### Responsivt design:
- Fungerer på computer, tablet og mobil
- Automatisk tilpasning til skærmstørrelse
- Touch-venlig på mobile enheder

## 🔒 Privatliv og Sikkerhed

- **Ingen data gemmes** - Alle oplysninger slettes efter download
- **Ingen server** - Alt kører lokalt på din computer
- **GDPR-compliant** - Ingen persistering af personlige data
- **Ingen tracking** - Vi samler ikke brugerdata

## 🛠️ Tekniske Detaljer

### Systemkrav:
- macOS, Windows eller Linux
- Node.js 18 eller højere
- Moderne webbrowser (Chrome, Firefox, Safari, Edge)

### Installation af Node.js (hvis nødvendigt):
```bash
# macOS med Homebrew
brew install node@18

# Windows
# Download fra https://nodejs.org/

# Linux (Ubuntu/Debian)
sudo apt update
sudo apt install nodejs npm
```

## 📞 Support

Hvis du oplever problemer:

1. **Tjek at Node.js er installeret**: `node --version`
2. **Genstart applikationen**: Stop serveren (Ctrl+C) og kør `./start.sh` igen
3. **Ryd browser cache**: Genindlæs siden (Ctrl+F5)
4. **Kontakt support**: Hvis problemer fortsætter

## 📄 Juridisk Ansvarsfraskrivelse

Denne applikation er kun et værktøj til at oprette et udkast til et testamente. Vi:

- Yder **IKKE** juridisk rådgivning
- Kan **IKKE** garantere, at dokumentet er juridisk bindende
- Anbefaler **stærkt** at konsultere en advokat
- Fraskriver os alt ansvar for brugen af det genererede dokument

**Brug på egen risiko og konsulter altid en advokat for juridisk rådgivning.**
