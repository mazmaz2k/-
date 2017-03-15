window.onload = function () {
	var chart = new CanvasJS.Chart("chartContainer",{
		title:{
			text: "Pareto Chart of Fast Food Chains"
		},
		axisY: {
			title: "Number of Locations",                   
		},
		axisY2: {
			title: "Percent",
			valueFormatString: "0'%'"
		},
		data: [
		{
		type: "column",
			dataPoints: [
				{ label: "Subways", y: 44853 },
				{ label: "McDonald", y: 36525 },
				{ label: "Starbucks", y: 23768 },
				{ label: "KFC", y: 19420 },
				{ label: "Pizza Hut", y: 13528 },                      
				{ label: "Dunkin-Donuts", y: 11906 },
			]
		}
		]
	});

	chart.render();
	createPareto(chart);	

	function createPareto(chart){
		var dps = [];
		var yValue, yTotal = 0, yPercent = 0;

		for(var i = 0; i < chart.data[0].dataPoints.length; i++)
			yTotal += chart.data[0].dataPoints[i].y;

		for(var i = 0; i < chart.data[0].dataPoints.length; i++){
			yValue = chart.data[0].dataPoints[i].y;
			yPercent += (yValue / yTotal * 100);
			dps.push({label: chart.data[0].dataPoints[i].label, y: yPercent});
		}
		chart.addTo("data",{type:"line", yValueFormatString: "0'%'", dataPoints: dps});
		chart.data[1].set("axisYType", "secondary");
		chart.axisY[0].set("maximum", yTotal);
		chart.axisY2[0].set("maximum", 100);
	}
}