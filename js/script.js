let hor = document.getElementById("hor");
let min = document.getElementById("min");
let sec = document.getElementById("sec");

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
setInterval(updateClock, 1000);
// Initial call to set the clock immediately