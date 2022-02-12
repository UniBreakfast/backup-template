module.exports = handleApi


const routes = { message, average, numbers }
const messages = require('./messages')
const numHistory = []


function handleApi(endpoint, req, resp) {
  if (endpoint in routes) routes[endpoint](req, resp)
  else resp.end(tellAPImiss(endpoint))
}

function average(req, resp) {
  if (req.method != 'POST') {
    resp.end(tellErrors(`icorrect method ${method}, it should be POST`))
  }

  getBody(req).then(JSON.parse)
    .then(({ number, negative, float }) => {
      let lastNum = Math.abs(number)
      if (negative) lastNum = -lastNum
      if (!float) lastNum = Math.trunc(lastNum)

      const prevNum = numHistory.at(-1)?.lastNum ?? 0
      const average = (prevNum + lastNum) / 2
      const numObj = { prevNum, lastNum, average }

      numHistory.push(numObj)

      resp.end(JSON.stringify(numObj))
    })
}

function numbers(req, resp) {
  if (req.method != 'GET') {
    resp.end(tellErrors(`icorrect method ${method}, it should be GET`))
  }
  resp.end(JSON.stringify(numHistory))
}

function message(req, resp) {
  if (req.method == 'POST') {
    getBody(req).then(JSON.parse)
    .then(({text, author}) => {
      messages.add({text, author})
      return messages.save()
    })
    .then(() => resp.end())

  } else if (req.method == 'DELETE') {
    getBody(req).then(JSON.parse)
    .then(({id}) => {
      messages.remove(id)
      return messages.save()
    })
    .then(() => resp.end())

  } else {
    resp.end(tellErrors(`icorrect method ${method}, it should be POST or DELETE`))

  }
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
  return JSON.stringify({ errors })
}

async function getBody(stream) {
  chunks = []
  for await (const chunk of stream) chunks.push(chunk)
  return Buffer.concat(chunks).toString()
}
