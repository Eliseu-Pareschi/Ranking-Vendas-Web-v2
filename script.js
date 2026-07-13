const baseFirebase = "https://rankingvendasweb-default-rtdb.firebaseio.com/ranking";

const tabela = document.getElementById("tabela-ranking");
const mesFiltro = document.getElementById("mesFiltro");
const ultimaAtualizacao = document.getElementById("ultimaAtualizacao");
const selectVendedor = document.getElementById("selectVendedor");
const resultadoCorrida = document.getElementById("resultadoCorrida");
async function carregarUltimaAtualizacao(mes) {
    const resposta = await fetch(`https://rankingvendasweb-default-rtdb.firebaseio.com/atualizacoes/${mes}.json`);
    const horario = await resposta.json();

    ultimaAtualizacao.innerHTML = horario
        ? `🟢 Última atualização da planilha: ${horario}`
        : "⚠️ Ainda sem atualização registrada.";
}

let rankingAnterior = [];

async function carregarRanking() {
    const mes = mesFiltro.value;

    const resposta = await fetch(`${baseFirebase}/${mes}.json`);
    const ranking = await resposta.json();

    tabela.innerHTML = "";

    if (!ranking) {
        tabela.innerHTML = `
            <tr>
                <td colspan="3">
                    Nenhum dado encontrado para esse período.
                </td>
            </tr>
        `;

        carregarUltimaAtualizacao(mes);
        rankingAnterior = [];
        return;
    }
    preencherSelectVendedores(ranking);
    selectVendedor.onchange = () => calcularCorrida(ranking);
    ranking.forEach(item => {
        let classeLinha = "";
        let medalha = "";
        let destaqueNome = "";
        let destaqueVendas = "";

        const anterior = rankingAnterior.find(v => v.nome === item.nome);

        let movimento = "";

        if (anterior) {
            if (item.posicao < anterior.posicao) {
                const diferenca = anterior.posicao - item.posicao;
                movimento = ` <span class="subiu">▲ +${diferenca}</span>`;
            } else if (item.posicao > anterior.posicao) {
                const diferenca = item.posicao - anterior.posicao;
                movimento = ` <span class="desceu">▼ -${diferenca}</span>`;
            }
        }

        if (item.posicao === 1) {
            classeLinha = "primeiro";
            medalha = "🥇";
            destaqueNome = "👑";
            destaqueVendas = "🔥";
        } else if (item.posicao === 2) {
            classeLinha = "segundo";
            medalha = "🥈";
            destaqueVendas = "⚡";
        } else if (item.posicao === 3) {
            classeLinha = "terceiro";
            medalha = "🥉";
            destaqueVendas = "💪";
        } else if (item.quantidade > 0) {
            destaqueVendas = "⭐";
        }

        tabela.innerHTML += `
            <tr class="${classeLinha}">
                <td>${medalha} ${item.posicao}°</td>

                <td class="nome">
                    ${destaqueNome} ${item.nome} ${movimento}
                </td>

                <td class="vendas">
                    ${item.quantidade}${destaqueVendas}
                </td>
            </tr>
        `;
    });

    rankingAnterior = structuredClone(ranking);

    atualizarHorario();
}

function atualizarHorario() {
    const agora = new Date();

    ultimaAtualizacao.innerHTML =
        `🟢 Atualizado às ${agora.toLocaleTimeString("pt-BR")}`;
}

mesFiltro.addEventListener("change", () => {
    rankingAnterior = [];
    carregarRanking();
});

carregarRanking();
setInterval(carregarRanking, 3000);
function preencherSelectVendedores(ranking) {
    selectVendedor.innerHTML = `<option value="">Selecione um vendedor</option>`;

    ranking.forEach(vendedor => {
        selectVendedor.innerHTML += `
            <option value="${vendedor.nome}">
                ${vendedor.nome}
            </option>
        `;
    });
}

function calcularCorrida(ranking) {
    const nomeSelecionado = selectVendedor.value;

    if (!nomeSelecionado) {
        resultadoCorrida.innerHTML = "Escolha um vendedor para começar.";
        return;
    }

    const lider = ranking[0];
    const vendedor = ranking.find(item => item.nome === nomeSelecionado);

    const porcentagem = Math.round((vendedor.quantidade / lider.quantidade) * 100);
    const faltam = lider.quantidade - vendedor.quantidade;

    resultadoCorrida.innerHTML = `
        <strong>${vendedor.nome}</strong><br>
        Você tem <strong>${vendedor.quantidade}</strong> vendas.<br>
        O líder tem <strong>${lider.quantidade}</strong> vendas.<br>
        Faltam <strong>${faltam}</strong> vendas para alcançar o topo.<br><br>

        <div class="barra-corrida">
            <div class="progresso-corrida" style="width:${porcentagem}%"></div>
        </div>

        <p>${porcentagem}% do líder</p>
    `;
}

/* =======================
   MODAL DE LOGIN
======================= */

const btnLogin = document.getElementById("btnLogin");
const modalLogin = document.getElementById("modalLogin");
const btnFechar = document.getElementById("btnFechar");

btnLogin.addEventListener("click", () => {
    modalLogin.style.display = "flex";
});

btnFechar.addEventListener("click", () => {
    modalLogin.style.display = "none";
});

modalLogin.addEventListener("click", (evento) => {
    if (evento.target === modalLogin) {
        modalLogin.style.display = "none";
    }
});