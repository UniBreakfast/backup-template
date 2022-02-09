module.exports = handleApi


const routes = {message, average, numbers}
const numHistory = []


function handleApi(method, endpoint, resp) {
  if (endpoint in routes) routes[endpoint](method, resp)
  else resp.end(tellAPImiss(endpoint))
}

function average(method, resp) {
  if (method != 'POST') {
    resp.end(tellErrors(`icorrect method ${method}, it should be POST`))
  }
  resp.end('{"prevNum": 10, "lastNum": 20, "average": 15}')
}

function numbers(method, resp) {
  if (method != 'GET') {
    resp.end(tellErrors(`icorrect method ${method}, it should be GET`))
  }
  resp.end('[{"prevNum": 10, "lastNum": 20, "average": 15}, {"prevNum": 10, "lastNum": 20, "average": 15}]')
}

function message(method, resp) {
  if (method != 'POST') {
    resp.end(tellErrors(`icorrect method ${method}, it should be POST`))
  }
  resp.end()
}


function tellAPImiss(endpoint) {
  return `
    <title>400 Bad request</title>
    <h1 style="padding:20px; color:#115; background:#aaf; font-family:sans-serif">
      <code>/api/${endpoint}</code> <br> Error 400: Bad request
    </h1>
  `
}

function tellErrors(...errors) {
  return JSON.stringify({errors})
}
