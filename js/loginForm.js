const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");

var db_client = JSON.parse(localStorage.getItem("db_client"));
var db_provider = JSON.parse(localStorage.getItem("dbProvider"));

var usuarioLogado = {};

loginButton.addEventListener("click", (e) => {
  e.preventDefault();

  const username = loginForm.email.value;
  const password = loginForm.senha.value;
  
  var e = document.getElementById("tipo_de_usuario");
  var tipoUsuarioSelecionado = e.value;

  if (tipoUsuarioSelecionado === "cliente") {
    if (db_client != null) {
      for (var i = 0; i < db_client.length; i++) {
        var usuario = db_client[i];

        if(username === usuario.email.toString() && password === usuario.senha.toString()) {
          sessionStorage.setItem ('usuarioLogado', JSON.stringify(usuario));
          window.location.href = "meu-perfil-cliente.html";
        }
      }
    }
  } else if (tipoUsuarioSelecionado === "prestador_de_servicos") {
    if (db_provider != null) {
      for (var i = 0; i < db_provider.length; i++) {
        var usuario = db_provider[i];

        if(username === usuario.email.toString() && password === usuario.senha.toString()) {
          sessionStorage.setItem ('usuarioLogado', JSON.stringify(usuario));
          window.location.href = "perfil_prestador.html";
        }
      }
    }
  }
});