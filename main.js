prediction = ""

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");
Webcam.attach( '#camera' );

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version: ', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Eep2Da_E3/model.json', modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded!');
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data = "This Gesture Means - " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}


function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if (error){
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if (results[0].label == "AMAZING")
        {
            document.getElementById("emoji_update").innerHTML = "&#128076;";
        }
        if (results[0].label == "ALL THE BEST")
        {
            document.getElementById("emoji_update").innerHTML = "&#128077;";
        }
        if (results[0].label == "MARVELOUS VICTORY")
        {
            document.getElementById("emoji_update").innerHTML = "&#9996;";
        }
        if (results[0].label == "RAISED FIST")
        {
            document.getElementById("emoji_update").innerHTML = "&#9994;";
        }
        if (results[0].label == "SIGN OF THE HORNS")
        {
            document.getElementById("emoji_update").innerHTML = "&#129304;";
        }
        if (results[0].label == "CLAPPING")
        {
            document.getElementById("emoji_update").innerHTML = "&#128079;";
        }
    }
}