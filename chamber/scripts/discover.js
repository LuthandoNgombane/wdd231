// LN - Fetch and display discover items
async function loadDiscoverItems() {
    try {
        const response = await fetch('data/discover.json');
        if (!response.ok) throw new Error('Failed to fetch discover.json');
        const items = await response.json();
        const grid = document.getElementById('discover-grid');
        items.forEach((item, index) => {
            const card = document.querySelector(`[data-area="card${index + 1}"]`);
            const isFirstCard = index === 0;
            card.innerHTML = `
                <h2>${item.name}</h2>
                <figure><img src="${item.image}" alt="${item.name}" width="300" height="200" ${isFirstCard ? '' : 'loading="lazy"'}></figure>
                <address>${item.address}</address>
                <p>${item.description}</p>
                <button class="learn-more">Learn More</button>
            `;
        });
    } catch (error) {
        console.error('Error loading discover items:', error);
        document.getElementById('discover-grid').innerHTML = '<p style="color: red;">Error loading content. Please try again later.</p>';
    }
}

// LN - Handle visit message with localStorage
function updateVisitMessage() {
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    const messageElement = document.getElementById('visit-message');
    if (!lastVisit) {
        messageElement.textContent = 'Welcome! Let us know if you have any questions.';
    } else {
        const daysDiff = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        if (daysDiff < 1) {
            messageElement.textContent = 'Back so soon! Awesome!';
        } else {
            messageElement.textContent = `You last visited ${daysDiff} ${daysDiff === 1 ? 'day' : 'days'} ago.`;
        }
    }
    // LN - Update lastVisit only if not a cache restoration
    if (document.visibilityState === 'visible') {
        localStorage.setItem('lastVisit', now);
    }
}

// LN - Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadDiscoverItems();
    updateVisitMessage();
});