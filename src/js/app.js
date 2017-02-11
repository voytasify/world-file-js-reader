var worldFileLoaded = false;
var a, b, c, d, e, f;

$(document).ready(function() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');

    var fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', function() {
        var file = fileInput.files[0];

        var reader = new FileReader();
        reader.onload = function() {
            var lines = reader.result.split(/[\r\n]+/g);

            a = parseFloat(lines[0]);
            d = parseFloat(lines[1]);
            b = parseFloat(lines[2]);
            e = parseFloat(lines[3]);
            c = parseFloat(lines[4]);
            f = parseFloat(lines[5]);

            worldFileLoaded = true;
        };
        reader.readAsText(file);
    });

    var image = new Image();
    image.src = 'world_file_sample/sample.jpg';
    image.onload = function() {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };

    $('#myCanvas').bind('mousemove', function(e) {
        if(worldFileLoaded === false)
            return;

        var coords = getCoordinates(e.offsetX, e.offsetY);
        $('#x').text(roundTo2DecimalPlaces(coords.x));
        $('#y').text(roundTo2DecimalPlaces(coords.y));
    });
});

function getCoordinates(mouseX, mouseY) {
    var x = a * mouseX + b * mouseY + c;
    var y = d * mouseX + e * mouseY + f;
    return { 'x': x, 'y': y };
}

function roundTo2DecimalPlaces(num) {
    return parseFloat(Math.round(num * 100) / 100).toFixed(2);
}