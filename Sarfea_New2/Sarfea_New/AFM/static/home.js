
getAndRenderList();

//                  LİSTE ÇEKME

async function getAndRenderList(){
    try{
        let data = await apiFunctions('project', "GET");
        console.log(data)
    }catch(error) {
        console.log(error);
    }
}


function cardFormat() {
    let rows = document.querySelectorAll(".rows");
    rows.forEach(function (row) {
    let cards = row.querySelectorAll(".card");
    let totalCashSpan = row.querySelector(".total-cash span:nth-child(1)");
    let customersCountSpan = row.querySelector(".total-cash span:nth-child(2)");
    let totalCash = 0;
    console.log(cards)
    cards.forEach(function (card) {
        
      let totalTeklif = card.querySelector(".boxes:nth-of-type(2) p:first-of-type");
      let unitTeklif = card.querySelector(".boxes:nth-of-type(2) p:nth-of-type(2)");
      let totalMaliyet = card.querySelector(".boxes:nth-of-type(3) p:first-of-type");
      let unitMaliyet = card.querySelector(".boxes:nth-of-type(3) p:nth-of-type(2)");
      let powerSpan = card.querySelector(".boxes:nth-of-type(4) p:nth-of-type(1)");
      let totalTeklifCount = parseFloat(totalTeklif.textContent.replace(/,/g, ".")) || 0;
      let unitTeklifCount = parseFloat(unitTeklif.textContent.replace(/,/g, ".")) || 0;
      let totalMaliyetCount = parseFloat(totalMaliyet.textContent.replace(/,/g, ".")) || 0;
      let unitMaliyetCount = parseFloat(unitMaliyet.textContent.replace(/,/g, ".")) || 0;
      let powerCount = parseFloat(powerSpan.textContent.replace(/,/g, ".")) || 0;

      totalTeklif.textContent = "$ " + formatNumber(totalTeklifCount, 2);
      unitTeklif.textContent = formatNumber(unitTeklifCount, 0) + " USD/kWp";
      totalMaliyet.textContent = "$ " + formatNumber(totalMaliyetCount, 2);
      unitMaliyet.textContent = formatNumber(unitMaliyetCount, 0) + " USD/kWp";
      powerSpan.textContent = formatNumber(powerCount, 0) + " kWp";

      totalCash += totalMaliyetCount;
    });

    totalCashSpan.textContent = "$" + formatNumber(totalCash, 2);
    customersCountSpan.textContent = `(${String(cards.length)})`;
  });  
}

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
      data: [12, 19, 3, 5, 2, 3, 19, 3, 5, 2, 3, 5],
      borderWidth: 2,
      fill: true,
      backgroundColor: "#2aa4eb36"
    }, {
      label: 'Çıkış',
      borderColor: "#808080",
      data: [8, 11, 6, 11, 7, 1, 16, 17, 2, 2, 13, 15],
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
