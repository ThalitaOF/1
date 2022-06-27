const getLocalStorage = () => JSON.parse(localStorage.getItem('dbAgendamento')) ?? []
const setLocalStorage = (dbAgendamento) => localStorage.setItem("dbAgendamento", JSON.stringify(dbAgendamento))

var prestador = JSON.parse(sessionStorage.getItem("usuarioLogado"));

var dbAgendamento = JSON.parse(localStorage.getItem("dbAgendamento"));
const readProvider = () => getLocalStorage()


const createRow = (dbAgendamento) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td id="tdnome">${dbAgendamento.nomeCliente}</td>
    <td id="tdatividade">${dbAgendamento.emailCliente}</td>
    <td id="tdatividade">${dbAgendamento.telefoneCliente}</td>
    <td id="tdatividade">${dbAgendamento.data}</td>
    <td id="tdatividade">${dbAgendamento.hora}</td>
    <td id="tdverperfil">
    <a><button data-toggle="modal" data-target="#modal-mensagem" class="profile">Cancelar</button></a>
    </td>
`
    document.querySelector('#tableProvider>tbody').appendChild(newRow)

}

const clearTable = () => {
    const rows = document.querySelectorAll('#tablesProvider>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const db_Provider = readProvider()
    clearTable()
    db_Provider.forEach(createRow);
}
updateTable()

