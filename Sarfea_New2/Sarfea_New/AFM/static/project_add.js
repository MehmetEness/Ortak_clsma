var lastDateAddBtn = document.getElementById("last-date-add-btn");
var chekLastDateBox = document.getElementById("id_boxLastChekDate_Incomes");

document.addEventListener("DOMContentLoaded", function() {
    lastDateAddBtn.addEventListener("click", function() {
        chekLastDateBox.style.display = "block";
        
    });
});


    // var amountInputForFormat = document.querySelector("#id_Amount_Incomes");
    // var amountInputReformatBtn = document.querySelector("#project-create-btn");
    // var form = document.querySelector("#my-form");
    // var deger;
    
    // amountInputReformatBtn.addEventListener("click", function(event) {
    // event.preventDefault();
    // amountInputForFormat.value = clear(deger);
    // form.submit();
    // });  
        
    // runEventListeners();
    // function runEventListeners(){
    // amountInputForFormat.addEventListener("input", function(event) {
    //     var inputValue = event.target.value;
    //     var clearValue = clear(inputValue);
    //     var formatValue = format(clearValue);
    //     amountInputForFormat.value = formatValue;
    //     deger = formatValue;
    // });
    // }
    // function clear(value){   // Alfasayısal olmayan ve nokta olmayan karakterleri kaldır   
    //     if(value != undefined){
    //     var cleanString = value.replace(/[^0-9.]/g, '');
    //     return cleanString;    // Çıktı: "123456.789"  
    // }else{
    //     var  cleanString = 0;
    //     return cleanString;
    // }  
    // }
    
    // function format(number) {
    // var indexOfDot = number.indexOf('.');
    
    // if (indexOfDot !== -1) {
    // var integerPart = number.slice(0, indexOfDot).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // var decimalPart = number.slice(indexOfDot + 1);
    // return integerPart + '.' + decimalPart;
    // } else {
    // var formattedNumber = number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //     return formattedNumber; 
    // }
    // }