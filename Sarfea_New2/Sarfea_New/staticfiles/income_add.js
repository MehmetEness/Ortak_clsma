

var amountInput = document.querySelector("#id_Amount_Incomes");    // Alınan miktar
var kurInput = document.querySelector("#id_Dollar_Rate_Incomes");  // Dolar kuru
var dateForKur = document.querySelector("#id_ChekDate_Incomes");   // Tarih
var timeForKur = document.querySelector("#kur-time");              // Kur saati
var buyingValues ; 
var tarih ;

//**************      KUR HESAPLAMA      ********************


// Hedef tarih
var hedefTarih = '06-01-2015';

// JSON dosyasının URL'si
var dosyaURL = "{% static 'kur.json' %}";

// JSON dosyasını fetch ile oku
fetch(dosyaURL)
  .then(response => response.json())
  .then(data => {
    try {
      // Hedef tarihi kullanarak veriyi filtrele
      const hedefVeri = data.items.find(item => item.Tarih === hedefTarih);

      if (hedefVeri) {
        // TP_DK_USD_S alanını konsola yazdır
        console.log(hedefVeri.TP_DK_USD_S);
      } else {
        console.log('Belirtilen tarihe ait veri bulunamadı.');
      }
    } catch (parseHata) {
      console.error('JSON parse hatası:', parseHata);
    }
  })
  .catch(err => {
    console.error('Dosya okuma hatası:', err);
  });





//selection seçimine göre yapılacak işlem

timeForKur.addEventListener('change', function () {
    // Seçilen değeri al
    const secilenDeger = timeForKur.value;

    // Seçilen değere göre işlem yap
    if (secilenDeger === 'secenek1') {
        
    } else if (secilenDeger === 'secenek2') {
        tarih = birGunOncekiTarih(dateForKur.value).replace(/-/g, '');
        fetch(dosyaURL)
        .then(response => response.json())
        .then(data => {
          try {
            // Hedef tarihi kullanarak veriyi filtrele
            const hedefVeri = data.items.find(item => item.Tarih === tarih);
      
            if (hedefVeri) {
              // TP_DK_USD_S alanını konsola yazdır
              console.log(hedefVeri.TP_DK_USD_S);
            } else {
              console.log('Belirtilen tarihe ait veri bulunamadı.');
            }
          } catch (parseHata) {
            console.error('JSON parse hatası:', parseHata);
          }
        })
        .catch(err => {
          console.error('Dosya okuma hatası:', err);
        });
    ////-----------------------------------------
            
    } else if (secilenDeger === 'secenek3') {
        tarih = tarihFormatiniDegistir(dateForKur.value);    
        fetch(dosyaURL)
        .then(response => response.json())
        .then(data => {
          try {
            // Hedef tarihi kullanarak veriyi filtrele
            const hedefVeri = data.items.find(item => item.Tarih === tarih);
      
            if (hedefVeri) {
              // TP_DK_USD_S alanını konsola yazdır
              console.log(hedefVeri.TP_DK_USD_S);
            } else {
              console.log('Belirtilen tarihe ait veri bulunamadı.');
            }
          } catch (parseHata) {
            console.error('JSON parse hatası:', parseHata);
          }
        })
        .catch(err => {
          console.error('Dosya okuma hatası:', err);
        });
    }
});


/******************************       Tarihi Formatlama          ********************************* */
function tarihFormatiniDegistir(tarih) {
    // Giriş tarihini JavaScript Date objesine çevir
    const dateObj = new Date(tarih);
    if (isWeekend(dateObj)) {
        dateObj.setDate(dateObj.getDate() - 1);
    }

    // Şimdi haftasonu olmayan bir tarihi bulana kadar bir gün geri al
    while (isWeekend(dateObj)) {
        dateObj.setDate(dateObj.getDate() - 1);
    }

    // Yıl, ay ve gün bilgilerini al
    const yil = dateObj.getFullYear();
    const ay = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Ay değeri 0 ile başlar, 1 ekleyip 2 haneli yap
    const gun = dateObj.getDate().toString().padStart(2, '0'); // Gün değeri 2 haneli yap

    // Yıl, ay ve gün bilgilerini birleştirerek istenilen formatta tarihi oluştur
    const yeniFormatliTarih = gun + ay + yil;

    return yeniFormatliTarih;
}

/************************************      Tarihten 1 gün çıkarma         *************************************** */

function birGunOncekiTarih(dateString) {
    const dateObj = new Date(dateString);
    dateObj.setDate(dateObj.getDate() - 1);

    if (isWeekend(dateObj)) {
        dateObj.setDate(dateObj.getDate() - 1);
    }

    // Şimdi haftasonu olmayan bir tarihi bulana kadar bir gün geri al
    while (isWeekend(dateObj)) {
        dateObj.setDate(dateObj.getDate() - 1);
    }

    // Yıl, ay ve gün bilgilerini al
    const yil = dateObj.getFullYear();
    const ay = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const gun = dateObj.getDate().toString().padStart(2, '0');

    // Yıl, ay ve gün bilgilerini birleştirerek yeni formatta tarihi oluştur
    const yeniFormatliTarih = gun + '-' + ay + '-' + yil;

    return yeniFormatliTarih;
}

// Haftasonu kontrol fonksiyonu
function isWeekend(date) {
    const day = date.getDay();
    return day === 0 || day === 6;
}






//////////---------------------------------------------------
/* function tarihHesapla() {
    // Anlık zamanı içeren değişken
    const anlikZaman = new Date();

    // Saati ve dakikayı al
    const saat = anlikZaman.getHours();
    const dakika = anlikZaman.getMinutes();

    // Saat 15:30'u geçmişse bugünün tarihini ver, aksi takdirde dünün tarihini ver
    const hedefTarih = new Date();
    if (saat > 15 || (saat === 15 && dakika >= 30)) {
        // Saat 15:30'u geçmiş
        return hedefTarih.toLocaleDateString();
    } else {
        // Saat 15:30'u geçmemiş veya tam olarak 15:00
        hedefTarih.setDate(anlikZaman.getDate() - 1);
        return hedefTarih.toLocaleDateString();
    }
}
*/
