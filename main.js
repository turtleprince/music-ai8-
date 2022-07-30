var song1 = "";
var song2 = "";

var song1_status = "";
var song2_status = "";


var X_leftWrist = "";
var Y_leftWrist = "";


var Y_rightWrist = "";
var X_rightWrist = "";

var leftWrist_Score = 0;
var rightWrist_Score = 0;


function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelloaded);
    poseNet.on('pose', got_results);
}

function gotPoses() {

}

function modelloaded() {
    console.log("modelloaded");
}


function got_results(results) {

    if (results.length > 0) {

        leftWrist_Score = results[0].pose.keypoints[9].score;
        rightWrist_Score = results[0].pose.keypoints[10].score;
        console.log("keypoints Score : " + leftWrist_Score + " , " + rightWrist_Score);

        X_leftWrist = results[0].pose.leftWrist.x;
        Y_leftWrist = results[0].pose.leftWrist.y;
        console.log("leftWrist : " + X_leftWrist + " , " + Y_leftWrist);


        X_rightWrist = results[0].pose.rightWrist.x;
        Y_rightWrist = results[0].pose.rightWrist.y;
        console.log("RightWrist : " + X_rightWrist + " , " + Y_rightWrist);

    }


}


function draw() {

    fill("red");
    stroke("red");

    image(video, 0, 0, 600, 500);

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();


    if (leftWrist_Score > 0.2) {

        circle(X_leftWrist,Y_leftWrist,20);
        song2.stop();
        if (song1_status == false){
            song1.play();
            document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song";
        }

    }
    
    if (rightWrist_Score > 0.2) {

        circle(X_leftWrist,Y_leftWrist,20);
        song1.stop();
        if (song2_status == false){
            song2.play();
            document.getElementById("song").innerHTML = "Playing - Peter Pan Song";
        }

    }
    




}


function music_play() {
    song1.play();
}