module.exports = (server, event) => {
    const { Server } = require("socket.io");
    const io = new Server();
    io.on('connection', socket => {
        socket.on('online', username => {})
        socket.on('disconnect', reason => {
            console.log('disconnect: ', reason);

        });
        event.on('onchageurl', res => {
            socket.emit('onchageurl', res);
        })
    });
    io.listen(server);
}