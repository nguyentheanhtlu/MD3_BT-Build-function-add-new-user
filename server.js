let http = require('http');
let fs = require('fs');
let qs = require('qs')
let user = [];

let server = http.createServer(function (req, res) {
    if (req.method === 'GET') {
        fs.readFile('./template/index.html', function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    }else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
           let User = qs.parse(data);
             user.push(User);
             console.log(user);
            return res.end('Register success!');
        })
        req.on('error', () => {
            console.log('error')
        })
    }
});

server.listen(8080, function () {
    console.log('server running at localhost:8080 ')
});

