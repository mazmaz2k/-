


function validateInput() {
  
        var a =$("#age").val();
        var w = $("#weight").val();
        var h = $("#height").val();
        var res = true;
        var errNull = "Must contain a value";
        var errNeg = "Value must be positive";
        var errNAN = "please enter a number";
        var errA =$("#errAge");
        var errW = $("#errWeight");
        var errH = $("#errHeight");
        if(a=="")
        {
              res = false;
             errA.html(errNull);
        }
     
         else if(parseInt(a) <= 0)
        {
            res = false;
            errA.html(errNeg);
        }
        else
        {
            errA.html("");
        }
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
      
        else if(parseInt(h) <= 0)
        {
            res = false;
            errH.html(errNeg);
        }
        else
            errH.html("");

        return res;
    }

function calculateBMI()
 {
       var w = parseInt($("#weight").val());
       var h = parseFloat($("#height").val());
       h=h/100;
       var res = w / (h * h);
       return res;
 }
    
function calculateBMR()
{
    var a = parseInt($("#age").val())
    var w = parseInt($("#weight").val());
    var h = parseFloat($("#height").val());
       var res ;
  
    if(document.getElementById('male').checked)
    {
          res = 66+ w*13.8 +h*5 - a*6.8;
    }
    else
    {
      res=655+ w*9.6 + h*1.8 -a*4.7;

    }
    return res;
}
function calculateTEE()
{
    var bmr =calculateBMR();
    var res;
     if(document.getElementById('Sedentary').checked)
     {
        res = bmr*1.2;

     }
     else  if(document.getElementById('Moderate').checked)
     {
        res=bmr*1.55;

     }
     else
     {
        res=bmr*1.9;

     }
     return res;
}
function reset()
{
    
	        $("#age").val(''); 
            $("#weight").val(''); 
            $("#height").val(''); 
             $("#errAge").html("");
             $("#errWeight").html("");
             $("#errHeight").html("");
             //maybe change the radio buttons
                  
         //   location.reload();
}

var loadPage = function()
{
     $("#cmdCalc").click(function()
    {
	      var res =  validateInput();
            if(res)
            {
                var bmi = calculateBMI();
                var bmr =calculateBMR();
                var tee =calculateTEE();
              //  alert("The amount of calories you should eat per day is"+tee+"\n");
              alert("tee value"+tee+"\n"+"bmr value"+bmr+"\n"+"bmi value"+bmi+"\n");
            }
    });
     $("#cmdReset").click(function()
    {
        reset();
    });
}
