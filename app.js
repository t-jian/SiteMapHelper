const express = require('express')
const app = express()
var path = require('path')

var router = require('./router')
//数据解析中间件
var bodyParser = require('body-parser')
//用于生成 sitemap 文件
var sitemap = require('sitemap-nodejs');

//设置静态路径。__dirname是当前文件所在绝对目录的意思。 使用static/xxxx
app.use('/static',express.static(path.join(__dirname,'assets','assets')))

//告诉express框架使用express-art-template模板引擎渲染html后缀的模板文件
app.engine('html',require('express-art-template'))
//配置模板所在的位置
app.set('views',path.join(__dirname,'./src/views/')) 

//把路由挂载到app中
app.use(router)

// 配置一个 404 处理中间件
app.use(function(req,res){
    res.render('404.html')
})

const server = app.listen(5000,function () {
    const {address,port} = server.address()
    console.log('HTTP服务启动成功: http://%s:%s',address,port)
})