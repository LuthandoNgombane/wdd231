//LN : create an array of objects representing courses
//LN : each object should have the following properties: id, credits, completed, category
const courses = [
  { id: "CSE 110", credits: 3, completed: true, category: "CSE" },
  { id: "WDD 130", credits: 2, completed: true, category: "WDD" },
  { id: "CSE 111", credits: 3, completed: true, category: "CSE" },
  { id: "CSE 210", credits: 3, completed: false, category: "CSE" },
  { id: "WDD 131", credits: 2, completed: true, category: "WDD" },
  { id: "WDD 231", credits: 3, completed: false, category: "WDD" }
];

//LN : grab the course list element and the total credits element and the filter buttons
const courseList = document.getElementById("course-list");
const totalCredits = document.getElementById("total-credits");
const filterButtons = document.querySelectorAll(".filter-btn");

//LN : add event listeners to the filter buttons
function displayCourses(filteredCourses) 
{

  courseList.innerHTML = "";

  //LN : loop through the courses array and create a card for each course
  filteredCourses.forEach(course => {

    //LN : create a course card for each course and append it to the course list
    const courseCard = document.createElement("div");

    //LN : add the course id to the course card
    //LN : add a class to the course card based on whether the course is completed or not
    courseCard.className = `course-card ${course.completed ? "completed" : ""}`;

    //LN : add the course id to the course card
    courseCard.textContent = course.id;
    courseList.appendChild(courseCard);
  });

  //LN : calculate the total credits for the filtered courses and update the total credits element
  const credits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
  
  //LN : update the total credits element
  totalCredits.textContent = `Total Credits: ${credits}`;
}

//LN : foreach filter button add an event listener 
filterButtons.forEach(button => {

  //LN : when the button is clicked, remove the active class from all buttons and add it to the clicked button
  button.addEventListener("click", () => {

    //LN : remove the active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove("active"));

    //LN : add the active class to the clicked button
    button.classList.add("active");

    //LN : get the filter value from the button id
    const filter = button.id.replace("filter-", "");

    //LN : filter the courses array based on the filter value
    //LN : if the filter is "all", show all courses, otherwise filter by category
    //LN : use the filter method to filter the courses array based on the selected category
    const filteredCourses = filter === "all" ? courses : courses.filter(course => course.category === filter.toUpperCase());

    //LN : display the filtered courses
    displayCourses(filteredCourses);
  });
});

//LN : display all courses by default
displayCourses(courses);