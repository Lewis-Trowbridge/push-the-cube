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
            this.context.drawImage(this.background, 0, 0);
        }
    }
}

var game = new Game();
