module.exports = {'/message_board': serveMsgBoard}

const { readFile } = require('fs').promises


async function serveMsgBoard(resp) {
  resp.end(await readFile('public/message_board.html'))
}
