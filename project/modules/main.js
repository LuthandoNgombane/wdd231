import { loadEvents, displayEvents, handleJoinForm } from '../modules/club.js';

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const eventList = document.getElementById('event-list');
  const joinForm = document.getElementById('join-form');
  const welcomeModal = document.getElementById('welcome-modal');
  const modalMessage = document.getElementById('modal-message');
  const closeModalButton = document.getElementById('close-modal');


  //LN - Initialize event list and join form
  async function init() {

    //LN - Check if current page is index.html and apply try catch for loading events
    if (window.location.pathname.endsWith('index.html') && eventList) 
    {

      try {

        await loadEvents();

        displayEvents(eventList);

      } 
      catch (error) 
      {
        console.error('Error initializing events:', error);
      }

    }

    if (joinForm) 
    {
      handleJoinForm(joinForm, welcomeModal, modalMessage, closeModalButton);
    }

  }

  init();

  //LN - Close modal
  closeModalButton?.addEventListener('click', () => {
    welcomeModal.style.display = 'none';
    welcomeModal.setAttribute('aria-hidden', 'true');
  });

  document.addEventListener('keydown', (e) => {

    if (e.key === 'Escape' && welcomeModal.style.display === 'flex') 
    {

      welcomeModal.style.display = 'none';
      welcomeModal.setAttribute('aria-hidden', 'true');

    }
  });
});