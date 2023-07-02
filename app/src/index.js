//const Html5QrcodeScanner = require("html5-qrcode-scanner");

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(registration => {
        console.log("Service Worker Registered");
        console.log(registration);
    }).catch(err => {
        console.log("Service Worker Registration Failed");
        console.log(err);
    });
} else {
    console.log("Service Worker not supported");
}

const scanner = new Html5QrcodeScanner('reader', { 
    // Scanner will be initialized in DOM inside element with id of 'reader'
    qrbox: {
        width: 250,
        height: 250,
    },  // Sets dimensions of scanning box (set relative to reader element width)
    fps: 20, // Frames per second to attempt a scan
});

console.log(scanner);

scanner.render(success, error);
// Starts scanner

function success(result) {

    document.getElementById('result').innerHTML = `
    <h2>Success!</h2>
    <p><a href="${result}">${result}</a></p>
    `;
    // Prints result as a link inside result element

    scanner.clear();
    // Clears scanning instance

    document.getElementById('reader').remove();
    // Removes reader element from DOM since no longer needed
    
}

function error(err) {
    console.error(err);
        // Prints any errors to the console
}