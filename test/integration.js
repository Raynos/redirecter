var redirect = require("..")
var test = require("tape")
var testServer = require("test-server")

testServer(handleRequest, startTests)

function handleRequest(req, res) {
    if (req.url === "/redir") {
        redirect(req, res, "/foo")
    } else if (req.url.match(/^\/status/)) {
        var status = parseInt(req.url.substr(7), 10)
        redirect(req, res, {
            target: "/foo",
            statusCode: status
        })
    } else if (req.url === "/back") {
        redirect(req, res, "back")
    } else {
        res.end("foo")
    }
}

function startTests(request, done) {
    test("test redirection of uris", function (t) {
        request({
            uri: "/redir"
        }, function (er, res, body) {
            t.equal(body, "foo", "body is incorrect")

            t.end()
        })
    })

    test("test raw redirect response", function (t) {
        request({
            uri: "/redir",
            followRedirect: false
        }, function (er, res, body) {
            t.equal(res.statusCode, 302, "status code is incorrect")
            t.equal(res.headers.location, "/foo", "location header incorrect")

            t.equal(body, "<html><body><h1>Moved Permanently</h1><a href=" +
                "'/foo'>/foo</a>")

            t.end()
        })
    })

    test("test statusCodes", function (t) {
        request({
            uri: "/status405"
        }, function (er, res, body) {
            t.equal(res.statusCode, 405, "statusCode incorrect")

            t.end()
        })
    })

    test("json response", function (t) {
        request({
            uri: "/redir",
            headers: {
                "accept": "application/json"
            },
            followRedirect: false
        }, function (er, res, body) {
            var data = JSON.parse(body)

            t.equal(data.redirect, "/foo", "location is incorrect")
            t.equal(data.statusCode, 302, "status is incorrect")

            t.end()
        })
    })

    test("back response", function (t) {
        request({
            uri: "/back",
            headers: {
                "referrer": "/foobar",
                "accept": "application/json"
            },
            followRedirect: false
        }, function (er, res, body) {
            t.ifError(er)

            var data = JSON.parse(body)

            t.equal(data.redirect, "/foobar")

            t.end()
        })
    })

    .on("end", done)
}
