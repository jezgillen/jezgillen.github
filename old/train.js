var canvas = document.getElementById('background')
var ctx = canvas.getContext('2d');
var numDrops = 0;

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

function boxMullerSample() {
    <!-- Box-Muller to get two gaussians -->
    root = Math.sqrt(-2*Math.log(Math.random()));
    lastBit = 2*Math.PI*Math.random();
    var g1 = root*Math.cos(lastBit);
    var g2 = root*Math.sin(lastBit);
    return g1
}


function drawDot(x,y,size) {
    ctx.beginPath();
    ctx.fillStyle = "hsla(255,99%,99%,0.4)";
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fill();
}

function startDots() {
    console.log(event.clientX)
    x = event.clientX
    y = event.clientY
    drawDot(x,y)
    setInterval(addDrop, 3); // call addDot() every 3ms
}


rainvelx = 3
rainvely = 3
avgDropSize = 2




function addDrop() {
    g1 = boxMullerSample()
    g2 = boxMullerSample()
    u = Math.random()
    rainvelx += g1*(u>0.999)*0.1 + g2*(u>0.999)*0.7
    console.log(rainvelx)
    if(Math.random() < 0.01){
        x = Math.random()*canvas.width
        y = Math.random()*canvas.height
        N = 10*rainvelx
        sizeRandomness = 0.2*boxMullerSample()
        dropSize = avgDropSize + sizeRandomness
        velx = rainvelx + sizeRandomness
        vely = rainvely + sizeRandomness
        for(var i = 0; i < N; i++){
            a = 2*Math.min(i, N-i)/N
            g1 = boxMullerSample()
            g2 = boxMullerSample()
            drawDot(x+velx*i+g1,y+vely*i+g2,a*dropSize)
        }
    }
}
