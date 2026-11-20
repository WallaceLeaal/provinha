// JavaScript do cliente - Prova Pratica Individual de DW2.
//
// Este arquivo e carregado em todas as paginas, pela base. Por isso o
// codigo confere se os elementos existem antes de usa-los.

var lista = document.getElementById("lista");
var botaoAtualizar = document.getElementById("atualizar");


// Escreve uma mensagem na tela, sem recarregar a pagina.
function mostrarAviso(texto) {
  var aviso = document.getElementById("aviso-js");

  if (aviso) {
    aviso.textContent = texto;
  }
}


// Esvazia a lista e a redesenha com os dados recebidos.
// "dados" e um array de objetos, como o que a API devolve.
function desenharLista(dados) {
  lista.innerHTML = "";

  for (var i = 0; i < dados.length; i = i + 1) {
    var item = document.createElement("li");
    var oficina = dados[i];
    var titulo = document.createElement("strong");
    titulo.textContent = oficina.titulo;

    var editar = document.createElement("a");
    editar.href = "/editar/" + oficina.id;
    editar.textContent = "editar";

    var formExcluir = document.createElement("form");
    formExcluir.method = "post";
    formExcluir.action = "/excluir/" + oficina.id;
    var excluir = document.createElement("button");
    excluir.type = "submit";
    excluir.textContent = "excluir";
    formExcluir.appendChild(excluir);

    item.append(titulo, " — " + (oficina.instrutor || "") +
      " — " + (oficina.vagas ?? "") + " ", editar, formExcluir);
    lista.appendChild(item);
  }

  var resumo = document.getElementById("resumo-oficinas");
  if (resumo) {
    resumo.textContent = dados.length
      ? dados.length + " registro(s)."
      : "Nenhuma oficina cadastrada.";
  }

  mostrarAviso(dados.length + " registro(s) lido(s) sem recarregar a página.");
}


if (botaoAtualizar && lista) {

  botaoAtualizar.addEventListener("click", function () {

    // ===== ITEM 8 ===================================================
    // Ao clicar no botao, peca a lista a API, no endereco
    // /api/oficinas, e redesenhe a lista da pagina com o que chegar,
    // SEM recarregar. Use as funcoes que ja existem neste arquivo.
    // Se nao for possivel falar com o servidor, avise na tela.
    // ================================================================

    fetch("/api/oficinas")
      .then(function (resposta) {
        if (!resposta.ok) {
          throw new Error("Falha na consulta.");
        }
        return resposta.json();
      })
      .then(desenharLista)
      .catch(function () {
        mostrarAviso("Não foi possível atualizar a lista de oficinas.");
      });
  });

}
