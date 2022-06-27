const getLocalStorage = () => JSON.parse(localStorage.getItem('dbProvider')) ?? []
const setLocalStorage = (dbProvider) => localStorage.setItem("dbProvider", JSON.stringify(dbProvider))
var dbProvider = JSON.parse(localStorage.getItem("dbProvider"));
const readProvider = () => getLocalStorage()

var dadosPrestador = {}


function atualizouSelect() {

    
    const select = document.querySelector('#filtro_cidade');
    const optionValue = select.options[select.selectedIndex];
    const cidade = optionValue.value;
    console.log(cidade)

    
    switch (cidade) {
        case "belohorizonte":
            alert("Cidade selecionada: Belo Horizonte")
            cidade1()
            break;
        case "diamantina":
            cidade2()
            alert("Cidade selecionada: Diamantina")
            break;
        case "ouropreto":
            alert("Cidade selecionada: Ouro Preto")
            cidade3()
            break;
        case "tiradentes":
            cidade4()
            alert("Cidade selecionada: Tiradentes")
            break;

    }
}



// FILTROS DAS CIDADES


function cidade1() {
    const createRow = (dbProvider) => {
        if (dbProvider.endereco === "belohorizonte") {
            const newRow = document.createElement('tr')
            newRow.innerHTML = `
        <td id="tdnome">${dbProvider.nomeEmpresa}</td>
        <td id="tdatividade">${dbProvider.atividade}</td>
        <td id="tdatividade">Belo Horizonte</td>
        <td id="tdatividade">${dbProvider.descricaoServico}</td>
        <td id="tdatividade">${dbProvider.telefone}</td>
        <td id="tdatividade">${dbProvider.email}</td>
        <td id="tdverperfil">
        <a><button class="profile" onclick="agendarHorarioPrestador(this)">Agendar</button></a>
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
        const db_Provider = readProvider()
        clearTable()
        db_Provider.forEach(createRow);
    }
    updateTable()

}

function cidade2() {
    const createRow = (dbProvider) => {
        if (dbProvider.endereco === "diamantina") {
            const newRow = document.createElement('tr')
            newRow.innerHTML = `
        <td id="tdnome">${dbProvider.nomeEmpresa}</td>
        <td id="tdatividade">${dbProvider.atividade}</td>
        <td id="tdatividade">Diamantina</td>
        <td id="tdatividade">${dbProvider.descricaoServico}</td>
        <td id="tdatividade">${dbProvider.telefone}</td>
        <td id="tdatividade">${dbProvider.email}</td>
        <td id="tdverperfil">
        <a><button class="profile" onclick="agendarHorarioPrestador(this)">Agendar</button></a>
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
        const db_Provider = readProvider()
        clearTable()
        db_Provider.forEach(createRow);
    }
    updateTable()
}

function cidade3() {
    const createRow = (dbProvider) => {
        if (dbProvider.endereco === "ouropreto") {
            const newRow = document.createElement('tr')
            newRow.innerHTML = `
        <td id="tdnome">${dbProvider.nomeEmpresa}</td>
        <td id="tdatividade">${dbProvider.atividade}</td>
        <td id="tdatividade">Ouro Preto</td>
        <td id="tdatividade">${dbProvider.descricaoServico}</td>
        <td id="tdatividade">${dbProvider.telefone}</td>
        <td id="tdatividade">${dbProvider.email}</td>
        <td id="tdverperfil">
        <a><button class="profile" onclick="agendarHorarioPrestador(this)">Agendar</button></a>
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
        const db_Provider = readProvider()
        clearTable()
        db_Provider.forEach(createRow);
    }
    updateTable()


}

function cidade4() {
    const createRow = (dbProvider) => {
        if (dbProvider.endereco === "tiradentes") {
            const newRow = document.createElement('tr')
            newRow.innerHTML = `
        <td id="tdnome">${dbProvider.nomeEmpresa}</td>
        <td id="tdatividade">${dbProvider.atividade}</td>
        <td id="tdatividade">Tiradentes</td>
        <td id="tdatividade">${dbProvider.descricaoServico}</td>
        <td id="tdatividade">${dbProvider.telefone}</td>
        <td id="tdatividade">${dbProvider.email}</td>
        <td id="tdverperfil">
        <a><button class="profile" onclick="agendarHorarioPrestador(this)">Agendar</button></a>
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
        const db_Provider = readProvider()
        clearTable()
        db_Provider.forEach(createRow);
    }
    updateTable()

}

const agendarHorarioPrestador = (botao) => {

    var dadosTabela = $(botao).closest("tr").find("td:not(:last-child)").map(function(){
        return $(this).text().trim();
     }).get();

     for (var i = 0; i < dbProvider.length; i++) {
        var prestador = dbProvider[i];
  
        if(dadosTabela[5] === prestador.email) {
            sessionStorage.setItem('dadosPrestador', JSON.stringify(prestador))
            window.location.href = "./crudAgendamento.html"
        }
    }  
}