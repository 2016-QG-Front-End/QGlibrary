window.onload = function() {

    var container = document.getElementById("container");
    var list = document.getElementById("list");
    var buttons = document.getElementById("buttons").getElementsByTagName('span');
    var left = document.getElementById("left");
    var right = document.getElementById("right");
    var index = 1;
    var animating = false;
    var powerState = document.getElementById("power");
    var blackScreen = document.getElementById("hover");
    var sign = document.getElementById("sign");
    var opacity = 1;
    var opening = false;

    powerState.onclick = function() {
        if (powerState.className == "On") {
            if (opening) {
                return;
            }
            powerState.className = "Off";
            blackScreen.style.opacity = 1;
            blackScreen.style.display = "block";
            sign.style.opacity = 1;
            sign.style.display = "none";

        } else {
            sign.style.display = "block";
            var powerOn = function() {
                opening = true;
                if (blackScreen.style.opacity > 0) {
                    // opacity -= 0.1;
                    blackScreen.style.opacity = parseInt(blackScreen.style.opacity) - 0.1;
                    setTimeout(powerOn, 1000);
                } else {
                    opening = false;
                    sign.style.display = "none";
                    blackScreen.style.display = "none";

                }
            }
            powerOn();
            // screenHover.style.opacity = 0;
            powerState.className = "On";
        }
    }

    left.onclick = function() {
        if (index == 1) {
            index = 5;
        } else {
            index -= 1;
        }
        if (!animating) {
            slider(600);
        }
        lightIt();
    }

    right.onclick = function() {
        if (index == 5) {
            index = 1;
        } else {
            index += 1;
        }
        lightIt();
        if (!animating) {
            slider(-600);
        }
    }

    function lightIt() {
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className == "on") {
                buttons[i].className = "";
                break;
            }
        }
        buttons[index - 1].className = "on";
    }

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function() {
            if (animating) {
                return;
            }
            if (this.className == "on") {
                return;
            }
            var newIndex = parseInt(this.getAttribute("index"));
            var args = -600 * (newIndex - index);
            slider(args);
            index = newIndex;
            lightIt();
        }
    }

    function slider(args) {
        var slideTo = parseInt(list.style.left) + args;
        var time = 600; //the time for slide one pic
        var interval = 10;
        var speed = args / (time / interval); // the speed of slider

        var go = function() {
            animating = true;
            if ((speed > 0 && parseInt(list.style.left) < slideTo) || (speed < 0 && parseInt(list.style.left) > slideTo)) {
                list.style.left = parseInt(list.style.left) + speed + "px";
                setTimeout(go, interval);
            } else {
                animating = false;
                list.style.left = slideTo + "px";
                if (slideTo > -600) {
                    list.style.left = -3000 + "px";
                }
                if (slideTo < -3000) {
                    list.style.left = -600 + "px";
                }
            }
        }
        go();
    }

    function play() {
        timer = setInterval(function() {
            right.onclick();
        }, 3000);
    }

    function stop() {
        clearInterval(timer);
        // animating = true;
    }
    container.onmouseover = stop;
    container.onmouseout = play;
    play();
}