const messages = require('./json/messages')
const { writeFile } = require('fs').promises

module.exports = messages

messages.save =
  () => writeFile('json/messages.json', JSON.stringify(messages, null, 2))
