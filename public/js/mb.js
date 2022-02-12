addMsgForm.onsubmit = e => {
  e.preventDefault()
  const { action, method } = addMsgForm
  const data = Object.fromEntries(new FormData(addMsgForm))
  const body = JSON.stringify(data)
  fetch(action, { method, body }).then(resp => {
    if (resp.ok) location.reload()
  })
}

messages.onclick = e => {
  const { id } = e.target.dataset
  if (!id) return
  const { action } = addMsgForm
  const method = 'DELETE'
  const body = JSON.stringify({id})

  fetch(action, { method, body }).then(resp => {
    if (resp.ok) location.reload()
  })
}
