

var amountInput = document.querySelector("#id_Amount_Incomes");    // Alınan miktar
var kurInput = document.querySelector("#id_Dollar_Rate_Incomes");  // Dolar kuru
var dateForKur = document.querySelector("#id_ChekDate_Incomes");   // Tarih
var timeForKur = document.querySelector("#kur-time");              // Kur saati
var buyingValues ; 
var tarih ;

//**************      KUR HESAPLAMA      ********************


function getBuyingValues(x) {
    var url = `https://tcmb.gov.tr/kurlar/202311/${x}.xml`;
    console.log(url);
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Hata: " + response.status);
            }
            return response.text();
        })
        .then(data => {
            // XML'i parse et
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "application/xml");

            // Döviz kurlarını al
            const rates = [];
            const currencyNodes = xmlDoc.getElementsByTagName("Currency");
            for (let i = 0; i < currencyNodes.length; i++) {
                const currencyNode = currencyNodes[i];
                rates.push({
                    "currency": currencyNode.getAttribute("Kod"),
                    "buying": parseFloat(currencyNode.querySelector("BanknoteBuying").textContent),
                    "selling": parseFloat(currencyNode.querySelector("BanknoteSelling").textContent),
                });
            }

            // buying değerlerini al ve sayısal değerlere dönüştür
            const buyingValues = rates.map(rate => rate.buying);

            return buyingValues;
        })
        .catch(error => {
            console.error(error);
            throw error; // Hata durumunda promise'ı reject et
        });
}






timeForKur.addEventListener('change', function () {
    // Seçilen değeri al
    const secilenDeger = timeForKur.value;

    // Seçilen değere göre işlem yap
    if (secilenDeger === 'secenek1') {
        
    } else if (secilenDeger === 'secenek2') {
        tarih = birGunOncekiTarih(dateForKur.value).replace(/-/g, '');
        getBuyingValues(tarih)
            .then(buyingValues => {
                kurInput.textContent = buyingValues;
            })
            .catch(error => {
                console.error("Hata:", error);
            });
            
    } else if (secilenDeger === 'secenek3') {
        tarih = tarihFormatiniDegistir(dateForKur.value);    
        console.log(tarih);    
        getBuyingValues(tarih)
            .then(buyingValues => {
                kurInput.textContent = buyingValues;
            })
            .catch(error => {
                console.error("Hata:", error);
            });
            }
});


/******************************       Tarihi Formatlama          ********************************* */
function tarihFormatiniDegistir(tarih) {
    // Giriş tarihini JavaScript Date objesine çevir
    const dateObj = new Date(tarih);

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

    // Yıl, ay ve gün bilgilerini al
    const yil = dateObj.getFullYear();
    const ay = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const gun = dateObj.getDate().toString().padStart(2, '0');

    // Yıl, ay ve gün bilgilerini birleştirerek yeni formatta tarihi oluştur
    const yeniFormatliTarih = gun + '-' + ay + '-' + yil;

    return yeniFormatliTarih;
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
