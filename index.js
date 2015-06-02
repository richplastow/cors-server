//// Get OpenShift variables, if available.
//// See https://developers.openshift.com/en/node-js-project-structure.html
var port = process.env.OPENSHIFT_NODEJS_PORT || 1337;
var ip   = process.env.OPENSHIFT_NODEJS_IP   || '127.0.0.1';

//// Start running a simple server.
var http = require('http');
var tally = 0;
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Request tally: ' + (++tally) + '\n');
}).listen(port, ip);
console.log('Server running at http://' + ip + ':' + port + '/');

