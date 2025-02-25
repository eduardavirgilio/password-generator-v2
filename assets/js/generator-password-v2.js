// pegando os elementos do html

const sliderElement = document.querySelector ('.password-generator__slider') //controle deslizante
const buttonElement = document.querySelector ('.password-generator__button')//botao de gerar senha
const sizePassword = document.querySelector ('.password-generator__size')//tamanho
const password = document.querySelector ('.password-generator__output')//saida dele
const containerPassword = document.querySelector ('.password-generator__result') //resultado
const welcomeElement = document.querySelector ('.password-generator__welcome')//mensagem de bem vindo
const datatimeElement = document.querySelector ('.password-generator__datetime') //datetime

//objeto
//cada vez que sortear uma senha, entra no objeto, entra em determinada chave e sorteia um numero
const charsets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    special: '!@#%&*'
}

//armazena a senha atual gerada
let novaSenha = '';

//armazena o historico de senhas em um array (lista)
let historicoSenhas = [];

const getSaudacao = () => {
    const hora = new Date().getHours();
    if (hora >= 5 && hora < 12) return 'Bom dia';
    if (hora >= 12 && hora < 18) return 'Boa tarde';
    return 'Boa noite'
}

const formatarDataHora = () => {
    const agora = new Date(); //objeto com a data e hora atual
    const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

    //obtem e formata os componentes da data
    const dia = agora.getDate().toString().padStart(2, '0'); //dia do mes (01-31)
    const mes = (agora.getMonth() + 1).toString().padStart(2, '0'); //mes (01-12)
    const ano = agora.getFullYear(); // ano com 4 digitos
    const diaSemana = diasSemana[agora.getDay()]; // nome do dia da semana

    //obtem e formata os componentes do horario
    const hora = agora.getHours().toString().padStart(2, '0'); //hora (00-23)
    const minuto = agora.getMinutes().toString().padStart(2, '0'); //minuto (00-59)
    const segundo = agora.getSeconds().toString().padStart(2, '0'); //segundos (00-59)

    return `${diaSemana}, ${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;
}


//funcao que atualiza o header com a mensagem de bem vindo e a data
const atualizarHeader = () => {
    welcomeElement.textContent = `${getSaudacao()}!`;
    datatimeElement.textContent = formatarDataHora();
}

//atualiza header a cada segundo

setInterval(atualizarHeader, 1000);

atualizarHeader();

//exibe inicialmente o valor do slider
sizePassword.innerHTML = sliderElement.value;

//atualiza o valor exibido do tamanho da senha 
sliderElement.addEventListener('input', (e) => {
    sizePassword.innerHTML = e.target.value;
})

//funcao que gera uma senha aleatoria
const gerarSenha = () => {
    let selectedCharset = ''; //string que armazena o conjunto de caracteres

    //obter os checkboxes selecionados
    const uppercaseChecked = document.querySelector('.uppercase-check').checked; //verifica se ta checkado ou nao
    const lowercaseChecked = document.querySelector('.lowercase-check').checked;
    const numbersChecked = document.querySelector('.numbers-check').checked;
    const specialChecked = document.querySelector('.special-check').checked;

    //construir o charset baseado nas opcoes selecionados (se o primeiro for verdadeiro, ele vai descartar todas)
    if (uppercaseChecked) selectedCharset += charsets.uppercase;
    if (lowercaseChecked) selectedCharset += charsets.lowercase;
    if (numbersChecked) selectedCharset += charsets.numbers; 
    if (specialChecked) selectedCharset += charsets.special;

    //se nenhuma opcao estiver selecionada, selecionar todas 
    if (!selectedCharset){
        selectedCharset = Object.values(charsets).join('');
        document.querySelector('.uppercase-check').checked = true;
        document.querySelector('.lowercase-check').checked = true;
        document.querySelector('.numbers-check').checked = true;
        document.querySelector('.special-check').checked = true;
    }

    //inicializa uma string vazia para armazenar a senha gerada
    let pass = '';

    //loop que itera pelo numero de caracteres definido pelo slider

    for (let i = 0; i < sliderElement.value; ++i) {    
    //1. Math.random () gera um numero aleatorio entre 0 e 1
    //2. Multiplicado por o tamanho do charset para obter um numero valido
    //3. Math.floor () converte o numero em um inteiro
    //4. CharAt() retorna o caractere na posicao do indice calculado
    pass += selectedCharset.charAt(Math.floor(Math.random() * selectedCharset.length));
    }

    //remove a classe 'hide' para exibir o container da senha gerada
    containerPassword.classList.remove('hide');
    //insere a senha gerada no elemento html
    password.innerHTML = pass;
    //armazena a senha atual na variavel global
    novaSenha = pass;

    //o unshift tira e coloca o primeiro
    historicoSenhas.unshift(pass);

    if (historicoSenhas.length > 3) {
        historicoSenhas.pop(); //o pop tira o ultimo
    }

    const historico = document.querySelector('.password-generator__history');
        if (historico) {
        historico.style.display = 'block';
        historico.querySelector('.password-generator__history-list').innerHTML = historicoSenhas
        .map(senha => `<li class = "password-generator__history-item">${senha}</li>`)
        .join('');
    }
};

buttonElement.addEventListener('click', gerarSenha);