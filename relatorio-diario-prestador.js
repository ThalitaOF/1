var prestador_logado = JSON.parse(sessionStorage.getItem('usuarioLogado'))
var db_agendamento = JSON.parse(localStorage.getItem("dbAgendamento"))

const carregarTabela = () => {
    if (db_agendamento != null) {
        for (var i = 0; i < db_agendamento.length; i++) {
            let agendamento = db_agendamento[i]
            
            const newLine = document.createElement('tr')

            if (prestador_logado.email === agendamento.emailPrestador) {

                newLine.innerHTML = `
                    <td style="text-align: center;">${agendamento.nomeCliente}</td>
                    <td style="text-align: center;">${agendamento.emailCliente}</td>
                    <td style="text-align: center;">${agendamento.telefoneCliente}</td>
                    <td style="text-align: center;">${agendamento.data}</td>
                    <td style="text-align: center;">${agendamento.hora}</td>
                    <td style="text-align: center;">
                        <button type="button" onclick="alert("teste")">Teste</button>
                    </td>
                `
            }
            document.querySelector('#dados-agendamento>tbody').appendChild(newLine)   
        }
    }
}

window.addEventListener('load', function () {
    carregarTabela()
})


const apagarAgendamento = (index, nome) => {
    if (db_agendamento != null) {
        for (var i = 0; i < db_agendamento.length; i++) {
            let agendamento = db_agendamento[i]

            if(index === agendamento.index && nome === agendamento.nomeCliente) {
                db_agendamento.localStorage.removeItem(index)
            }
        }
    }
}


