







//                  FORMAT NUMBERS

function formatNumber(number, fract) {    
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: fract , maximumFractionDigits: fract }).format(number.toFixed(fract));
}; 

//                  TABLE FORMAT

function tableFormat(cells, type){
    switch (type) {
        case "usd":
            cells.forEach(function (cell) {    
                var value = parseFloat(cell.textContent.replace(/[^\d.-]/g, ''));
                if (!isNaN(parseFloat(value))) {
                    cell.textContent = formatNumber(value, 2) + "$";
                } else {
                cell.textContent = "0$"
                }   
            });
            break;
        case "tl":
            cells.forEach(function (cell) {    
                var value = parseFloat(cell.textContent.replace(/[^\d.-]/g, ''));
                if (!isNaN(parseFloat(value))) {
                    cell.textContent = formatNumber(value, 2) + "₺";
                } else {
                cell.textContent = "0₺"
                }   
            });
            break;
        case "text":
            cells.forEach(function (cell) {
                if (cell.textContent == "None" || cell.textContent.trim() == "" || cell.textContent == "NaN") {
                  cell.textContent = "-";
                }
            });
            break;
        case "numeric":
            cells.forEach(function (cell) {    
                var value = parseFloat(cell.textContent.replace(/[^\d.-]/g, ''));
                if (!isNaN(parseFloat(value))) {
                    cell.textContent = formatNumber(value, 2);
                } else {
                cell.textContent = "0"
                }   
            });
            break;  
            case "kur":
                cells.forEach(function (cell) {    
                    var value = parseFloat(cell.textContent.replace(/[^\d.-]/g, ''));
                    if (!isNaN(parseFloat(value))) {
                        cell.textContent = formatNumber(value, 4) + "$";
                    } else {
                    cell.textContent = "0$"
                    }   
                });
                break;            
        default:  

    }
};

//                  SIRALAMA İŞLEMLERİ

function sortTable(table, columnIndex) {
    var rows, switching, i, x, y, shouldSwitch;
    var datePattern = /^\d{2}\/\d{2}\/\d{4}$/;    
    switching = true;

    while (switching) {
        switching = false;

        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;

            x = rows[i].getElementsByTagName("td")[columnIndex];
            y = rows[i + 1].getElementsByTagName("td")[columnIndex];

            if(!isNaN(x.textContent.replace(/[$,₺]/g, '').trim())){
                var xValue = parseFloat(x.textContent.replace(/[$,₺]/g, '').trim());
                var yValue = parseFloat(y.textContent.replace(/[$,₺]/g, '').trim());
                if (!isNaN(xValue) && !isNaN(yValue) && xValue > yValue) {
                    shouldSwitch = true;
                    break;
                }                
            }       
            else if(datePattern.test(x.textContent)){
                var date1 = x.textContent.trim();
                var date2 = y.textContent.trim();

                if (compareDates(date1, date2) > 0) {
                    shouldSwitch = true;
                    break;
                }
            }     
            else{
                var xText = x.textContent.toLowerCase().trim().replace(/-/g, 'zzzz'); 
                var yText = y.textContent.toLowerCase().trim().replace(/-/g, 'zzzz');     
                if (xText > yText) {
                    shouldSwitch = true;
                    break;
                }
            }            
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}
function compareDates(date1, date2) {

    var parts1 = date1.split("/");
    var parts2 = date2.split("/");

    var day1 = parseInt(parts1[0], 10);
    var month1 = parseInt(parts1[1], 10);
    var year1 = parseInt(parts1[2], 10);

    var day2 = parseInt(parts2[0], 10);
    var month2 = parseInt(parts2[1], 10);
    var year2 = parseInt(parts2[2], 10);

    if (year1 !== year2) {
        return year1 - year2;
    }

    if (month1 !== month2) {
        return month1 - month2;
    }

    return day1 - day2;
}
/*xxx.forEach(header => {
    header.addEventListener("click", function() {        
        var columnIndex = Array.from(xxx).indexOf(header);
        sortTable(yyy, columnIndex);
    });
});*/

//                  TABLO SEARCH İŞLEMLERİ

function filterTable(searchInput, table, ) {
    var filter = searchInput.value.toLowerCase();
    var rows = table.getElementsByTagName("tr");

   for (var i = 0; i < rows.length; i++) {
       var row = rows[i];

    if (!row.querySelector("th")) {
       var cells = row.getElementsByTagName("td");
       var shouldShow = false;

       for (var j = 0; j < cells.length; j++) {
           var cell = cells[j];

           if (cell) {
               var text = cell.textContent || cell.innerText;

               if (text.toLowerCase().indexOf(filter) > -1) {
                   shouldShow = true;
                   break;
               }
           }
       }

       if (shouldShow) {
           row.style.display = "";
       } else {
           row.style.display = "none";
       }
    }
}
}
function showAllRows(table) {
    var rows = table.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        rows[i].style.display = "";
    }
}