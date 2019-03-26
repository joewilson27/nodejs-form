/*
Sedangkan untuk mengambil data dari form denga metode
POST, kita harus menggunakan modul querystring.

Apa bedanya dengan modul url?

Modul url berfungsi untuk parsing URL.
Di sana memang ada fungsi untuk parse query string.
Namun, itu query string yang dari URL.

Sedangkan modul querystring MEMANG KHUSUS
untuk mengurai (parsing) query string.

Ngomong-ngomong…
Query string itu apaan sih?

Yang disebut dengan query string itu yang ini:
foo=bar&abc=xyz&abc=123

Kamu sering melihatnya di URL bukan.
https://www.abc.com/search/?q=nodejs
https --> protokol
www.abc.com --> domain
search --> pathname
q=nodejs --> parameter

Kadang query string disebut juga dengan parameter.

Nah, pada form yang menggunakan metode POST…
…sebenarnya ia mengirim query string juga. Namun dikirim secara background.
Inilah sebabnya kita TIDAK BISA menggunakan modul url.

Modul querystring sudah ada di dalam Nodejs, sehingga kita tidak perlu menginstalnya dengan NPM

*/

var http = require('http');
var qs = require('querystring');
var fs = require('fs');

http.createServer(function (req, res) {
	// console.debug(req.on);
	//if(req.url === "/login/" && req.method === "GET"){
	if(req.url === "/login/"){
		// tampilkan form login
		fs.readFile("login_form.html", (err, data) => {
			if (err) { // kirim balasan error
				res.writeHead(404, {'Content-Type': 'text/html'});
				return res.end("404 Not Found");
			}
			// kirim form login_form.html
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
			return res.end();
		});
	}

	if(req.url === "/login/" && req.method === "POST"){
		// ambil data dari form dan proses
		var requestBody = '';
		req.on('data', function(data) {
			// tangkap data dari form
			requestBody += data;

			// kirim balasan jika datanya terlalu besar
			if(requestBody.length > 1e7) {
				res.writeHead(413, 'Request Entity Too Large', {'Content-Type': 'text/html'});
              	res.end('<!doctype html><html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>');
			}
		});

		// kita sudah dapat datanya
		// langkah berikutnya tinggal di parse
		req.on('end', function() {
			var formData = qs.parse(requestBody);

			// cek login
			if(formData.username === "joewilson" && formData.password === "1234567"){
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write('<h2>Selamat datang bos!</h2> ');
                res.write('<p>username: '+formData.username+'</p>');
                res.write('<p>password: '+formData.password+'</p>');
                res.write("<a href='/login/'>kembali</a>");
                res.end();
			} else {
				res.writeHead(200, {'Content-Type': 'text/html'});
                res.write('<h2>Login Gagal!</h2> ');
                res.write("<a href='/login/'>coba lagi</a>");
                res.end();
			}

		});
	}

}).listen(8000);

console.log('server is running on http://localhost:8000');
