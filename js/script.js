let hor = document.getElementById("hor");
let min = document.getElementById("min");
let sec = document.getElementById("sec");

let clockInterval = null;
let alertShown = false;

function updateClock() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Format hours, minutes, and seconds to be two digits
    hor.textContent = String(hours).padStart(2, '0');
    min.textContent = String(minutes).padStart(2, '0');
    sec.textContent = String(seconds).padStart(2, '0');
}

function checkOrientation() {
    if (screen.height > screen.width) {
        if (!alertShown) {
            alertShown = true;
            window.alert("Por favor, gire seu dispositivo para o modo paisagem para a melhor experiência.");
        }
        if (clockInterval) {
            clearInterval(clockInterval);
            clockInterval = null;
        }
    } else {
        if (!clockInterval) {
            updateClock();
            clockInterval = setInterval(updateClock, 1000);
        }
        alertShown = false;
    }
}

window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);

// Inicialização
checkOrientation();