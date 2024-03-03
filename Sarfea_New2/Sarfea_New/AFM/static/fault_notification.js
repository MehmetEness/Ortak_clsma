const garantiContainer = document.querySelector(".garanti-container");
const arizaContainer = document.querySelector(".ariza-container");
const garantiSelection = document.querySelector("#id_Fail_Guaranteed");
const garantiDivContainer = document.querySelector(".center2");


garantiSelection.addEventListener("change", function() {
  var selectedValue = garantiSelection.value;
  console.log(selectedValue == "Evet")
  
  if (selectedValue == "Hayır") {
  } else if (selectedValue == "Evet") {
    delayTimeout = setTimeout(function() {
        garantiContainer.style.display = "flex";
      }, 15);
  }  
});


document.addEventListener("click", function(event) {                 
    var isClickInsideDiv = garantiDivContainer.contains(event.target); 
    if(garantiContainer.style.display === "flex"){
        if(!isClickInsideDiv){                        
            garantiContainer.style.display = "none";    
            garantiSelection.value = "Belirsiz"    
        } 
    }                   
});


//                  DOSYA YÜKLEME

const fileInput = document.getElementById("fatura_file");
const fileNameSpan = document.querySelector("#fatura_file_span");

fileInput.addEventListener("change", function() {
  const fileName = this.files[0].name;
  fileNameSpan.textContent = fileName;
});
