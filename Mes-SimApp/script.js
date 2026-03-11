const punte = [
    {
        
        nome: "Punta 1",
        materiale: "legno",
        src: "immagini/puntaLegno.png",
        velocita: 1000,
    },
    {
        
        nome: "Punta 2",
        materiale: "legno",
        src: "immagini/puntaLegno2.png",
        velocita: 1500,

    },
    {
        nome: "Punta 3",
        materiale: "alluminio",
        src: "immagini/puntaAlluminio.png",
        velocita: 2000,
    },
    {   
        nome: "Punta 4",
        materiale: "ottone",
        src: "immagini/puntaOttone.png",
        velocita: 3000,
    },


];



// Variabile globale per salvare la punta selezionata
let puntaSelezionata = null;

const punteContainer = document.getElementById("punta");
let selectPunta = document.getElementById("inputMateriale");




//mostra le punte disponibili al caricamento della pagina
for (let i = 0; i < punte.length; i++) {
    

    const puntaButton = document.createElement("button");
    const puntaImg = document.createElement("img");

    puntaImg.src = punte[i].src;

        

    puntaButton.appendChild(puntaImg);
    punteContainer.appendChild(puntaButton);
    
}
    


selectPunta.addEventListener("change", function() {
    
    punteContainer.innerHTML = '';

    switch (selectPunta.value) {
    case "Legno":
        // aggiunge un bottone per ogni punta di legno
        for (let i = 0; i < punte.length; i++) {
            if (punte[i].materiale.toLowerCase() === "legno") {

                const puntaButton = document.createElement("button");
                const puntaImg = document.createElement("img");

                puntaImg.src = punte[i].src;

                // Salva l'indice della punta per il click handler
                puntaButton.addEventListener("click", function() {
                    selectPuntaImg(i, puntaImg);
                });

                puntaButton.appendChild(puntaImg);
                punteContainer.appendChild(puntaButton);
            }
        }

        break;

    case "alluminio":
        // aggiunge un bottone per ogni punta di alluminio
        for (let i = 0; i < punte.length; i++) {
            if (punte[i].materiale.toLowerCase() === "alluminio") {

                const puntaButton = document.createElement("button");
                const puntaImg = document.createElement("img");

                puntaImg.src = punte[i].src;

                puntaButton.addEventListener("click", function() {
                    selectPuntaImg(i, puntaImg);
                });

                puntaButton.appendChild(puntaImg);
                punteContainer.appendChild(puntaButton);
            }
        }

        break;

    case "ottone":
        // aggiunge un bottone per ogni punta di ottone
        for (let i = 0; i < punte.length; i++) {
            if (punte[i].materiale.toLowerCase() === "ottone") {
                const puntaButton = document.createElement("button");
                const puntaImg = document.createElement("img");

                puntaImg.src = punte[i].src;

                puntaButton.addEventListener("click", function() {
                    selectPuntaImg(i, puntaImg);
                });
                puntaButton.appendChild(puntaImg);
                punteContainer.appendChild(puntaButton);
            }
        }

        break;

    default:
        break;
    }
});


function selectPuntaImg(indicePunta, puntaImg) {
    // Salva la punta selezionata nella variabile globale
    puntaSelezionata = punte[indicePunta];
    
    // Rimuovi il border da tutte le immagini
    const allImages = punteContainer.querySelectorAll("img");
    allImages.forEach(img => {
        img.style.border = "none";
    });
    
    // Aggiungi il border all'immagine selezionata
    puntaImg.style.border = "4px solid blue";
    
    // Log per debuggare (opzionale)
    console.log("Punta selezionata:", puntaSelezionata);
}





let rpm = 0;



function start() {
    const rpmValue = document.getElementById("rpm").value;
    const avanzamentoValue = document.getElementById("input3").value;
    rpm = document.getElementById("rpm").value;

    // passa il valore correttamente come query string "rpm"
    location.href = 'home/home.html?rpm=' + encodeURIComponent(rpm);


}
