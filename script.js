var scrollAcion = null;

window.addEventListener("load", () => {
    init();
    document.getElementById("scroll-action").addEventListener("click", () => {
        const element = document.getElementById("canvas-container");
        element.classList.toggle("can-scroll");
        scrollAcion = document.getElementById("scroll-action");
        if (element.classList.contains("can-scroll")) {
            scrollAcion.innerHTML = 'Signe';
        } else {
            scrollAcion.innerHTML = 'Scroll';
        }
    });

    document.getElementById("pen-black").addEventListener("click", () => {
        ctx.strokeStyle = "#000000";
    })

    document.getElementById("pen-blue").addEventListener("click", () => {
        ctx.strokeStyle = "blue";
    })

    document.getElementById("pen-red").addEventListener("click", () => {
        ctx.strokeStyle = "red";
    })

    document.getElementById("pen-green").addEventListener("click", () => {
        ctx.strokeStyle = "green";
    })
})

var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

var x = "black",
    y = 2;

function init() {
    canvas = document.getElementById('pdf-canvas');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;

    canvas.addEventListener('touchmove', function (e) {
        if (scrollAcion.innerHTML != "Signe") {
            return;
        }
        findxy('move', e, true);
    });

    canvas.addEventListener('touchstart', function (e) {
        if (scrollAcion.innerHTML != "Signe") {
            return;
        }
        findxy('down', e, true);
    });

    canvas.addEventListener('touchend', function (e) {
        if (scrollAcion.innerHTML != "Signe") {
            return;
        }
        findxy('down', e, true);
    });

    canvas.addEventListener("mousemove", function (e) {
        if (scrollAcion.innerHTML != "Signe") {
            return;
        }
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        if (scrollAcion.innerHTML != "Signe") {
            return;
        }
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        if (scrollAcion.innerHTML != "Signe") {
            return;
        }
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        if (scrollAcion.innerHTML != "Signe") {
            return;
        }
        findxy('out', e)
    }, false);
}

function color(obj) {
    switch (obj.id) {
        case "green":
            x = "green";
            break;
        case "blue":
            x = "blue";
            break;
        case "red":
            x = "red";
            break;
        case "yellow":
            x = "yellow";
            break;
        case "orange":
            x = "orange";
            break;
        case "black":
            x = "black";
            break;
        case "white":
            x = "white";
            break;
    }
    if (x == "white") y = 14;
    else y = 2;

}

function draw() {
    ctx.beginPath();



    const container = document.getElementById("canvas-container");

    const px = prevX + window.scrollX + container.scrollLeft;
    const py = prevY + window.scrollY + container.scrollTop;

    const cx = currX + window.scrollX + container.scrollLeft;
    const cy = currY + window.scrollY + container.scrollTop;


    ctx.moveTo(px, py);
    ctx.lineTo(cx, cy);
   // ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}

function erase() {
    var m = confirm("Want to clear");
    if (m) {
        ctx.clearRect(0, 0, w, h);
        document.getElementById("canvasimg").style.display = "none";
    }
}

function save() {
    document.getElementById("canvasimg").style.border = "2px solid";
    var dataURL = canvas.toDataURL();
    document.getElementById("canvasimg").src = dataURL;
    document.getElementById("canvasimg").style.display = "inline";
}

function findxy(res, e, isTouch = false) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        if (isTouch) {
            currX = e.touches[0].pageX - canvas.offsetLeft;
            currY = e.touches[0].pageY - canvas.offsetTop;
        } else {
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
        }

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            if (isTouch) {
                currX = e.touches[0].pageX - canvas.offsetLeft;
                currY = e.touches[0].pageY - canvas.offsetTop;
            } else {
                currX = e.clientX - canvas.offsetLeft;
                currY = e.clientY - canvas.offsetTop;
            }
            draw();
        }
    }
}