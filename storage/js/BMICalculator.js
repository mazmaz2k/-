// BMICalculator.js
// Root namespace

var BMICalculator = function() {
    var configMap = {
        inputSection : "<header>" +
                        "<h1>BMI Calculator</h1>" +
                    "</header>" +
                    "<main>" + 
                        "<section class = 'calculator'>" + 
                            "<label for = 'txtHeight'>Height (m):</label>" +
                            "<input id = 'txtHeight' />" +
                            "<span id = 'divErrHeight' class = 'err'></span>" +
                            "<p/>" +
                            "<label for = 'txtWeight'>Weight (kg):</label>" +
                            "<input id = 'txtWeight' />" +
                            "<span id = 'divErrWeight' class = 'err'></span><br/>" + 
                            "<div id = 'divCalc' class = 'calc'>Calculate</div>" +
                        "</section>" +
                        "<div id = 'results'></div>" +
                    "</main>"
    };
    
    var stateMap = {$container : null };
    
    var initModule = function($container) {
        stateMap.$container = $container;
        $("#BMICalculator").html(configMap.inputSection);
        $("#divCalc").click(clickListener);
        $("#divCalc").mouseleave(clickListener);
    };
    
    var clickListener = function(e) {
        var divCalc = $("#divCalc");
        if(e.type == "click") {
            divCalc.attr("class", "calcClick");
            var err = validateInput();
            if(err == true)
            {
                var bmi = calculateBMI();
                BMICalculator.results.initModule($("#results"), {bmi : bmi});
            }
        }
        else if(e.type == "mouseleave")
        {
            divCalc.attr("class", "calc");
        }

    };

    function validateInput() {
        var w = $("#txtWeight").val();
        var h = $("#txtHeight").val();
        var res = true;
        var errNull = "Must contain a value";
        var errNeg = "Value must be positive";
        var errW = $("#divErrWeight");
        var errH = $("#divErrHeight");
        if(w == "")
        {
            res = false;
            errW.html(errNull);
        }
        else if(parseInt(w) <= 0)
        {
            res = false;
            errW.html(errNeg);
        }
        else
            errW.html("");

        if(h == "")
        {
            res = false;
            errH.html(errNull);
        }
        else if(parseFloat(h) <= 0)
        {
            res = false;
            errH.html(errNeg);
        }
        else
            errH.html("");

        return res;
    }

    function calculateBMI() {
        var w = parseInt($("#txtWeight").val());
        var h = parseFloat($("#txtHeight").val());
        var res = w / (h * h);
        return res;
    }
    
    
    return { initModule : initModule };
}();

$(document).ready(function() {BMICalculator.initModule($("#BMICalculator")); });

