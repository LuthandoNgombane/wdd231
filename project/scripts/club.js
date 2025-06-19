const eventsUrl = './data/events.json';
const weatherApiKey = '0a9bad9d2042b18b0c1de648321b628a'; 
const weatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';

//LN - The following function loads events from a local JSON file and fetches weather data for each event date.
// It then updates the global `clubEvents` variable with the event data and associated weather information
export async function loadEvents() 
{

  //LN - Fetch events from the local JSON file
  const response = await fetch(eventsUrl);

  //LN - Check if the response is ok, otherwise throw an error
  if (!response.ok) throw new Error('Failed to fetch events');

  //LN - Parse the JSON response to get the events and store it in the global variable clubEvents.  
  const events = await response.json();

  window.clubEvents = events;

  //LN - Fetch weather data for each event date using the OpenWeatherMap API.
  const weatherPromises = window.clubEvents.map(event =>

    //LN - Fetch weather data for Pretoria, ZA on the event date
    // Convert the event date to a Unix timestamp 
    fetch(`${weatherBaseUrl}?q=Pretoria,ZA&dt=${new Date(event.date).getTime() / 1000}&appid=${weatherApiKey}&units=metric`)

    //LN - Check if the response is ok and return the JSON data, otherwise return null
    .then(res => res.ok ? res.json() : null)

  );

  //LN - Wait for all weather data promises to resolve and map the results to the corresponding events.
  const weatherData = await Promise.all(weatherPromises);

  //LN - Update each event with the corresponding weather data
  // If the weather data is not available, set a default message.
  window.clubEvents = window.clubEvents.map((event, index) => ({

    //LN - Spread the event properties into the new object
    ...event,

    //LN - Add the weather information to the event
    // If the weather data is available, use the temperature; otherwise, set a default message
    weather: weatherData[index]?.main?.temp ? `${weatherData[index].main.temp}°C` : 'Weather unavailable'

  }));
}

//LN - The following function displays the events in a specified container element.
// It creates a card for each event with its details and appends it to the container.
export function displayEvents(container) 
{

  container.innerHTML = '';

  window.clubEvents.forEach(event => 
  {

    const card = document.createElement('div');

    card.classList.add('event-card');

    card.innerHTML = `

      <h3>${event.name}</h3>
      <p>Date: ${event.date}</p>
      <p>Location: ${event.location}</p>
      <p>${event.description}</p>
      <p>Weather: ${event.weather}</p>
    `;

    container.appendChild(card);

  });
}

//LN - The following function handles the join form submission.
// It collects the form data, updates the local storage with new member information,
// and displays a welcome message in a modal.
// It also updates the member count and displays friends from the same city.
export function handleJoinForm(form, modal, messageElement, closeButton) 
{

  const members = JSON.parse(localStorage.getItem('members') || '[]');

  const memberCountDisplay = document.getElementById('member-count');

  memberCountDisplay.textContent = `Members: ${members.length}`;

  form.addEventListener('submit', (e) => 
  {

    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const experience = document.getElementById('experience').value;
    const city = document.getElementById('city').value;

    const member = { name, email, experience, city };

    members.push(member);

    localStorage.setItem('members', JSON.stringify(members));

    memberCountDisplay.textContent = `Members: ${members.length}`;

    const cityFriends = members.filter(m => m.city === city && m.name !== name);

    const friendsList = document.getElementById('friends-list');
    const friendsMessage = document.getElementById('friends-message');

    friendsList.innerHTML = '';

    if (cityFriends.length > 0) 
    {

      cityFriends.forEach(friend => {

        const li = document.createElement('li');

        li.textContent = `${friend.name} (${friend.experience})`;

        friendsList.appendChild(li);

      });

      friendsMessage.style.display = 'block';

    } 
    else 
    {
      friendsMessage.style.display = 'none';
    }

    messageElement.textContent = `Welcome, ${name}! You're now a member of the Pretoria Running Club!`;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    closeButton.focus();

    form.reset();
  });
}