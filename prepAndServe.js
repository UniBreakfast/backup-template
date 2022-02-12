module.exports = {'/message_board': serveMsgBoard}

const { readFile } = require('fs').promises
const messages = require('./messages')


async function serveMsgBoard(resp) {
  readFile('public/message_board.html', 'utf8')
    .then(renderMessages).then(html => resp.end(html))
}

function renderMessages(html) {
  return html.replace('{{MESSAGES}}', messages.map(renderMessage)
    .reverse().join(''))
}

function renderMessage(message) {
  const {id, text, author, datetime} = message
  return `
    <li class="message" style="background: ${genColor(author)}">
      <p>${text}</p>
      <div class="info-row">
        <h5>${author}</h5>
        <h6>${format(datetime)}</h6>
      </div>
      <button class="cross" data-id="${id}">&times;</button>
    </li>
  `
}

function format(datetime) {
  return datetime.replace('T', ' ').slice(0, -8)
}

function genColor(str) {
  if (genColor.cache[str]) return genColor.cache[str]

  const hue = [...str].map(char => char.charCodeAt())
    .reduce((a, b) => a + b, 0)
  return genColor.cache[str] = `hsl(${hue/2}, 75%, 91%)`
}
genColor.cache = {}
