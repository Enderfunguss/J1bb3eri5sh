let leftWristX = 0;
let leftWristY = 0;
let rightWristX = 0;
let rightWristY = 0;

let scoreRightWrist = 0;
let scoreLeftWrist = 0;

let song1 = '';
let song2 = '';
let isPlaying1 = '';
let isPlaying2 = '';

function preload() {
    song1 = loadSound('song1.mp3');
    song2 = loadSound('song2.mp3');
}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.position(720);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('poseNet good to go!');
}

function gotPoses(result) {
    if (result.length > 0) {
        console.log(result);
        scoreLeftWrist = result[0].pose.keypoints[9].score;
        scoreRightWrist = result[0].pose.keypoints[10].score;

        leftWristX = result[0].pose.leftWrist.x;
        leftWristY = result[0].pose.leftWrist.y;

        rightWristX = result[0].pose.rightWrist.x;
        rightWristY = result[0].pose.rightWrist.y;
    }
}

function draw() {
    image(video, 0, 0, 500, 500);
    isPlaying1 = song1.isPlaying();

    fill('#FF0000');
    stroke('#000000');

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2.stop();

        if (isPlaying1 == false) {
            song1.play();
            document.getElementById('name').innerHTML = 'Song name - Jnathyn: Dioma';
        }
    }

    isPlaying2 = song2.isPlaying();

    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song1.stop();

        if (isPlaying2 == false){
            song2.play();
            document.getElementById('name').innerHTML = 'Song name - Unison: Translucent';
        }
    }
}
