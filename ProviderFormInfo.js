const providerName = document.getElementById("provider_name");
var db_client = JSON.parse(sessionStorage.getItem("usuarioLogado"));
providerName.append(db_client.nome);
const saveModification = document.getElementById("salvar-alteracoes");

const getSessionStorage = () =>
  JSON.parse(sessionStorage.getItem("usuarioLogado"));
const setSessionStorage = (dbProvider) => {
  sessionStorage.setItem("usuarioLogado", JSON.stringify(dbProvider));
};

const readProvider = () => getSessionStorage();

const updateProvider = (provider) => {
  let dbProvider = readProvider();
  dbProvider = provider;
  setSessionStorage(dbProvider);
};

const getInfoClient = () => {
  const dbProvider = readProvider();
  fillFields(dbProvider);
};

const fillFields = (provider) => {
  document.getElementById("formNome").value = provider.nome;
  document.getElementById("formEmpresa").value = provider.nomeEmpresa;
  document.getElementById("formCNPJ").value = provider.cpfOuCnpj;
  document.getElementById("f").value = provider.telefone;
  document.getElementById("email").value = provider.email;
  document.getElementById("senha").value = provider.senha;
};

saveModification.addEventListener("click", (e) => {
  e.preventDefault();
  const provider = {
    nome: document.getElementById("formNome").value,
    nomeEmpresa: document.getElementById("formEmpresa").value,
    cpfOuCnpj: document.getElementById("formCNPJ").value,
    telefone: document.getElementById("f").value,
    email: document.getElementById("email").value,
    senha: document.getElementById("senha").value,
  };
  if (
    document.getElementById("senha").value !==
    document.getElementById("senha2").value
  ) {
    alert("As senhas não coincidem");
  } else {
    updateProvider(provider);
    alert("Alterações realizadas com sucesso!");
    window.location.reload();
  }
});
getInfoClient();
