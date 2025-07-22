// Wait for the page to fully load before running the code
document.addEventListener("DOMContentLoaded", () => {
  // Get the contact form element
  const form = document.getElementById("contactForm");
  // Get the dynamic content area
  const dynamicContent = document.getElementById("dynamicContent");
  // Get the change text button
  const changeTextBtn = document.getElementById("changeTextBtn");
  // Get the clear content button
  const clearContentBtn = document.getElementById("clearContentBtn");
  // Get the add project button
  const addProjectBtn = document.getElementById("addProjectBtn");
  // Get the project list container
  const projectList = document.getElementById("projectList");
  // Get the city input for weather
  const cityInput = document.getElementById("cityInput");
  // Get the get weather button
  const getWeatherBtn = document.getElementById("getWeatherBtn");
  // Get the weather info area
  const weatherInfo = document.getElementById("weatherInfo");
  // Get the theme toggle button
  const themeToggle = document.getElementById("themeToggle");
  // Get the search input
  const searchInput = document.getElementById("searchInput");
  // Get the sort button
  const sortBtn = document.getElementById("sortBtn");
  // Get the category filter dropdown
  const categoryFilter = document.getElementById("categoryFilter");
  // Get the navigation toggle button
  const navToggle = document.getElementById("navToggle");
  // Get the navigation menu
  const navMenu = document.getElementById("navMenu");

  // Toggle the navigation menu when the hamburger is clicked
  navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
  });

  // Initialize Google Map with a default location
  function initMap() {
      // Set the map center to Islamabad as an example
      const location = { lat: 33.6844, lng: 73.0479 };
      // Create the map in the contactMap div
      const map = new google.maps.Map(document.getElementById("contactMap"), {
          center: location,
          zoom: 12,
          styles: [
              { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
              { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
              { elementType: "labels.text.fill", stylers: [{ color: "#2c3e50" }] }
          ]
      });
      // Add a marker at the location
      new google.maps.Marker({
          position: location,
          map: map,
          icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: "#3498db",
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: "#fff"
          }
      });
  }

  // Load the saved theme or default to light
  const savedTheme = localStorage.getItem("theme") || "light";
  // Apply the theme to the body
  document.body.className = `${savedTheme}-theme`;
  // Set button text based on current theme
  if (savedTheme === "dark") themeToggle.textContent = "Switch to Light Theme";
  else themeToggle.textContent = "Switch to Dark Theme";

  // Load projects from storage or use default ones
  let projects = JSON.parse(localStorage.getItem("projects")) || [
      { title: "NewCenturyApps", description: "A full-stack app built with React and Node.js.", category: "Web Development" },
      { title: "AI Chatbot", description: "An AI-powered chatbot using advanced algorithms.", category: "AI" }
  ];

  // Update the category filter dropdown with unique categories
  function updateCategoryFilter() {
      // Get unique categories from projects
      const categories = [...new Set(projects.map(project => project.category))];
      // Clear and reset the dropdown
      categoryFilter.innerHTML = '<option value="">All Categories</option>';
      // Add each category as an option
      categories.forEach(category => {
          const option = document.createElement("option");
          option.value = category;
          option.textContent = category;
          categoryFilter.appendChild(option);
      });
  }
  updateCategoryFilter();

  // Render projects based on filters and sorting
  function renderProjects(filter = "", sorted = false, category = "") {
      // Clear the current project list
      projectList.innerHTML = "";
      // Filter projects by search term and category
      let filteredProjects = projects.filter(project =>
          (project.title.toLowerCase().includes(filter.toLowerCase()) ||
          project.description.toLowerCase().includes(filter.toLowerCase()) ||
          project.category.toLowerCase().includes(filter.toLowerCase())) &&
          (category === "" || project.category === category)
      );
      // Sort projects if requested
      if (sorted) {
          filteredProjects.sort((a, b) => a.title.localeCompare(b.title));
      }
      // Create a div for each project
      filteredProjects.forEach((project, index) => {
          const projectDiv = document.createElement("div");
          projectDiv.className = `project ${document.body.className}`;
          // Add project details inside the div
          projectDiv.innerHTML = `<h3 class="project-title">${project.title}</h3><p class="project-desc">${project.description}</p><p><strong>Category:</strong> ${project.category}</p>`;
          // Create delete button
          const deleteBtn = document.createElement("button");
          deleteBtn.className = "delete-btn";
          deleteBtn.textContent = "Delete";
          deleteBtn.dataset.index = index;
          // Create edit button
          const editBtn = document.createElement("button");
          editBtn.className = "edit-btn";
          editBtn.textContent = "Edit";
          editBtn.dataset.index = index;
          // Add buttons to the project div
          projectDiv.appendChild(deleteBtn);
          projectDiv.appendChild(editBtn);
          // Add the project div to the list
          projectList.appendChild(projectDiv);
      });
      // Save updated projects to local storage
      localStorage.setItem("projects", JSON.stringify(projects));
  }
  renderProjects();

  // Handle clicks on project list for delete or edit
  projectList.addEventListener("click", (event) => {
      // Delete a project if delete button is clicked
      if (event.target.classList.contains("delete-btn")) {
          const index = event.target.dataset.index;
          projects.splice(index, 1);
          renderProjects(searchInput.value, false, categoryFilter.value);
          updateCategoryFilter();
      // Edit a project if edit button is clicked
      } else if (event.target.classList.contains("edit-btn")) {
          const index = event.target.dataset.index;
          const project = projects[index];
          // Prompt for new title
          const newTitle = prompt("Edit project title:", project.title);
          // Prompt for new description
          const newDescription = prompt("Edit project description:", project.description);
          // Prompt for new category
          const newCategory = prompt("Edit project category:", project.category);
          // Update project if all fields are filled
          if (newTitle && newDescription && newCategory) {
              projects[index] = { title: newTitle, description: newDescription, category: newCategory };
              renderProjects(searchInput.value, false, categoryFilter.value);
              updateCategoryFilter();
          }
      }
  });

  // Handle form submission
  form.addEventListener("submit", (event) => {
      // Prevent the default form submission
      event.preventDefault();
      // Assume the form is valid initially
      let isValid = true;
      // Get the name input value
      const name = document.getElementById("name").value;
      // Get the email input value
      const email = document.getElementById("email").value;
      // Get the message input value
      const message = document.getElementById("message").value;
      // Get the name error div
      const nameError = document.getElementById("nameError");
      // Get the email error div
      const emailError = document.getElementById("emailError");
      // Get the message error div
      const messageError = document.getElementById("messageError");

      // Validate name
      if (name.trim() === "" || name.trim().length < 2) {
          nameError.style.display = "block";
          isValid = false;
      } else {
          nameError.style.display = "none";
      }

      // Validate email with a pattern
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
          emailError.style.display = "block";
          isValid = false;
      } else {
          emailError.style.display = "none";
      }

      // Validate message
      if (message.trim() === "" || message.trim().length < 10) {
          messageError.style.display = "block";
          isValid = false;
      } else {
          messageError.style.display = "none";
      }

      // If all validations pass, show success
      if (isValid) {
          alert("Thank you! Your message has been sent.");
          form.reset();
          addDynamicContent();
      }
  });

  // Function to add a thank-you message
  function addDynamicContent() {
      // Create a new paragraph element
      const newContent = document.createElement("p");
      // Set the text to thank the user
      newContent.textContent = "Thank you for your message! I’ll get back to you soon.";
      // Add the paragraph to the dynamic content area
      dynamicContent.appendChild(newContent);
  }

  // Change text when button is clicked
  changeTextBtn.addEventListener("click", () => {
      // Prompt user for new text
      const newText = prompt("Enter new text:");
      // Update dynamic content if text is provided
      if (newText) {
          dynamicContent.innerHTML = `<p>${newText}</p>`;
      }
  });

  // Clear dynamic content when button is clicked
  clearContentBtn.addEventListener("click", () => {
      // Remove all content from the dynamic area
      dynamicContent.innerHTML = "";
  });

  // Add a new project when button is clicked
  addProjectBtn.addEventListener("click", () => {
      // Prompt for project title
      const title = prompt("Enter project title:");
      // Prompt for project description
      const description = prompt("Enter project description:");
      // Prompt for project category
      const category = prompt("Enter project category:");
      // Add project if all fields are filled
      if (title && description && category) {
          projects.push({ title, description, category });
          renderProjects(searchInput.value, false, categoryFilter.value);
          updateCategoryFilter();
      }
  });

  // Get weather data when button is clicked
  getWeatherBtn.addEventListener("click", () => {
      // Get and trim the city input
      const city = cityInput.value.trim();
      // Proceed if a city is entered
      if (city) {
          // Fetch weather data from OpenWeatherMap
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`)
              .then(response => {
                  // Throw error if response is not okay
                  if (!response.ok) throw new Error("City not found");
                  // Parse the JSON response
                  return response.json();
              })
              .then(data => {
                  // Display the weather information
                  weatherInfo.textContent = `Weather in ${data.name}: ${data.main.temp}°C, ${data.weather[0].description}`;
              })
              .catch(error => {
                  // Show error message if fetch fails
                  weatherInfo.textContent = "Error fetching weather data. Please try again.";
                  console.error("Error:", error);
              });
      } else {
          // Show prompt if no city is entered
          weatherInfo.textContent = "Please enter a city name.";
      }
  });

  // Toggle theme when button is clicked
  themeToggle.addEventListener("click", () => {
      // Switch to dark theme if currently light
      if (document.body.className === "light-theme") {
          document.body.className = "dark-theme";
          themeToggle.textContent = "Switch to Light Theme";
          localStorage.setItem("theme", "dark");
      } else {
          // Switch to light theme if currently dark
          document.body.className = "light-theme";
          themeToggle.textContent = "Switch to Dark Theme";
          localStorage.setItem("theme", "light");
      }
      // Re-render projects with new theme
      renderProjects(searchInput.value, false, categoryFilter.value);
  });

  // Filter projects as user types in search
  searchInput.addEventListener("input", () => {
      renderProjects(searchInput.value, false, categoryFilter.value);
  });

  // Sort projects when sort button is clicked
  sortBtn.addEventListener("click", () => {
      renderProjects(searchInput.value, true, categoryFilter.value);
  });

  // Filter projects based on category selection
  categoryFilter.addEventListener("change", () => {
      renderProjects(searchInput.value, false, categoryFilter.value);
  });
});