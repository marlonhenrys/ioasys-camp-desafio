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
       
    }

    // recebe um array de objetos com um produto e a sua respectiva quantidade
    adicionarProdutos(lista) {
    
    }
    
    // recalcular valor total para novos produtos adicionados (usar concatenação de operadores)
    calcularValorTotal() {
      
    }
    
    // adicionar cupom de desconto
    adicionarCupom(codigo) {
      
    }
    
    // calcular quantidade de itens totais 
    get totalDeItens() {
   
    }

    // listar produtos
    get listaDeProdutos() {
  
    }
    
    // calcular valor final (desconto para novos clientes OU cupom)
    fecharCompra() {
        // 20% de desconto para novos clientes
        if(this.novoCliente) { 
           
        // desconto de XX% do cupom 
        } else if(this.cupom) {
           
        // 5% de desconto para compras acima de 100 reais
        } else {
           
        }
    }
}

function Produto(codigo, nome, preco){
    this.codigo = codigo;
    this.nome = nome;
    this.preco = preco;
}

const meuCarrinho = new CarrinhoDeCompras()

meuCarrinho.adicionarProduto({}, 1)

meuCarrinho.adicionarProduto(new Produto(), 1)

// adicionar uma lista 
const meusItens = []

meuCarrinho.adicionarProdutos(meusItens);

meuCarrinho.adicionarProdutos([])

meuCarrinho.adicionarCupom('camp50')

function resumoDaCompra(carrinho) {

    return (metodoDePagamento, parcelas) => {

    }
}

console.log(resumoDaCompra(meuCarrinho)('Cartão de Crédito', 3))

