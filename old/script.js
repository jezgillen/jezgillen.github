var window_width = window.innerWidth;
<!-- TODO scale everything by size of window, or maybe size of font -->
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
    x = (x-window.innerWidth/2)*8*Math.PI/window.innerWidth
    y = (y-window.innerHeight/2)*8*Math.PI/window.innerHeight
    if(Math.max(Math.abs(x),Math.abs(y)) > 4*Math.PI){
        console.log("out of bounds")
        return 0;
    }
    return circles(x,y);
};

<!-- Measured in pixels -->
var slider = document.getElementById("g_deviation");
var g_value_text = document.getElementById("currentValue");
g_value_text.innerHTML = slider.value;
var g_deviation = slider.value;
slider.oninput = function() {
    g_deviation = (this.value/100)*window_width;
    g_value_text.innerHTML = this.value;
}

var hasRun = false;
function startDots() {

    if(hasRun && false){
        return;
    }
    hasRun = true;
    var numDots = Math.random()*255;
    var elem = document.getElementById("dot");
    var elem2 = elem.cloneNode(true)
    document.getElementById("background").appendChild(elem2)
    var x = event.clientX;
    var y = event.clientY;
    elem2.style.top = y+"px";
    elem2.style.left = x+"px";
    elem2.style.backgroundColor = "hsl("+numDots/10+",80%,80%)";
    var id = setInterval(frame, 1);
    function frame() {
        if (false) {
            clearInterval(id);
        } else {

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
                var elem = elem2.cloneNode(true);
                document.getElementById("background").appendChild(elem);

                elem.style.backgroundColor = "hsl("+numDots/10+",80%,80%)";
                elem.style.top = y+"px"; 
                elem.style.left = x+"px"; 
            }
        }
    }
}
