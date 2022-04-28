var level = 1;
var i = 0;
var sequence = [];
var started = false;
var over = false;

$(".btn").click(function () {
    if (started) {
        var button = $(this);
        button.addClass("pressed");
        setTimeout(function () {
            button.removeClass("pressed");
        }, 100);
        playSound(button);
        if (button.attr("id") === sequence[i]) {
            ++i;
        }
        else gameOver();
        if (i >= level)
        {
            setTimeout(function () {
                if (!over) {
                    nextLevel();
                }                
            }, 1000);           
        }
    }
})

$(document).keydown(function() {
    if(!started) {
        start();
    }
})

function gameOver () {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    level = 1;
    i = 0;
    sequence = [];
    started = false;
    over = true;
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
}

function start () {
    started = true;
    over = false;
    $("#level-title").text("Level " + level);
    addToSequence(); 
}

function nextLevel () {
    ++level;
    $("#level-title").text("Level " + level);
    addToSequence();
    i = 0;
}

function playSound (button) {
    var sound = new Audio ("sounds/" + button.attr("id") + ".mp3");
    sound.play();
}

function addToSequence() {
    var colors = ["green", "red", "yellow", "blue"];
    var index = Math.floor(Math.random() * 4);
    sequence.push(colors[index]);
    var button = $("#" + colors[index])
    button.animate({opacity: 0.5}, 50, function() {
        button.animate({opacity: 1});
    });
    playSound(button);
}