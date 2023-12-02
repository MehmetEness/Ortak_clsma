
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
    
    
    let leftTable = document.querySelector("#table");      
    let rightTable = document.querySelector("#table-2"); 


/*  Search Box  */
document.querySelector('.icon').onclick = function(){
document.querySelector('.search').classList.toggle('active')
}



//-------------------
document.getElementById("firma-add-btn").addEventListener("click", function () {
  console.log("firma add");
  document.querySelector(".payingFirmaAddWindow").style.display = "flex";
});
document.getElementById("firma-add-btn2").addEventListener("click", function () {
  console.log("firma add2");
  document.querySelector(".payingFirmaAddWindow").style.display = "flex";
});
document.getElementById("payingFirmaAdd-modal").addEventListener("click", function () {
  document.querySelector(".payingFirmaAddWindow").style.display = "none";
});





document.getElementById("gider-ac").addEventListener("click", function(){
    document.querySelector(".giderWindow").style.display = "flex";
   
    if(document.querySelector(".isWindow").style.display == "flex"){
        document.querySelector(".isWindow").style.display = "none";
    }
});
document.getElementById("gider-modal").addEventListener("click", function(){
    document.querySelector(".giderWindow").style.display = "none";
});


document.getElementById("is-ac").addEventListener("click", function(){
    document.querySelector(".isWindow").style.display = "flex";
    if(document.querySelector(".giderWindow").style.display == "flex"){
        document.querySelector(".giderWindow").style.display = "none";
    }
});
document.getElementById("is-modal").addEventListener("click", function(){
    document.querySelector(".isWindow").style.display = "none";
});


//-----
document.getElementById("head-gider-ac").addEventListener("click", function(){
document.querySelector(".giderWindow").style.display = "flex";

if(document.querySelector(".isWindow").style.display == "flex"){
    document.querySelector(".isWindow").style.display = "none";
}
});
document.getElementById("gider-modal").addEventListener("click", function(){
document.querySelector(".giderWindow").style.display = "none";
});

document.getElementById("is-modal").addEventListener("click", function(){
document.querySelector(".isWindow").style.display = "none";
})
//-----
document.getElementById("gider-modal").addEventListener("click", function(){
document.querySelector(".giderWindow").style.display = "none";
});


document.getElementById("head-is-ac").addEventListener("click", function(){
document.querySelector(".isWindow").style.display = "flex";
if(document.querySelector(".giderWindow").style.display == "flex"){
    document.querySelector(".giderWindow").style.display = "none";
}
});
document.getElementById("is-modal").addEventListener("click", function(){
document.querySelector(".isWindow").style.display = "none";
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
  totalUSDFunction = parseFloat(totalUSDFunction.toFixed(2))
  totalTLFunction = parseFloat(totalTLFunction.toFixed(2))
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
        x = parseFloat((leftTableResult.totalTLFunction - rightTableResult.totalTLFunction).toFixed(2))
        y = parseFloat((leftTableResult.totalUSDFunction - rightTableResult.totalUSDFunction).toFixed(2))    
        genaralTotalTL.textContent =  formatNumber(x) + " ₺" ;
        generalTotalUSD.textContent =  formatNumber(y) + " $" ;
    }    
} 
function formatNumber(number) {
    return new Intl.NumberFormat('en-US').format(number.toFixed(2));
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