  /*-Omri mizrahi 303082549
  Adi tayri 205530967   */

//checks if the input the user entered in the calculator is valid

function validateInput() {

    var a = $("#age").val();
    var w = $("#weight").val();
    var h = $("#height").val();
    var res = true;
    var errNull = "Must contain a value"; //user did not enter a value
    var errNeg = "Value must be positive"; //negetive value canoot be as an input
    var errNAN = "please enter a number"; //not a number error
    var errA = $("#errAge");
    var errW = $("#errWeight");
    var errH = $("#errHeight");
    if (a == "") {  //checks all the conditions
        res = false;
        errA.html(errNull);
    }

    else if (parseInt(a) <= 0) {
        res = false;
        errA.html(errNeg);
    }
    else {
        errA.html("");
    }
    if (w == "") {
        res = false;
        errW.html(errNull);
    }

    else if (parseInt(w) <= 0) {
        res = false;
        errW.html(errNeg);
    }
    else
        errW.html("");

    if (h == "") {
        res = false;
        errH.html(errNull);
    }

    else if (parseInt(h) <= 0) {
        res = false;
        errH.html(errNeg);
    }
    else if (!(Number(h) == h)){
        res = false;
         errH.html(errNAN);
    }
    else if (!(Number(a) == a) ){
        res = false;
         errA.html(errNAN);
    }
    else if ( !(Number(w) == w)){
        res = false;
         errW.html(errNAN);
    }
    else
        errH.html("");

    return res;
}


//calculate the bmi value 

function calculateBMI() {
    var w = parseInt($("#weight").val());
    var h = parseFloat($("#height").val());
    h = h / 100;
    var res = w / (h * h);
    return res;
}

//calculate the bmr value
function calculateBMR() {
    var a = parseInt($("#age").val())
    var w = parseInt($("#weight").val());
     var w1=w-1; 
     var w2=w+1;
    
    var h = parseFloat($("#height").val());
    var res;
    var res1;
    var res2;
    if (document.getElementById('male').checked) {
        res = 66 + w * 13.7 + h * 5 - a * 6.8;
         res1 = 66 + w1 * 13.7 + h * 5 - a * 6.8;
         res2 = 66 + w2 * 13.7 + h * 5 - a * 6.8;
    }
    else {
        res = 655 + w * 9.6 + h * 1.8 - a * 4.7;
        res1 = 655 + w1 * 9.6 + h * 1.8 - a * 4.7;
        res2 = 655 + w2 * 9.6 + h * 1.8 - a * 4.7;

    }
    return [res,res1,res2];
}
//check the range of the bmi input
function bmiInRange() {
    var res = calculateBMI();
    if (res < 18.5)
        return "<div id="+"red"+">"+"you are Underweight</div>";
    else if (res >= 18.5 && res < 25)
        return "<div id="+"green"+">"+"you are in Healthy Weight</div>";
    else if (res >= 25 && res < 30)
        return "<div id="+"red"+">"+"you are Overweight</div>";
    else
        return "<div id="+"red"+">"+"you are Obese</div>";

}

//calculate the TEE value accurding thev furmula 
function calculateTEE() {
    var bmr = calculateBMR();
    var res;
    var res1;
    var res2;
    if (document.getElementById('Sedentary').checked) {
        res = bmr[0] * 1.2;
        res1 = bmr[1] * 1.2;
        res2 = bmr[2] * 1.2;
    }
    else if (document.getElementById('Moderate').checked) {
        res = bmr[0] * 1.55;
          res1 = bmr[1] * 1.55;
           res2 = bmr[2] * 1.55;
    }
    else {
        res = bmr[0] * 1.9;
        res1 = bmr[1] * 1.9;
        res2 = bmr[2] * 1.9;
    }
    return [res * 1.1, res1 * 1.1, res2 * 1.1];

}
//reset the input places into null
function reset() {

    $("#age").val('');
    $("#weight").val('');
    $("#height").val('');
    $("#errAge").html("");
    $("#errWeight").html("");
    $("#errHeight").html("");
    $("#res").html("");

}

var loadPage = function () {
    $("#cmdCalc").click(function () { //if user clicked calculate
        var res = validateInput();
        if (res) {
            var bmi = calculateBMI();
            var bmr = calculateBMR();
            var tee = calculateTEE();
            var bmiConclosion = bmiInRange();
            var w= parseInt($("#weight").val());

            // return string to html accurding all the results
            $("#res").html("Hello,this Calculator - Calculate daily calorie intake by model BMR and BMI + model combining exercise:"+ "</br>" + "</br>" +"<div id="+"textCalc"+">"+ " Your TEE value is: " + Math.round(tee[0]) +" calorie you will need to consume per day."+ "</br>" + " Your BMR value is: " + Math.round(bmr[0])+" calorie you will need to consume per day." + "</br>" + " Your BMI is " + Math.round(bmi) + " and the conclusion: " + bmiConclosion + ".</br>"+"If you would like to weight "+(w-1)+ "Kg you need to eat "+Math.round(tee[1]) + " calorieper day."+ "</br>"+"If you would like to weight "+(w+1)+ "Kg you need to eat "+Math.round(tee[2]) + " calorieper day. </div>");

            $("#res").addClass("result");

        }
    });
    $("#cmdReset").click(function () { //when the user clicked "reset"
        reset();
    });




}


/*
function hidediv() {
    var mydiv = document.getElementById("mydiv");
    if (mydiv == null) {
        alert("Sorry can't find your div");
        return;
    }
    //div found
    mydiv.style.visibility = "hidden";
}


function showdiv() {
    var mydiv = document.getElementById("mydiv");
    if (mydiv == null) {
        alert("Sorry can't find your div");
        return;
    }
    //div found
    mydiv.style.visibility = "visible";
}

function myMap() {
  var mapCanvas = document.getElementById("map");
  var myCenter = new google.maps.LatLng(31.7684798, 35.1960894); 
  var mapOptions = {center: myCenter, zoom: 5};
  var map = new google.maps.Map(mapCanvas,mapOptions);
  var marker = new google.maps.Marker({
    position: myCenter,
    animation: google.maps.Animation.BOUNCE
  });
  marker.setMap(map);
}*/