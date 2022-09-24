var express = require('express')
const app = express()
var router = express.Router()
var siteMapHepler = require('./utils/siteMapHepler.js')
var events = require('events');
var eventEmitter = new events.EventEmitter();

router.get('/',function (req,res){
    console.log(eventEmitter,66666)
    eventEmitter.emit('chageUrl',33333); 
    siteMapHepler.init({
        href:"http://www.ztan.net",
        save_path:'sitemap.txt',
        chageUrlCallback:(res)=>{
            eventEmitter.emit('chageUrl',res); 
        }
    })
    res.render('index.html')
})
module.exports = router