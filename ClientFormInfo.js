const clientName = document.getElementById("client_name");
var db_client = JSON.parse(sessionStorage.getItem("usuarioLogado"));
clientName.append(db_client.nome);
const saveModification = document.getElementById("salvar-alteracoes");

const getSessionStorage = () =>
  JSON.parse(sessionStorage.getItem("usuarioLogado"));
const setSessionStorage = (dbClient) => {
  sessionStorage.setItem("usuarioLogado", JSON.stringify(dbClient));
};

const readClient = () => getSessionStorage();

const updateClient = (client) => {
  let dbClient = readClient();
  dbClient = client;
  setSessionStorage(dbClient);
};

const getInfoClient = () => {
  const dbClient = readClient();
  fillFields(dbClient);
};

const fillFields = (client) => {
  document.getElementById("nome").value = client.nome;
  document.getElementById("cpf").value = client.cpf;
  document.getElementById("telefone").value = client.telefone;
  document.getElementById("email").value = client.email;
  document.getElementById("password").value = client.password;
};

saveModification.addEventListener("click", (e) => {
  const client = {
    nome: document.getElementById("nome").value,
    cpf: document.getElementById("cpf").value,
    telefone: document.getElementById("telefone").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  if (
    document.getElementById("password").value !==
    document.getElementById("password2").value
  ) {
    alert("As senhas não coincidem");
  } else {
    e.preventDefault();
    updateClient(client);
    alert("Alterações realizadas com sucesso!");
    window.location.reload();
  }
});
getInfoClient();
