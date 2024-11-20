// Função para rolar a lista de produtos para a esquerda ou direita
function scrollCategory(categoryId, direction) {
    const category = document.getElementById(categoryId);
    const scrollAmount = 300; // Quantidade de pixels a ser rolada
    category.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

// Função para adicionar um item ao carrinho
function adicionarAoCarrinho(nomeProduto, precoProduto) {
    // Cria o objeto de produto
    const produto = { nome: nomeProduto, preco: precoProduto };

    // Verifica se o carrinho já existe no localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Adiciona o produto ao carrinho
    carrinho.push(produto);

    // Salva o carrinho no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Exibe a mensagem de sucesso
    alert(`${nomeProduto} foi adicionado ao carrinho!`);
}

// Função para exibir os itens no carrinho
function exibirCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Exibe a mensagem de carrinho vazio, se não houver produtos
    if (carrinho.length === 0) {
        document.getElementById('carrinho-vazio').style.display = 'block';
        document.getElementById('carrinho-conteudo').style.display = 'none';
        document.getElementById('total').style.display = 'none';
        document.getElementById('finalizar').style.display = 'none'; // Oculta o botão "Finalizar Compra"
        return;
    }

    // Exibe os itens do carrinho
    const carrinhoConteudo = document.getElementById('carrinho-conteudo');
    carrinhoConteudo.innerHTML = ''; // Limpa o conteúdo anterior
    let total = 0;

    carrinho.forEach(produto => {
        const item = document.createElement('div');
        item.classList.add('produto-carrinho');
        item.innerHTML = `
            <p>${produto.nome} - R$ ${produto.preco.toFixed(2)}</p>
            <button onclick="removerDoCarrinho('${produto.nome}')">Remover</button>
        `;
        carrinhoConteudo.appendChild(item);
        total += produto.preco;
    });

    // Exibe o total
    document.getElementById('total-valor').textContent = total.toFixed(2);
    document.getElementById('total').style.display = 'block';
    document.getElementById('carrinho-vazio').style.display = 'none';
    document.getElementById('carrinho-conteudo').style.display = 'block';
    document.getElementById('finalizar').style.display = 'block'; // Exibe o botão "Finalizar Compra"
}

// Função para remover um item do carrinho
function removerDoCarrinho(nomeProduto) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho = carrinho.filter(produto => produto.nome !== nomeProduto);

    // Atualiza o carrinho no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Atualiza a página do carrinho
    exibirCarrinho();
}

// Chama a função para exibir os itens do carrinho quando a página carregar
if (window.location.pathname.includes('carrinho.html')) {
    exibirCarrinho();
}

// Função para finalizar a compra
function finalizarCompra() {
    // Verificar se o carrinho está vazio
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
    } else {
        // Redirecionar para a página de checkout
        window.location.href = "checkout.html";
    }
}
