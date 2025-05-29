// LN - Display Members
export function displayMembers(members) {
    const directory = document.getElementById('member-directory');
    const loadingMessage = document.getElementById('loading-message');
    const memberCards = document.getElementById('member-cards');

    if (directory === null || memberCards === null) {
        return;
    }

    // LN - Show loading message
    if (loadingMessage !== null) {
        loadingMessage.style.display = 'block';
    }

    // LN - Clear existing cards
    memberCards.innerHTML = '';

    // LN - Create member cards
    for (let i = 0; i < members.length; i++) {
        const member = members[i];
        const card = document.createElement('div');
        card.className = 'member-card';

        let membershipText;
        if (member.membershipLevel === 1) {
            membershipText = 'Member';
        } else if (member.membershipLevel === 2) {
            membershipText = 'Silver';
        } else {
            membershipText = 'Gold';
        }

        card.innerHTML = `
            <img src="../images/${member.image}" alt="Logo of ${member.name}" width="100" height="100">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p>Membership: ${membershipText}</p>
            <p>${member.description}</p>
        `;
        memberCards.appendChild(card);
    }

    // LN - Hide loading message
    if (loadingMessage !== null) {
        loadingMessage.style.display = 'none';
    }
}