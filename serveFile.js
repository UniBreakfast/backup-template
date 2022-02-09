module.exports = serveFile

const { createReadStream } = require('fs')
const types = {
  html: 'text/html; charset=utf-8',
  css: 'text/css; charset=utf-8',
  js: 'text/javascript; charset=utf-8',
  json: 'application/json; charset=utf-8',
  ico: 'image/x-icon',
  jpg: 'image/jpeg',
  png: 'image/png',
}

function serveFile(path, resp) {
  if (['/', '/index', '/index.html'].includes(path)) {
    resp.writeHead(302, { location: 'about' });
    resp.end();
  } else {
    let type = determineType(path)
    if (!type) path += '.html'

    createReadStream('public' + path).on('error', () => {
      resp.setHeader('content-type', types['html'])
      resp.statusCode = 404
      resp.end(respond404(path))
    }).pipe(resp)
    resp.setHeader('content-type', type || types['html'])
  }
}

function determineType(fileName) {
  const extMatch = fileName.match(/\.([^\/.]*)$/)
  const ext = extMatch?.[1]
  return types[ext]
}

function respond404(path) {
  return `
    <title>404 File not found</title>
    <h1 style="padding:20px; color:#511; background:#faa; font-family:sans-serif">
      <code>${path}</code> <br> Error 404: File not found
    </h1>
  `
}
