const garantiContainer = document.querySelector(".garanti-container");
const arizaContainer = document.querySelector(".ariza-container");
const garantiSelection = document.querySelector("#garanti_select");
const garantiDivContainer = document.querySelector(".center2");


garantiSelection.addEventListener("change", function() {
  var selectedValue = garantiSelection.value;
  
  if (selectedValue === "evet") {
  } else if (selectedValue === "hayir") {
    delayTimeout = setTimeout(function() {
        garantiContainer.style.display = "flex";
      }, 5);
  }  
});


document.addEventListener("click", function(event) {                 
    var isClickInsideDiv = garantiDivContainer.contains(event.target); 
    if(garantiContainer.style.display === "flex"){
        if(!isClickInsideDiv){                        
            garantiContainer.style.display = "none";    
            garantiSelection.value = "belirsiz"    
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
