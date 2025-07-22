// script.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const dynamicContent = document.getElementById("dynamicContent");
  const changeTextBtn = document.getElementById("changeTextBtn");
  const clearContentBtn = document.getElementById("clearContentBtn");
  const addProjectBtn = document.getElementById("addProjectBtn");
  const projectList = document.getElementById("projectList");
  const cityInput = document.getElementById("cityInput");
  const getWeatherBtn = document.getElementById("getWeatherBtn");
  const weatherInfo = document.getElementById("weatherInfo");
  const themeToggle = document.getElementById("themeToggle");
  const searchInput = document.getElementById("searchInput");
  const sortBtn = document.getElementById("sortBtn");
  const categoryFilter = document.getElementById("categoryFilter");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  // Navigation toggle
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  // Load theme from localStorage or default to light
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.className = `${savedTheme}-theme`;
  if (savedTheme === "dark") themeToggle.textContent = "Switch to Light Theme";
  else themeToggle.textContent = "Switch to Dark Theme";

  // Load projects from localStorage or use default
  let projects = JSON.parse(localStorage.getItem("projects")) || [
    { title: "NewCenturyApps", description: "A full-stack application built with React and Node.js.", category: "Web Development" },
    { title: "AI Chatbot", description: "An AI-powered chatbot using Google AI Essentials.", category: "AI" }
  ];

  // Populate category filter dropdown
  function updateCategoryFilter() {
    const categories = [...new Set(projects.map(project => project.category))];
    categoryFilter.innerHTML = '<option value="">All Categories</option>';
    categories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  }
  updateCategoryFilter();

  // Populate initial projects with delete and edit buttons
  function renderProjects(filter = "", sorted = false, category = "") {
    projectList.innerHTML = "";
    let filteredProjects = projects.filter(project =>
      (project.title.toLowerCase().includes(filter.toLowerCase()) ||
      project.description.toLowerCase().includes(filter.toLowerCase()) ||
      project.category.toLowerCase().includes(filter.toLowerCase())) &&
      (category === "" || project.category === category)
    );
    if (sorted) {
      filteredProjects.sort((a, b) => a.title.localeCompare(b.title));
    }
    filteredProjects.forEach((project, index) => {
      const projectDiv = document.createElement("div");
      projectDiv.className = `project ${document.body.className}`;
      projectDiv.innerHTML = `<h3>${project.title}</h3><p>${project.description}</p><p><strong>Category:</strong> ${project.category}</p>`;
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "Delete";
      deleteBtn.dataset.index = index;
      const editBtn = document.createElement("button");
      editBtn.className = "edit-btn";
      editBtn.textContent = "Edit";
      editBtn.dataset.index = index;
      projectDiv.appendChild(deleteBtn);
      projectDiv.appendChild(editBtn);
      projectList.appendChild(projectDiv);
    });
    localStorage.setItem("projects", JSON.stringify(projects));
  }
  renderProjects();

  // Event delegation for project list
  projectList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
      const index = event.target.dataset.index;
      projects.splice(index, 1);
      renderProjects(searchInput.value, false, categoryFilter.value);
      updateCategoryFilter();
    } else if (event.target.classList.contains("edit-btn")) {
      const index = event.target.dataset.index;
      const project = projects[index];
      const newTitle = prompt("Edit project title:", project.title);
      const newDescription = prompt("Edit project description:", project.description);
      const newCategory = prompt("Edit project category:", project.category);
      if (newTitle && newDescription && newCategory) {
        projects[index] = { title: newTitle, description: newDescription, category: newCategory };
        renderProjects(searchInput.value, false, categoryFilter.value);
        updateCategoryFilter();
      }
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = true;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    if (name.trim() === "" || name.trim().length < 2) {
      nameError.style.display = "block";
      isValid = false;
    } else {
      nameError.style.display = "none";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      emailError.style.display = "block";
      isValid = false;
    } else {
      emailError.style.display = "none";
    }

    if (message.trim() === "" || message.trim().length < 10) {
      messageError.style.display = "block";
      isValid = false;
    } else {
      messageError.style.display = "none";
    }

    if (isValid) {
      alert("Form submitted successfully!");
      form.reset();
      addDynamicContent();
    }
  });

  function addDynamicContent() {
    const newContent = document.createElement("p");
    newContent.textContent = "Thank you for your message! I'll get back to you soon.";
    dynamicContent.appendChild(newContent);
  }

  changeTextBtn.addEventListener("click", () => {
    const newText = prompt("Enter new text:");
    if (newText) {
      dynamicContent.innerHTML = `<p>${newText}</p>`;
    }
  });

  clearContentBtn.addEventListener("click", () => {
    dynamicContent.innerHTML = "";
  });

  addProjectBtn.addEventListener("click", () => {
    const title = prompt("Enter project title:");
    const description = prompt("Enter project description:");
    const category = prompt("Enter project category:");
    if (title && description && category) {
      projects.push({ title, description, category });
      renderProjects(searchInput.value, false, categoryFilter.value);
      updateCategoryFilter();
    }
  });

  getWeatherBtn.addEventListener("click", () => {
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

  themeToggle.addEventListener("click", () => {
    if (document.body.className === "light-theme") {
      document.body.className = "dark-theme";
      themeToggle.textContent = "Switch to Light Theme";
      localStorage.setItem("theme", "dark");
    } else {
      document.body.className = "light-theme";
      themeToggle.textContent = "Switch to Dark Theme";
      localStorage.setItem("theme", "light");
    }
    renderProjects(searchInput.value, false, categoryFilter.value);
  });

  searchInput.addEventListener("input", () => {
    renderProjects(searchInput.value, false, categoryFilter.value);
  });

  sortBtn.addEventListener("click", () => {
    renderProjects(searchInput.value, true, categoryFilter.value);
  });

  categoryFilter.addEventListener("change", () => {
    renderProjects(searchInput.value, false, categoryFilter.value);
  });
});