console.log("Programme Premium Salle 100 chargé. Bonne séance Marc !");

// On sélectionne toutes les zones de saisie des charges
const inputs = document.querySelectorAll('.input-charge');

inputs.forEach((input, index) => {
    // On crée une clé unique basée sur l'index de l'input dans toute la page
    // Cela garantit qu'aucune case n'écrase une autre
    const storageKey = 'input_' + index;

    // 1. Au chargement : on récupère la valeur sauvegardée
    const savedValue = localStorage.getItem(storageKey);
    if (savedValue !== null) {
        input.value = savedValue;
    }

    // 2. Dès qu'on modifie une valeur, on la sauvegarde
    input.addEventListener('input', () => {
        localStorage.setItem(storageKey, input.value);
    });
});