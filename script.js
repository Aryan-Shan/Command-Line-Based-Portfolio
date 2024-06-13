// Author :- Aryan Shandilya
// Date Created:- 13-6-24
// Open Source Project:- Copyright Free (Except Media)

// Ascii Arts Constants
const asciiArtProjects = `
 ____            _           _       
|  _ \\ _ __ ___ (_) ___  ___| |_ ___ 
| |_) | '__/ _ \\| |/ _ \\/ __| __/ __|
|  __/| | | (_) | |  __/ (__| |_\\__ \\
|_|   |_|  \\___// |\\___|\\___|\\__|___/
              |__/                   
`;

const asciiArtAbout = `
    _    _                 _   
   / \\  | |__   ___  _   _| |_ 
  / _ \\ | '_ \\ / _ \\| | | | __|
 / ___ \\| |_) | (_) | |_| | |_ 
/_/   \\_\\_.__/ \\___/ \\__,_|\\__|
`;

const asciiArtSkills = `
 ____  _    _ _ _     
/ ___|| | _(_) | |___ 
\\___ \\| |/ / | | / __|
 ___) |   <| | | \\__ \\
|____/|_|\\_\\_|_|_|___/
`;

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
const skillsData = {
  labels: ["HTML", "CSS", "JavaScript", "React", "Node.js"], // Initial skill labels
  datasets: [
    {
      label: "Skill Level",
      data: [90, 80, 85, 70, 75], // Initial skill levels
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("command-line-input");
  const output = document.getElementById("command-line-output");
  const title = document.getElementById("title");
  const footer = document.getElementById("footer");
  const backButton = document.querySelector(".btCls");
  let easterEggs = [];

  // Heart icon logic
  const heartIcon = document.querySelector(".heart-icon");
  const likeCounter = document.getElementById("likeCounter");

  let likeCount = localStorage.getItem("likeCount")
    ? parseInt(localStorage.getItem("likeCount"))
    : 0;
  let isLiked = localStorage.getItem("isLiked") === "true";

  likeCounter.textContent = likeCount;

  if (isLiked) {
    heartIcon.classList.add("liked");
  }

  heartIcon.addEventListener("click", function () {
    if (!isLiked) {
      likeCount++;
      heartIcon.classList.add("liked");
      isLiked = true;
    } else {
      likeCount--;
      heartIcon.classList.remove("liked");
      isLiked = false;
    }

    likeCounter.textContent = likeCount;
    localStorage.setItem("likeCount", likeCount);
    localStorage.setItem("isLiked", isLiked);
  });

  // Fetch Easter Eggs from JSON
  fetch("json_files/easter_eggs.json")
    .then((response) => response.json())
    .then((data) => (easterEggs = data))
    .catch((error) => console.error("Error loading easter eggs:", error));

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const command = input.value.trim();
      input.value = "";
      showLoading();
      setTimeout(() => {
        output.innerHTML = "";
        processCommand(command);
        // Show the CMD_dir button only when a command is processed
        backButton.style.display = "block";
      }, 500);
    }
  });

  function showLoading() {
    output.innerHTML = "<p>Loading...</p>";
  }

  function processCommand(command) {
    const easterEgg = easterEggs.find(
      (egg) => egg.command === command.toLowerCase()
    );
    if (easterEgg) {
      output.innerHTML = easterEgg.content;
      return;
    }

    switch (command.toLowerCase()) {
      case "show_resume":
        fetchResume().then((resumeData) => {
          if (resumeData) {
            displayResume(resumeData);
          } else {
            output.innerHTML = "<p>Error loading resume.</p>";
          }
        });
        break;
      case "show_projects":
        loadProjects();
        break;
      case "show_skills":
        output.innerHTML = `
                    <div class="ascii-container"><pre>${asciiArtSkills}</pre></div>
                    <div class="skills">
                        <canvas id="skillsChart"></canvas>
                    </div>
                `;
        renderSkillsChart();
        break;
      case "show_contact":
        output.innerHTML = `
        <div class="contact">
            <h2>Contact Me</h2>
            <p>Name: Aryan Shandilya</p>
            <p>Phone: 9155636600</p>
            <p>Email: aryanspl2004@gmail.com</p>
            <div class="map-container">
                <iframe class="map" width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d895.590854908758!2d86.6066867707581!3d26.119691054501807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ee42476ea27161%3A0x5ce605fde284c09!2sChaiti%20Durga%20Mandir!5e0!3m2!1sen!2sin!4v1718263759160!5m2!1sen!2sin"></iframe>
            </div>
        </div>
    `;
        break;
      case "show_about":
        output.innerHTML = `
                    <div class="ascii-container"><pre>${asciiArtAbout}</pre></div>
                    <div class="about">
                        <h2>Hello There !</h2>
                        <img src="images/dp/dp.jpg" alt="About Image">
                        <p>Hi there! 👋 I'm Aryan Shandilya, a budding Computer Science Engineer aspiring to become a robotics engineer. I'm keenly interested in various fields of computer science, including Web Development, Robotics, and more. I believe an engineer's role is to create value in this world, and that's exactly what I'm determined to do! Thank you for visiting my portfolio. I hope you've gained some insights into my work. Keep exploring – who knows, you may come across surprises!</p>
                    </div>
                `;
        break;
      case "hint":
        showHint();
        // Hide the CMD_dir button when showing the hint section
        backButton.style.display = "none";
        break;
      default:
        output.innerHTML = `<p>Unknown command: ${command}. Type 'hint' for a list of commands.</p>`;
        break;
    }
  }

  function renderSkillsChart() {
    const ctx = document.getElementById("skillsChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: skillsData,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  // Function to dynamically add skills
  function addSkill(label, level) {
    skillsData.labels.push(label);
    skillsData.datasets[0].data.push(level);
  }

  // Function to dynamically remove skills
  function removeSkill(label) {
    const index = skillsData.labels.indexOf(label);
    if (index > -1) {
      skillsData.labels.splice(index, 1);
      skillsData.datasets[0].data.splice(index, 1);
    }
  }

  // Example usage:
  addSkill("Python", 60);
  addSkill("Arduino", 20);
  addSkill("Raspberry Pi", 30);
  addSkill("C++", 50);
  addSkill("Json", 10);
  removeSkill("Node.js");
  removeSkill("React");

  function loadProjects() {
    fetch("json_files/projects.json")
      .then((response) => response.json())
      .then((projects) => {
        output.innerHTML = `
                    <div class="ascii-container"><pre>${asciiArtProjects}</pre></div>
                `;
        projects.forEach((project) => {
          output.innerHTML += `
                        <div class="project">
                            <h2>${project.title}</h2>
                            <img src="${project.image}" alt="Project Image">
                            <p>${project.description}</p>
                            <div class="project-buttons">
                                <a href="${project.demoLink}" target="_blank">Demo</a>
                                <a href="${project.githubLink}" target="_blank">GitHub</a>
                            </div>
                        </div>
                    `;
        });
      })
      .catch((error) => {
        output.innerHTML = "<p>Error loading projects.</p>";
        console.error("Error:", error);
      });
  }

  function showHint() {
    output.innerHTML = `
            <p id="titleCmd">Available commands:</p>
            ${createHintLink("show_resume")}
            ${createHintLink("show_projects")}
            ${createHintLink("show_skills")}
            ${createHintLink("show_contact")}
            ${createHintLink("show_about")}
        `;
  }

  function createHintLink(command) {
    return `<p><a href="#" id="links" class="hint-link" data-command="${command}">${command}</a></p>`;
  }

  output.addEventListener("click", function (e) {
    if (e.target.classList.contains("hint-link")) {
      e.preventDefault();
      const command = e.target.getAttribute("data-command");
      processCommand(command);
    }
  });

  document.querySelector(".back-button").addEventListener("click", showHint);

  if (
    localStorage.isDark === "true" ||
    (localStorage.isDark === undefined &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    localStorage.isDark = true;
  }

  document.getElementById("darkmode").addEventListener("click", function () {
    document.body.classList.toggle("dark");
    localStorage.isDark = document.body.classList.contains("dark");
  });

  function typeEffect(element, text, delay) {
    let i = 0;
    function typing() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, delay);
      }
    }
    typing();
  }

  function displayTitle() {
    const titleText = "Aryan Shandilya";
    const footerText = " | A.S.";
    const titleElement = document.getElementById("title");
    const footerElement = document.getElementById("footer");
    typeEffect(titleElement, titleText, 100);
    typeEffect(footerElement, footerText, 50);
  }

  function setFooterYear() {
    const footerElement = document.getElementById("footer");
    const currentYear = new Date().getFullYear();
    footerElement.innerHTML = `© ${currentYear}`;
  }

  displayTitle();
  setFooterYear();
});

