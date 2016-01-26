function covertToGray(r, g, b){
    return (r*0.299 + g*0.587 + b*0.114);
}
function getTextColor(r, g, b){
    return covertToGray(r, g, b) > 186 ? "#222222" : "#fefefe"
}

function getAverageRGB(imgEl) {
    
    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;
        
    if (!context) {
        return defaultRGB;
    }
    
    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
    
    context.drawImage(imgEl, 0, 0);
    
    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        /* security error, img on diff domain */alert('Could not load image data');
        return defaultRGB;
    }
    
    length = data.data.length;
    
    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }
    
    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);
    
    return rgb;
    
}
var color = function(c,m,f,d){
    d=Math.round(f?f:0.2*256)*(m?-1:1);
    function k(i){
        return Math[m?'max':'min'](c[i]+d,m?0:255)
    }
    var rgbNew = [];
    rgbNew.r = k(0);
    rgbNew.g = k(1);
    rgbNew.b = k(2);
    return rgbNew
}


function darken(c,p){
    return color(c, true, p)
}

function lighten(c,p){
    return color(c, false, p)
}

//var t = document.getElementById("torbot");
//var card = document.getElementById("card-1")
//var rgb = getAverageRGB(t);
//card.style.backgroundColor = 'rgb('+rgb.r+','+rgb.g+','+rgb.b+')';