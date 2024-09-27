//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

mensagemInicial();

function alteraTitulo (tag, texto) {
    let titulo = document.querySelector(tag);
    titulo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function verificarChute(){
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        alteraTitulo('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        alteraTitulo('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto){
            alteraTitulo('p', 'O número secreto é menor');
        }else {
            alteraTitulo('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let qtdElementosNaLIsta = listaNumerosSorteados.length;

    if (qtdElementosNaLIsta == numeroEscolhido){
        listaNumerosSorteados = []
    }

    if (listaNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function mensagemInicial(){
    alteraTitulo('h1', 'Jogo do número secreto');
    alteraTitulo('p', 'Escolha um número entre 1 e 10');
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    mensagemInicial();
    tentativas = 1;
    document.getElementById('reiniciar').setAttribute('disabled', true);
}