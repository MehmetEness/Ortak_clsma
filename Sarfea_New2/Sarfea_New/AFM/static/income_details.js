//                  EKLEME BUTTONLARI

var incomeAddWindow = document.querySelector('.income-add-window');  
var incomeAddWindowButton = document.querySelector('.income-add-btn');   

//----- İNCOME
incomeAddWindowButton.addEventListener("click", () =>{    
    setTimeout(() =>{incomeAddWindow.style.display = "flex";}, 10);
}); 
document.addEventListener('click', (event) =>{
    const incomeAddContainer = incomeAddWindow.querySelector(".container");
    if (!incomeAddContainer.contains(event.target) && clientAddWindow.style.display == "none") {
        incomeAddWindow.style.display = "none";
    }
});
// KAPATMA
let xBtn = document.querySelectorAll(".close-window");
xBtn.forEach((btn)=>{
    btn.addEventListener("click", ()=>{     
        incomeAddWindow.style.display = "none";
    })
})