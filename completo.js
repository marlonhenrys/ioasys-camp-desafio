class CarrinhoDeCompras {

    constructor(cliente, data, novoCliente) {
        this.cliente = cliente;
        this.novoCliente = novoCliente;
        this.data = data;
        this.itens = [];
        this.valorTotal = 0;
        this.cupom = null;
    }
    
    // adicionar produtos
    adicionarProduto(produto, quantidade) {
        this.itens.push({ produto, quantidade }); // short syntax
        this.calcularValorTotal();
    }

    // recebe um array de objetos com um produto e a sua respectiva quantidade
    adicionarProdutos(lista) {
        this.itens.push(...lista); // spread operator
        this.calcularValorTotal();
    }
    
    // recalcular valor total para novos produtos adicionados (usar concatenação de operadores)
    calcularValorTotal() {
        let valorTotal = 0;

        for (const item of this.itens) {
            valorTotal += item.produto.preco * item.quantidade
        }

        this.valorTotal = valorTotal;
    }
    
    // adicionar cupom de desconto
    adicionarCupom(codigo) {
        if (codigo.toUpperCase().startsWith('CAMP')
        && !codigo.includes('-')
        && parseInt(codigo.slice(4)) <= 50) 
        {
            this.cupom = parseInt(codigo.slice(4)) / 100;
        } // métodos de objetos globais
    }
    
    // calcular quantidade de itens totais 
    get totalDeItens() {
        let quantidade = 0;

        for (const item of this.itens) {
            quantidade += item.quantidade
        }

        return quantidade;
    }

    // listar produtos
    get listaDeProdutos() {
        let lista = '';

        for (const item of this.itens) {
            lista += '\n(' + item.quantidade + 'x) ' + item.produto.nome + '\t R$ ' + item.produto.preco * item.quantidade
        }

        return lista;
    }
    
    
    // calcular valor final (desconto para novos clientes OU cupom)
    fecharCompra() {
        let valorFinal;
        
        // 20% de desconto para novos clientes
        if(this.novoCliente) { 
            valorFinal = this.valorTotal * 0.8;
        // desconto de XX% do cupom 
        } else if(this.cupom) {
            valorFinal = this.valorTotal * (1 - this.cupom); // 100 - 15 = 85
        // 5% de desconto para compras acima de 100 reais
        } else {
            valorFinal = this.valorTotal > 100 ? this.valorTotal * 0.95 : this.valorTotal;
        }
        
        this.valorTotal = valorFinal;
        return valorFinal.toFixed(2);
    }
    
}

function Produto(codigo, nome, preco){
    this.codigo = codigo;
    this.nome = nome;
    this.preco = preco;
}

const meuCarrinho = new CarrinhoDeCompras('Marlon', new Date(), false)

meuCarrinho.adicionarProduto({ codigo: 123, nome: 'caneta', preco: 2 }, 4)
meuCarrinho.adicionarProduto({ codigo: 100, nome: 'borracha', preco: 1.5 }, 2)
meuCarrinho.adicionarProduto({ codigo: 201, nome: 'tesoura', preco: 5 }, 1)
meuCarrinho.adicionarProduto({ codigo: 555, nome: 'caderno', preco: 10 }, 5)

meuCarrinho.adicionarProduto(new Produto(404, 'livro', 25.10), 1)

// adicionar uma lista 
const meusItens = [
    { produto: new Produto(909, 'marcador', 1.45), quantidade: 2 },
    { produto: new Produto(369, 'fone', 45.50), quantidade: 1 },
    { produto: new Produto(888, 'sacola', 2.25), quantidade: 1 },
    { produto: new Produto(755, 'bala', 1.75), quantidade: 3 },
]

meuCarrinho.adicionarProdutos(meusItens);

meuCarrinho.adicionarProdutos([
    { produto: { codigo: 300, nome: 'chaveiro', preco: 6.5 }, quantidade: 2 }
])

meuCarrinho.adicionarCupom('camp50')

function resumoDaCompra(carrinho) {
    let dataFormatada = carrinho.data.toLocaleDateString().split('-'); // 2021-3-16

    if(dataFormatada[1] < 10)
        dataFormatada[1] = '0' + dataFormatada[1];

    dataFormatada = dataFormatada.reverse().join('/'); // métodos de objetos globais

    // template string
    const resumo = `
O cliente ${carrinho.cliente} realizou uma compra no dia ${dataFormatada} dos seguintes itens:
${carrinho.listaDeProdutos}
    
Total de itens: ${carrinho.totalDeItens}
Valor Total: R$ ${carrinho.valorTotal}

${
    carrinho.novoCliente && 'Ganhou desconto de primeira compra' 
    || carrinho.cupom && `Usou um cupom de ${carrinho.cupom * 100}%`
    || carrinho.valorTotal > 100 && 'Ganhou 5% de desconto (acima de R$ 100)'
}

O valor final da compra é de R$${carrinho.fecharCompra()}
`;

    return (metodoDePagamento, parcelas) => {
        const valorParcelado = (carrinho.valorTotal / parcelas).toFixed(2);
        return `${resumo}\nPagamento com ${metodoDePagamento} em ${parcelas}x de RS ${valorParcelado}\n`;
    }
}

console.log(resumoDaCompra(meuCarrinho)('Cartão de Crédito', 5))

