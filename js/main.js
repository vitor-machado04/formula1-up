const corredores = document.querySelectorAll('.corredor');
const saldoSpan = document.getElementById('saldo');
const apostaInput = document.getElementById('aposta');
const pilotoSelect = document.getElementById('piloto');
const infoDiv = document.getElementById('info');

let saldo = 100;
let corridaAtiva = false;

function apostar() {
    if (corridaAtiva) {
        alert("A corrida já está acontencendo!");
        return;
    }

    const aposta = parseInt(apostaInput.value);
    const pilotoSelecionado = pilotoSelect.value;

    if (isNaN(aposta) || aposta < 5 || aposta > saldo) {
        alert("Aposta inválida!");
        return;
    }

    saldo -= aposta;
    saldoSpan.textContent = saldo;

    iniciarCorrida(aposta, pilotoSelecionado);
}

function iniciarCorrida(aposta, pilotoSelecionado) {
    corridaAtiva = true;
    let vencedor = null;
    const distanciaTotal = window.innerWidth - 150;

    function moverCorredores() {
        corredores.forEach(corredor => {
            const movimento = Math.random() * 20;
            corredor.style.marginLeft = parseInt(corredor.style.marginLeft || 0) + movimento + 'px';

            if (parseInt(corredor.style.marginLeft) >= distanciaTotal) {
                vencedor = corredor.id;
                terminarCorrida(vencedor, aposta, pilotoSelecionado);
            }
        });

        if (!vencedor) {
            setTimeout(moverCorredores, 50);
        }
    }

    moverCorredores();
}

function terminarCorrida(vencedor, aposta, pilotoSelecionado) {
    if (vencedor === pilotoSelecionado) {
        saldo += aposta * 2;
        alert("Você ganhou! Seu saldo é de " + saldo + " R$");
    } else {
        alert("Você perdeu! Seu saldo é de " + saldo + " R$");
    }

    saldoSpan.textContent = saldo;
    corridaAtiva = false;
    infoDiv.style.display = "block";
    reiniciarPosicoes();
}

function reiniciarPosicoes() {
    corredores.forEach(corredor => {
        corredor.style.marginLeft = '0';
    });
}
