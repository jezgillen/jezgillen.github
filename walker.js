var canvas = document.getElementById('background')
var ctx = canvas.getContext('2d');
var numDots = 0;

(function() {
    canvas.addEventListener('click', startDots, false)

    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
})();

function spiralMistake(x,y){
    a = 2; b = 2;
    return Math.exp(-0.5*(Math.sqrt(x**2 + y**2) - (a+b*Math.asin(y/x)))**2)
}
function twoBentNails(x,y){
    a = 2; b = 2;
    return Math.exp(-0.5*((x**2 + y**2) - (a+b*Math.atan(y/x))**2)**2);
}
function spiral(x,y){
    var r = Math.sqrt(x**2 + y**2);
    var theta = Math.atan(y/x);
    var d = (r - theta)/Math.PI 
    return Math.exp(-0.5*50*(d - Math.round(d))**2)+0.05;
}
function circles(x,y){
    return Math.exp(-(1/4)*Math.sqrt(x**2 + y**2))*(Math.sin(2*Math.sqrt(x**2 + y**2))+1);
}

function f(x,y){
    x = (x-canvas.width/2)*8*Math.PI/canvas.width
    y = (y-canvas.height/2)*8*Math.PI/canvas.height
    if(Math.max(Math.abs(x),Math.abs(y)) > 4*Math.PI){
        console.log("out of bounds")
        return 0;
    }
    return circles(x,y);
};

function startDots() {
    console.log(event.clientX)
    x = event.clientX
    y = event.clientY
    ctx.beginPath();
    ctx.fillStyle = "hsla("+numDots/1000+",80%,80%,0.3)";
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fill();
    setInterval(addDot, 3); // call addDot() every 3ms
}

// Measured in pixels 
var slider = document.getElementById("g_deviation");
var g_value_text = document.getElementById("currentValue");
g_value_text.innerHTML = slider.value;
var g_deviation = slider.value/100*canvas.width;
slider.oninput = function() {
    g_deviation = (this.value/100)*canvas.width;
    g_value_text.innerHTML = this.value;
}


function addDot() {
    <!-- Box-Muller to get two gaussians -->
    root = Math.sqrt(-2*Math.log(Math.random()));
    lastBit = 2*Math.PI*Math.random();
    g1 = root*Math.cos(lastBit);
    g2 = root*Math.sin(lastBit);

    newx = x + g_deviation*g1;
    newy = y + g_deviation*g2;
    alpha = f(newx,newy)/f(x,y);
    if(alpha > Math.random()){
        numDots++;
        x = newx;
        y = newy;
        ctx.beginPath();
        ctx.fillStyle = "hsla("+numDots/1000+",80%,80%,0.3)";
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
    }
}
