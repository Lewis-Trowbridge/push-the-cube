class Game {
    loadBackground() {
        this.canvas = document.createElement("canvas");
        $("main")[0].appendChild(this.canvas);
        this.canvas.width = 800;
        this.canvas.height = 448;
        this.context = this.canvas.getContext("2d");
        this.background = new Image();
        this.background.src = "images/background.jpg";
        this.background.onload = () => {
            this.updateBackground(-1600);
        }
    }
    updateBackground(x) {
        this.context.drawImage(this.background, x, 0);
    }
}

var game = new Game();

function setCharacter(name) {
    document.cookie = name;
}

function setProgressBar(percent) {
    $(".progress-bar").css("width", percent + "%");
}
