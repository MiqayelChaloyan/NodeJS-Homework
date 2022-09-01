import http from 'http';
import mysql from 'mysql';
const hostname = '127.0.0.1';
const port = 3000;

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root123',
  database : 'users'
});
 
connection.connect()

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Credentials", "true");
	console.log(req.url)
	connection.query('SELECT * FROM users;', function (error, results, fields) {
		if(req.url === "/users") {
			if (error) throw error;
			res.end(JSON.stringify(results))
		} else if(req.url === ("/user/sorted")) {
			const user = results.sort((a, b) => a.id - b.id);
			res.end(JSON.stringify(user));
		} else if(req.url?.startsWith("/user/")) {
			const strArr = req.url.split("/");
			const socialMedia = strArr[strArr.length - 1];
			const user = results.filter(item => item.socialMedia === socialMedia);
			res.end(JSON.stringify(user));
		}
	});
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});