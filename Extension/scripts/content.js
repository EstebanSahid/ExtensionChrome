

var fechaActual = new Date();
var fechaMenosUnMes;
var fechaMasUnMes;
var respuestaJson = [];


function clickEvento(){
    var evento = document.getElementById("btn");

    if(evento){
        document.getElementById("btn").click();
        var fechaMenosUnMesTemp = new Date(fechaActual);
        var fechaMasUnMesTemp = new Date(fechaActual);

        EventfechaMenosUnMes(fechaMenosUnMesTemp);
        EventfechaMasUnMes(fechaMasUnMesTemp);

        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
            respuestaJson = data;
            console.log(respuestaJson);
            downloadCSV();
        });
    }
}


function EventfechaMenosUnMes(fecha) {
    fecha.setMonth(fecha.getMonth() - 1);
    fechaMenosUnMes = formatoAnioMesDia(fecha);

    const fechaIniInput = document.getElementById("fechaini");
    fechaIniInput.value = fechaMenosUnMes;

    console.log("Fecha actual menos un mes: " + fechaMenosUnMes);
}

function EventfechaMasUnMes(fecha) {
    fecha.setMonth(fecha.getMonth() + 1);
    fechaMasUnMes = formatoAnioMesDia(fecha);

    const fechaFinInput = document.getElementById("fechafin");
    fechaFinInput.value = fechaMasUnMes;

    console.log("Fecha actual más un mes: " + fechaMasUnMes);
}

function formatoAnioMesDia(fecha) {
    var year = fecha.getFullYear();
    var month = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Agrega cero al mes si es necesario
    var day = fecha.getDate().toString().padStart(2, '0'); // Agrega cero al día si es necesario
    return year + '-' + month + '-' + day;
}

function convertToCSV(jsonData) {
    var csv = "";
    if (jsonData && jsonData.length > 0) {
        var headers = Object.keys(jsonData[0]);
        csv += headers.join(',') + '\n';

        for (var i = 0; i < jsonData.length; i++) {
            var values = Object.values(jsonData[i]);
            csv += values.join(',') + '\n';
        }
    }
    
    return csv;
}
    

function downloadCSV() {
    var csvData = convertToCSV(respuestaJson);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.href = url;
    a.download = 'datos.csv'; 
    
    // Simular un clic en el enlace para descargar el archivo
    a.click();
    
    // Liberar la URL del Blob
    window.URL.revokeObjectURL(url);
}

function ejecutarYRepetir() {
    clickEvento();

    setInterval(clickEvento, 20 * 60 * 1000);
}

ejecutarYRepetir();