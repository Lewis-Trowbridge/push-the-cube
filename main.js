"use strict";

var background, canvas, context, cube, id, instance, pushing;
var characters = {};

function updateBackground() {
    var x = -Math.floor(instance["progress"] / 10) % 1600;
    context.drawImage(background, x, 0);
}

function loadImages() {
    background = new Image();
    background.src = "images/background.jpg";
    background.onload = () => {
        context.drawImage(background, 0, 0);
    }
    cube = new Image();
    cube.src = "images/cube.png";
    var name, image;
    for(name of ["monica", "simeorb", "alex", "james"]) {
        image = new Image();
        image.src = "images/" + name + ".png";
        characters[name] = image;
    }
}

function setState(character, push) {
    var request = new XMLHttpRequest();
    request.open("POST", "serverside/setstate.php");
    request.setRequestHeader(
        "Content-type", "application/x-www-form-urlencoded"
    );
    request.send(
        "id=" + id + "&character=" + character +
        "&pushing=" + (push ? "true" : "false")
    );
}

function setCharacter(name) {
    document.cookie = name;
    setState(name, pushing);
}

function setProgressBar(percent) {
    $(".progress-bar").css("width", percent + "%");
}

function setPushing(state) {
    if(pushing !== state) {
        pushing = state;
        setState(document.cookie, state);
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

function connect() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = () => {
        if(request.readyState === 4 && request.status === 200) {
            id = request.responseText;
            console.log(setInterval(getInstance, 200));
        }
    }
    request.open("POST", "serverside/connect.php");
    request.setRequestHeader(
        "Content-type", "application/x-www-form-urlencoded"
    );
    if(!document.cookie) {
        setCharacter("monica");
    }
    request.send("character=" + document.cookie);
}

function getInstance() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = () => {
        if(request.readyState === 4 && request.status === 200) {
            instance = JSON.parse(request.responseText);
            updateBackground();
        }
    }
    request.open("GET", "serverside/getinstance.php");
    request.send();
}

function start() {
    pushing = false;
    canvas = document.createElement("canvas");
    $("main")[0].appendChild(canvas);
    canvas.width = 800;
    canvas.height = 448;
    context = canvas.getContext("2d");
    loadImages();
    connect();
}

window.onbeforeunload = (event) => {
    var data = new FormData();
    data.append("id", id);
    navigator.sendBeacon("serverside/disconnect.php", data);
}

$().ready(start);
