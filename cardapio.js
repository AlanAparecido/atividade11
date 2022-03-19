import itens from './model/dataset.js'; //importa tudo o que está no dataset.js
import foodsModel from './model/foods.js'; //importa o que está contido em foods model

foodsModel.load(itens); //evento direcionado aos itens, indica pelo .load que indica um recurso acaba de carregar
let foods = foodsModel.readAll(); // cria a variavél "foods" e aplica um parâmetro .readAll que lê um arquivo TextStream inteiro e depois disso retorna ele em forma de string

function initFoodsCard () { //aqui está criando uma função para o initFoodsCard 
  
  for (let item of foods) { //aqui por sua vez pega a funnção exercida pela parte de cima e aplica o for pra váriavel let item de foods

    const view = createFoodCardItem(item); //constante para exibição "view", vai criar o campo com as imagens, preços e descrições
  
    //let itensCardapio = document.querySelector('.itens-cardapio');
    let itensCardapio = document.getElementById("itens-cardapio"); //váriavel que pega com o document.getElementById, que vai ser os itens do cárdapio
    itensCardapio.insertAdjacentHTML('beforeend', view); //vai verificar aqui se o documento é especificado xml ou html e insere o que é necessário para a árvore DOM em uma posição especificada
  }
}

function createFoodCardItem (item) { //aqui a função é pra criar a parte visual, textual e os botões, da janela de compra do produto, explicão de todos os itens abaixo

    const view = `<div class="col-3 card my-1 mx-1 py-1">
                    <img src="${item.imagem}" class="card-img-top" alt="..."> 
  
                    <div class="card-body">
                      <h5 class="card-title">${item.nome}</h5>
                      <p class="card-text">${item.descricao}</p>
                      <a href="#" class="btn btn-primary">Comprar</a>
                    </div>
                  </div>`;

    return view; //retorna a constante view
}


// Captar o evento de submissão do formulário e adicionar o item no cartão (card).
// const foodForm = document.querySelector('#foodForm');
const foodForm = document.getElementById("foodForm"); //pega o foodForm pelo parâmetro getElementById

foodForm.onsubmit = function (event) {
  // Previnir que o modal fique abrindo e fechando em loop.
  event.preventDefault();

  let newFood = Object.fromEntries(new FormData(foodForm));
  foodsModel.create(newFood); // .create para criar uma nova food

  const foodCard = createFoodCardItem(newFood); //constante para criar uma new food
  let itensCardapio = document.getElementById("itens-cardapio"); //parâmetro para pegar os itens do cárdapio
  itensCardapio.insertAdjacentHTML('beforeend', foodCard); //aqui vai criar o que vai resultar na árvore DOM
}

initFoodsCard(); //inicia os FoodsCards
