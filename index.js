import { createServer } from 'http'
import { parse } from 'url'
import { readFile } from 'fs'

let notFoundPage
readFile('./404.html', (e, data) => {
  if (e) return console.error('error page not found')
  notFoundPage = data
})

createServer((req, res) => {
  const { pathname } = parse(req.url, true)
  const pagePath = pathname.length > 1 ? `.${pathname}.html` : './index.html'
  readFile(pagePath, (e, data) => {
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
