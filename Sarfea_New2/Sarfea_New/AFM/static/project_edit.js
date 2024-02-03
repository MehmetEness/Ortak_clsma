var startDateInput = document.querySelector("#id_StartDate");
var finishDateInput = document.querySelector("#id_FinishDate");
var kdvRateInput = document.getElementById("id_KDV_Rate");







//                  TARİH FORMATLAMA

startDateInput.addEventListener('input', function(event) {
    var userInput = startDateInput.value;   
    if (event.inputType !== 'deleteContentBackward') {
        startDateInput.value = formatDate(userInput);
    }
});
finishDateInput.addEventListener('input', function(event) {
    var userInput = finishDateInput.value;   
    if (event.inputType !== 'deleteContentBackward') {
        finishDateInput.value = formatDate(userInput);
    }
});

//                  KDV % DEĞERİ KOYMA

addPercentageSymbol(kdvRateInput);
kdvRateInput.addEventListener("input", function () {
  addPercentageSymbol(kdvRateInput);
});

function addPercentageSymbol(input) {
  let enteredValue = input.value;
  let numericValue = enteredValue.replace(/[^0-9,.]/g, "");
  let formattedValue =  "%" + numericValue;
  input.value = formattedValue;
}