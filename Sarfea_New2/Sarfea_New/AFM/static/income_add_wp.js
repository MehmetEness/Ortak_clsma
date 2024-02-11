var dateInput = document.querySelector("#id_ChekDate_Incomes");
var lastDateInput = document.querySelector("#id_LastChekDate_Incomes");
var amountInput = document.querySelector("#id_Amount_Incomes");
var reqInputs = document.querySelectorAll("#id_CompanyName_Pay_Incomes");
var reqLabels = document.querySelectorAll("#odeme_yapan_firma_span");
var createBtn = document.querySelector("#project-create-btn");
var firmalar = document.querySelectorAll("#dropdown1 .dropdown-item");
var form = document.querySelector("#my-form");
var chekLastDateBox = document.getElementById("id_boxLastChekDate_Incomes");
var firmaAddBtn = document.getElementById("paying-firma-add-btn");
var clientFirmaAddWindow = document.querySelector(".clientFirmaAddWindow");
var ddMenu = document.querySelectorAll("#dropdown1 .dropdown-item");



//                  TARİH İNPUTLARI FORMATLAMA

dateInput.addEventListener('input', function(event) {
  var userInput = dateInput.value; 
 if (event.inputType !== 'deleteContentBackward') {
  dateInput.value = formatDate(userInput);
 }
});
lastDateInput.addEventListener('input', function(event) {
  var userInput = lastDateInput.value; 
 if (event.inputType !== 'deleteContentBackward') {
  lastDateInput.value = formatDate(userInput);
 }
});

//                  INPUT FORMATLAMA

inputForFormat(amountInput);

//                  FORM SUBMİT ETME

createBtn.addEventListener("click", function(event) {
    event.preventDefault();       
    if(requiredInputs(reqInputs, reqLabels) && controlSelectionInputs(reqInputs[0],reqLabels[0],ddMenu)){
        dateInput.value = formatDateForSubmit(dateInput.value);
        lastDateInput.value = formatDateForSubmit(lastDateInput.value);
        amountInput.value = clear(amountInput.value);
        form.submit();
    }  
});  

//                  ÇEK SON KULLANIM İNPUT

const paymentTypeInput = document.getElementById('id_PaymentType_Incomes');
if (paymentTypeInput.value == "Çek") {
    chekLastDateBox.style.display = "block";
} else {
    chekLastDateBox.style.display = "none";
}
paymentTypeInput.addEventListener('change', controlFunction);
function controlFunction() {
    const selectedOption = paymentTypeInput.options[paymentTypeInput.selectedIndex].text;
    if (selectedOption.startsWith('Çek')) {
        chekLastDateBox.style.display = "block";
    } else {
        chekLastDateBox.style.display = "none";
    }
}

//                  FİRMA EKLEME

firmaAddBtn.addEventListener("click", function() {
    clientFirmaAddWindow.style.display = "flex";
});
var clientFirmaAddModal = document.getElementById("clientFirmaAdd-modal");
clientFirmaAddModal.addEventListener("click", function() {
    clientFirmaAddWindow.style.display = "none";
});
