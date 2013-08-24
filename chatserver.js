var http    = require('http'),
    io      = require('socket.io'),
    fs      = require('fs');
 
//配置
var config = {
    port : 8888
}
 
http = http.createServer(handler);
http.listen(config.port);
io = io.listen(http);
 
function handler(req, res) {
    fs.readFile(__dirname+'/chat.html',
    function(err, data){
        req.setEncoding(encoding="utf8");
        res.writeHead(200);
        res.end(data);
    });
}
//'connection' 是socket.io 保留的，不能错哦
io.sockets.on('connection',function(socket){ 
     //'msg'是我们自定义的，客户端听取的时候要指定同样的事件名
    socket.emit('msg',{hi:'Happy new year.'});
     //'msg'需要和客户端发送时定义的事件名相同
    socket.on('msg',function(data){
        console.log('Get a msg from client ...');
        console.log(data);
        socket.broadcast.emit('user message',data);
    });
});