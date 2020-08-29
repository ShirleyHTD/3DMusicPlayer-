// JScript source code
var LAND_HIGHEST = 20; //20;
var LAND_HIGH_ADJUST = -2;
var result = new Array();
var result1 = new Array();

var colsPlusOne;
var rowsPlusOne;
var loadTerritory = null;

function load_Territory() {
    
    var k = 0;
    var canvas1 = document.getElementById('Canvas2D');
    var ctx1 = canvas1.getContext('2d');
    var image = new Image();

    image.src = "img/territory.png"

    image.onload = function () {
        colsPlusOne = image.width; //image.width,64
        rowsPlusOne = image.height; //image.height,64
        ctx1.drawImage(image, 0, 0, colsPlusOne, rowsPlusOne);
        getgray(ctx1);
        for (var i = 0; i < rowsPlusOne; i++) {
            result[i] = new Array();
            for (var j = 0; j < colsPlusOne; j++)
            { result[i][j] = result1[k++]; }
        }
        //start();
        ctx1.clearRect(0, 0, colsPlusOne, rowsPlusOne);
        loadTerritory = true;
        return result;
    }
}

function getgray(ctx1) {
    var j = 0;
    var imageData = ctx1.getImageData(0, 0, colsPlusOne, rowsPlusOne);
    for (var i = 0; i < imageData.data.length; i += 4) {
        var r = imageData.data[i];
        var g = imageData.data[i + 1];
        var b = imageData.data[i + 2];
        imageData.data[i + 3] = 255;
        var h = (r + g + b) / 3;
        result1[j] = h * LAND_HIGHEST / 255 + LAND_HIGH_ADJUST;
        j++;
    }
}