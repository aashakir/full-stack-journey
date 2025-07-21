// script.js
document.addEventListener("DOMContentLoaded", () => { // Runs when page is fully loaded
    const form = document.getElementById("contactForm"); // Gets form element
    const dynamicContent = document.getElementById("dynamicContent"); // Gets dynamic content container
    const changeTextBtn = document.getElementById("changeTextBtn"); // Gets change text button
    const clearContentBtn = document.getElementById("clearContentBtn"); // Gets clear content button
    const addProjectBtn = document.getElementById("addProjectBtn"); // Gets add project button
    const projectList = document.getElementById("projectList"); // Gets project list container
  
    // Initial project data
    const projects = [
      { title: "NewCenturyApps", description: "A full-stack application built with React and Node.js." },
      { title: "AI Chatbot", description: "An AI-powered chatbot using Google AI Essentials." }
    ];
  
    // Populate initial projects
    projects.forEach(project => {
      const projectDiv = document.createElement("div");
      projectDiv.className = "project";
      projectDiv.innerHTML = `<h3>${project.title}</h3><p>${project.description}</p>`;
      projectList.appendChild(projectDiv);
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
  
      // Validates name
      if (name.trim() === "") { // Checks if name is empty
        nameError.style.display = "block"; // Shows name error
        isValid = false; // Sets flag to false
      } else {
        nameError.style.display = "none"; // Hides name error
      }
  
      // Validates email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
      if (!emailPattern.test(email)) { // Checks if email is valid
        emailError.style.display = "block"; // Shows email error
        isValid = false; // Sets flag to false
      } else {
        emailError.style.display = "none"; // Hides email error
      }
  
      // Validates message
      if (message.trim() === "") { // Checks if message is empty
        messageError.style.display = "block"; // Shows message error
        isValid = false; // Sets flag to false
      } else {
        messageError.style.display = "none"; // Hides message error
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
        const projectDiv = document.createElement("div");
        projectDiv.className = "project";
        projectDiv.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
        projectList.appendChild(projectDiv);
      }
    });
  });