video = "";
objects = [];
status = "";

function setup(){
    canvas = createCanvas(480, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function buttun(){
    objectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("h3").innerHTML = "Status: Detecting Objects";
    objectn = document.getElementById("text-input").value;
}
function modelloaded(){
console.log('model loaded');
status = true;
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video, 0, 0, 480, 400);
        if(status != ""){
            objectDetector.detect(video, gotResults);
            for (i = 0; i < objects.length; i++){
                document.getElementById("h3").innerHTML = "Status : object(s) detected";            
                fill("cyan");
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x + 10, objects[i].y + 10)
                noFill();
                stroke("cyan");
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

                if(objects[i].label == objectn){
                    video.stop();
                    objectDetector.detect(gotResults);
                    document.getElementById("H3").innerHTML = objectn + "Found!";
                    synth = window.speechSynthesis;
                    utterThis = new SpeechSynthesisUtterance(objectn + 'Found!');
                    synth.speak(utterThis);
                }
                else {
                    document.getElementById("H3").innerHTML = objectn + " Object Not Found! :(";
                }
            }
        }
    }
