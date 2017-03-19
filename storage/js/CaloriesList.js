
function popitup(url) {
    newwindow = window.open(url, 'name', 'height=600,width=650');
    if (window.focus) { newwindow.focus() }
    return false;
}




var listArr;
var caloriesList = function () {


    var initModule = function () {
        $("#cmdAdd").click(add);
        $("#cmdNew").click(newList);
        //   $("#createChart").click(createChart);

        storageAPI.init();
        storageAPI.createObject("Calories");

        fillTable();
    };


    var fillTable = function () {

        var Calories = storageAPI.getAll("Calories");
        if (Calories.length == 0)
            return;

        $("tr:gt(0)").remove();

        $.each(Calories, function (i, item) {
            var row = "<tr><td>" + (i + 1) + "</td><td>" + item.id + "</td><td>" + item.quantity + "</td></tr>";
            $("tr:last").after(row);
        });

    };

    var add = function () {

        var quantity = $("#txtQuantity").val();

        if (quantity < 0) {
            alert("please enter positive number");
        }
        else if (!(Number(quantity) == quantity)) {
            alert("please enter a number");
        }
        else if (quantity == "") {
            alert("please enter amount of calories!");
        }
        else {
            var date = $("#txtDate").val();
            var item = { id: date, quantity: quantity };
            storageAPI.save("Calories", item);

            fillTable();
        }


    };


    var newList = function () {
        var answer = confirm("Creating a new list will erase existing list. Are you sure you want to create a new list?");
        if (answer === false)
            return;
        storageAPI.drop("Calories");
        storageAPI.createObject("Calories");
        location.reload();
        fillTable();
        delete listArr;
    };



    return {
        initModule: initModule,

    };
}();

$(document).ready(caloriesList.initModule);



window.onload = function () {
    listArr = storageAPI.getAll("Calories");
    for (var i = 0; i < listArr.length; i++) {
        listArr[i].id = new Date(listArr[i].id);
        listArr[i].quantity = parseInt(listArr[i].quantity);
    }

    function compare1(val1, val2) {
        if (val1.id > val2.id)
            return 1;
        else if (val1.id < val2.id)
            return -1;
        return 0;
    }
    var sortTxt = function (arr) {
        arr.sort(compare1);

    }

    sortTxt(listArr);


    /*
    
        var chart = new CanvasJS.Chart("chartContainer", {
    
            title:
            {
                text: "last week chart"
            },
    
            axisY:
            {
                title: "amount of calories",
            },
    
            data:
            [
                {
                    type: "column",
                    dataPoints:
                    [
                        { label: "sunday", y: listArr[0].quantity },
                        { label: "monday", y: listArr[1].quantity },
                        { label: "tuesday", y: listArr[2].quantity },
                        { label: "wednesday", y: listArr[3].quantity },
                        { label: "thursday", y: listArr[4].quantity },
                        { label: "friday", y: listArr[5].quantity },
                        { label: "saturday", y: listArr[6].quantity },
                    ]
                }
            ]
    
        });
    
        chart.render();
        console.log(listArr);
    */
    var average = function () {
        var sum = 0;
        for (var i = 0; i << listArr.length; i++) {
            sum += listArr[i].quantity;
        }
        return sum / (listArr.length);
    }
    var showgh = function () {
        var a = [];
        for (var i = 0; i < listArr.length; i++) {
            if (i % 5 != 0)
                a.push({ x: listArr[i].id, y: listArr[i].quantity, indexLabel: listArr[i].quantity.toString() });
            else
                a.push({ x: listArr[i].id, y: listArr[i].quantity, indexLabel: "" });

        }
        return a;
    }

    var chart = new CanvasJS.Chart("chartContainer",
        {
            title: {
                text: "Growth of calories "
            },
            animationEnabled: true,
            axisX: {
                valueFormatString: "DD-MMM-YYYY",

                intervalType: "date",
                labelAngle: -50,
                labelFontColor: "rgb(0,75,141)"
            },
            axisY: {
                title: "amount of calories",
                interlacedColor: "#F0FFFF",
                tickColor: "azure",
                titleFontColor: "rgb(0,75,141)",
                valueFormatString: "#.C",
                interval: 1000

            },
            data: [
                {
                    indexLabelFontColor: "darkSlateGray",
                    name: 'views',
                    type: "area",
                    color: "rgba(0,75,141,0.7)",
                    markerSize: 10,
                    dataPoints: showgh()
                }

            ]
        });
    chart.render();



} 