const { createServer } = require('http')
const handleApi = require('./handleApi')
const serveFile = require('./serveFile')
const ssrHandled = require('./prepAndServe')

const port = process.env.PORT || 3000
const server = createServer(handleRequest)


server.listen(port, notifyOnStart)


function handleRequest(req, resp) {
  const { method, url } = req

  if (url.startsWith('/api/')) handleApi(method, url.slice(5), resp)
  else if (url in ssrHandled) ssrHandled[url](resp)
  else serveFile(url, resp)
}

function notifyOnStart() {
  console.log("Server started at http://localhost:" + port)
}
