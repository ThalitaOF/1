"use strict";

const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_client")) ?? [];
const setLocalStorage = (dbClient) =>
  localStorage.setItem("db_client", JSON.stringify(dbClient));

// CRUD - create read

const readClient = () => getLocalStorage();

const createClient = (client) => {
  const dbClient = getLocalStorage();
  dbClient.push(client);
  setLocalStorage(dbClient);
};

const isValidFields = () => {
  return document.getElementById("form").reportValidity();
};

//Interação com o layout

const clearFields = () => {
  const fields = document.querySelectorAll("form");
  fields.forEach((field) => (field.value = ""));
  document.getElementById("nome").dataset.index = "new";
};

const saveClient = () => {
  if (isValidFields()) {
    const client = {
      nome: document.getElementById("nome").value,
      cpf: document.getElementById("cpf").value,
      telefone: document.getElementById("telefone").value,
      email: document.getElementById("email").value,
      senha: document.getElementById("senha").value,
    };
    const index = document.getElementById("nome").dataset.index;
    if (index == "new") {
      createClient(client);
      alert('Conta criada com sucesso!')
      updateTable();
    } else {
      updateClient(index, client);
      updateTable();
    }
  }
};

var list = document.getElementsByClassName("something");
for (var i = 0; i < list.length; i++) {
 list[i].setAttribute("id", + i);
}

const createRow = (client, index) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.cpf}</td>
        <td>${client.telefone}</td>
        <td>${client.email}</td>
        <td>${client.senha}</td>

        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `;
};

const clearTable = () => {
  const rows = document.querySelectorAll("#tableClient>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

const updateTable = () => {
  const dbClient = readClient();
  clearTable();
  dbClient.forEach(createRow);
};

const fillFields = (client) => {
  document.getElementById("nome").value = client.nome;
  document.getElementById("cpf").value = client.cpf;
  document.getElementById("telefone").value = client.telefone;
  document.getElementById("email").value = client.email;
  document.getElementById("senha").value = client.senha;
  document.getElementById("nome").dataset.index = client.index;
};

const editClient = (index) => {
  const client = readClient()[index];
  client.index = index;
  fillFields(client);
};

const editDelete = (event) => {
  if (event.target.type == "button") {
    const [action, index] = event.target.id.split("-");

    if (action == "edit") {
      editClient(index);
    } else {
      const client = readClient()[index];
      const response = confirm(
        `Deseja realmente excluir o cliente ${client.nome}`
      );
      if (response) {
        deleteClient(index);
        updateTable();
      }
    }
  }
};

updateTable();

// Eventos

document.getElementById("salvar").addEventListener("click", saveClient);

// Validação

const senha = document.getElementById("senha");
const senha1 = document.getElementById("confirmacao");

senha.addEventListener("input", function () {
  validate(senha);
});
senha1.addEventListener("input", function () {
  validate(senha1);
});

function validate(item) {
  item.setCustomValidity("");
  item.checkValidity();

  if (item == senha1) {
    if (item.value === senha.value) item.setCustomValidity("");
    else item.setCustomValidity("Senhas diferentes, vefique.");
  }
}
