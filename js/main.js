'use strict';


const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');



const bird = new Image();
const bg = new Image();
const floor = new Image();
const pipeTop = new Image();
const pipeBottom = new Image();

const fly = new Audio();
const score_audio = new Audio();

fly.src = 'audio/fly.mp3';
score_audio.src = 'audio/score.mp3';


const gap = 90;

let birdX = 0;
let birdY = 200;
let gravity = 1;


const pipes = [];

pipes[0] = {
    x: cvs.width,
    y: 0
}


let score = 0;

document.addEventListener('keydown', () => {
    birdY -= 20;
    fly.play();
});

bird.src = 'img/bird.png';
bg.src = 'img/bg.png';
floor.src = 'img/floor.png';
pipeTop.src = 'img/pipe_top.png';
pipeBottom.src = 'img/pipe_bottom.png';


const draw = () => {
    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < pipes.length; i++) {
        ctx.drawImage(pipeTop, pipes[i].x, pipes[i].y);
        ctx.drawImage(pipeBottom, pipes[i].x, pipes[i].y + pipeTop.height + gap);

        pipes[i].x -= 1;

        if (pipes[i].x == 120) {
            pipes.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeTop.height) - pipeTop.height
            });
        }

        if (birdX + bird.width >= pipes[i].x && // po x =>
            birdX <= pipes[i].x + pipeTop.width && // 
            (birdY <= pipes[i].y + pipeTop.height || // 
                birdY + bird.height >= pipes[i].y + pipeTop.height + gap) ||
            birdY + bird.height >= cvs.height - floor.height || birdX >= floor.height) {
            location.reload(); // Перезагрузка страницы
        }




        if (pipes[i].x == 5) {
            score++;
            score_audio.play();
        }


    }


    ctx.drawImage(bird, birdX, birdY);
    ctx.drawImage(floor, 0, cvs.height - floor.height);

    birdY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Your score is: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;