// Fetch the resume data from JSON
function fetchResume() {
  return fetch("json_files/resume.json")
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error loading resume:", error);
      return null;
    });
}

// Function to display the resume
function displayResume(data) {
  const output = document.getElementById("command-line-output");
  output.innerHTML = `
        <div class="resume">
            <h2>${data.name}</h2>
            <div class="contact">
                <p>Email: <em>${data.contact.email}</em></p>
                <p>Phone: <em>${data.contact.phone}</em></p>
            </div>
            <div class="objective">
                <h3>Objective</h3>
                <p>${data.objective}</p>
            </div>
            <div class="education">
                <h3>Education</h3>
                ${data.education
                  .map(
                    (edu) => `
                    <div class="education-item">
                        <p><strong>${edu.degree}</strong>, ${
                      edu.institution
                    }, ${edu.location}</p>
                        <p>Graduation Date: ${edu.graduation_date}</p>
                        ${edu.gpa ? `<p>Percentage: ${edu.gpa}</p>` : ""}
                    </div>
                `
                  )
                  .join("")}
            </div>
            <div class="coursework">
                <h3>Relevant Coursework</h3>
                <ul>
                    ${data.coursework
                      .map((course) => `<li>${course}</li>`)
                      .join("")}
                </ul>
            </div>
            <div class="project">
                <h3>Project</h3>
                <p><strong>${data.project.title}</strong> (${
    data.project.date
  })</p>
                <p>${data.project.description}</p>
            </div>
            <div class="experience">
                <h3>Experience</h3>
                ${data.experience
                  .map(
                    (exp) => `
                    <div class="experience-item">
                        <p><strong>${exp.title}</strong>, ${exp.organization}, ${exp.location} (${exp.dates})</p>
                        <p>${exp.description}</p>
                    </div>
                `
                  )
                  .join("")}
            </div>
            <div class="technical-skills">
                <h3>Technical Skills</h3>
                <p>${data.technical_skills.join(", ")}</p>
            </div>
            <div class="activities">
                <h3>Activities</h3>
                <ul>
                    ${data.activities
                      .map((activity) => `<li>${activity}</li>`)
                      .join("")}
                </ul>
            </div>
            <div class="honors">
                <h3>Honors</h3>
                <ul>
                    ${data.honors.map((honor) => `<li>${honor}</li>`).join("")}
                </ul>
            </div>
        </div>
        <button id="downloadBtn">Download PDF</button>
    `;

  // Add event listener for the download button
  document.getElementById("downloadBtn").addEventListener("click", () => {
    generatePDF(data);
  });
}

