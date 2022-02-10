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
  const {text, author, datetime} = message
  return `
    <li class="message">
      <p>${text}</p>
      <div class="info-row">
        <h5>${author}</h5>
        <h6>${format(datetime)}</h6>
      </div>
    </li>
  `
}

function format(datetime) {
  return datetime.replace('T', ' ').slice(0, -8)
}
'2022-02-09 11:50'
