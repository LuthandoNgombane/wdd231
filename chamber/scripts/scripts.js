// LN - Last Modified Footer Updates
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// LN - Variable to store members data so we don’t fetch it multiple times
let cachedMembers = null;

// LN - Fetch and Display Members
async function fetchMembers(view) 
{
    try {

        //LN - If we haven’t fetched the members yet, get them from members.json
        if (cachedMembers === null) 
        {   
            
            const response = await fetch('data/members.json');
            
            if (response.ok === false) 
            {   
                throw new Error('Failed to fetch members.json');
            }

            cachedMembers = await response.json();
        }

        //LN - Display the members using the cached data
        displayMembers(cachedMembers, view);
    } 
    catch (error) 
    {
        console.error('Error fetching members:', error);
        document.getElementById('member-directory').innerHTML = '<p style="color: red; text-align: center; padding: 1rem; font-size: 1.2rem;">Error loading members. Please try again later.</p>';
    }
}

function displayMembers(members, view) 
{

    const directory = document.getElementById('member-directory');

    //LN - If the directory element doesn’t exist, stop the function
    if (directory === null) 
    {
        return;
    }

    //LN - Clear any existing content in the directory
    directory.innerHTML = '';

    //LN - Set the class to either grid-view or list-view
    directory.className = view + '-view';

    //LN - Loop through each member and create a card
    for (let i = 0; i < members.length; i++) 
    {
        const member = members[i];
        const card = document.createElement('div');
        card.className = 'member-card';
    
        //LN - Set the card’s content
        let membershipText;
    
        if (member.membershipLevel === 1) 
        {
            membershipText = 'Member';
        }
        else if (member.membershipLevel === 2) 
        {
            membershipText = 'Silver';
        } 
        else 
        {
            membershipText = 'Gold';
        }
        
        card.innerHTML = `
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p>Membership: ${membershipText}</p>
            <p>${member.description}</p>
        `;
        directory.appendChild(card);
    }
}

// LN - Toggle View
const gridViewButton = document.getElementById('grid-view');

if (gridViewButton !== null) 
{
    gridViewButton.addEventListener('click', function() 
    {
    
        gridViewButton.classList.add('active');

        document.getElementById('list-view').classList.remove('active');

        fetchMembers('grid');

    });

    const listViewButton = document.getElementById('list-view');

    listViewButton.addEventListener('click', function() 
    {
    
        listViewButton.classList.add('active');
    
        gridViewButton.classList.remove('active');
    
        fetchMembers('list');
    });
}

// LN - Initial Fetch
fetchMembers('grid');