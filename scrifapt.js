//======================================
// Detecta se o foco veio da tecla TAB
//======================================

let tabPressionado = false;

document.addEventListener("keydown", function(event){

    if(event.key === "Tab"){

        tabPressionado = true;

    }

});

//======================================
// Fala o elemento focado
//======================================

document.addEventListener("focusin", function(event){

    if(!tabPressionado) return;

    tabPressionado = false;

    speechSynthesis.cancel();

    let elemento = event.target;
    const tabIndexAtual = document.activeElement.tabIndex;

    let texto = "";

    switch(elemento.tagName){

        case "H1":
        case "H2":
        case "H3":

            texto = "Título. " + elemento.innerText;
            break;

        case "P":

            texto = "Texto. " + elemento.innerText;
            break;

        case "FOOTER":

            texto = "Rodapé da página. " + elemento.innerText;
            break;

        case "FIGCAPTION":

            texto = "Texto da imagem. " + elemento.innerText;
            break;

        case "IMG":

            texto = "Imagem";
            break;

        case "BUTTON":

            texto = "Botão. " + elemento.innerText;
            break;

        case "DIV":

            if (tabIndexAtual == "23"){
               texto = "Leitor de Libras. ";
               break;
            }

        case "A":

            texto = "Link. " + elemento.innerText;
            break;

        case "INPUT":

            let label = document.querySelector(
                "label[for='" + elemento.id + "']"
            );

            if (label) {
                texto = "Campo " + label.innerText;
            } else {
                texto = "Campo de texto";
            }

            break;

    }

    if(texto !== ""){

        let fala = new SpeechSynthesisUtterance(texto);

        fala.lang = "pt-BR";
        fala.rate = 1;
        fala.pitch = 1;

        speechSynthesis.speak(fala);

    }

});

/* ==========================================
   AUMENTAR O TAMANHO DA FONTE
   ========================================== */

// Define o tamanho inicial da fonte em 18 pixels.
let tamanho = 18;

// Obtém o botão "A+" e executa a função quando ele for clicado.
document.getElementById("fonteMais").onclick = function () {

    // Aumenta o tamanho da fonte em 2 pixels.
    tamanho += 2;

    // Aplica o novo tamanho da fonte ao corpo da página.
    document.body.style.fontSize = tamanho + "px";

};


/* ==========================================
   DIMINUIR O TAMANHO DA FONTE
   ========================================== */

// Obtém o botão "A-" e executa a função quando ele for clicado.
document.getElementById("fonteMenos").onclick = function () {

    // Diminui o tamanho da fonte em 2 pixels.
    tamanho -= 2;

    // Atualiza o tamanho da fonte em toda a página.
    document.body.style.fontSize = tamanho + "px";

};


/* ==========================================
   ATIVAR/DESATIVAR O ALTO CONTRASTE
   ========================================== */

// Obtém o botão "Alto Contraste".
document.getElementById("contraste").onclick = function () {

    // Adiciona ou remove a classe "altoContraste"
    // sempre que o botão for pressionado.
    document.body.classList.toggle("altoContraste");
};


/* ==========================================
   ATIVAR/DESATIVAR O MODO ESCURO
   ========================================== */

// Obtém o botão "Modo Escuro".
document.getElementById("escuro").onclick = function () {

    // Adiciona ou remove a classe "dark",
    // alterando as cores da página.
    document.body.classList.toggle("dark");
};

/* ==========================================
   LEITURA COMPLETA DA PÁGINA
   ========================================== */

// Função para ler toda a página
function lerPagina() {

    // Interrompe qualquer leitura anterior
    speechSynthesis.cancel();

    // Seleciona os elementos que normalmente contêm texto
    const elementos = document.querySelectorAll(
        "h1, h2, h3, h4, h5, h6, p, footer, button, div"
    );

    let textoCompleto = "";
    let tipo = "";

    // Junta todos os textos em uma única string
    elementos.forEach(function(elemento){

        let texto = elemento.innerText.trim();

        switch(elemento.tagName){

            case "H1":
                tipo = "Título principal ";
                break;

            case "H2":
                tipo = "Título ";
                break;

            case "P":
                tipo = "Parágrafo ";
                break;

            case "BUTTON":
                tipo = "Botão ";
                break;

            case "FOOTER":

                tipo = "Rodapé da página ";
                break;

            case "DIV":

               if (elemento.className == "Libras"){
                  tipo = "Elemento ";
                  texto = "Leitor de Libras ";
               }

               break;

            default:
                tipo = "Elemento ";
        }

        if(texto !== ""){
            textoCompleto += tipo + texto + ". ";
        }

    });

    // Cria o objeto de fala
    const fala = new SpeechSynthesisUtterance(textoCompleto);

    fala.lang = "pt-BR";
    fala.rate = 1;     // velocidade
    fala.pitch = 1;    // tom
    fala.volume = 1;   // volume

    // Inicia a leitura
    speechSynthesis.speak(fala);
}

// Para interromper a leitura
function pararLeitura(){
    speechSynthesis.cancel();
}

