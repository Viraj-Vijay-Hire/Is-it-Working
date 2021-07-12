noseX = 0;
noseY = 0;

difference = 0;
right_wristX = 0;
left_wristX = 0;

function setup()
{
    video = createCapture(VIDEO);
    video.size(550, 500);
    canvas = createCanvas(550, 550);
    canvas.position(560, 150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX = " + noseX + "noseY = " + noseY);
        left_wristX = results[0].pose.leftWrist.x;
        right_wristX = results[0].pose.rightWrist.x;
        difference = floor(left_wristX - right_wristX);
        console.log(difference);
    }
}

function modelLoaded()
{
    console.log("poseNet is initialized")
}

function draw()
{
    background('#c0fff4');
    document.getElementById("square_size").innerHTML = "width and height of the square will be " + difference + "px";
    fill('#ffc0cb');
    stroke("#c0fff4");
    square(noseX, noseY, difference);
}



