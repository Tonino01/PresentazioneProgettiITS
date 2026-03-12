// home.js definitivo

// Variabili globali
let finished = false;
let temperature = 22;
let progress = 0;

// Funzione globale per E-STOP
window.emergencyStop = function() {
    finished = true;

    rpmSlider.value = 0;
    rpmDisplay.textContent = 0;
    rpmSlider.disabled = true;
    feedInput.disabled = true;

    alertBox.style.display = "block";
    alertBox.style.backgroundColor = "#f44336";
    alertBox.style.color = "#fff";
    alertBox.textContent = "❌ EMERGENZA! Lavorazione interrotta!";
};

// Funzione globale per FINISCI SIMULAZIONE
window.endSimulation = function() {
    window.location.href = "../index.html";
};

// Al caricamento della pagina
document.addEventListener("DOMContentLoaded", () => {

    // Elementi DOM
    const canvas = document.getElementById("lathe");
    const ctx = canvas.getContext("2d");

    window.rpmDisplay = document.getElementById("rpmDisplay");
    const rpmSlider = document.getElementById("rpmSlider");
    const feedInput = document.getElementById("feedInput");
    const tempDisplay = document.getElementById("tempDisplay");
    const alertBox = document.getElementById("alertBox");
    const materialeDisplay = document.getElementById("materialeDisplay");

    alertBox.style.display = "none"; // nascondi all'inizio

    // Legge parametri dalla query string
    const params = new URLSearchParams(window.location.search);
    const rpmParam = parseFloat(params.get('rpm')) || 0;
    const feedParam = parseFloat(params.get('feed')) || 0.1;
    const materialeParam = params.get('materiale') || '—';

    // Imposta valori iniziali
    rpmSlider.value = rpmParam;
    rpmDisplay.textContent = rpmParam;
    feedInput.value = feedParam;
    materialeDisplay.textContent = materialeParam;

    const materialeLower = materialeParam.toLowerCase();

    // Temperature critiche per materiale
    const tempCritiche = {
        "legno": 60,
        "alluminio": 90,
        "ottone": 100
    };

    // Disegna barra completamento
    function drawProgressBar(percent) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // sfondo barra
        ctx.fillStyle = "#333";
        ctx.fillRect(20, 120, 460, 50);

        // barra completamento
        ctx.fillStyle = finished ? "#2196f3" : "#4caf50";
        ctx.fillRect(20, 120, (460 * percent) / 100, 50);

        // bordo
        ctx.strokeStyle = "#888";
        ctx.lineWidth = 2;
        ctx.strokeRect(20, 120, 460, 50);

        // testo
        ctx.fillStyle = "white";
        ctx.font = "18px Arial";
        ctx.textAlign = "center";

        if (!finished) {
            ctx.fillText(`Completamento lavorazione: ${percent.toFixed(1)}%`, canvas.width / 2, 100);
        } else {
            ctx.fillStyle = "#00ff90";
            ctx.font = "22px Arial";
            ctx.fillText("✔ LAVORAZIONE COMPLETATA", canvas.width / 2, 100);
        }
    }

    // Aggiorna simulazione
    function updateSimulation() {
        if (finished) return;

        const rpm = parseFloat(rpmSlider.value) || 0;
        const feed = parseFloat(feedInput.value) || 0.1;

        rpmDisplay.textContent = rpm;

        // Aggiornamento completamento lavorazione
        const workSpeed = (rpm * feed) / 100000;
        progress += workSpeed;
        if (progress >= 100) {
            progress = 100;
            finished = true;

            rpmSlider.value = 0;
            rpmDisplay.textContent = 0;
            rpmSlider.disabled = true;
            feedInput.disabled = true;

            alertBox.style.display = "block";
            alertBox.style.backgroundColor = "#00ff90";
            alertBox.style.color = "#000";
            alertBox.textContent = "✔ LAVORAZIONE COMPLETATA";
        }

        drawProgressBar(progress);

        // Aggiornamento temperatura
        const heat = (rpm * 0.0005) + (feed * 0.9);
        temperature += heat * 0.02;
        temperature -= 0.03; // raffreddamento
        if (temperature < 22) temperature = 22;
        tempDisplay.textContent = temperature.toFixed(1);

        // Avviso temperatura critica
        if (tempCritiche.hasOwnProperty(materialeLower)) {
            const crit = tempCritiche[materialeLower];
            if (temperature >= crit) {
                alertBox.style.display = "block";
                alertBox.style.backgroundColor = "#f44336";
                alertBox.style.color = "#fff";
                alertBox.textContent = `⚠️ TEMPERATURA CRITICA per ${materialeParam}!`;
            } else if (!finished) {
                alertBox.style.display = "none";
            }
        }

        requestAnimationFrame(updateSimulation);
    }

    updateSimulation();
});