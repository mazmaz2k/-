// BMICalculator.results.js
// Root namespace

BMICalculator.results = function() {
    var configMap = { 
                        html : "<div id = 'resText'></div>" +
                                "<button id = 'cmdBack'>Back</button>"
                    };
    
    var stateMap = {$container : null,
                   bmi : null};
    
    var initModule = function($container, params) {
        stateMap.$container = $container;
        stateMap.bmi = params.bmi;
        stateMap.$container.html(configMap.html);
        stateMap.$container.css("visibility", "visible");
        stateMap.$container.css("display", "block");
        
        $("#cmdBack").click(function() { stateMap.$container.fadeOut(500, function() {
                                            stateMap.$container.css("opacity", "0");});} );
        showResults();
        stateMap.$container.animate({opacity: 1}, 900);
        
    };
    
    var showResults = function() {
        var res = $("#resText");
        var text = "Your BMI value is " + stateMap.bmi + " ";
        if(stateMap.bmi <= 18.5) {
            res.html(text + "You are under weight.");
            res.attr("class", "resultsUnder");
        }
        else if(stateMap.bmi > 18.5 && stateMap.bmi <= 25) {
            res.html(text + "Your weight is normal.");
            res.attr("class", "resultsNormal");
        }
        else {
            res.html(text + "You are over weight.");
            res.attr("class", "resultsOver");
        }
    };
    
    
    return { initModule : initModule };
}();

