document.addEventListener("DOMContentLoaded", async function () {


await getIncome();
await getExpenses();
 akisChart()

});
 
//                  LİSTE ÇEKME

let incomeArray = [];
let expensesArray = [];

async function getIncome(){
    try{
        let data = await apiFunctions('income', "GET");
        let bugununTarihi = new Date();
         let results = {};
        data.forEach((income) => {
           
            if(income.ChekDate_Incomes){
                const parcalar = income.ChekDate_Incomes.split("-");
                const ay = parseInt(parcalar[1]);
                if(parcalar[0] ==  bugununTarihi.getFullYear()){
                    const gelirMiktari = parseFloat(income.Amount_Incomes);
                    if (!results[ay]) {
                        results[ay] = gelirMiktari;
                    } else {
                        results[ay] += gelirMiktari;
                    }
                }
            }            
        });
        for (let i = 1; i <= 12; i++) {
            incomeArray.push(results[i] || 0);
        }
       
    }catch(error) {
        console.log(error);
    }
}
async function getExpenses(){
    try{
        let data = await apiFunctions('expense', "GET");
        console.log(data)
        let bugununTarihi = new Date();
         let results = {};
        data.forEach((expense) => {
           
            if(expense.Date_Expenses){
                const parcalar = expense.Date_Expenses.split("-");
                const ay = parseInt(parcalar[1]);
                if(parcalar[0] ==  bugununTarihi.getFullYear()){
                    const gelirMiktari = parseFloat(expense.Amount_Expenses);
                    if (!results[ay]) {
                        results[ay] = gelirMiktari;
                    } else {
                        results[ay] += gelirMiktari;
                    }
                }
            }            
        });
        for (let i = 1; i <= 12; i++) {
            expensesArray.push(results[i] || 0);
        }
       
        console.log(expensesArray)
    }catch(error) {
        console.log(error);
    }
}




const akisChart = () =>{
    const ctxNakitAkis = document.getElementById('nakit_akis_grafik');
// ctxNakitAkis.width = "100%";
// ctxNakitAkis.height = "100%";
new Chart(ctxNakitAkis, {
  type: 'line',
  data: {
    labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Hazira', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
    datasets: [{
      label: 'Giriş',
      borderColor: "#2aa5eb",
      data: incomeArray,
      borderWidth: 2,
      fill: true,
      backgroundColor: "#2aa4eb36"
    }, {
      label: 'Çıkış',
      borderColor: "#808080",
      data: expensesArray,
      borderWidth: 2,
      fill: true,
      backgroundColor: "#80808048"
    }
    ],
  },
  options: {
    layout: {
      padding: {
        top: 5,
        left: 20 // Grafiğin sol kenarı ile başlık arasında 20 piksel boşluk bırakır
      }
    },
    elements: {
      point: {
        pointStyle: 'circle',
        radius: 1,
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: 'yellow'
      },
      line: {
        borderWidth: 5,
        borderColor: 'blue',
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Nakit Akışı',
        position: 'top',
        color: 'black',
        align: 'start',
        font: {
          family: 'Arial',
          size: 18,
          style: 'normal',
          lineHeight: 1.2
        }
      },
      legend: {
        display: true,
        position: 'bottom',
      },
    },

    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  }
});
}
