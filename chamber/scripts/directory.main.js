// LN - Import Modules
import { updateFooter } from './footer.js';
import { fetchMembers } from './members.js';
import { displayMembers } from './directory.js';

// LN - Initialize
async function initializeDir() {
    // LN - Update Footer
    updateFooter();

    // LN - Fetch Initial Members
    try {
        const members = await fetchMembers();
        displayMembers(members);
    } catch (error) {
        const directory = document.getElementById('member-directory');
        if (directory !== null) {
            const errorMessage = document.createElement('p');
            errorMessage.style.color = 'red';
            errorMessage.style.textAlign = 'center';
            errorMessage.style.padding = '1rem';
            errorMessage.style.fontSize = '1.2rem';
            errorMessage.textContent = 'Error loading members. Please try again later.';
            directory.appendChild(errorMessage);
        }
    }
}

// LN - Run Initialization
initializeDir();