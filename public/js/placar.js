$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

// Insere placar
function inserePlacar(){
  var corpoTabela = $(".placar").find("tbody");
  var usuario = "Douglas";
  var numPalavras = $("#contador-palavras").text();
  
  var linha = novaLinha(usuario,numPalavras);
  linha.find(".botao-remover").click(removeLinha)

   corpoTabela.prepend(linha);
   $(".placar").slideDown(500);
   scrollPlacar();
}

// Desce o scroll
function scrollPlacar() {
   var posicaoPlacar = $(".placar").offset().top;
   $("html, body").animate(
   {
       scrollTop: posicaoPlacar
   }, 1000);
}


// Cria nova linha html
function novaLinha(usuario,palavras) {
   var linha = $("<tr>");
   var colunaUsuario = $("<td>").text(usuario);
   var colunaPalavras = $("<td>").text(palavras);
   var colunaRemover = $("<td>");

   var link = $("<a>").addClass("botao-remover").attr("href", "#");
   var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");
 
   link.append(icone);
   colunaRemover.append(link);

   linha.append(colunaUsuario);
   linha.append(colunaPalavras);
   linha.append(colunaRemover);

   return linha;
}

// Remove a linha dos pontos 
function removeLinha(event){
   event.preventDefault();
   var linha = $(this).parent().parent()
   linha.fadeOut(1000);
   setTimeout(function(){
      linha.remove()
   }, 1000);
}

// mostra e esconde o placar
function mostraPlacar(){
   $(".placar").stop().slideToggle(800);
}


//sincroniza placar
function sincronizaPlacar(){
   var placar = [];
   var linhas = $("tbody>tr");
   //achar informação dentro do td
   linhas.each(function(){ 
      var usuario = $(this).find("td:nth-child(1)").text()
      var palavras = $(this).find("td:nth-child(2)").text()
      
      var score = {
         usuario: usuario,
         pontos: palavras
      }

      placar.push(score)
   });
   // envia dados para o servidor 
var dados = {
   placar: placar
};

$.post("http://localhost:3000/placar",dados,function(){
   console.log("salvou o placar no servidor")
})
}

function atualizaPlacar(){

   $.get("http://localhost:3000/placar",function(data){

      $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos);
            // remove uma linha do placar
            linha.find(".botao-remover").click(removeLinha);
            $("tbody").append(linha);
      });
   })
}