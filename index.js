var mediaTypes = require("media-types")
    , send = require("send-data")
    , sendJson = send.json
    , sendHtml = send.html

module.exports = redirect

function redirect(req, res, target) {
    var statusCode = 302
    if (typeof target === "object") {
        statusCode = target.statusCode || 302
        target = target.target
    }

    res.setHeader('location', target)

    mediaTypes(req, res, {
        "application/json": sendJson
        , "default": defaultRedirectHandler
    })(req, res, {
        data: {
            redirect: target
            , statusCode: statusCode
        }
        , statusCode: statusCode
    })
}

function defaultRedirectHandler(req, res, options) {
    var statusCode = options.statusCode
        , target = options.data.redirect

    var html =  '<html><body><h1>Moved'
    if (statusCode === 302) {
        html += ' Permanently'
    }
    html += '</h1><a href="' + target + '">' + target + '</a>'

    sendHtml(req, res, {
        data: html
        , statusCode: statusCode
    })
}