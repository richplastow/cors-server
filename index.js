//// Get OpenShift variables, if available.
//// See https://developers.openshift.com/en/node-js-project-structure.html
var version = '0.0.2';
var port = process.env.OPENSHIFT_NODEJS_PORT || 1337;
var ip   = process.env.OPENSHIFT_NODEJS_IP   || '127.0.0.1';

//// Start running a simple server.
var http = require('http');
var tally = 0;
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(version + ' Request tally: ' + (++tally) + '\n');
}).listen(port, ip);
console.log(version + ' Running at http://' + ip + ':' + port + '/');

