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