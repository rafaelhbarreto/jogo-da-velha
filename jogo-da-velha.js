
// definição do objeto  
// do jogo da velha 

const jogo_da_velha = {

    tabuleiro: ['', '', '', '', '', '', '', '', ''], 
    simbolos: {
        opcoes: ['X','O'],
        jogador: 0,
        mudarJogador: function(){

            this.jogador = (this.jogador == 1 ? 0 : 1);
            document.getElementById('aviso').innerHTML = `Vez do jogador ${this.jogador+1}`;
        }
    },
    posicoes_vitoria: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        
        [0, 4, 8],
        [2, 4, 6]
    ],
    game_container: null, 
    acabou: false,

    init: function(mainDiv){
        this.game_container = mainDiv; 

        let styles = 'display: block;';
        document.getElementById('controles').setAttribute('style', styles);
    },

    // função que define a jogada de um player
    jogar: function(pos){

        // para fazer uma jogada, é necessário verificar 
        // se o jogo ainda não acabou. 
        if(this.acabou)
            return false;
        if(this.tabuleiro[pos] === ''){
            this.tabuleiro[pos] = this.simbolos.opcoes[this.simbolos.jogador];
            this.desenhar();

            // checa se houve uma vitória. 
            let checar_vitoria = this.verificar_vitoria( this.simbolos.opcoes[this.simbolos.jogador]);
            if(checar_vitoria >= 0){
                this.verificar_fim(); 
            }
            else
                this.simbolos.mudarJogador();

            return true;
        }
        else{
            return false; 
        }
    },

    // marca o game como encerrado
    verificar_fim: function(){
        this.acabou = true; 
        document.getElementById('aviso').innerHTML = `Vitória do jogador ${this.simbolos.jogador+1}`;
    },

    // verifica a cada jogada se houve um vencedor.
    verificar_vitoria: function(simbolo){

        for( i in this.posicoes_vitoria ){

            if( this.tabuleiro[ this.posicoes_vitoria[i][0] ] == simbolo &&
                this.tabuleiro[ this.posicoes_vitoria[i][1] ] == simbolo &&
                this.tabuleiro[ this.posicoes_vitoria[i][2] ] == simbolo
            ){

                let sequencia = this.posicoes_vitoria[i]; 
                let posicoes = [...document.getElementsByClassName('game-item')]; 

                return i; 
            }
        }

        return -1; 
    },

    // renderiza o game no browser 
    desenhar: function(){

        let conteudo = ''; 
        this.tabuleiro.forEach((elem, index) => {
            conteudo += `<div class="game-item" onClick="jogo_da_velha.jogar(${index})">${this.tabuleiro[index]}</div>`;
        });
        this.game_container.innerHTML = conteudo;
    },

    // reiniciar o game 
    restart: function(){

        this.tabuleiro = ['', '', '', '', '', '', '', '', ''];
        this.simbolos.jogador = 0; 
        this.acabou = false; 

        this.init( document.getElementById('game') );
        jogo_da_velha.desenhar();
    }


}