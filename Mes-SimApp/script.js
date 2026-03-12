// Lista punte e materiali
const punte = [
    { nome: "Punta 1", materiale: "legno", src: "immagini/puntaLegno.png", velocita: 1000 },
    { nome: "Punta 2", materiale: "legno", src: "immagini/puntaLegno2.png", velocita: 1500 },
    { nome: "Punta 3", materiale: "alluminio", src: "immagini/puntaAlluminio.png", velocita: 2000 },
    { nome: "Punta 4", materiale: "ottone", src: "immagini/puntaOttone.png", velocita: 3000 },
];

// Variabile globale punta selezionata
let puntaSelezionata = null;

const punteContainer = document.getElementById("punta");
const selectPunta = document.getElementById("inputMateriale");

// Mostra le punte disponibili inizialmente
function mostraPunte(materiale = null){
    punteContainer.innerHTML = '';
    punte.forEach((p, i) => {
        if(materiale === null || p.materiale.toLowerCase() === materiale.toLowerCase()){
            const btn = document.createElement("button");
            const img = document.createElement("img");
            img.src = p.src;

            btn.addEventListener("click", () => {
                selectPuntaImg(i, img);
            });

            btn.appendChild(img);
            punteContainer.appendChild(btn);
        }
    });
}

// Inizializza tutte le punte
mostraPunte();

// Cambia punte quando cambia materiale
selectPunta.addEventListener("change", function() {
    const mat = selectPunta.value.toLowerCase();
    mostraPunte(mat);
});

// Seleziona la punta
function selectPuntaImg(indice, img){
    puntaSelezionata = punte[indice];

    // Rimuovi border da tutte le immagini
    punteContainer.querySelectorAll("img").forEach(i => i.style.border = "none");

    // Evidenzia la punta selezionata
    img.style.border = "4px solid red";

    console.log("Punta selezionata:", puntaSelezionata);
}

// Start simulazione
function start() {
    const rpm = document.getElementById("rpm").value;
    const feed = document.getElementById("input3").value;

    if(!puntaSelezionata){
        alert("Seleziona una punta prima di avviare la simulazione!");
        return;
    }

    // Passa rpm, avanzamento e materiale tramite query string
    const url = `home/home.html?rpm=${encodeURIComponent(rpm)}&feed=${encodeURIComponent(feed)}&materiale=${encodeURIComponent(puntaSelezionata.materiale)}`;

    location.href = url;
}