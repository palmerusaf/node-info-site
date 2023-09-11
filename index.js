const http = require('http')
const url = require('url')
const fs = require('fs')

let notFoundPage
fs.readFile('./404.html', (e, data) => {
  if (e) return console.error('error page not found')
  notFoundPage = data
})

http.createServer((req, res) => {
  const { pathname } = url.parse(req.url, true)
  const pagePath = pathname.length > 1 ? `.${pathname}.html` : './index.html'
  fs.readFile(pagePath, (e, data) => {
    if (e) {
      res.writeHead(418, { 'Content-Type': 'text/html' });
      res.write(notFoundPage)
      return res.end()
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data)
    return res.end()
  })
}).listen(8080)
