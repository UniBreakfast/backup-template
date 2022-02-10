getCalcHistory().then(renderRows)

averageForm.onsubmit = e => {
  e.preventDefault()
  const {action, method} = averageForm
  const data = Object.fromEntries(new FormData(averageForm))
  const body = JSON.stringify(data)
  fetch(action, {method, body})
    .then(resp => resp.json())
    .then(numObj => tableBody.prepend(renderRow(numObj)))
}

function getCalcHistory() {
  return fetch('/api/numbers').then(resp => resp.json())
}

function renderRows(calcHistory) {
  tableBody.append(...calcHistory.map(renderRow).reverse())
}

function renderRow({prevNum, lastNum, average}) {
  const tr = document.createElement('tr')
  tr.innerHTML = `
    <td><span>прошлое:</span> &nbsp; ${prevNum}</td>
    <td><span>очередное:</span> &nbsp; ${lastNum}</td>
    <td><span>среднее:</span> &nbsp; ${average}</td>
  `
  return tr
}
