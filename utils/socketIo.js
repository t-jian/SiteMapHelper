module.exports = (server, event) => {
    const { Server } = require("socket.io");
    const io = new Server({
        // pingTimeout: 180000, //ping 超时
        // pingInterval: 25000, //ping间隔
        // maxHttpBufferSize: 1e8 //最大传输数据缓存大小
    });
    io.on('connection', socket => {
        socket.on('disconnect', reason => {
            console.log('连接断开: ', reason);
        });
        event.on('onchageurl', res => { socket.emit('msg', res) })
        event.on('onsuccess', res => { socket.emit('onsuccess', res) })

    });

    io.listen(server);
}