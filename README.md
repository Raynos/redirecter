# redirecter [![build status][1]][2]

Easy redirection

## Example

```
var redirect = require("redirecter")
    , http = require("http")

http.createServer(function handleRequest(req, res) {
    if (req.url === "/redir") {
        redirect(req, res, "/foo")
    } else if (req.url.match(/^\/status/)) {
        var status = parseInt(req.url.substr(7), 10)
        redirect(req, res, {
            target: "/foo"
            , statusCode: status
        })
    } else {
        res.end("foo")
    }
}).listen(8080)
```

## Installation

`npm install redirecter`

## Tests

`make test`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/redirecter.png
  [2]: http://travis-ci.org/Raynos/redirecter