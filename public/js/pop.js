
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

    var average1 = function () {
        var sum = 0;
        for (var i = 0; i < listArr.length; i++) {
            sum += listArr[i].quantity;
        }
        return sum / (listArr.length);
    }


    var showgh = function () {
        var arr = [];
        for (var i = 0; i < listArr.length; i++) {
            if (i == 0)
                arr.push({ x: listArr[i].id, y: listArr[i].quantity, indexLabel: "start of diet", indexLabelOrientation: "vertical", indexLabelFontColor: "orangered", markerColor: "orangered" });
            else //if (i % 5 != )
                arr.push({ x: listArr[i].id, y: listArr[i].quantity, indexLabel: listArr[i].quantity.toString() });
           /* else
                arr.push({ x: listArr[i].id, y: listArr[i].quantity, indexLabel: "" });*/

        }
        return arr;
    }

    var averageLine = function () {
        var a = [];
        for (var i = 0; i < listArr.length; i++) {
            a.push({ x: listArr[i].id, y: average1(), indexLabel: "" });

        }
        return a;
    }

    var chart = new CanvasJS.Chart("chartContainer",
        {
            title: {
                text: "Growth of calories + average amount"
            },
            animationEnabled: true,
            axisX: {
                valueFormatString: "DDDDDD-MMM-YYYY",
                intervalType: "date",
                labelAngle: -50,
                labelFontColor: "rgb(0,75,141)",
                minimum: listArr[0].id

            },
            axisY: {
                title: "amount of calories",
                interlacedColor: "#F0FFFF",
                tickColor: "azure",
                titleFontColor: "rgb(0,75,141)",
                valueFormatString: "#.Cal",
                interval: 1000

            },
            data: [
                {
                    indexLabelFontColor: "darkSlateGray",
                    name: 'calories',
                    type: "area",
                    color: "rgba(0,75,141,0.7)",
                    markerSize: 10,
                    dataPoints: showgh()
                }

            ]
        });
    chart.addTo("data", { type: "line",  dataPoints: averageLine() } );
    chart.addTo("animationEnabled", true );
    chart.render();



} 