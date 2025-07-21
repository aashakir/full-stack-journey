// script.js
document.addEventListener("DOMContentLoaded", () => { // Runs when page is fully loaded
    const form = document.getElementById("contactForm"); // Gets form element
    const dynamicContent = document.getElementById("dynamicContent"); // Gets dynamic content container
  
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
  });