const wrapperLinguagens = document.querySelector(".wrapper-linguagens");
const listaDeLinguagens = [];
let incrementoLista = 0;

const renderizaParagrafoListaVazia = () => {
	wrapperLinguagens.innerHTML = `
      <h2>Lista de Linguagens:</h2>
      <p class="lista-vazia">Não existem elementos nessa lista</p>
`;
};

const renderizaLista = () => {
	wrapperLinguagens.innerHTML = `
      <h2>Lista de Linguagens:</h2>
      <ul class="lista-linguagens">
      </ul>
`;

	incrementoLista = 0;

	const ul = document.querySelector(".lista-linguagens");
	listaDeLinguagens.forEach((linguagem) => {
		const itemLista = criarItem(linguagem.valor);
		linguagem.valor = itemLista.valor;
		linguagem.idItem = itemLista.idItem;
		linguagem.itemElement = itemLista.itemElement;
		ul.appendChild(linguagem.itemElement);
	});
};

const removerItem = (idItem) => {
	const linguagemParaRemover = document.querySelector(`#${idItem}`).innerText;
	const indexParaRemover = listaDeLinguagens.findIndex(
		(e) => e.valor === linguagemParaRemover
	);
	listaDeLinguagens.splice(indexParaRemover, 1);

	if (!listaDeLinguagens.length) renderizaParagrafoListaVazia();
	else renderizaLista();
};

const criarElementoRemovedor = (idItem) => {
	const removedor = document.createElement("input");
	removedor.setAttribute("type", "button");
	removedor.value = "(X)";
	removedor.addEventListener("click", () => removerItem(idItem));
	return removedor;
};

const criarItem = (valor) => {
	const idItem = `item-${incrementoLista++}`;
	const itemElement = document.createElement("li");
	itemElement.innerText = valor;
	itemElement.setAttribute("id", idItem);
	const removedorItem = criarElementoRemovedor(idItem);
	itemElement.appendChild(removedorItem);

	return { valor, idItem, itemElement };
};

// Captura o elemento input do tipo text do formulário
const inputText = document.querySelector("#elemento");

//Captura o elemento span
const spanErrorMsg = document.querySelector(".errorMsg");

// Validação do campo de inserção de linguagem
const renderizaMensagemErro = function (valor) {
	valor = inputText.value;

	if (!valor) {
		inputText.style =
			"border:2px solid #e63636; background-color:#6e6e6e;color:#ffffff;";
		spanErrorMsg.textContent = "↓ Este campo é de preenchimento obrigatório! ↓";
		spanErrorMsg.style = "display:inline-block;";
	} else {
		inputText.style = "";
		spanErrorMsg.textContent = "";
		spanErrorMsg.style = "display:none;";
		// Cria o item com seu respectivo removedor.
		const itemLista = criarItem(valor);
		listaDeLinguagens.push(itemLista);
		renderizaLista();
	}
};

const addElement = (event) => {
	event.preventDefault();
	// Chama mensagem de erro
	renderizaMensagemErro();
	// Captura o valor
	const valor = event.target.elements[0].value;
	// Limpa campo
	event.target.elements[0].value = "";
};

const elementoForm = document.querySelector("form");
elementoForm.addEventListener("submit", addElement);
