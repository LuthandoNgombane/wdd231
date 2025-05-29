// LN - Variable to store members data
let cachedMembers = null;

// LN - Fetch Members
export async function fetchMembers() {
    try {
        if (cachedMembers === null) {
            const response = await fetch('data/members.json');
            if (response.ok === false) {
                throw new Error('Failed to fetch members.json');
            }
            cachedMembers = await response.json();
        }
        return cachedMembers;
    } catch (error) {
        console.error('Error fetching members:', error);
        throw error;
    }
}