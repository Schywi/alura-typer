var campo = $(".campo-digitacao");
var tempoInicial = $("#tempo-digitacao").text();

$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
    atualizaPlacar();
});

// atualiza tempo aleatorio
function atualizaTempoInicial(tempo){
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}




// Pegando textos da DOM 
function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

// Adicionando quantidade de caracteres e palavras ao contador
function inicializaContadores() {
    campo.on("input", function() {
        var conteudo = campo.val();

        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);

         // qtdd contadores
        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}

function inicializaCronometro() {
    //Tempo restante
    campo.one("focus", function() {
        var tempoRestante = $("#tempo-digitacao").text();
        var cronometroID = setInterval(function() {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);

            //valida tempo negativo
            if (tempoRestante < 1) {
                clearInterval(cronometroID);
                finalizaJogo()
            }
        }, 1000);
    });
}


function inicializaMarcadores(){
    // Compara textos
    
    campo.on("input", function(){
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0,digitado.length);
        if(digitado == comparavel) {
            campo.addClass("borda-verde")
            campo.removeClass("borda-vermelha")
        }else{
            campo.addClass("borda-vermelha")
            campo.removeClass("borda-verde")
        }
    })
}

// Comandos executados ao finalizar o jogo
function finalizaJogo() {
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado")
    inserePlacar();
}


//reiniciando jogo
function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);

    inicializaCronometro();
    //remover cinza dps que reiniciar
    campo.toggleClass("campo-desativado")
    
    //remove classes da caixa ao reiniciar
    campo.remove("borda-vermelha");
    campo.remove("borda-verde");

};

