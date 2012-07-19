var mediaTypes = require("routil-mediatypes")()
    , send = require("routil-send")
    , sendJson = send.sendJson
    , sendHtml = send.sendHtml

module.exports = redirect

function redirect(req, res, target, statusCode) {
    statusCode = statusCode || 302
    res.setHeader('location', target)

    mediaTypes(req, res, {
        "application/json": jsonRedirectHandler
        , "default": defaultRedirectHandler
    })(res, target, statusCode)
}

function jsonRedirectHandler(res, target, statusCode) {
    sendJson(res, {
        redirect: target,
        statusCode: statusCode
    }, statusCode)
}

function defaultRedirectHandler(res, target, statusCode) {
    var html =  '<html><body><h1>Moved'
    if (statusCode === 302) {
        html += ' Permanently'
    }
    html += '</h1><a href="' + target + '">' + target + '</a>'

    sendHtml(res, html, statusCode)
}