(() => {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation", "eventform");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();


//time 00:00 error handling
document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector("form");
  const timeInput = document.getElementById("time");
  const invalidFeedback = document.querySelector(".invalid-feedback");

  form.addEventListener("submit", function(event) {
    if (timeInput.value === "00:00") {
      event.preventDefault();
      timeInput.classList.add("is-invalid");
      invalidFeedback.textContent = "Time cannot be 00:00";
      invalidFeedback.style.display = "block";
    } else {
      timeInput.classList.remove("is-invalid");
      invalidFeedback.style.display = "none";
    }
  });
});


//edit time event error handling
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const nameInput = document.getElementById("name");
  const descriptionInput = document.getElementById("description");
  const timeInput = document.getElementById("time");
  const organizerInput = document.getElementById("organizer");
  const locationInput = document.getElementById("location");

  form.addEventListener("submit", function (event) {
    let valid = true;

    // Check if time is 00:00
    if (timeInput.value === "00:00") {
      timeInput.classList.add("is-invalid");
      timeInput.nextElementSibling.textContent = "Time cannot be 00:00";
      timeInput.nextElementSibling.style.display = "block";
      valid = false;
    } else {
      timeInput.classList.remove("is-invalid");
      timeInput.nextElementSibling.style.display = "none";
    }

    // Check if name, description, organizer, and location are strings and not numbers
    const stringInputs = [nameInput, descriptionInput, organizerInput, locationInput];
    stringInputs.forEach(input => {
      if (!isNaN(input.value) && input.value.trim() !== "") {
        input.classList.add("is-invalid");
        input.nextElementSibling.textContent = "Enter a valid " + input.name;
        input.nextElementSibling.style.display = "block";
        valid = false;
      } else {
        input.classList.remove("is-invalid");
        input.nextElementSibling.style.display = "none";
      }
    });

    if (!valid) {
      event.preventDefault();
    }
  });
});


//login js
async function fetchSlogan() {
  try {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    document.getElementById("slogan-text").innerText = `"${data.content}"`;
    document.getElementById("slogan-author").innerText = `-${data.author}`;
  } catch (error) {
    console.log("Error");
  }
}
fetchSlogan();
setInterval(fetchSlogan, 60000);

document.getElementById('year').textContent = new Date().getFullYear();

