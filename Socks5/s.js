var socks = require('socksv5');
var Client = require('ssh2').Client;
 
var ssh_config = {
	host: '118.163.135.17',
	port: 22,
	username: 'admin',
	password: 'admin'
};

socks.createServer(function(info, accept, deny) {
	var conn = new Client();
	conn.on('ready', function() {
		conn.forwardOut(info.srcAddr,info.srcPort,info.dstAddr,info.dstPort,function(err, stream) {
			if (err) {
				conn.end();
				return deny();
			}

			var clientSocket;
			if (clientSocket = accept(true)) {
				stream.pipe(clientSocket).pipe(stream).on('close', function() {
					conn.end();
				});
			} else
				conn.end();
		});
	}).on('error', function(err) {
		deny();
	}).connect(ssh_config);
}).listen(1080, 'localhost', function() {
	console.log('SOCKSv5 proxy server started on port 1080');
}).useAuth(socks.auth.None());