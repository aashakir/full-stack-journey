// script.js
document.addEventListener("DOMContentLoaded", () => { // Runs when page is fully loaded
  const form = document.getElementById("contactForm"); // Gets form element
  const dynamicContent = document.getElementById("dynamicContent"); // Gets dynamic content container
  const changeTextBtn = document.getElementById("changeTextBtn"); // Gets change text button
  const clearContentBtn = document.getElementById("clearContentBtn"); // Gets clear content button
  const addProjectBtn = document.getElementById("addProjectBtn"); // Gets add project button
  const projectList = document.getElementById("projectList"); // Gets project list container
  const cityInput = document.getElementById("cityInput"); // Gets city input
  const getWeatherBtn = document.getElementById("getWeatherBtn"); // Gets weather button
  const weatherInfo = document.getElementById("weatherInfo"); // Gets weather info display
  const themeToggle = document.getElementById("themeToggle"); // Gets theme toggle button
  const searchInput = document.getElementById("searchInput"); // Gets search input
  const sortBtn = document.getElementById("sortBtn"); // Gets sort button

  // Load theme from localStorage or default to light
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.className = `${savedTheme}-theme`;
  if (savedTheme === "dark") themeToggle.textContent = "Switch to Light Theme";
  else themeToggle.textContent = "Switch to Dark Theme";

  // Load projects from localStorage or use default
  let projects = JSON.parse(localStorage.getItem("projects")) || [
    { title: "NewCenturyApps", description: "A full-stack application built with React and Node.js." },
    { title: "AI Chatbot", description: "An AI-powered chatbot using Google AI Essentials." }
  ];

  // Populate initial projects with delete and edit buttons
  function renderProjects(filter = "", sorted = false) {
    projectList.innerHTML = ""; // Clear existing projects
    let filteredProjects = projects.filter(project =>
      project.title.toLowerCase().includes(filter.toLowerCase()) ||
      project.description.toLowerCase().includes(filter.toLowerCase())
    );
    if (sorted) {
      filteredProjects.sort((a, b) => a.title.localeCompare(b.title));
    }
    filteredProjects.forEach((project, index) => {
      const projectDiv = document.createElement("div");
      projectDiv.className = `project ${document.body.className}`;
      projectDiv.innerHTML = `<h3>${project.title}</h3><p>${project.description}</p>`;
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "Delete";
      deleteBtn.dataset.index = index; // Store index for deletion
      const editBtn = document.createElement("button");
      editBtn.className = "edit-btn";
      editBtn.textContent = "Edit";
      editBtn.dataset.index = index; // Store index for editing
      projectDiv.appendChild(deleteBtn);
      projectDiv.appendChild(editBtn);
      projectList.appendChild(projectDiv);
    });
    localStorage.setItem("projects", JSON.stringify(projects)); // Save to localStorage
  }
  renderProjects();

  // Event delegation for project list
  projectList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
      const index = event.target.dataset.index;
      projects.splice(index, 1); // Remove project from array
      renderProjects(searchInput.value); // Re-render with current search filter
    } else if (event.target.classList.contains("edit-btn")) {
      const index = event.target.dataset.index;
      const project = projects[index];
      const newTitle = prompt("Edit project title:", project.title);
      const newDescription = prompt("Edit project description:", project.description);
      if (newTitle && newDescription) {
        projects[index] = { title: newTitle, description: newDescription };
        renderProjects(searchInput.value); // Re-render with current search filter
      }
    }
  });

  form.addEventListener("submit", (event) => { // Listens for form submission
    event.preventDefault(); // Prevents default form submission
    let isValid = true; // Sets initial validation flag
    const name = document.getElementById("name").value; // Gets name input value
    const email = document.getElementById("email").value; // Gets email input value
    const message = document.getElementById("message").value; // Gets message input value
    const nameError = document.getElementById("nameError"); // Gets name error element
    const emailError = document.getElementById("emailError"); // Gets email error element
    const messageError = document.getElementById("messageError"); // Gets message error element

    // Enhanced validation
    if (name.trim() === "" || name.trim().length < 2) { // Checks name length
      nameError.style.display = "block";
      isValid = false;
    } else {
      nameError.style.display = "none";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
    if (!emailPattern.test(email)) { // Checks email format
      emailError.style.display = "block";
      isValid = false;
    } else {
      emailError.style.display = "none";
    }

    if (message.trim() === "" || message.trim().length < 10) { // Checks message length
      messageError.style.display = "block";
      isValid = false;
    } else {
      messageError.style.display = "none";
    }

    if (isValid) { // If all validations pass
      alert("Form submitted successfully!"); // Shows success alert
      form.reset(); // Resets form
      addDynamicContent(); // Calls function to add dynamic content
    }
  });

  function addDynamicContent() { // Adds dynamic content
    const newContent = document.createElement("p"); // Creates new paragraph element
    newContent.textContent = "Thank you for your message! I'll get back to you soon."; // Sets text content
    dynamicContent.appendChild(newContent); // Adds paragraph to container
  }

  changeTextBtn.addEventListener("click", () => { // Listens for change text button click
    const newText = prompt("Enter new text:"); // Prompts user for new text
    if (newText) { // If text is provided
      dynamicContent.innerHTML = `<p>${newText}</p>`; // Updates dynamic content
    }
  });

  clearContentBtn.addEventListener("click", () => { // Listens for clear content button click
    dynamicContent.innerHTML = ""; // Clears dynamic content
  });

  addProjectBtn.addEventListener("click", () => { // Listens for add project button click
    const title = prompt("Enter project title:");
    const description = prompt("Enter project description:");
    if (title && description) { // If both fields are provided
      projects.push({ title, description });
      renderProjects(searchInput.value); // Re-render with current search filter
    }
  });

  getWeatherBtn.addEventListener("click", () => { // Listens for weather button click
    const city = cityInput.value.trim();
    if (city) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`)
        .then(response => {
          if (!response.ok) throw new Error("City not found");
          return response.json();
        })
        .then(data => {
          weatherInfo.textContent = `Weather in ${data.name}: ${data.main.temp}°C, ${data.weather[0].description}`;
        })
        .catch(error => {
          weatherInfo.textContent = "Error fetching weather data. Please try again.";
          console.error("Error:", error);
        });
    } else {
      weatherInfo.textContent = "Please enter a city name.";
    }
  });

  themeToggle.addEventListener("click", () => { // Listens for theme toggle button click
    if (document.body.className === "light-theme") {
      document.body.className = "dark-theme";
      themeToggle.textContent = "Switch to Light Theme";
      localStorage.setItem("theme", "dark");
    } else {
      document.body.className = "light-theme";
      themeToggle.textContent = "Switch to Dark Theme";
      localStorage.setItem("theme", "light");
    }
    renderProjects(searchInput.value); // Re-render projects with new theme and search filter
  });

  searchInput.addEventListener("input", () => { // Listens for search input changes
    renderProjects(searchInput.value); // Re-render projects with search filter
  });

  sortBtn.addEventListener("click", () => { // Listens for sort button click
    renderProjects(searchInput.value, true); // Re-render with sorting
  });
});