const express = require('express')
const app = express()
const path = require('path')
const EventEmitter = require('events').EventEmitter;
const event = new EventEmitter();
const router = require('./router')
    //数据解析中间件
var bodyParser = require('body-parser')

//设置静态路径。__dirname是当前文件所在绝对目录的意思。 使用static/xxxx
app.use('/static', express.static(path.join(__dirname, 'assets', 'assets')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))
    //告诉express框架使用express-art-template模板引擎渲染html后缀的模板文件
app.engine('html', require('express-art-template'))
    //配置模板所在的位置
app.set('views', path.join(__dirname, './src/views/'))

//把路由挂载到app中,同时注入event
app.use(router(event))

// 配置一个 404 处理中间件
app.use(function(req, res) {
    res.render('404.html')
})

const server = app.listen(5000, function() {
    const { address, port } = server.address()
    console.log('HTTP服务启动成功: http://%s:%s', address, port)
})
require('./utils/socketIo.js')(server, event);