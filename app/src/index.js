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
    qrbox: {
        width: 250,
        height: 250,
    },
    fps: 20
});
scanner.render(success, error);

function success(result) {

    var qrdata = JSON.parse(result);
    console.log(qrdata);
    var dataini = Date.parse(qrdata.inicio);
    var datafim = Date.parse(qrdata.fim);
    var datanow = Date.now();
    var diff = datanow - datafim;
    var valor = ((datafim - dataini)/36e5)*1.5;
    var multa = 0;
    
    if (diff > 0) multa = (diff/36e5)*3;
    valor += multa;

    console.log(dataini, datafim, datanow, valor, multa);

    document.getElementById('result').innerHTML = `
        <p>${result}</p>
        <p>Valor: R$ ${valor.toFixed(2)}</p>
        <p>Multa: R$ ${multa.toFixed(2)}</p>`;

    scanner.clear();
    document.getElementById('reader').remove();    
}

function error(err) {
    //console.error(err);
}