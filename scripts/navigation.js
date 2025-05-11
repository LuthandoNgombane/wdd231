//LN : get the current year and last modified date and display them in the footer
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".menu");

//LN : add an event listener to the hamburger menu icon
hamburger.addEventListener("click", () => {

  //LN : toggle the open class on the nav menu and set aria-expanded attribute
  navMenu.classList.toggle("open");

  //LN : set aria-expanded attribute to true or false based on the open class
  hamburger.setAttribute("aria-expanded", navMenu.classList.contains("open"));
});