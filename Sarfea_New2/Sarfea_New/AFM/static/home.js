document.addEventListener("DOMContentLoaded", async function () {


await getIncome();
await getExpenses();
 akisChart()
 karZararChart()
 gelirAylikChart(totalIncome)

});
 
//                  LİSTE ÇEKME

let incomeArray = [];
let expensesArray = [];
let totalIncome = 0;
let totalExpenses = 0;
let totalProjectExpenses = 0;

async function getIncome(){
    try{
        let data = await apiFunctions('income', "GET");
        let bugununTarihi = new Date();
         let results = {};
        data.forEach((income) => {
           
            if(income.ChekDate_Incomes){
                const parcalar = income.ChekDate_Incomes.split("-");
                
                const ay = parseInt(parcalar[1]);
                //console.log(bugununTarihi.getMonth())
                if(parcalar[0] ==  bugununTarihi.getFullYear()){
                    const gelirMiktari = parseFloat(income.Amount_Usd_Incomes) || 0;
                    if (!results[ay]) {
                        
                        results[ay] = gelirMiktari;
                    } else {
                        results[ay] += gelirMiktari;
                    }
                    if(ay - 1 == bugununTarihi.getMonth()){                        
                        totalIncome += gelirMiktari;
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
        let bugununTarihi = new Date();
         let results = {};
        data.forEach((expense) => {
           
            if(expense.Date_Expenses){
                const parcalar = expense.Date_Expenses.split("-");
                const ay = parseInt(parcalar[1]);
                if(parcalar[0] ==  bugununTarihi.getFullYear()){
                    const gelirMiktari = parseFloat(expense.Amount_USD_Expenses) || 0;
                    if (!results[ay]) {
                        results[ay] = gelirMiktari;
                    } else {
                        results[ay] += gelirMiktari;
                    }
                    if(ay - 1 == bugununTarihi.getMonth()){                        
                        totalExpenses += gelirMiktari;
                    }
                }
            }            
        });
        for (let i = 1; i <= 12; i++) {
            expensesArray.push(results[i] || 0);
        }
       
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
const karZararChart = () =>{
    var karZarar = incomeArray.map((item, index) => item - expensesArray[index]);
    var ctx = document.getElementById('kar_zarar_grafik').getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {

        labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Hazira', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
        datasets: [{
        label: 'Kar-Zarar',
        data: karZarar, // Kar-Zarar verileri
        backgroundColor: karZarar.map(value => value >= 0 ? '#005eff' : '#808080'),
        //borderColor: karZarar.map(value => value >= 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)'),
        borderWidth: 1,
        barThickness: 20,
        borderRadius: 10
        }]
    },
    options: {
        layout: {
        padding: 20
        },
        plugins: {
        title: {
            display: true,
            text: 'Kar & Zarar',
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

        }
    }
    });
}
const gelirAylikChart = async (incomeWidth) =>{
    const response = await apiFunctions("project" , "GET");
    let totalWidth = 0;
    response.forEach((project) => {
        let projeGelir = project.Cost_NotIncludingKDV || 0;
        totalWidth += projeGelir;
    })

    var counter = 0;
    if (counter == 0) {
      j = 1;
      var elem = document.querySelector(".progress-done");
      var elem2 = document.querySelector(".progress-done2");
      var width = 0;
      var main = setInterval(frame, 1);
      function frame() {
        if (width >= (incomeWidth / totalWidth)) {
          clearInterval(main);
        } else {
          width++;
          elem.style.width = width + "%";
          elem.innerHTML = width + "%";
          elem2.style.width = width + "%";
          elem2.innerHTML = width + "%";
        }
      }
    }  
}
