console.log("Programme Premium Salle 100 chargé. Bonne séance Marc !");

// 1. Fonction pour calculer le total de la séance
function calculateSessionTotal() {
    let grandTotal = 0;
    document.querySelectorAll('.card').forEach(card => {
        const sets = parseFloat(card.querySelector('.sets')?.value) || 0;
        const reps = parseFloat(card.querySelector('.reps')?.value) || 0;
        const weight = parseFloat(card.querySelector('.weight')?.value) || 0;
        
        const totalExo = sets * reps * weight;
        const totalSpan = card.querySelector('.total-weight');
        if (totalSpan) totalSpan.textContent = totalExo;
        
        grandTotal += totalExo;
    });

    const grandTotalEl = document.getElementById('grand-total');
    const pageName = window.location.pathname.split("/").pop() || "index";
    
    if (grandTotalEl) {
        grandTotalEl.textContent = grandTotal;
        // Sauvegarde le total global de cette page pour le dashboard
        localStorage.setItem('salle100_' + pageName + '_grandTotal', grandTotal);
    }
}

// 2. Fonction pour mettre à jour le Dashboard
function updateDashboard() {
    const totalHaut = localStorage.getItem('salle100_haut.html_grandTotal') || 0;
    const totalBas = localStorage.getItem('salle100_bas.html_grandTotal') || 0;
    
    const elHaut = document.getElementById('total-haut');
    const elBas = document.getElementById('total-bas');
    const elGlobal = document.getElementById('grand-total-global');

    if (elHaut) elHaut.textContent = totalHaut;
    if (elBas) elBas.textContent = totalBas;
    if (elGlobal) elGlobal.textContent = parseInt(totalHaut) + parseInt(totalBas);
}

// 3. Gestion de la sauvegarde et des événements
const inputs = document.querySelectorAll('.sets, .reps, .weight, .input-charge');
const pageName = window.location.pathname.split("/").pop() || "index";

inputs.forEach((input, index) => {
    const storageKey = 'salle100_' + pageName + '_' + index;

    const savedValue = localStorage.getItem(storageKey);
    if (savedValue !== null) {
        input.value = savedValue;
    }

    input.addEventListener('input', () => {
        localStorage.setItem(storageKey, input.value);
        calculateSessionTotal();
        if (pageName === 'dashboard.html') updateDashboard();
    });
});

// Initialisation
if (pageName === 'dashboard.html') {
    updateDashboard();
} else {
    calculateSessionTotal();
}