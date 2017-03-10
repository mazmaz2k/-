var xmlPage = function() {
    var parser = new DOMParser();
    var doc = parser.parseFromString(xmlStr, 'text/xml');

  var initModule = function() {
   // document.getElementById("cmdLoad").addEventListener("click", fillContents, false);
      $("#cmdLoad").click(fillContentsXML);
      $("#cmdLoadJSON").click(fillContentsJSON);
  }
    var fillContentsXML = function() {
        var str = "<h1>Our Items</h1>" +
            "<table id = 'tblItems'>" +
                "<tr>" +
                    "<th class = 'number'>No.</th>" +
                    "<th>Item's Name</th>" +
                    "<th>Price</th>" +
                    "<th>Send from</th>" +
                "</tr>";
        var i;
        var list = doc.getElementsByTagName("item");
        var even = false;
        var priceWanted = $("#txtPrice").val();
        for(i = 0; i < list.length; i++)
        {
          var p = parseFloat(list[i].getElementsByTagName("price")[0].childNodes[0].nodeValue);
          if(priceWanted === "" || p <= parseFloat(priceWanted) ) {
            str += "<tr class = ";
            if(even === true)
            {
                str += "'even'";
                even = false;
            }
            else
            {
                str += "'odd'";
                even = true;
            }

            str += ">";
            var n = list[i].firstChild;
            var j;
            str += "<td class = 'number'>" + list[i].getAttribute("id") + "</td>";
            for(j = 0; j < list[i].childNodes.length; j++)
            {
                str += "<td>" + n.childNodes[0].nodeValue + "</td>";
                n = n.nextSibling;
            }
            str += "</tr>";
          }
        }

        str += "</table>";
        $("div:first").html(str);

    };

    var fillContentsJSON = function() {
      var str = "<h1>Our Items</h1>" +
          "<table id = 'tblItems'>" +
              "<tr>" +
                  "<th class = 'number'>No.</th>" +
                  "<th>Item's Name</th>" +
                  "<th>Price</th>" +
                  "<th>Send from</th>" +
              "</tr>";

      var even = false;
      var itemsArr = JSON.parse(items);
      itemsArr.items.forEach(function(item) {
        str += "<tr class = ";
        if(even === true)
        {
            str += "'even'";
            even = false;
        }
        else
        {
            str += "'odd'";
            even = true;
        }

        str += ">";
        str += "<td class = 'number'>" + item.id + "</td>";
        str += "<td>" + item.name + "</td>";
        str += "<td>" + item.price + "</td>";
        str += "<td>" + item.from + "</td>";
        str += "</tr>";

      });
      str += "</table>";
      $("div:first").html(str);
    };
    return {
             initModule : initModule,
           };
}();

$(document).ready(xmlPage.initModule);
