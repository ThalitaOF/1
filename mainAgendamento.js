'use strict'

var dados_cliente = JSON.parse(sessionStorage.getItem('usuarioLogado'))
var dados_prestador = JSON.parse(sessionStorage.getItem('dadosPrestador'))

var num = 0

console.log(dados_cliente)

const openModal = () => {
    document.getElementById('modal')
        .classList.add('active')

    num+=1
    document.getElementById("id-agendamento").value = num 

    var sectionCliente = document.getElementById("dadosCliente")
    sectionCliente.innerHTML = `
    <div>
        <h2>Cliente</h2>
        <hr style="border: 0; border-top: 0.5px solid #36B2EB;">

        <table class="table table-hover" style="width: 100%; margin-top:16px">
            <thead>
                <tr>
                <th scope="col">Nome</th>
                <th scope="col">Telefone</th>
                <th scope="col">E-mail</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td style="text-align: center;">${dados_cliente.nome}</td>
                <td style="text-align: center;">${dados_cliente.telefone}</td>
                <td style="text-align: center;">${dados_cliente.email}</td>
                </tr>
            </tbody>
        </table>
    </div>
    `

    var sectionCliente = document.getElementById("dadosPrestador")
    sectionCliente.innerHTML = `
    <div>
        <h2 style="margin-top:16px">Prestador</h2>
        <hr style="border: 0; border-top: 0.5px solid #36B2EB;">

        <table class="table table-hover" style="width: 100%; margin-top:16px">
            <thead>
                <tr>
                <th scope="col">Nome</th>
                <th scope="col">Atividade</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td style="text-align: center;">${dados_prestador.nomeEmpresa}</td>
                <td style="text-align: center;">${dados_prestador.atividade}</td>
                </tr>
            </tbody>
        </table>
    </div>
    `
}

const closeModal = () => {
    // clearFields()
    document.getElementById('modal')
        .classList.remove('active')
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('dbAgendamento')) ?? []
const setLocalStorage = (dbAgendamento) => localStorage.setItem("dbAgendamento", JSON.stringify(dbAgendamento))



//DELETE
const deleteAgendamento = (index) => {
    const dbAgendamento = readAgendamento()
    dbAgendamento.splice(index, 1)
    setLocalStorage(dbAgendamento)
}

//UPDATE
const updateAgendamento = (index, agendamento) => {
    const dbAgendamento = readAgendamento()
    dbAgendamento[index] = agendamento
    setLocalStorage(dbAgendamento)
}

const concatDados = () => {
    var arr = new Array();

    arr.push(dados_cliente);
    arr.push(dados_prestador);

    return arr;
}

//READ
const readAgendamento = () => getLocalStorage()

//CREATE
const createAgendamento = (agendamento) => {


    const dbAgendamento = getLocalStorage()
    dbAgendamento.push(agendamento)
    setLocalStorage(dbAgendamento)
}

const isValidField = () => {
    return document.getElementById("form").reportValidity()
}

//Interação Layout


const saveAgendamento = () => {
    if (isValidField()) {
        const agendamento = {
            index: document.getElementById("id-agendamento").value,
            nomeCliente: dados_cliente.nome,
            telefoneCliente: dados_cliente.telefone,
            emailCliente: dados_cliente.email,
            data: document.getElementById("data").value,
            hora: document.getElementById("hora").value,
            nomePrestador: dados_prestador.nomeEmpresa,
            atividadePrestador: dados_prestador.atividade,
            telefonePrestador: dados_prestador.telefone,
            emailPrestador: dados_prestador.email,
        }

        const index = document.getElementById('id-agendamento').dataset.index

        if (index == 'new') {
            createAgendamento(agendamento)
            updateTable()
            closeModal()
        } else {
            updateAgendamento(index, agendamento)
            updateTable()
            closeModal()
        }

    }
}
var list = document.getElementsByClassName("something");
for (var i = 0; i < list.length; i++) {
    list[i].setAttribute("id", + i);
}

//Adcionar linha na tabela
const createRow = (agendamento, index) => {
    if (agendamento.emailCliente === dados_cliente.email) {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${agendamento.nomePrestador}</td>
    <td>${agendamento.telefonePrestador}</td>
    <td>${agendamento.emailPrestador}</td>
    <td>${agendamento.data}</td>
    <td>${agendamento.hora}</td> 
    <td>${agendamento.atividadePrestador}</td> 
    
    

    <td>
        <button type="button" class="button green" id="edit-${index}">Editar</button>
        <button type="button" class="button red" id="delete-${index}">Excluir</button>
    </td>
    `


    document.querySelector('#tableProvider>tbody').appendChild(newRow)
}
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableProvider>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbAgendamento = readAgendamento()
    clearTable()
    dbAgendamento.forEach(createRow)
}

const fillFields = (agendamento) => {

    //document.getElementById('nome').value = agendamento.nomeCliente
    //document.getElementById('telefone').value = agendamento.telefoneCliente
    //document.getElementById('email').value = agendamento.emailCliente
    document.getElementById('data').value = agendamento.data
    document.getElementById('hora').value = agendamento.hora

    document.getElementById('id-agendamento').dataset.index = agendamento.index
}

const editAgendamento = (index) => {
    const agendamento = readAgendamento()[index]
    agendamento.index = index
    fillFields(agendamento)
    openModal()
}

//identificar botão delete ou excluir
const editDelete = (event) => {
    if (event.target.type == 'button') {
        const [action, index] = event.target.id.split('-')
        if (action == 'edit') {
            editAgendamento(index)
        }
        else {
            const provider = readAgendamento()[index]
            const response = confirm(`Deseja realmente excluir o agendamento ${provider.nome}, na data de ${provider.data} as ${provider.hora}?`)
            if (response) {
                deleteAgendamento(index)
                updateTable()
            }

        }

    }
}

updateTable()

//Events
document.getElementById('novoAgendamento')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveAgendamento, closeModal)

document.querySelector('#tableProvider>tbody')
    .addEventListener('click', editDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)