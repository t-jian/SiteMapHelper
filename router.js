var express = require('express')
var router = express.Router()
var siteMapHepler = require('./utils/siteMapHepler.js')

const wrapperEntry = function(event) {
    router.get('/', function(req, res) {
        res.render('index.html')
    })
    router.post('/create', function(req, res) {
        let host = req.body.host;
        let resultJson;
        if (host == undefined || host == "") {
            resultJson = {
                code: 1,
                success: false,
                message: '参数为空'
            }
        } else {
            resultJson = {
                code: 0,
                success: true,
                message: 'OK'
            }
            siteMapHepler.init({
                href: host,
                save_path: 'sitemap.txt',
                onChange: url => { event.emit('onchageurl', url) },
                onSuccess: urls => { event.emit('onsuccess', urls) }
            })
        }
        res.status(200).json(resultJson)
    })
    router.get('/download', (req, res) => {
        const json = siteMapHepler.transformContent();
        const buf = Buffer.from(json);
        res.writeHead(200, {
            'Content-Type': 'application/xml',
            'Content-disposition': 'attachment; filename=sitemap.xml'
        });
        res.write(buf);
        res.end();
    })
    return router;
}
module.exports = wrapperEntry