
let view1 = document.querySelectorAll(".view-1");
let view2 = document.querySelectorAll(".view-2"); 
let leftTableResult;
let rightTableResult;
    let leftTotalTL = document.getElementById("solTableToplamTL");
    let leftTotalUSD = document.getElementById("solTableToplamUSD"); 
    let rightTotalTL = document.getElementById("sagTableToplamTL");
    let rightTotalUSD = document.getElementById("sagTableToplamUSD");  
    let genaralTotalTL = document.getElementById("genelToplamTL");
    let generalTotalUSD = document.getElementById("genelToplamUSD"); 

    let T_leftTotalTL = document.getElementById("solTotalTableToplamTL");
    let T_leftTotalUSD = document.getElementById("solTotalTableToplamUSD");  
    let T_rightTotalTL = document.getElementById("sagTotalTableToplamTL");
    let T_rightTotalUSD = document.getElementById("sagTotalTableToplamUSD"); 
    
    
    let leftTable = document.querySelector("#table");      
    let rightTable = document.querySelector("#table-2"); 
    let totalTable = document.querySelector("#total-cost-table"); 

/*  Search Box  */
document.querySelector('.icon').onclick = function(){
document.querySelector('.search').classList.toggle('active')
}



//-------------------
document.getElementById("paying-firma-add-btn-2").addEventListener("click", function () {
  console.log("firma add");
  document.querySelector(".payingFirmaAddWindow").style.display = "flex";
});
document.getElementById("paying-firma-add-btn-1").addEventListener("click", function () {
  console.log("firma add2");
  document.querySelector(".payingFirmaAddWindow").style.display = "flex";
});
document.getElementById("payingFirmaAdd-modal").addEventListener("click", function () {
  document.querySelector(".payingFirmaAddWindow").style.display = "none";
});






/*  Total Maliyet Tablosu   */
document.getElementById("toplam-maliyet").addEventListener("click", function(){       
for(let index of view1){
    index.style.display ='none';
}
for(let index of view2){
    index.style.display ='block';
}
});

/****************   Total Table Topla   ***** */
totalTableTopla(totalTable);
function totalTableTopla(table){
    let leftTotalTLFunction=0.0;
    let leftTotalUSDFunction=0.0;
    let rightTotalTLFunction=0.0;
    let rightTotalUSDFunction=0.0;
  
    const dataRows = table.querySelectorAll("tbody tr");
    dataRows.forEach(row => {
        const cells = row.querySelectorAll("td"); 
        if (window.getComputedStyle(row).getPropertyValue('display') !== 'none') {
         const cells = row.querySelectorAll("td");
         if(cells[1].textContent != "NaN"){
            leftTotalTLFunction += birimSil(cells[1].textContent);
          }
          if(cells[2].textContent != "NaN"){
            leftTotalUSDFunction += birimSil(cells[2].textContent);
          }
          if(cells[3].textContent != "NaN"){
            rightTotalTLFunction += birimSil(cells[3].textContent);
            }
            if(cells[4].textContent != "NaN"){
            rightTotalUSDFunction += birimSil(cells[4].textContent);
            }
     }
    });
    leftTotalUSDFunction = parseFloat(leftTotalUSDFunction.toFixed(4))
    leftTotalTLFunction = parseFloat(leftTotalTLFunction.toFixed(4))
    rightTotalUSDFunction = parseFloat(rightTotalUSDFunction.toFixed(4))
    rightTotalTLFunction = parseFloat(rightTotalTLFunction.toFixed(4))
    
    T_leftTotalTL.textContent =  formatNumber(leftTotalTLFunction) + "₺";
    T_leftTotalUSD.textContent = formatNumber(leftTotalUSDFunction) + "$"; 
    T_rightTotalTL.textContent = formatNumber(rightTotalTLFunction) + "₺"; 
    T_rightTotalUSD.textContent = formatNumber(rightTotalUSDFunction) + "$";

  }
  /* Gelen verinin birimini silip int veren fonksiyon */
  
  function birimSil(inputString) {
    const withoutSymbols = inputString.replace(/₺|\$|\,/g, "");
    const number = parseFloat(withoutSymbols.replace());
    return number;
  }

