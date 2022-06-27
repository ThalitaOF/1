'use strict'

const getLocalStorage = () => JSON.parse(localStorage.getItem('dbProvider')) ?? []
const setLocalStorage = (dbProvider) => localStorage.setItem("dbProvider", JSON.stringify(dbProvider))


//DELETE
const deleteProvider = (index) => {
    const dbProvider = readProvider()
    dbProvider.splice(index, 1)
    setLocalStorage(dbProvider)
}

//UPDATE
const updateProvider = (index, provider) => {
    const dbProvider = readProvider()
    dbProvider[index] = provider
    setLocalStorage(dbProvider)
}

//READ
const readProvider = () => getLocalStorage()

//CREATE
const createProvider = (provider) => {
    const dbProvider = getLocalStorage()
    dbProvider.push(provider)
    setLocalStorage(dbProvider)
}

const isValidField = () => {
    return document.getElementById('form').reportValidity()

}

//Interação Layout

const clearFields = () => {
    const fields = document.querySelectorAll('form')
    fields.forEach(field => field.value = "")
    document.getElementById('nome').dataset.index = 'new'
}


const saveProvider = () => {

    if (isValidField()) {

        const provider = {
            nome: document.getElementById("nome").value,
            nomeEmpresa: document.getElementById("nomeEmpresa").value,
            cpfOuCnpj: document.getElementById("cpfcnpj").value,
            telefone: document.getElementById("telefone").value,
            email: document.getElementById("email").value,
            endereco: document.getElementById("cidade").value,
            atividade: document.getElementById("atividade").value,
            descricaoServico: document.getElementById("descricaoServico").value,
            email: document.getElementById("email").value,
            senha: document.getElementById("senha").value
            
        }

        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            createProvider(provider)
            alert('Conta criada com sucesso!')
            updateTable()

        } else {
            updateProvider(index, provider)
            // updateTable()

        }

    }
}
var list = document.getElementsByClassName("something");
for (var i = 0; i < list.length; i++) {
 list[i].setAttribute("id", + i);
}
//Adcionar linha na tabela
// const createRow = (provider, index) => {
//     const newRow = document.createElement('tr')
//     newRow.innerHTML = `
//     <td>${provider.nome}</td>
//     <td>${provider.nomeEmpresa}</td>
//     <td>${provider.cpf}</td>
//     <td>${provider.telefone}</td>
//     <td>${provider.email}</td>
//     <td>${provider.endereco}</td>
//     <td>${provider.atividade}</td>
//     <td>${provider.descricaoServico}</td>
//     <td>
//        <a button  href="./pag2CadastroProvider.html" id="avancar-${index}">Avançar</button></a>
//     </td>
//     `


//      document.querySelector('#tableProvider>tbody').appendChild(newRow)
// }


// const clearTable = () => {
//     const rows = document.querySelectorAll('#tableProvider>tbody tr')
//     rows.forEach(row => row.parentNode.removeChild(row))
// }

// const updateTable = () => {
//     const dbProvider = readProvider()
//     clearTable()
//     dbProvider.forEach(createRow)
// }

//  const fillFields = (provider) => {
//     document.getElementById('nome').value = provider.nome
//     document.getElementById('nomeEmpresa').value = provider.nomeEmpresa
//     document.getElementById('cpfOuCnpj').value = provider.cpfOuCnpj
//     document.getElementById('telefone').value = provider.telefone
//     document.getElementById('email').value = provider.email
//      document.getElementById('endereco').value = provider.endereco
//      document.getElementById('atividade').value = provider.atividade
//      document.getElementById('descricaoServico').value = provider.descricaoServico

//     document.getElementById('nome').dataset.index = provider.index
// }

const editProvider = (index) => {
    const provider = readProvider()[index]
    provider.index = index
    fillFields(provider)

}

//identificar botão delete ou excluir
const editDelete = (event) => {
    if (event.target.type == 'button') {
        const [action, index] = event.target.id.split('-')
        if (action == 'edit') {
            editProvider(index)
        }
        else {
            const provider = readProvider()[index]
            const response = confirm(`Deseja realmente excluir o prestador ${provider.nome}`)
            if (response) {
                deleteProvider(index)
                updateTable()
            }

        }

    }
}

// updateTable()

//Events



document.getElementById('salvar')
    .addEventListener('click', saveProvider)
    

// document.getElementById('salvar')

//     .addEventListener('click', saveProvider)

// document.querySelector('#tableProvider>tbody')
//     .addEventListener('click', editDelete)    

 // Validação

// const senha = document.getElementById('senha')
// const senha1 = document.getElementById('senha1');

// senha.addEventListener('input', function() { validate(senha)});
// senha1.addEventListener('input', function() { validate(senha1)});

// function validate(item) {
//     item.setCustomValidity('');
//     item.checkValidity();

//     if (item == senha1) {
//         if(item.value === senha.value) item.setCustomValidity('');
//         else item.setCustomValidity('Senhas diferentes, verifique.');
//     }

// }   

const senha = document.getElementById('senha')
const senha1 = document.getElementById('senha1');

senha.addEventListener('input', function () { validate(senha) });
senha1.addEventListener('input', function () { validate(senha1) });

function validate(item) {
    item.setCustomValidity('');
    item.checkValidity();

    if (item == senha1) {
        if (item.value === senha.value) item.setCustomValidity('');
        else item.setCustomValidity('Senhas diferentes, verifique.');
    }

}   

