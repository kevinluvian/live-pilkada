var express = require('express')
var request = require('request')
var path = require('path')
var fs = require('fs')
var app = express()

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/pilkada.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/pilkada.js'));
});

app.get('/getdata', function(req, res) {
    fs.readFile('pilkada_data', 'utf-8', function(err, pilkada_data) {
        pilkada_data = pilkada_data.split('\n');
        res.json(pilkada_data[pilkada_data.length - 2])
    });
});
app.get('/getall', function(req, res) {
    res.sendFile(path.join(__dirname + '/pilkada_data'));
})

var requestData = function() {
    var tmp = [{"suarasahHC":57294,"kpugambar1":"","kpugambar2":"","jumlahEntryC1Salah":0,"kpugambar3":"","kpugambar4":"","kpugambar5":"","kpuid_int":0,"sudahDiloadDariKawalC1":"N","jumlahTPSKPU":0,"tps_file":[],"tahun":"2017","id":"Provinsi#Provinsi25823","suaratidaksahKPU":0,"totalpemilih":7108589,"jumlahTPStidakadaC1":0,"nama":"DKI JAKARTA","suaraKandidat":{"1":{"img_url":"https://pilkada2017.kpu.go.id/img/paslon/3189/3189_foto-kd_1_.jpg","suaraTPS":6101,"suaraVerifikasiC1":0,"nama":"Agus Harimurti Yudhoyono, M.SC, MPA, MA - Prof. Dr. Hj. Sylviana Murni, S.H.,M.Si.","urut":1,"suaraKPU":0,"psuaraTPS":10.65,"psuaraVerifikasiC1":0,"psuaraKPU":0},"2":{"img_url":"https://pilkada2017.kpu.go.id/img/paslon/2931/2931_foto-kd_1_.jpg","suaraTPS":36003,"suaraVerifikasiC1":0,"nama":"Ir. Basuki Tjahaja Purnama, M.M. - Drs. H. Djarot Saiful Hidayat, M.S.","urut":2,"suaraKPU":0,"psuaraTPS":62.84,"psuaraVerifikasiC1":0,"psuaraKPU":0},"3":{"img_url":"https://pilkada2017.kpu.go.id/img/paslon/3203/3203_foto-kd_1_.jpg","suaraTPS":15190,"suaraVerifikasiC1":0,"nama":"Anies Baswedan, Ph.D. - Sandiaga Salahuddin Uno","urut":3,"suaraKPU":0,"psuaraTPS":26.51,"psuaraVerifikasiC1":0,"psuaraKPU":0}},"tingkat":"Provinsi","statusHC":"N","tidakadaC1":"N","dilock":"N","key":{"raw":{"id":0,"name":"Provinsi#2017#0#1","kind":"StringKey"}},"grandparentkpuid":"","tandaiSalah":"N","suaratidaksahHC":460,"parentkpuid":"0","jumlahTPSKPUTotal":0,"tingkatPilkada":"","namas":["Agus Harimurti Yudhoyono, M.SC, MPA, MA - Prof. Dr. Hj. Sylviana Murni, S.H.,M.Si.","Ir. Basuki Tjahaja Purnama, M.M. - Drs. H. Djarot Saiful Hidayat, M.S.","Anies Baswedan, Ph.D. - Sandiaga Salahuddin Uno"],"jumlahTPSdilock":0,"jumlahTPSdilockHC":149,"suarasah":0,"suaratidaksah":0,"jumlahTPS":13023,"parentnama":"","dilockHC":"N","urllink":"","kpuid":"25823","uruts":[1,2,3],"suarasahKPU":0,"total":{"suaraTPS":57294,"suaraVerifikasiC1":0,"suaraKPU":0},"menang":36003,"menangnourut":2,"selisih":0},""]
    var time = (new Date()).getTime();
    request({method: 'POST', url: 'https://www.kawalpilkada.id/suara/getkpudata/2017/25823/Provinsi', body: JSON.stringify(tmp)}, function(err, resp, body) {
        var data = JSON.parse(body);
        fs.readFile('pilkada_data', 'utf-8', function(err, pilkada_data) {
            pilkada_data = pilkada_data.split('\n');
            pilkada_data = pilkada_data.slice(Math.max(pilkada_data.length - 50, 0));
            if (data[0] && data[0].suaraKandidat) {
                fs.writeFile('pilkada_data', pilkada_data.join('\n') + JSON.stringify([time, data[0].suaraKandidat]) + '\n', function (err) {
                    setTimeout(requestData, 100)
                });
                console.log(time)
            } else {
                console.log(data)
                setTimeout(requestData, 100)
            }
        });
    });
}
requestData()

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})