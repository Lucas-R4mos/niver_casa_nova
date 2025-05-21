document.addEventListener("DOMContentLoaded", () => {
  const chavePixValor = "85986692774";
  const pixCopiaColaValor = "00020126960014BR.GOV.BCB.PIX0136b460b89f-3a4c-43f3-beb4-12653c2d8f120234Chá de casa nova - Lucas e Larissa5204000053039865802BR5919Lucas da Hora Ramos6009SAO PAULO62140510u02XNjnsVW63042EE1";

  const chavePixBtn = document.getElementById("chave-pix").parentElement;
  const pixCopiaColaBtn = document.getElementById("pix-copia-cola").parentElement;
  const pixList = document.getElementById("pix-list");

  const mensagem = document.createElement("p");
  mensagem.setAttribute("role", "status");
  mensagem.setAttribute("aria-live", "polite");
  mensagem.style.marginTop = "0.5rem";
  pixList.parentElement.appendChild(mensagem);

  chavePixBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(chavePixValor)
      .then(() => {
        mensagem.textContent = "Chave Pix copiada!";
      })
      .catch(() => {
        mensagem.textContent = "Erro ao copiar a chave Pix.";
      });
  });

  pixCopiaColaBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(pixCopiaColaValor)
      .then(() => {
        mensagem.textContent = "Código Pix Copia e Cola copiado!";
      })
      .catch(() => {
        mensagem.textContent = "Erro ao copiar o código Pix.";
      });
  });

  mensagem.focus();
});

const scriptURL = 'https://script.google.com/macros/s/AKfycbxL3zkppCrqqzxjOhnmig30s-Wn_38iVrDGB9_LAxada1zCU1WH8LNZRLWdzt2373Nd8w/exec';
const lista = document.getElementById("presentes");
const select = document.getElementById("presenteSelecionado");
const form = document.getElementById("formReserva");
const mensagem = document.getElementById("mensagem");

async function carregarPresentes() {
  try {
    const res = await fetch(scriptURL + '?acao=presentes');
    const json = await res.json();

    if (json.result === "success") {
      lista.innerHTML = "";
      select.innerHTML = "";

      json.presentes.forEach((item) => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = item.link;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = `${item.nome} - R$ ${item.valor.toFixed(2)}`;
        li.appendChild(link);
        lista.appendChild(li);

        const option = document.createElement("option");
        option.value = item.nome;
        option.textContent = `${item.nome}`;
        select.appendChild(option);
      });
    } else {
      mensagem.textContent = "Erro ao carregar presentes.";
    }
  } catch (error) {
    console.error(error);
    mensagem.textContent = "Erro de conexão.";
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const quem = document.getElementById("nome").value.trim();
  const nomePresente = document.getElementById("presenteSelecionado").value;

  if (!quem || !nomePresente) {
    mensagem.textContent = "Preencha todos os campos.";
    return;
  }

  const body = JSON.stringify({ acao: "reservar", quem, nomePresente });
  console.log(body);

  try {
    await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      mode: "no-cors"
    });

    const feedback = "Presente reservado com sucesso!";
    mensagem.textContent = feedback;
    mensagem.setAttribute('aria-label', feedback);
    mensagem.style.color = 'green';

    form.reset();
    carregarPresentes();
  } catch (error) {
    console.error(error);
    const feedback = "Erro ao reservar presente.";
    mensagem.textContent = feedback;
    mensagem.setAttribute('aria-label', feedback);
    mensagem.style.color = 'red';
    carregarPresentes();
  }
});

carregarPresentes();
