(function() {
    var canvas = document.getElementById('background')
    var ctx = canvas.getContext('2d');

    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        drawStuff(); 
    }
    resizeCanvas();

    function drawStuff() {
        cen_x = canvas.width/2
        cen_y = canvas.height/2

        // ratio between large and one level smaller hexagon radii
        constant_ratio = (4*Math.sqrt(3) + 2 - 4*Math.sqrt(1+Math.sqrt(3)))/6

        // calculation of ratio of areas between large circle, and all circles contained within
        ratio_of_areas = (2/3)*(1/(1-constant_ratio**2))
        console.log(ratio_of_areas)

        var time = new Date();
        var startTime = time.getTime()
        var speed = 20

        function draw_rings(){
            init_canvas()
            var time = new Date();
            angle = speed*(time.getTime() - startTime)/60000 
            // ctx.clearRect(0,0,c.width, c.height)
            for (var i = 0; i < 6; i++){
                var radius = (2/3)*cen_x*constant_ratio**i
                var a = (i%2 == 0)*0.5+angle*0.7**i
                make_hex(cen_x, cen_y, radius, a,'red','blue')
            }
            
            window.requestAnimationFrame(draw_rings);
        }

        function init_canvas(){
            ctx.fillStyle = 'black'
            ctx.fillRect(0,0,canvas.width, canvas.height)

            ctx.beginPath();
            ctx.strokeStyle = 'darkblue';
            ctx.arc(cen_x, cen_y, cen_x, 0, 2 * Math.PI);
            ctx.stroke();
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
    }
})();