function generatePDF(data) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const lineHeight = 10;
  const marginTop = 20;
  const marginBottom = 20;
  const maxLineHeight = 275;

  let y = marginTop;

  // Utility function to make downloadable media and add text and handle new page if needed
  function addText(text, x, lineHeightIncrease = lineHeight) {
    if (y + lineHeightIncrease > maxLineHeight) {
      doc.addPage();
      y = marginTop;
    }
    doc.text(text, x, y);
    y += lineHeightIncrease;
  }

  doc.setFontSize(20);
  addText(data.name, 10, 20);

  doc.setFontSize(12);
  addText(`Email: ${data.contact.email}`, 10);
  addText(`Phone: ${data.contact.phone}`, 10);

  doc.setFontSize(14);
  addText("Objective", 10, 14);
  doc.setFontSize(12);
  doc.text(data.objective, 10, y, { maxWidth: 180 });
  y += 20;

  doc.setFontSize(14);
  addText("Education", 10, 14);
  data.education.forEach((edu) => {
    doc.setFontSize(12);
    addText(`${edu.degree}, ${edu.institution}, ${edu.location}`, 10);
    addText(`Graduation Date: ${edu.graduation_date}`, 10);
    if (edu.gpa) {
      addText(`GPA: ${edu.gpa}`, 10);
    }
    y += 10;
  });

  doc.setFontSize(14);
  addText("Relevant Coursework", 10, 14);
  data.coursework.forEach((course) => {
    doc.setFontSize(12);
    addText(course, 10);
  });

  y += 10;
  doc.setFontSize(14);
  addText("Project", 10, 14);
  doc.setFontSize(12);
  addText(`${data.project.title} (${data.project.date})`, 10);
  doc.text(data.project.description, 10, y, { maxWidth: 180 });
  y += 20;

  doc.setFontSize(14);
  addText("Experience", 10, 14);
  data.experience.forEach((exp) => {
    doc.setFontSize(12);
    addText(
      `${exp.title}, ${exp.organization}, ${exp.location} (${exp.dates})`,
      10
    );
    doc.text(exp.description, 10, y, { maxWidth: 180 });
    y += 20;
  });

  doc.setFontSize(14);
  addText("Technical Skills", 10, 14);
  doc.setFontSize(12);
  addText(data.technical_skills.join(", "), 10);

  y += 20;
  doc.setFontSize(14);
  addText("Activities", 10, 14);
  data.activities.forEach((activity) => {
    doc.setFontSize(12);
    addText(activity, 10);
  });

  y += 10;
  doc.setFontSize(14);
  addText("Honors", 10, 14);
  data.honors.forEach((honor) => {
    doc.setFontSize(12);
    addText(honor, 10);
  });

  doc.save("resume.pdf");
}

// Fetch and display the resume
function fetchResume() {
  fetch("json_files/resume.json")
    .then((response) => response.json())
    .then((data) => displayResume(data))
    .catch((error) => {
      console.error("Error loading resume:", error);
    });
}
