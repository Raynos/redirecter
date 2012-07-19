# redirecter [![build status][1]][2]

Easy redirection

## Example

    var redirect = require("redirecter")
        , http = require("http")

    http.createServer(function (req, res) {
        if (url === "/wrong") {
            // redirect them to /right but also tell them you are a teapot
            redirect(req, res, "/right", 418)
        } else if (url === "/right") {
            res.end("doing it right")
        }
    }).listen(8080)

## Installation

`npm install redirecter`

## Tests

`make test`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/redirecter.png
  [2]: http://travis-ci.org/Raynos/redirecter