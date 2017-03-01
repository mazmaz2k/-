var shoppingList = function() {
    
    var initModule = function() {
        $("#cmdAdd").click(add);
        $("#cmdNew").click(newList);
        storageAPI.init();
        storageAPI.createObject("Items");
        
        fillTable();
    };
    
    
    var fillTable = function() {
        var items = storageAPI.getAll("Items");
        if(items.length == 0)
            return;
        
        $("tr:gt(0)").remove();
        
        $.each(items, function(i, item) {
                var row = "<tr><td>" + (i+1) + "</td><td>" + item.id + "</td><td>" + item.quantity + "</td></tr>";
                $("tr:last").after(row);
            });
    };
    
    var add = function() {
        var name = $("#txtItem").val();
        var quantity = $("#txtQuantity").val();
        var item = {id : name, quantity: quantity};
        storageAPI.save("Items", item);
        fillTable();       
    }
    
    
    var newList = function() {
        var answer = confirm("Creating a new list will erase existing list. Are you sure you want to create a new list?");
        if(answer === false)
            return;
        storageAPI.drop("Items");
        storageAPI.createObject("Items");
        fillTable();
    };
    
    return {
        initModule : initModule,
    };
}();

$(document).ready(shoppingList.initModule);