// Função JavaScript que recebe a URL e altera o src da imagem
function trocarImagem(escolha) {
    if (event.type === 'click' || event.key === 'Enter') {
    const imagemnova=document.getElementById('imagemPrincipal');
    switch(escolha){
        case "1":
          urlNova = 'heliocentrico.webp';
          textoprincipal.innerText="Oque são modelos cosmológicos?";
          texto.innerText="Modelos cosmológicos são descrições matemáticas e teóricas que explicam a origem, a estrutura, a evolução e o destino do universo. Eles funcionam como mapas em grande escala baseados em leis físicas, como a Teoria da Relatividade Geral de Einstein, para entender o comportamento do cosmos desde o Big Bang.";
          descrevefigura.innerText="Imagem do modelo héliocentrico ";
          break;
        case "2":
          urlNova = 'claudio-ptolomeu.webp';
          textoprincipal.innerText="Sobre o Cláudio Ptolomeu ";
          texto.innerText="Ptolomeu se propôs a aperfeiçoar as teorias de Hiparco de Niceia, matemático e astrônomo grego que viveu durante o século II a. C. Durante anos de observações, cálculos e estudos, escreveu os 13 volumes da obra mestra da astronomia da Antiguidade, “Composição Matemática”.";
          break;
        case "3":
          urlNova = 'geocentrismo(1).webp';
          textoprincipal.innerText="O modelo do geocentrismo";
          texto.innerText="Ptolomeu definiu a obra como uma tentativa de completa exposição do sistema "geocêntrico", que situava a "Terra no centro do universo" e, girando em torno dela estavam a Lua, Mercúrio, Vênus, o Sol, Marte, Júpiter, Saturno e as estrelas.";
          descrevefigura.innerText="Imagem do modelo geocentrico ";
          break;
        case "4":
          urlNova = 'coper.jpeg';
          textoprincipal.innerText="Sobre o Nicolau Copérnico ";
          texto.innerText="Nicolau Copérnico (cujo nome em polonês é Mikołaj Kopernik) era filho do comerciante Nicolau Copérnico e de Barbara Watzenrode, que também era de uma importante família de comerciantes, segundo informações do museu polonês. Como o Museu indica, o jovem estudou na Academia de Cracóvia, na Polônia, onde adquiriu um amplo conhecimento das ciências humanas e uma grande paixão pelo estudo da astronomia. Ele também foi educado na Itália, onde estudou direito e medicina e obteve um doutorado em direito canônico em 1503.";
          descrevefigura.innerText="Imagem do Nicolau Copérnico ";
          break;
        case "5":
          urlNova = 'helio.jpeg';
          textoprincipal.innerText="O modelo do héliocentrismo ";
          texto.innerText="Na época de Copérnico, a maioria das pessoas acreditava na teoria do astrônomo grego Cláudio Ptolomeu, que mais de mil anos antes havia dito que a Terra era o centro do Universo e que o planeta permanecia imóvel, como explica a Nasa. De acordo com a agência norte-americana, Copérnico achava que a teoria de Ptolomeu estava incorreta. Assim, em algum momento entre 1507 e 1515, ele divulgou pela primeira vez os princípios de sua teoria heliocêntrica. O astrônomo propôs que a Terra e os demais planetas giravam em torno do Sol e que, além de orbitar anualmente em torno do Sol, a Terra girava uma vez por dia em seu próprio eixo. Ele também argumentou que mudanças lentas de longo prazo na direção do eixo da Terra explicavam a precessão dos equinócios, informa a Britannica.";
          descrevefigura.innerText="Imagem do outro modelo héliocentrico ";
          break;
        default:
          urlNova = 'heliocentrico.webp';
          textoprincipal.innerText="O que é esta página?";
          texto.innerText="Olá. Esta página foi criada como parte de um trabalho do projeto IFA, criado pela colaboração de 6 alunos da turma do Segundo E: Anna Luiza, Eduardo, Felipe, João Henrique, Nathally, e Samuel da Silva. Clique em qualquer flashcards para observar cada parte do projeto relacionado a: MODELOS COSMOLÓGICOS.";
          descrevefigura.innerText="Figura 1 - Pessoa utilizando computador com tecnologia assistiva. ";
          break;
        }
    imagemnova.src = urlNova;
    lerCartao(textoprincipal.innerText, texto.innerText, descrevefigura.innerText);
    document.getElementById('textoprincipal').focus();
    }
}


/* ==========================================
   LEITURA DOS ELEMENTOS DO FLASHCARD ESCOLHIDO
   ========================================== */

// Função para ler toda a página
function lerCartao(texto1, texto2, texto3) {

    // Interrompe qualquer leitura anterior
    speechSynthesis.cancel();

    let textoCompleto = texto1 + ". " + texto2 + ". " + texto3;

    // Cria o objeto de fala
    const fala = new SpeechSynthesisUtterance(textoCompleto);

    fala.lang = "pt-BR";
    fala.rate = 1;     // velocidade
    fala.pitch = 1;    // tom
    fala.volume = 1;   // volume

    // Inicia a leitura
    speechSynthesis.speak(fala);
}
