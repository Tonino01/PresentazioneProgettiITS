



// Legge i parametri della query string per ottenere gli rpm
function readRpmFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const rpmParam = params.get('rpm');
    if (rpmParam !== null) {
        const rpmDisplay = document.getElementById('rpmDisplay');
        const rpmSlider = document.getElementById('rpmSlider');
        rpmDisplay.textContent = rpmParam;
        rpmSlider.value = rpmParam;
    }
}

function endSimulation(){
    window.location.href = "../index.html";

}

// inizializza lettura rpm quando la pagina è caricata
document.addEventListener('DOMContentLoaded', readRpmFromUrl);

