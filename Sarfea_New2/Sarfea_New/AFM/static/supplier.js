
var amountInputReformatBtn = document.querySelector("#kaydet_btn");
var form = document.querySelector("#myForm");
var reqInputs = document.querySelectorAll("#id_CompanyName_Supplier");
var reqLabels = document.querySelectorAll("#firma_adi_span");

var phoneInput = document.querySelector("#id_PhoneNumber");

var searchInput = document.getElementById("mysearch");
var clearButton = document.querySelector(".clear");
var table = document.getElementById("table");

//                  TEDARİKÇİ EKLE BUTTON

document.getElementById("tedarikci-ac").addEventListener("click", function(){
    document.querySelector(".tedarikciWindow").style.display = "flex";
});
document.getElementById("tedarikci-modal").addEventListener("click", function(){
    document.querySelector(".tedarikciWindow").style.display = "none";
});


//                  ZORUNLU İNPUTLAR  

amountInputReformatBtn.addEventListener("click", function(event) {
    event.preventDefault();
    if(requiredInputs(reqInputs, reqLabels)){            
        form.submit();
    }
}); 

//                  TELEFON NUMARASI FORMATLAMA

phoneInput.addEventListener('input', function(event) {
    var contryNumber = "+90";
    var inputValue = phoneInput.value;  
    if (event.inputType !== 'deleteContentBackward') {
        phoneInput.value = formatPhoneNumberByCountryCode(inputValue, contryNumber);
    }
});

//                  SEARCH İŞLEMLERİ

searchInput.addEventListener("input", function() {
    filterTable(searchInput, table);
});

clearButton.addEventListener("click", function() {
    searchInput.value = "";
    showAllRows(table);
});


