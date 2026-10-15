// Yapay Zekâ Hazırlık Testi -> Google E-Tablolar
// Kurulum: E-Tablo > Uzantılar > Apps Script. Bu kodun tamamını yapıştırın, kaydedin,
// sonra Dağıt > Yeni dağıtım > Web uygulaması (Erişim: "Herkes").

var NOTIFY_EMAIL = 'ece@ecesezer.com'; // her yeni talepte bu adrese bildirim gider

var HEADERS = ['Tarih','Ad soyad','Şirket','E-posta','Telefon','Toplam','Seviye','En zayıf alan',
  'Strateji ve sahiplik','Süreçler','Veri ve kurum hafızası','Ekip','Kurallar ve kaynak'];

function doPost(e) {
  var d = JSON.parse(e.postData.contents);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  sheet.appendRow([new Date(), d.name, d.company, d.email, d.phone, d.total, d.level, d.weakest,
    d['Strateji ve sahiplik'], d['Süreçler'], d['Veri ve kurum hafızası'], d['Ekip'], d['Kurallar ve kaynak']]);

  MailApp.sendEmail(NOTIFY_EMAIL,
    'Yeni ön görüşme talebi: ' + d.name + ' (' + d.total + '/30)',
    'Ad soyad: ' + d.name + '\nŞirket: ' + d.company + '\nE-posta: ' + d.email +
    '\nTelefon: ' + d.phone + '\n\nToplam: ' + d.total + '/30 (' + d.level + ')' +
    '\nEn zayıf alan: ' + d.weakest);

  return ContentService.createTextOutput('ok');
}
