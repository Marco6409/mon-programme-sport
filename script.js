console.log("Programme Premium Salle 100 chargé. Bonne séance Marc !");

// 1. Calcul du total des poids ET des Kcal
function calculateSessionTotal() {
    let grandTotal = 0;
    let totalKcal = 0;

    // Calcul poids
    document.querySelectorAll('.card').forEach(card => {
        const sets = parseFloat(card.querySelector('.sets')?.value) || 0;
        const reps = parseFloat(card.querySelector('.reps')?.value) || 0;
        const weight = parseFloat(card.querySelector('.weight')?.value) || 0;
        const totalExo = sets * reps * weight;
        
        const totalSpan = card.querySelector('.total-weight');
        if (totalSpan) totalSpan.textContent = totalExo;
        grandTotal += totalExo;
    });

    // Calcul Kcal (Somme de tous les inputs avec la classe kcal-input)
    document.querySelectorAll('.kcal-input').forEach(input => {
        totalKcal += parseFloat(input.value) || 0;
    });

    const grandTotalEl = document.getElementById('grand-total');
    const pageName = window.location.pathname.split("/").pop() || "index";
    
    if (grandTotalEl) {
        grandTotalEl.textContent = grandTotal;
        localStorage.setItem('salle100_' + pageName + '_grandTotal', grandTotal);
        localStorage.setItem('salle100_' + pageName + '_kcal', totalKcal);
    }
}

// 2. Mise à jour Dashboard (Totaux + Historique)
function updateDashboard() {
    const totalHaut = parseFloat(localStorage.getItem('salle100_haut.html_grandTotal')) || 0;
    const totalBas = parseFloat(localStorage.getItem('salle100_bas.html_grandTotal')) || 0;
    const kcalHaut = parseFloat(localStorage.getItem('salle100_haut.html_kcal')) || 0;
    const kcalBas = parseFloat(localStorage.getItem('salle100_bas.html_kcal')) || 0;
    const kcalCardio = parseFloat(localStorage.getItem('salle100_cardio.html_kcal')) || 0;
    
    const elHaut = document.getElementById('total-haut');
    const elBas = document.getElementById('total-bas');
    const elGlobal = document.getElementById('grand-total-global');
    const elKcal = document.getElementById('total-kcal-global');

    if (elHaut) elHaut.textContent = totalHaut;
    if (elBas) elBas.textContent = totalBas;
    if (elGlobal) elGlobal.textContent = (totalHaut + totalBas);
    if (elKcal) elKcal.textContent = (kcalHaut + kcalBas + kcalCardio);
}

// 3. Gestion événements
const inputs = document.querySelectorAll('.sets, .reps, .weight, .input-charge, .kcal-input');
const pageName = window.location.pathname.split("/").pop() || "index";

inputs.forEach((input, index) => {
    const storageKey = 'salle100_' + pageName + '_' + index;
    const savedValue = localStorage.getItem(storageKey);
    if (savedValue !== null) input.value = savedValue;

    input.addEventListener('input', () => {
        localStorage.setItem(storageKey, input.value);
        calculateSessionTotal();
        if (pageName === 'dashboard.html') updateDashboard();
    });
});

if (pageName === 'dashboard.html') updateDashboard();
else calculateSessionTotal();