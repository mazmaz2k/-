var caloriesList = function () {

    var initModule = function () {
        $("#cmdAdd").click(add);
        $("#cmdNew").click(newList);
        $("#cmdRemove").click(remove);
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

        if (quantity < 0 || quantity > 2e10 || !(Number(quantity) == quantity)) {
            alert("not a namber");
        } else {
            var date = $("#txtDate").val();
            var item = { id: date, quantity: quantity };
            storageAPI.save("Calories", item);
            fillTable();
        }


    };


    var remove = function () {
        var Calories = storageAPI.getAll("Calories");
        var date = $("#txtDelete").val();
      /*  alert(date);*/
        storageAPI.remove(Calories,date);

    };


    var newList = function () {
        var answer = confirm("Creating a new list will erase existing list. Are you sure you want to create a new list?");
        if (answer === false)
            return;
        storageAPI.drop("Calories");
        storageAPI.createObject("Calories");
        location.reload();
        fillTable();
    };

    return {
        initModule: initModule,
    };
}();

$(document).ready(caloriesList.initModule);