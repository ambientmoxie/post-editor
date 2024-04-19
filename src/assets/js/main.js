// Todo : refactore

import "../scss/style.scss";
import DomToImage from "dom-to-image";

export async function cloneImage(scale) {
  const postElement = document.querySelector("#post-preview");

  const width = postElement.offsetWidth * scale;
  const height = postElement.offsetHeight * scale;

  const dataUrl = await DomToImage.toJpeg(postElement, {
    quality: 1.0,
    width: width,
    height: height,
    style: {
      transform: `scale(${scale})`,
      transformOrigin: "top left",
    },
  });
  return dataUrl;
}

export async function exportImage() {
  const finalOuputSize = 1200; // Taille d'export souhaité
  const currentPostSize = document.querySelector("#post-preview").offsetWidth;
  const scale = finalOuputSize / currentPostSize;
  const dataUrl = await cloneImage(scale);

  const link = document.createElement("a");
  link.download = "post.jpg";
  link.href = dataUrl;
  link.click();
}

// Function to update post content based on input
export function updatePostContent(postElement, inputElement) {
  postElement.innerText = inputElement.value;
}

// Input Elements

const jobTitleInput = document.getElementById("edit-title");
const jobDescriptionInput = document.getElementById("edit-description");
const jobSalaryInput = document.getElementById("edit-salary");
const jobLocationInput = document.getElementById("edit-location");
const jobContractInput = document.getElementById("edit-contract");

// Post Preview Elements

const jobTitlePost = document.querySelector("#post-top h1");
const jobDescriptionPost = document.querySelector("#post-top p");
const jobSalaryPost = document.querySelector("#post__salary span");
const jobLocationPost = document.querySelector("#post__location span");
const jobContractPost = document.querySelector("#post__contract span");

// Download Button

const downloadPostButton = document.getElementById("download-post-btn");

// Event listener for download button

if (document.getElementById("post-preview")) {
  downloadPostButton.addEventListener("click", exportImage);

  // Prevent default submission for the form

  const postEditForm = document.getElementById("post-edit-form");
  postEditForm.addEventListener("submit", function (event) {
    event.preventDefault();
  });

  // Prevent default action for 'Enter' key in input fields

  const allInputs = document.getElementsByTagName("input");
  Array.from(allInputs).forEach((input) => {
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    });
  });

  // Event listeners for input fields

  jobTitleInput.addEventListener("input", function (event) {
    updatePostContent(jobTitlePost, event.target);
  });

  jobDescriptionInput.addEventListener("input", function (event) {
    updatePostContent(jobDescriptionPost, event.target);
  });

  jobSalaryInput.addEventListener("input", function (event) {
    updatePostContent(jobSalaryPost, event.target);
  });

  jobLocationInput.addEventListener("input", function (event) {
    updatePostContent(jobLocationPost, event.target);
  });

  jobContractInput.addEventListener("input", function (event) {
    updatePostContent(jobContractPost, event.target);
  });

  // Line Selector Buttons

  const lineSelectorButtons = document.querySelectorAll(
    ".description-line-selector"
  );

  lineSelectorButtons.forEach((button) => {
    button.addEventListener("click", function () {
      lineSelectorButtons.forEach((btn) =>
        btn.setAttribute("data-selected", "false")
      );
      this.setAttribute("data-selected", "true");
      jobDescriptionPost.style.webkitLineClamp = this.textContent;
    });
  });
}
