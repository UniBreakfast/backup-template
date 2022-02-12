const messages = require('./json/messages')
const { writeFile } = require('fs').promises

let id = Math.max(...messages.map(({ id }) => id)) + 1

module.exports = messages

messages.save =
  () => writeFile('json/messages.json', JSON.stringify(messages, null, 2))

messages.remove = id => {
  const i = messages.findIndex(msg => msg.id == id)
  if (~i) messages.splice(i, 1)
}

messages.add = message => {
  const datetime = JSON.parse(JSON.stringify(new Date))
  messages.push({ id: id++, ...message, datetime })
}
