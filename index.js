var index = 0;

$(".btn").click(function () {
    if (game.started) {
        var button = $(this);
        button.addClass("pressed");
        setTimeout(function () {
            button.removeClass("pressed");
        }, 100);
        game.playSound(button);
        if (button.attr("id") === game.sequence[index]) {
            ++index;
        }
        else game.gameOver();
        if (index >= game.level) {
            setTimeout(function () {
                if (!game.over) {
                    game.nextLevel();
                }
            }, 1000);
        }
    }
})

$(document).keydown(function () {
    if (!game.started) {
        game.start();
    }
})

var game = {
    level: 1,
    sequence: [],
    started: false,
    over: false,
    start () {
        this.started = true;
        this.over = false;
        $("#level-title").text("Level " + this.level);
        this.addToSequence();
    },
    nextLevel () {
        ++this.level;
        $("#level-title").text("Level " + this.level);
        this.addToSequence();
        index = 0;
    },
    addToSequence () {
        var colors = ["green", "red", "yellow", "blue"];
        var index = Math.floor(Math.random() * 4);
        this.sequence.push(colors[index]);
        var button = $("#" + colors[index])
        button.animate({ opacity: 0.5 }, 50, function () {
            button.animate({ opacity: 1 });
        });
        this.playSound(button);
    },
    playSound (button) {
        var sound = new Audio("sounds/" + button.attr("id") + ".mp3");
        sound.play();
    },
    gameOver () {
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        this.level = 1;
        index = 0;
        this.sequence = [];
        this.started = false;
        this.over = true;
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
    }
}