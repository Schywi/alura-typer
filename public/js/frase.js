$("#botao-frase").click( fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

// troca a frase exibida pela salva no banco de dados, e informa caso aja erro
 function fraseAleatoria(){
    $("#spinner").toggle();

    $.get("http://localhost:3000/frases", trocaFraseAleatoria )
    .fail(function(){
      $("#erro").toggle();
      setTimeout(function(){
        $("#erro").toggle();
      }, 2000);
    })

    .always(function(){
      $("#spinner").toggle();
    });
}

//Troca a frase aleatoriamente.
function trocaFraseAleatoria(data){
  var frase = $(".frase");
  var numeroAleatorio = Math.floor(Math.random() * data.length);

  frase.text(data[numeroAleatorio].texto);
  atualizaTamanhoFrase();
  atualizaTempoInicial(data[numeroAleatorio].tempo);
}

// BUSCAR frase no banco de dados/servidor
function buscaFrase(){
  $("#spinner").toggle();
  var fraseId = $("#frase-id").val();
  var dados = {id: fraseId};
  
  $.get("http://localhost:3000/frases", dados, trocaFrase)
  .fail(function(){
    $("#erro").toggle();
    setTimeout(function(){
      $("#erro").toggle();
    }, 2000);
  })
  .always(function(){
      $("#spinner").toggle();
  })
}

// Para trocar a frase 
function trocaFrase(data) {
  var frase = $(".frase");
  frase.text(data.texto);
  atualizaTamanhoFrase();
  atualizaTempoInicial(data.tempo);
}

