'use strict'
const providerName = document.getElementById("provider_name");
var db_client = JSON.parse(sessionStorage.getItem("usuarioLogado"));
providerName.append(db_client.nome);

var prestador_logado = JSON.parse(sessionStorage.getItem('usuarioLogado'))
var db_agendamento = JSON.parse(localStorage.getItem("dbAgendamento"))

const openModal = () => {
    document.getElementById('modal')
        .classList.add('active')
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

/*const saveAgendamento = () => {
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
}*/
var list = document.getElementsByClassName("something");
for (var i = 0; i < list.length; i++) {
    list[i].setAttribute("id", + i);
}

//Adcionar linha na tabela
const createRow = (agendamento, index) => {

    const newLine = document.createElement('tr')
    const dataAtual = new Date(Date.now())

    if (prestador_logado.email === agendamento.emailPrestador && dataAtual.toLocaleDateString() === formatDate(agendamento.data)) {
        newLine.innerHTML = `
                    <td style="text-align: center;">${agendamento.nomeCliente}</td>
                    <td style="text-align: center;">${agendamento.emailCliente}</td>
                    <td style="text-align: center;">${agendamento.telefoneCliente}</td>
                    <td style="text-align: center;">${formatDate(agendamento.data)}</td>
                    <td style="text-align: center;">${agendamento.hora}</td>
                    <td style="text-align: center;">
                        <button type="button" class="button red" id="delete-${index}">Cancelar</button>
                    </td>
                `
    }

    document.querySelector('#dados-agendamento>tbody').appendChild(newLine)
}

function formatDate(dateString) {
        var allDate = dateString.split(' ');
        var thisDate = allDate[0].split('-');
        var newDate = [thisDate[2],thisDate[1],thisDate[0] ].join("/");

        return newDate;
}

const clearTable = () => {
    const rows = document.querySelectorAll('#dados-agendamento>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbAgendamento = readAgendamento()
    clearTable()
    dbAgendamento.forEach(createRow)
}

const fillFields = (agendamento) => {
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
            const response = confirm(`Deseja realmente cancelar o agendamento ${provider.nomeCliente}, na data de ${provider.data} as ${provider.hora}?`)
            if (response) {
                deleteAgendamento(index)
                updateTable()
            }

        }

    }
}

updateTable()

//Events
/*document.getElementById('novoAgendamento')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveAgendamento, closeModal)*/

document.querySelector('#dados-agendamento>tbody')
    .addEventListener('click', editDelete)
/*
document.getElementById('cancelar')
    .addEventListener('click', closeModal)*/