var amountInputForFormat = document.querySelector("#id_Amount_JobHistory");
//**************      KUR HESAPLAMA      ********************

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


const resultInput = document.querySelector("#id_Dollar_Rate_JobHistory");  // gelir kur gir


var currency = new Currency();

runEventListeners();

function runEventListeners(){
amountInputForFormat.addEventListener("input",exchange);
}


function exchange(){ 

currency.exchange()
.then((result) => {
resultInput.value = result.toFixed(4)
})

}