//--------------------------------------------  /* Toplama İşlemi */ --------
function tableTopla(table){
  const columnIndex1 = 3;
  const columnIndex2 = 5;
  let totalTLFunction=0.0;
  let totalUSDFunction=0.0;

  const dataRows = table.querySelectorAll("tbody tr");
  dataRows.forEach(row => {
      const cells = row.querySelectorAll("td"); 
      if (window.getComputedStyle(row).getPropertyValue('display') !== 'none') {
       const cells = row.querySelectorAll("td");
       if(cells[columnIndex2].textContent != "NaN"){
        totalUSDFunction += birimSil(cells[columnIndex2].textContent);
        }
        if(cells[columnIndex1].textContent != "NaN"){
        totalTLFunction += birimSil(cells[columnIndex1].textContent);
        }
   }
  });
  totalUSDFunction = parseFloat(totalUSDFunction.toFixed(4))
  totalTLFunction = parseFloat(totalTLFunction.toFixed(4))
  return { totalTLFunction, totalUSDFunction };
}
/* Gelen verinin birimini silip int veren fonksiyon */

function birimSil(inputString) {
  const withoutSymbols = inputString.replace(/₺|\$|\,/g, "");
  const number = parseFloat(withoutSymbols.replace());
  return number;
}
/* Gelen verinin birimini silip int veren fonksiyon */



//-----------------------------------------------------------------

totalShow();
    function totalShow(){       
        for (let index of view1) {
            index.style.display = "flex";
        }
        for (let index of view2) {
            index.style.display = "none";
        }
        // 1 saniye beklemek için setTimeout kullanılır
    setTimeout(function() {
        // Buraya tablodan veri çekme işlemini ekleyin
        fetchDataFromTable();
    }, 100
    ); // 1000 milisaniye (1 saniye) beklenir

    function fetchDataFromTable() {    
            // Sol tabloyu topla ve sonuçları ekrana yaz
        leftTableResult = tableTopla(leftTable);
        leftTotalTL.textContent =  formatNumber(leftTableResult.totalTLFunction) + " ₺" ;
        leftTotalUSD.textContent =  formatNumber(leftTableResult.totalUSDFunction) +" $";
        
    
        // Sağ tabloyu topla ve sonuçları ekrana yaz
        rightTableResult = tableTopla(rightTable);
        rightTotalTL.textContent = formatNumber(rightTableResult.totalTLFunction) + " ₺";
        rightTotalUSD.textContent = formatNumber(rightTableResult.totalUSDFunction) + " $";

        // Toplam tablo sonucunu ekrana yaz
        leftTableResult = tableTopla(leftTable);
        rightTableResult = tableTopla(rightTable);
        x = parseFloat((leftTableResult.totalTLFunction - rightTableResult.totalTLFunction).toFixed(4))
        y = parseFloat((leftTableResult.totalUSDFunction - rightTableResult.totalUSDFunction).toFixed(4))    
        genaralTotalTL.textContent =  formatNumber(x) + " ₺" ;
        generalTotalUSD.textContent =  formatNumber(y) + " $" ;
    }    
} 
function formatNumber(number) {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits:2 , maximumFractionDigits: 2 }).format(number.toFixed(4));
}




/* Dolar Kuru Hesaplama*/

class Currency{
    constructor(){
        this.url = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_xuCNEXC9y3nPruX5UWrRUfxyn5oTSP4ZxH07E6d9&base_currency=";
    }
  
  async  exchange(){
    const response =    await fetch(this.url);
    const result = await response.json();    
  
    return result.data["TRY"];
    }
  }
  
  
  const amountInputYI = document.querySelector("#id_Amount_JobHistory");
  const resultInputYI = document.querySelector("#id_Dollar_Rate_JobHistory");
  
  const amountInputYO = document.querySelector("#id_Amount_Expenses");
  const resultInputYO = document.querySelector("#id_Dollar_Rate_Expenses"); 
  

  const currency = new Currency();
  
  runEventListeners();
  
  function runEventListeners(){
      amountInputYI.addEventListener("input",exchange);
      amountInputYO.addEventListener("input",exchange);
  }
  
  
  function exchange(){ 
  
    currency.exchange()
    .then((result) => {
      resultInputYI.value = result.toFixed(4)
      resultInputYO.value = result.toFixed(4)
    })
  
  }