src="https://code.jquery.com/jquery-3.6.0.min.js";
       
       
    icon = document.querySelector('.icon');
    search = document.querySelector('.search');
    icon.onclick = function(){
          search.classList.toggle('active')
      }
function clearSearch() {
    const input = document.getElementById('mysearch');
    input.value = '';
    searchTable(); // Temizle dÃ¼ÄŸmesine basÄ±ldÄ±ÄŸÄ±nda tabloyu sÄ±fÄ±rla
}

function modalAc(){

}

//--------------------------------------------//


// Tablo scroll bar
const table = document.getElementById("table");

function checkTableHeight() {
  const tableContainer = document.querySelector(".lists");

  if (tableContainer.scrollHeight > tableContainer.clientHeight) {
    tableContainer.style.overflowY = "scroll";
  } else {
    tableContainer.style.overflowY = "hidden";
  }
}
window.addEventListener("load", checkTableHeight);
table.addEventListener("input", checkTableHeight);


function addUnit(inputId) {
    var inputElement = document.getElementById(inputId);
    var inputValue = inputElement.value;

    // Eğer değer boş değilse ve "kW" içermiyorsa, "kW" ekleyin
    if (inputValue !== "" && !inputValue.includes("kW")) {
        inputElement.value = inputValue + " kW";
    }
}



/* Dolar Kuru Çekme */

  
  
 