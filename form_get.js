/*
Bagaimana cara kita mengambil data dari form?
Saat mencari jawaban dari pertanyaan ini, banyak yang merekomenadsikan menggunakan body-parser.
Body parser merupakan modul nodejs yang digunakan untuk mengambil data dari form pada framework Express.
Namun, agar lebih paham bagaimana form diproses pada Nodejs…

…kita tidak akan menggunakan modul tersebut.

Untuk mengambil data dari metode form dengan metode GET,
kita bisa menggunakan modul url. Karena kita akan mengambil data dari parameter URL.
*/


var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
	var q = url.parse(req.url, true);
	// console.log(req.url); console.log(q.pathname);
	if(q.pathname === "/search/" && req.method === "GET"){
		// ambil parameter dari URL
		var keyword = q.query.keyword;

		if( keyword ){
			// ambil data dari form dengan method GET
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write("<h3>Search Results:</h3>");
			res.write("<p>Anda mencari: <b>"+keyword+"</b></p>");
			// res.write("<pre>Tidak ada hasil! Maaf website ini masih dalam pengembangan</pre>");
            res.end("<a href='/search/'>Kembali</a>");
		} else {

			if( keyword === "" ){
				// res.writeHead(404, {'Content-Type': 'text/html'});
				// res.write("<pre>Anda belum mengisi kolom.</pre>");
				// res.write("<a href='/search/'>Kembali</a><br>");
				// return res.end("404 Not Found");

				// tampilkan form search
				fs.readFile('search_null.html', (err, data) => {
					if (err) { // kirim balasan error
						res.writeHead(404, {'Content-Type': 'text/html'});
						return res.end("404 Not Found");
					}
					// kirim form search.html
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.write(data);
					return res.end();
				 });


			} else {

				// tampilkan form search
				fs.readFile('search.html', (err, data) => {
					if (err) { // kirim balasan error
						res.writeHead(404, {'Content-Type': 'text/html'});
						return res.end("404 Not Found");
					}
					// kirim form search.html
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.write(data);
					return res.end();
				 });

			}

			
		}
	}

}).listen(8000);

console.log('server is running on http://localhost:8000');

/*
Perhatikan di sana (file search.html) ada input dengan nama keyword.
Ini akan menjadi nama key dalam mengambil parameter.
Kalau di php dia seperti $_POST['keyword']
*/

