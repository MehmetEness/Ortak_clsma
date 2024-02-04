var amountInput = document.querySelector("#id_Amount_Expenses");
var createBtn = document.querySelector("#project-create-btn");
var reqInputs = document.querySelectorAll("#id_CompanyName_Paying_Expenses");
var reqLabels = document.querySelectorAll("#odeme_yapilan_firma_span");
var form = document.querySelector("#my-form");
var dateInput = document.querySelector("#id_Date_Expenses");


var kurInput = document.querySelector("#id_Dollar_Rate_Expenses"); 
var dateForKur = document.querySelector("#id_Date_Expenses"); 
var timeForKur = document.querySelector("#kur-time");             

var firmaAddBtn = document.getElementById("paying-firma-add-btn-2");
var clientFirmaAddWindow = document.querySelector(".payingFirmaAddWindow");
var clientFirmaAddModal = document.getElementById("payingFirmaAdd-modal");

var firmalar = document.querySelectorAll("#dropdown2 .dropdown-item");
var payingFirmaInput = document.querySelector("#id_CompanyName_Paying_Expenses");
var payingFirmaLabel = document.querySelector("#odeme_yapilan_firma_span");
var details = document.querySelectorAll("#dropdown3 .dropdown-item");
var detailsInput = document.querySelector("#id_ExpensDetails_Expenses");
var detailsLabel = document.querySelector("#gider_detay_span");




//                  INPUTLARI FORMATLAMA

runEventListeners(amountInput);

//                  FORM SUBMİT ETME


createBtn.addEventListener("click", function(event) {
    event.preventDefault();            
   if(requiredInputs(reqInputs, reqLabels) && controlSelectionInputs(payingFirmaInput, payingFirmaLabel, firmalar) && controlSelectionInputs(detailsInput, detailsLabel, details)){
    dateInput.value = formatDateForSubmit(dateInput.value);
    amountInput.value = clear(amountInput.value);
    form.submit();
   }    
}); 

//                  TARİH İNPUT FORMATLAMA

dateInput.addEventListener('input', function(event) {
    var userInput = dateInput.value;   
   if (event.inputType !== 'deleteContentBackward') {
    dateInput.value = formatDate(userInput);
   }
 });

//                 FİRMA ADD FORM

firmaAddBtn.addEventListener("click", function() {
    clientFirmaAddWindow.style.display = "flex";
});
clientFirmaAddModal.addEventListener("click", function() {
    clientFirmaAddWindow.style.display = "none";
});
 