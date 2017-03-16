
function popitup(url) {
    newwindow = window.open(url, 'name', 'height=600,width=650');
    if (window.focus) { newwindow.focus() }
    return false;
}


window.onload = function () {

    var chart = new CanvasJS.Chart("chartContainer", {
        title: {
            text: "Fruits sold in First & Second Quarter"
        },

        data: [  //array of dataSeries     
            { //dataSeries - first quarter
                /*** Change type "column" to "bar", "area", "line" or "pie"***/
                type: "column",
                name: "First Quarter",
                dataPoints: [
                    { label: "banana", y: 18 },
                    { label: "orange", y: 29 },
                    { label: "apple", y: 40 },
                    { label: "mango", y: 34 },
                    { label: "grape", y: 24 }
                ]
            },
            { //dataSeries - second quarter

                type: "column",
                name: "Second Quarter",
                dataPoints: [
                    { label: "banana", y: 23 },
                    { label: "orange", y: 33 },
                    { label: "apple", y: 48 },
                    { label: "mango", y: 37 },
                    { label: "grape", y: 20 }
                ]
            }
        ]
    });

    chart.render();
}

var caloriesList = function () {
    var listArr = [];

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
            listArr.push([date, quantity]);
            alert(listArr[0]);
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
        listArr: listArr,
    };
}();

$(document).ready(caloriesList.initModule);



