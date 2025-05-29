// LN - Display Spotlights
export function displaySpotlights(members) {
    const spotlightCardsElement = document.getElementById('spotlight-cards');
    if (spotlightCardsElement === null) {
        return;
    }

    // LN - Filter Gold and Silver Members
    const eligibleMembers = [];
    for (let i = 0; i < members.length; i++) {
        const member = members[i];
        if (member.membershipLevel === 2 || member.membershipLevel === 3) {
            eligibleMembers.push(member);
        }
    }

    // LN - Randomly Select 2 Members
    const selectedMembers = [];
    const maxSpotlights = 2;
    while (selectedMembers.length < maxSpotlights && eligibleMembers.length > 0) {
        const randomIndex = Math.floor(Math.random() * eligibleMembers.length);
        selectedMembers.push(eligibleMembers[randomIndex]);
        eligibleMembers.splice(randomIndex, 1);
    }

    // LN - Display Spotlights
    spotlightCardsElement.innerHTML = '';
    for (let i = 0; i < selectedMembers.length; i++) {
        const member = selectedMembers[i];
        const card = document.createElement('div');
        card.className = 'spotlight-card';
        let membershipText;
        if (member.membershipLevel === 2) {
            membershipText = 'Silver';
        } else {
            membershipText = 'Gold';
        }
        card.innerHTML = `
            <img src="../images/${member.image}" alt="Logo of ${member.name}" width="100" height="100">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit</a></p>
            <p>Membership: ${membershipText}</p>
        `;
        spotlightCardsElement.appendChild(card);
    }
}