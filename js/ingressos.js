const listaIngressos = document.getElementById("listaIngressos");
const campoCupom = document.getElementById("campoCupom");
const btnAplicarCupom = document.getElementById("btnAplicarCupom");
const btnRemoverCupom = document.getElementById("btnRemoverCupom");
const mensagemCupom = document.getElementById("mensagemCupom");
const totalIngressos = document.getElementById("totalIngressos");
const subtotalIngressos = document.getElementById("subtotalIngressos");
const descontoIngressos = document.getElementById("descontoIngressos");
const totalFinalIngressos = document.getElementById("totalFinalIngressos");

function obterItensComEventos() {
    return obterIngressos()
        .map(function(item) {
            const evento = eventos.find(function(eventoAtual) {
                return eventoAtual.id === Number(item.id);
            });

            return {
                evento: evento,
                quantidade: Number(item.quantidade)
            };
        })
        .filter(function(item) {
            return item.evento && item.quantidade > 0;
        });
}

function alterarQuantidade(idEvento, diferenca) {
    const ingressos = obterIngressos();
    const item = ingressos.find(function(ingresso) {
        return ingresso.id === Number(idEvento);
    });

    if (!item) {
        return;
    }

    item.quantidade += diferenca;

    if (item.quantidade <= 0) {
        removerIngresso(idEvento);
        return;
    }

    salvarIngressos(ingressos);
    renderizarIngressos();
}

function removerIngresso(idEvento) {
    const ingressosAtualizados = obterIngressos().filter(function(item) {
        return item.id !== Number(idEvento);
    });

    salvarIngressos(ingressosAtualizados);

    if (calcularQuantidadeTotal() < 4 && obterCupom() === "GRUPO15") {
        salvarCupom("");
    }

    renderizarIngressos();
}

function calcularResumo() {
    const itens = obterItensComEventos();
    const subtotal = itens.reduce(function(total, item) {
        return total + item.evento.preco * item.quantidade;
    }, 0);
    const quantidadeTotal = itens.reduce(function(total, item) {
        return total + item.quantidade;
    }, 0);
    const cupom = obterCupom();
    let percentualDesconto = 0;

    if (cupom === "ESTUDANTE10") {
        percentualDesconto = 0.10;
    } else if (cupom === "GRUPO15" && quantidadeTotal >= 4) {
        percentualDesconto = 0.15;
    }

    const desconto = subtotal * percentualDesconto;

    return {
        itens: itens,
        quantidadeTotal: quantidadeTotal,
        subtotal: subtotal,
        desconto: desconto,
        totalFinal: subtotal - desconto,
        cupom: cupom
    };
}

function aplicarCupom() {
    const codigo = campoCupom.value.trim().toUpperCase();
    const resumo = calcularResumo();

    mensagemCupom.className = "small mt-2";

    if (!codigo) {
        salvarCupom("");
        mensagemCupom.textContent = "Digite um codigo para aplicar.";
        mensagemCupom.classList.add("text-danger");
    } else if (codigo === "ESTUDANTE10") {
        salvarCupom(codigo);
        mensagemCupom.textContent = "Cupom ESTUDANTE10 aplicado: 10% de desconto.";
        mensagemCupom.classList.add("text-success-custom");
    } else if (codigo === "GRUPO15") {
        if (resumo.quantidadeTotal >= 4) {
            salvarCupom(codigo);
            mensagemCupom.textContent = "Cupom GRUPO15 aplicado: 15% de desconto.";
            mensagemCupom.classList.add("text-success-custom");
        } else {
            salvarCupom("");
            mensagemCupom.textContent = "O cupom GRUPO15 exige pelo menos 4 ingressos selecionados.";
            mensagemCupom.classList.add("text-danger");
        }
    } else {
        salvarCupom("");
        mensagemCupom.textContent = "Codigo promocional invalido.";
        mensagemCupom.classList.add("text-danger");
    }

    renderizarIngressos();
}

function removerCupom() {
    salvarCupom("");
    campoCupom.value = "";
    mensagemCupom.textContent = "";
    renderizarIngressos();
}

function renderizarIngressos() {
    const resumo = calcularResumo();

    if (resumo.itens.length === 0) {
        listaIngressos.innerHTML = `
            <div class="empty-state">
                <h2>Nenhum ingresso selecionado</h2>
                <p>Escolha eventos no catalogo para montar sua lista.</p>
                <a class="btn btn-primary" href="index.html">Ver eventos</a>
            </div>
        `;
    } else {
        listaIngressos.innerHTML = resumo.itens.map(function(item) {
            const subtotalItem = item.evento.preco * item.quantidade;
            return `
                <article class="cart-item">
                    <div class="row g-3 align-items-center">
                        <div class="col-md-5">
                            <h2>${item.evento.nome}</h2>
                            <p class="event-meta mb-0">${item.evento.data} | ${item.evento.local}</p>
                        </div>
                        <div class="col-sm-6 col-md-2">
                            <span class="event-meta d-block">Unitario</span>
                            <strong>${item.evento.preco === 0 ? "Gratuito" : formatarMoeda(item.evento.preco)}</strong>
                        </div>
                        <div class="col-sm-6 col-md-2">
                            <span class="event-meta d-block">Quantidade</span>
                            <div class="quantity-control">
                                <button type="button" onclick="alterarQuantidade(${item.evento.id}, -1)" aria-label="Diminuir quantidade">-</button>
                                <span>${item.quantidade}</span>
                                <button type="button" onclick="alterarQuantidade(${item.evento.id}, 1)" aria-label="Aumentar quantidade">+</button>
                            </div>
                        </div>
                        <div class="col-sm-6 col-md-2">
                            <span class="event-meta d-block">Subtotal</span>
                            <strong>${formatarMoeda(subtotalItem)}</strong>
                        </div>
                        <div class="col-sm-6 col-md-1 text-md-end">
                            <button class="btn btn-sm btn-outline-danger" type="button" onclick="removerIngresso(${item.evento.id})">Remover</button>
                        </div>
                    </div>
                </article>
            `;
        }).join("");
    }

    totalIngressos.textContent = resumo.quantidadeTotal;
    subtotalIngressos.textContent = formatarMoeda(resumo.subtotal);
    descontoIngressos.textContent = formatarMoeda(resumo.desconto);
    totalFinalIngressos.textContent = formatarMoeda(resumo.totalFinal);
    btnRemoverCupom.classList.toggle("d-none", !resumo.cupom);

    if (resumo.cupom && !campoCupom.value) {
        campoCupom.value = resumo.cupom;
    }

    atualizarContadorIngressos();
}

btnAplicarCupom.addEventListener("click", aplicarCupom);
btnRemoverCupom.addEventListener("click", removerCupom);

renderizarIngressos();
