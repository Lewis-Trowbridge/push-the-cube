"use strict";

var background, canvas, context, pushing;

function updateBackground(x) {
    context.drawImage(background, x, 0);
}

function loadBackground() {
    background = new Image();
    background.src = "images/background.jpg";
    background.onload = () => {
        updateBackground(-1600);
    }
}

function setCharacter(name) {
    document.cookie = name;
}

function setProgressBar(percent) {
    $(".progress-bar").css("width", percent + "%");
}

function setPushing(state) {
    if(pushing !== state) {
        pushing = state;
    }
}

document.onkeydown = (event) => {
    var key = event.key;
    if(key === "d") {
        setPushing(true);
    }
}

document.onkeyup = (event) => {
    var key = event.key;
    if(key === "d") {
        setPushing(false);
    }
}

function start() {
    pushing = false;
    canvas = document.createElement("canvas");
    $("main")[0].appendChild(canvas);
    canvas.width = 800;
    canvas.height = 448;
    context = canvas.getContext("2d");
    loadBackground();
}

$().ready(start);
