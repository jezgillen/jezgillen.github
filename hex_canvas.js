var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
c.width = c.height = 500
cen_x = c.width/2
cen_y = c.height/2

ctx.beginPath();
ctx.arc(cen_x, cen_y, cen_x, 0, 2 * Math.PI);
ctx.stroke();

// ratio between large and one level smaller hexagon radii
constant_ratio = (4*Math.sqrt(3) + 2 - 4*Math.sqrt(1+Math.sqrt(3)))/6

// calculation of ratio of areas between large circle, and all circles contained within
ratio_of_areas = (2/3)*(1/(1-constant_ratio**2))
console.log(ratio_of_areas)

var time = new Date();
var startTime = time.getSeconds()/60 + time.getMilliseconds()/1000/60
var speed = 10

function draw_rings(){
    var time = new Date();
    angle = speed*(time.getSeconds()/60 + time.getMilliseconds()/1000/60 - startTime)
    // ctx.clearRect(0,0,c.width, c.height)
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,c.width, c.height)
    for (var i = 0; i < 6; i++){
        make_hex(cen_x, cen_y, (2/3)*cen_x*constant_ratio**i,(i%2 == 0)*0.5+angle*0.7**i,'red','blue')
    }
    
    window.requestAnimationFrame(draw_rings);
}

function make_hex(x,y,rad,angle,col1, col2){
    ctx.moveTo(x+rad,y);
    for (var i = 0; i < 7; i++){
        j = i+angle
        currx = x+rad*Math.cos(j*2*Math.PI/6)
        curry = y+rad*Math.sin(j*2*Math.PI/6)

        // ctx.lineTo(currx,curry); //draw hexagon

        ctx.moveTo(currx+rad/2,curry);
        ctx.beginPath();
        ctx.arc(currx, curry, rad/2, 0, 2 * Math.PI);

        var grd = ctx.createRadialGradient(currx, curry, 0, currx, curry, rad);
        grd.addColorStop(0, col1);
        grd.addColorStop(1, col2);

        ctx.fillStyle = grd;
        ctx.fill();
        ctx.moveTo(currx,curry);

    }
}
    
draw_rings()
