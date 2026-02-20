let qrcode = null;

function toggleQR() {
    const modal = document.getElementById("qr-modal");
    modal.style.display = modal.style.display === "block" ? "none" : "block";

    if (!qrcode) {
        qrcode = new QRCode(document.getElementById("qrcode"), {
            text: window.location.href,
            width: 200,
            height: 200,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    }
}