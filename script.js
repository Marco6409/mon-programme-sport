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
    if (grandTotalEl) grandTotalEl.textContent = grandTotal;
}

// 2. Gestion de la sauvegarde et des événements
const inputs = document.querySelectorAll('.sets, .reps, .weight, .input-charge');
const pageName = window.location.pathname.split("/").pop() || "index";

inputs.forEach((input, index) => {
    const storageKey = 'salle100_' + pageName + '_' + index;

    // Charger la valeur sauvegardée
    const savedValue = localStorage.getItem(storageKey);
    if (savedValue !== null) {
        input.value = savedValue;
    }

    // Sauvegarder lors de la saisie ET recalculer le total
    input.addEventListener('input', () => {
        localStorage.setItem(storageKey, input.value);
        calculateSessionTotal();
    });
});

// Calcul initial au chargement de la page
calculateSessionTotal();