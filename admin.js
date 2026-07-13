const baseFirebase = "https://rankingvendasweb-default-rtdb.firebaseio.com/ranking";
const baseVendasDiarias = "https://rankingvendasweb-default-rtdb.firebaseio.com/vendasDiarias";
const baseMetas = "https://rankingvendasweb-default-rtdb.firebaseio.com/metas";

const mesAdmin = document.getElementById("mesAdmin");

const meses = [
    "JANEIRO", "FEVEREIRO", "MARCO", "ABRIL", "MAIO", "JUNHO",
    "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"
];

mesAdmin.value = meses[new Date().getMonth()];

const graficoTop10 = document.getElementById("graficoTop10");

const totalVendas = document.getElementById("totalVendas");
const melhorVendedor = document.getElementById("melhorVendedor");
const quantidadeVendedores = document.getElementById("quantidadeVendedores");

const primeiroLugar = document.getElementById("primeiroLugar");
const segundoLugar = document.getElementById("segundoLugar");
const terceiroLugar = document.getElementById("terceiroLugar");

const ultimaAtualizacaoDashboard = document.getElementById("ultimaAtualizacaoDashboard");

const inputMetaMes = document.getElementById("inputMetaMes");
const btnSalvarMeta = document.getElementById("btnSalvarMeta");
const barraMeta = document.getElementById("barraMeta");

async function buscarRanking() {
    const mes = mesAdmin.value;
    const resposta = await fetch(`${baseFirebase}/${mes}.json?nocache=${Date.now()}`);
    const ranking = await resposta.json();

    return ranking || [];
}

async function buscarVendasDiarias() {
    const mes = mesAdmin.value;
    const resposta = await fetch(`${baseVendasDiarias}/${mes}.json?nocache=${Date.now()}`);
    const dados = await resposta.json();

    if (!dados) return [];

    return Object.values(dados).sort((a, b) => {
        return Number(a.dia) - Number(b.dia);
    });
}

async function buscarMetaMes() {
    const mes = mesAdmin.value;
    const resposta = await fetch(`${baseMetas}/${mes}.json`);
    const meta = await resposta.json();

    return Number(meta) || 0;
}

async function salvarMetaMes() {
    const mes = mesAdmin.value;
    const meta = Number(inputMetaMes.value);

    if (!meta || meta <= 0) {
        alert("Digite uma meta válida.");
        return;
    }

    if (meta > 1000) {
        alert("A meta máxima permitida é 1000 vendas.");
        inputMetaMes.value = 1000;
        return;
    }

    await fetch(`${baseMetas}/${mes}.json`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(meta)
    });

    carregarDashboard();
}

async function carregarCards() {
    const ranking = await buscarRanking();

    let total = 0;

    ranking.forEach(vendedor => {
        total += Number(vendedor.quantidade);
    });

    totalVendas.textContent = total;
    melhorVendedor.textContent = ranking[0] ? ranking[0].nome : "-";
    quantidadeVendedores.textContent = ranking.length;
}

async function carregarVendasDiarias() {
    const dias = await buscarVendasDiarias();

    graficoTop10.innerHTML = "";

    if (dias.length === 0) {
        graficoTop10.innerHTML = "<p>Nenhuma venda diária encontrada para este mês.</p>";
        return;
    }

    const maiorVenda = Math.max(...dias.map(dia => Number(dia.vendas)));

    dias.forEach(dia => {
        const vendas = Number(dia.vendas);
        const largura = maiorVenda > 0 ? (vendas / maiorVenda) * 100 : 0;

        graficoTop10.innerHTML += `
            <div class="linha-grafico">
                <span>Dia ${String(dia.dia).padStart(2, "0")}</span>

                <div class="barra-area">
                    <div class="barra" style="width: ${largura}%;"></div>
                </div>

                <strong>${vendas}</strong>
            </div>
        `;
    });
}

async function carregarIndicadoresDiarios() {
    const dias = await buscarVendasDiarias();
    const meta = await buscarMetaMes();
    if (document.activeElement !== inputMetaMes) {
    inputMetaMes.value = meta > 0 ? meta : "";
}
    inputMetaMes.value = meta > 0 ? meta : "";

    const diasPreenchidos = dias.filter(dia => dia.preenchido === true);

    if (diasPreenchidos.length === 0) {
        primeiroLugar.textContent = "-";
        segundoLugar.textContent = "-";
        terceiroLugar.textContent = meta > 0 ? `0 / ${meta} vendas (0%)` : "Sem meta definida";
        barraMeta.style.width = "0%";
        return;
    }

    const total = diasPreenchidos.reduce((soma, dia) => {
        return soma + Number(dia.vendas);
    }, 0);

    const melhorDia = diasPreenchidos.reduce((maior, dia) => {
        return Number(dia.vendas) > Number(maior.vendas) ? dia : maior;
    });

    const media = total / diasPreenchidos.length;

    const percentual = meta > 0 ? Math.min((total / meta) * 100, 100) : 0;

    primeiroLugar.textContent = `${melhorDia.data} - ${melhorDia.vendas} vendas`;
    segundoLugar.textContent = `${media.toFixed(1)} vendas/dia`;

    terceiroLugar.textContent = meta > 0
        ? `${total} / ${meta} vendas (${percentual.toFixed(1)}%)`
        : "Sem meta definida";

    barraMeta.style.width = `${percentual}%`;
}

function atualizarHorarioDashboard() {
    const agora = new Date();

    ultimaAtualizacaoDashboard.textContent =
        "Última atualização: " + agora.toLocaleTimeString("pt-BR");
}

function carregarDashboard() {
    carregarCards();
    carregarVendasDiarias();
    carregarIndicadoresDiarios();
    atualizarHorarioDashboard();
}

mesAdmin.addEventListener("change", carregarDashboard);
btnSalvarMeta.addEventListener("click", salvarMetaMes);

carregarDashboard();

setInterval(carregarDashboard, 10000);