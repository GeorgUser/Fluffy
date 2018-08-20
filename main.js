window.onload = function () {
    var canvas = document.getElementById('c1');
    var ctx = canvas.getContext('2d');

    var x = [];
    var y = [];
    var stepCount = [];
    var direction = [];
    var myX;
    var myY;



    for(var s=0; s<numberDot; s++){
        x[s]= canvasW/2;
        y[s]= canvasH/2;
        stepCount[s]= 0;
        direction[s]= 0;
    }


    function drawDot() {
        ctx.clearRect(0, 0, canvasW, canvasH);
        for(var i=0; i<numberDot; i++){
            if(stepCount[i] == 0){
                stepCount[i] = Math.floor(numbStep*Math.random());
                direction[i] = Math.floor(8*Math.random());
            } else {
                stepCount[i]--
            }


            for(var s = 0; s<inputArea.length; s++){
                if(inputArea[0].checked){
                    if(y[i]<0) direction[i] = 1;

                    if(x[i]<0) direction[i] = 3;

                    if(x[i]>canvasW) direction[i] = 2;

                    if(y[i]>canvasH) direction[i]= 0;
                } else {
                    if(y[i]<myY-Number(areaMouse)) direction[i] = 1;

                    if(x[i]<myX-Number(areaMouse)) direction[i] = 3;

                    if(x[i]>myX+Number(areaMouse)) direction[i] = 2;

                    if(y[i]>myY+Number(areaMouse)) direction[i]= 0;

                    if(y[i]<myY-Number(areaMouse) || x[i]<myX-Number(areaMouse) || x[i]>myX+Number(areaMouse) || y[i]>myY+Number(areaMouse)){
                        speedDot = 80;
                    } else speedDot = Number(inputSpeedDot.value);
                }
            }

            switch (direction[i]){
                case 0:
                    // up
                    y[i] -= Number(speedDot);
                    break;
                case 1:
                    // down
                    y[i] += Number(speedDot);
                    break;
                case 2:
                    // left
                    x[i] -= Number(speedDot);
                    break;
                case 3:
                    // right
                    x[i] += Number(speedDot);
                    break;
                case 4:
                    // right up
                    y[i] -= Number(speedDot);
                    x[i] += Number(speedDot);
                    break;
                case 5:
                    //  right down
                    y[i] += Number(speedDot);
                    x[i] += Number(speedDot);
                    break;
                case 6:
                    // left up
                    x[i] -= Number(speedDot);
                    y[i] -= Number(speedDot);
                    break;
                case 7:
                    // left down
                    x[i] -= Number(speedDot);
                    y[i] += Number(speedDot);
                    break;
            }

            ctx.beginPath();
            ctx.fillStyle = colorDot;
            ctx.fillRect(x[i]-1,y[i]-1,2,2);


            ctx.beginPath();
            ctx.moveTo(x[i],y[i]);
            ctx.lineTo(myX,myY);
            ctx.strokeStyle = colorLine;
            ctx.stroke();
        }
        setTimeout(drawDot, speed);
    }

    canvas.onmousemove = function (event) {
        myX = event.offsetX;
        myY = event.offsetY;
    }
    drawDot();
}
