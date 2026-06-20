console.log("Salle 100 : Script robuste chargé.");

// 1. Calcul des totaux par page
function calculateSessionTotal() {
    let grandTotal = 0, totalKcal = 0, totalCardioTime = 0;

    // Calcul Poids
    document.querySelectorAll('.card').forEach(card => {
        const sets = parseFloat(card.querySelector('.sets')?.value) || 0;
        const reps = parseFloat(card.querySelector('.reps')?.value) || 0;
        const weight = parseFloat(card.querySelector('.weight')?.value) || 0;
        const totalExo = sets * reps * weight;
        if (card.querySelector('.total-weight')) card.querySelector('.total-weight').textContent = totalExo;
        grandTotal += totalExo;
    });

    // Calcul Kcal et Temps
    document.querySelectorAll('.kcal-input').forEach(i => totalKcal += parseFloat(i.value) || 0);
    document.querySelectorAll('.cardio-time').forEach(i => totalCardioTime += parseFloat(i.value) || 0);

    const page = window.location.pathname.split("/").pop();
    localStorage.setItem('salle100_GT_' + page, grandTotal);
    localStorage.setItem('salle100_Kcal_' + page, totalKcal);
    localStorage.setItem('salle100_Time_' + page, totalCardioTime);
}

// 2. Gestion de la sauvegarde auto (basée sur les ID uniques)
document.querySelectorAll('input').forEach(input => {
    // Restaurer la valeur au chargement
    if (input.id) {
        const saved = localStorage.getItem('salle100_input_' + input.id);
        if (saved !== null) input.value = saved;
    }

    input.addEventListener('input', () => {
        if (input.id) localStorage.setItem('salle100_input_' + input.id, input.value);
        calculateSessionTotal();
        if (window.location.pathname.includes('dashboard')) updateDashboard();
    });
});

// 3. Mise à jour Dashboard et Historique
function updateDashboard() {
    const pages = ['haut.html', 'bas.html', 'cardio.html'];
    let gt = 0, kc = 0, tm = 0;
    pages.forEach(p => {
        gt += parseFloat(localStorage.getItem('salle100_GT_' + p)) || 0;
        kc += parseFloat(localStorage.getItem('salle100_Kcal_' + p)) || 0;
        tm += parseFloat(localStorage.getItem('salle100_Time_' + p)) || 0;
    });
    
    if (document.getElementById('total-haut')) document.getElementById('total-haut').textContent = localStorage.getItem('salle100_GT_haut.html') || 0;
    if (document.getElementById('total-bas')) document.getElementById('total-bas').textContent = localStorage.getItem('salle100_GT_bas.html') || 0;
    if (document.getElementById('total-kcal-global')) document.getElementById('total-kcal-global').textContent = kc;
    if (document.getElementById('total-cardio-time')) document.getElementById('total-cardio-time').textContent = tm;
    if (document.getElementById('grand-total-global')) document.getElementById('grand-total-global').textContent = gt;
    
    afficherHistorique();
}

function enregistrerSeance() {
    const date = new Date().toLocaleDateString();
    const data = { 
        date, 
        total: document.getElementById('grand-total-global')?.textContent || "0", 
        kcal: document.getElementById('total-kcal-global')?.textContent || "0" 
    };
    let hist = JSON.parse(localStorage.getItem('salle100_historique')) || [];
    hist.unshift(data);
    localStorage.setItem('salle100_historique', JSON.stringify(hist.slice(0, 5)));
    afficherHistorique();
}

function afficherHistorique() {
    const list = document.getElementById('historique-list');
    const hist = JSON.parse(localStorage.getItem('salle100_historique')) || [];
    if (list) {
        list.innerHTML = hist.length > 0 ? hist.map(s => `<p>${s.date} : <b>${s.total} kg</b> | ${s.kcal} kcal</p>`).join('') : '<p>Aucune séance.</p>';
    }
}

if (window.location.pathname.includes('dashboard')) updateDashboard();
else calculateSessionTotal();