addMsgForm.onsubmit = e => {
  e.preventDefault()
  const { action, method } = addMsgForm
  const data = Object.fromEntries(new FormData(addMsgForm))
  const body = JSON.stringify(data)
  fetch(action, { method, body }).then(resp => {
    if (resp.ok) location.reload()
  })
}
