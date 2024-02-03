var reqInputs = document.querySelectorAll("#id_CompanyName_Paying_Expenses, #id_ProjectName_Expenses");
var reqLabels = document.querySelectorAll("#odeme_yapilan_firma_span, #proje_adi_span");

var dateInput = document.querySelector("#id_Date_Expenses");
var form = document.querySelector("#my-form");
var amountInput = document.querySelector("#id_Amount_Expenses");
var createBtn = document.querySelector("#project-create-btn");


var kurInput = document.querySelector("#id_Dollar_Rate_Expenses");  
var dateForKur = document.querySelector("#id_Date_Expenses");  
var timeForKur = document.querySelector("#kur-time");     

var clientFirmaAddModal = document.getElementById("payingFirmaAdd-modal");
var firmaAddBtn = document.getElementById("paying-firma-add-btn-2");
var clientFirmaAddWindow = document.querySelector(".payingFirmaAddWindow");



//                  INPUTLARI FORMATLAMA

runEventListeners(amountInput);

//                  TARİH İNPUT FORMATLAMA

dateInput.addEventListener('input', function(event) {
    var userInput = dateInput.value;   
   if (event.inputType !== 'deleteContentBackward') {
    dateInput.value = formatDate(userInput);
   }
 });

 //                  FORM SUBMİT ETME

createBtn.addEventListener("click", function(event) {
    event.preventDefault();           
    if(requiredInputs(reqInputs, reqLabels)){
        dateInput.value = formatDateForSubmit(dateInput.value);
        amountInput.value = clear(amountInput.value);
        form.submit();
    }    
}); 

//                   FİRMA ADD FORM

firmaAddBtn.addEventListener("click", function() {
    clientFirmaAddWindow.style.display = "flex";
});
    clientFirmaAddModal.addEventListener("click", function() {
     clientFirmaAddWindow.style.display = "none";
});