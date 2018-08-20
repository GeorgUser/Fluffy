window.onload = function () {
    var canvas = document.getElementById('c1');
    var ctx = canvas.getContext('2d');
    var canvasW = document.documentElement.clientWidth;
    var canvasH = window.innerHeight;

    var x = [];
    var y = [];
    var stepCount = [];
    var direction = [];
    var myX;
    var myY;


    var inputDot = document.getElementById('numberDot');
    var inputColorLine = document.getElementById('color');
    var inputSpeed = document.getElementById('speed');
    var inputBG = document.getElementById('bg');
    var inputColorDot = document.getElementById('colorDot');
    var inputNumbStep = document.getElementById('numbStep');
    var inputSpeedDot = document.getElementById('longStep');
    var inputArea = document.getElementsByName('area');
    var inputAreaMouse = document.getElementById('areaMouse');
    var speed = inputSpeed.value;
    var numbStep = inputNumbStep.value;
    var numberDot = inputDot.value;
    var speedDot = inputSpeedDot.value;
    var colorLine = inputColorLine.value;
    var colorDot = inputColorDot.value;
    var areaMouse = inputAreaMouse.value;
    var scrollStart = 0;
    var myX;
    var myY;
    var bg;

    document.getElementById('btn').onclick = function () {
        document.getElementById('settings').style.display = 'block';
        document.getElementById('space').style.height = '100%';
        setInterval(scroll, 20);
        resizeCanvas();
    }

    function scroll() {
        var windowH = document.documentElement.clientHeight;
        var documentH = document.documentElement.scrollHeight;
        var scrollEnd =  documentH - windowH;

        if(scrollStart < scrollEnd){
            document.documentElement.scrollTop = scrollStart;
            scrollStart += 5;
        } else {
            return;
        }
    }


    function resizeCanvas() {
        canvasW = document.documentElement.clientWidth;
        canvasH = window.innerHeight - 52;
        canvas.width = canvasW;
        canvas.height = canvasH;
    }



    inputAreaMouse.oninput = function () {
        areaMouse = this.value;
        if(this.value<= 30){
            areaMouse = 30;
        }
    }
    inputColorLine.oninput = function () {
        colorLine = this.value;
    }
    inputBG.oninput = function () {
        bg = canvas.style.backgroundColor = t
    }
    inputSpeed.oninput = function () {
        speed = this.value;
    }
    inputColorDot.oninput = function () {
        colorDot = this.value;
    }
    inputNumbStep.oninput = function () {
        numbStep = this.value;
    }
    inputSpeedDot.oninput = function () {
        speedDot = this.value;
    }
    inputDot.oninput = function () {
        numberDot = inputDot.value;
        for(var i=0; i<numberDot; i++){
            x[i]= canvasW/2;
            y[i]= canvasH/2;
            stepCount[i]= 0;
            direction[i]= 0;
        }
    }


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
    window.onresize = resizeCanvas;
    resizeCanvas();
    drawDot();
}
