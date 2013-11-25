var mediaTypes = require("media-types")
var sendJson = require("send-data/json")
var sendHtml = require("send-data/html")

var handler = mediaTypes({
    "application/json": sendJson,
    "default": defaultRedirectHandler
})

module.exports = redirect

function redirect(req, res, target) {
    var statusCode = 302
    if (typeof target === "object") {
        statusCode = target.statusCode || 302
        target = target.target
    }

    if (target === "back") {
        // console.log("req", req.headers)
        target = req.headers.referrer || "/"
    }

    res.setHeader("location", target)

    handler(req, res, {
        body: {
            redirect: target,
            statusCode: statusCode
        },
        statusCode: statusCode
    })
}

function defaultRedirectHandler(req, res, options) {
    var statusCode = options.statusCode
    var target = options.body.redirect

    var html =  "<html><body><h1>Moved"
    if (statusCode === 302) {
        html += " Permanently"
    }
    html += "</h1><a href='" + target + "'>" + target + "</a>"

    sendHtml(req, res, {
        body: html,
        statusCode: statusCode
    })
}
