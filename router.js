var express = require('express')
var router = express.Router()
var siteMapHepler = require('./utils/siteMapHepler.js')

const wrapperEntry = function(event) {
    router.get('/', function(req, res) {
        siteMapHepler.init({
            href: "http://www.ztan.net",
            save_path: 'sitemap.txt',
            chageUrlCallback: (res) => {
                event.emit('onchageurl', res);
            }
        })
        res.render('index.html')
    })
    return router;
}
module.exports = wrapperEntry