const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = 3000;

// Password-to-postcard mapping
const postcards = {
  venyra: {
    title: "Til Thomas",
    image: "/images/Thomas.jpg",
    note: "Jeg tenkte at siden vi ikke gir hverandre gaver i år så kunne du få en liten julehilsen av meg. For et år det har vært, en berg og dalbane kan man vel kanskje kalle det og du har virkelig stått i det. Vi har vært gode kompiser i snart 8 år og det har vært et *PRIVILEGIUM* å få tilbringe de årene med deg. Det er ikke mange jeg kjenner som jeg føler jeg kan snakke om hva som helst med uten å være bekymret for hva motparten tenker. Du er en fantastisk god venn som jeg virkelig har støttet meg opp mot i tider jeg har trengt det, så det er veldig viktig for meg at du vet at selv om du bor 231180 meter unna så er jeg her får returnere deg tjenesten. \n\nJeg håper at du får en fantastisk fin jul og så sees vi snart får å se 5 år i dnd gå opp i røyk x-x. God Jul :))",
  },
  hvit: {
    title: "Til Nikolai",
    image: "/images/Nikolai.jpg",
    note: "Jeg tenkte at siden vi ikke gir hverandre gaver i år så kunne du få en liten julehilsen av meg. Min gode venn/debattant/orator/kverulant. I 8 år har vi hat diskusjoner om alt mulig mellom himmel og jord. Du er en av dem jeg synes det er mest interessant å snakke med siden vi gjerne har 2 forskjellige perspektiv på ting. Du er veldig enkel å snakke med om alt og du har en fantastisk fin personlighet. Du er enkel å komme til når du først svarer på meldingene mine x-x. Du har vært en grunnpilar i livet mitt siden vi møtes på ungdomskolen og jeg setter veldig stor pris på alle øyeblikkene vi har delt sammen selv om noen av dem kanskje best kan beskrives som «tvilsomme». Jeg håper du får en fin jul og så sees vi snart. God Jul :))",
  },
  Olav: {
    title: "Til Daniel",
    image: "/images/Daniel.jpg",
    note: "O'Store DM, tenkte at du fortjerner en liten julehilsen fra meg siden du bruker så mye tid på å underholde oss i DnD. Vi har vært gode venner i 8 år nå og vi har delt mange fine øyeblikk sammen. Med untakk da du dolket meg i ryggen i Vg2, ja jeg er forstatt salty for at du baila meg >:O (Neida). Du er en av de mest kreative personene jeg kjenner og du er rett å slett bare gøy å være med. Du klarer alltid å meg til å le enten med vilje eller med  uhell. Du har en fantastisk evne til å stille opp (av og til under tvang) og være en god kompis. Jeg håper jeg klarer å være en brøkdel så god venn til deg som du har vært for meg oppgjennom årene. Jeg vil ønske deg og dine nære en god jul :) P.S PLZ IKKE DREP OLAV",
  },
  Kokt: {
    title: "Til Oskar",
    image: "/images/Oskar.jpg",
    note: "Winner, winner chicken dinner. Tenkte at bildet over passet fint siden jeg vet du er så glad i Vimse uwu. Dette er bare en liten julehilsen fra meg siden vi ikke gir hverandre noen gaver i år. Du er den eneste som ble igjen i Ålesund, og det har tvunget meg til å tilbringe mer tid med deg på både godt og vondt, neida bare spøker. Jeg er veldig glad for at du går her ute på NTNU når vi er sammen har vi aldri et kjedelig øyeblikk. Om det så er at du koker kylling, eller sklir oss av veien slik at snøfonnen står 5 meter opp i luften. Du har vært en konstant i livet mitt i godt over 8 år nå og jeg må si at det har jeg virkelig satt pris på. Du får ha en god jul og så gleder jeg meg til Zeke dør i neste session.",
  },
  Ild: {
    title: "Til Andreas",
    image: "/images/Andreas.jpg",
    note: " Min gode venn/debattant/kverulant. I 8 år har vi hat diskusjoner om alt mulig mellom himmel og jord. Du er en av dem jeg synes det er mest interessant å snakke med siden vi gjerne har 2 forskjellige perspektiv på ting. Du er veldig enkel å snakke med om alt og du har en fantastisk fin personlighet. Du er et fantastisk flott menneske som jeg setter veldig stor pris på. Jeg håper du får en fin jul og så sees vi snart. God Jul :)",
  },
};

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Serve static files, including images
app.use(express.static(path.join(__dirname, "public")));

// Serve the frontend index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Handle password validation and return postcard details
app.post("/check-password", (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.json({ valid: false });
  }

  // Convert input password to lowercase for case-insensitive comparison
  const lowerCasePassword = password.toLowerCase();

  // Check against keys converted to lowercase
  const matchedKey = Object.keys(postcards).find(
    (key) => key.toLowerCase() === lowerCasePassword
  );

  if (matchedKey) {
    res.json({
      valid: true,
      title: postcards[matchedKey].title,
      image: postcards[matchedKey].image,
      note: postcards[matchedKey].note,
    });
  } else {
    res.json({ valid: false });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
