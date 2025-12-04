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
        <div class="contact-container-styled">
            <div class="contact-header">
                <div class="section-title">> CONTACT_ME</div>
            </div>
            <div class="contact-content">
                <div class="contact-details">
                    <div class="resume-item">
                        <span class="key">Name:</span> <span class="value">Aryan Shandilya</span>
                    </div>
                    <div class="resume-item">
                        <span class="key">Phone:</span> <span class="value">9155636600</span>
                    </div>
                    <div class="resume-item">
                        <span class="key">Email:</span> <span class="value">aryanspl2004@gmail.com</span>
                    </div>
                    <div class="resume-item">
                        <span class="key">Location:</span> <span class="value">India</span>
                    </div>
                </div>
                <div id="globe-container"></div>
            </div>
            <div class="map-container">
                <iframe class="map" width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d895.590854908758!2d86.6066867707581!3d26.119691054501807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ee42476ea27161%3A0x5ce605fde284c09!2sChaiti%20Durga%20Mandir!5e0!3m2!1sen!2sin!4v1718263759160!5m2!1sen!2sin"></iframe>
            </div>
        </div>
    `;
        setTimeout(initGlobe, 100); // Slight delay to ensure container exists
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
      case "ask_aryan":
        showChatInterface();
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
            ${createHintLink("ask_aryan")}
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
// Function to display the resume
// Function to display the resume
function displayResume(data) {
  const output = document.getElementById("command-line-output");

  // Helper to create a section header
  const createSection = (title) => `
    <div class="resume-section">
      <div class="section-title">> ${title.toUpperCase()}</div>
    </div>`;

  // Helper for key-value pairs
  const createItem = (key, value) => `
    <div class="resume-item">
      <span class="key">${key}:</span> <span class="value">${value}</span>
    </div>`;

  // Helper for list items
  const createListItem = (item) => `
    <div class="resume-list-item">
      <span class="bullet">-</span> <span class="value">${item}</span>
    </div>`;

  // Helper for complex items (Education, Experience)
  const createComplexItem = (title, subtitle, date, description) => `
    <div class="resume-block">
      <div class="block-header">
        <span class="block-title">${title}</span>
        ${subtitle ? `<span class="block-subtitle"> // ${subtitle}</span>` : ''}
        <span class="block-date">[${date}]</span>
      </div>
      ${description ? `<div class="block-description">${description}</div>` : ''}
    </div>`;

  let html = `<div class="resume-container-styled">`;

  // Header
  html += `
    <div class="resume-header">
      <h1 class="name-title">${data.name}</h1>
      <div class="contact-info">
        ${createItem("Email", data.contact.email)}
        ${createItem("Phone", data.contact.phone)}
      </div>
    </div>`;

  // Objective
  html += createSection("OBJECTIVE");
  html += `<div class="resume-text">"${data.objective}"</div>`;

  // Education
  html += createSection("EDUCATION");
  html += data.education.map(edu =>
    createComplexItem(
      edu.degree,
      `${edu.institution}, ${edu.location}`,
      edu.graduation_date,
      edu.gpa ? `GPA: ${edu.gpa}` : ''
    )
  ).join('');

  // Experience
  html += createSection("EXPERIENCE");
  html += data.experience.map(exp =>
    createComplexItem(
      exp.title,
      `${exp.organization}, ${exp.location}`,
      exp.dates,
      exp.description
    )
  ).join('');

  // Projects
  html += createSection("PROJECTS");
  html += createComplexItem(
    data.project.title,
    '',
    data.project.date,
    data.project.description
  );

  // Skills
  html += createSection("TECHNICAL SKILLS");
  html += `<div class="resume-array">[ ${data.technical_skills.map(s => `"${s}"`).join(', ')} ]</div>`;

  // Coursework
  html += createSection("COURSEWORK");
  html += data.coursework.map(c => createListItem(c)).join('');

  // Activities
  html += createSection("ACTIVITIES");
  html += data.activities.map(a => createListItem(a)).join('');

  // Honors
  html += createSection("HONORS");
  html += data.honors.map(h => createListItem(h)).join('');

  html += `
    <div class="resume-actions">
      <button id="downloadBtn">Download PDF</button>
    </div>
  </div>`;

  output.innerHTML = html;

  // Add event listener for the download button
  document.getElementById("downloadBtn").addEventListener("click", () => {
    // Download the existing PDF instead of generating a new one
    fetch("config.json")
      .then(response => response.json())
      .then(config => {
        const link = document.createElement('a');
        link.href = config.resumePdfPath;
        link.download = 'Aryan_Shandilya_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(err => console.error("Error loading config for download:", err));
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

// Function to initialize 3D Globe
function initGlobe() {
  const container = document.getElementById("globe-container");
  if (!container) return;

  // Clear previous canvas if any
  container.innerHTML = "";

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Create Globe (Wireframe Sphere)
  const geometry = new THREE.SphereGeometry(5, 32, 32);
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00, // Neon Green
    wireframe: true,
    transparent: true,
    opacity: 0.8,
  });
  const globe = new THREE.Mesh(geometry, material);
  scene.add(globe);

  // Add some "stars" or particles around
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 500;
  const posArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 20;
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(posArray, 3)
  );
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    color: 0x00ffff, // Cyan
  });
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  camera.position.z = 10;

  // Orbit Controls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2.0;

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.002;
    particlesMesh.rotation.y -= 0.001;
    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  // Handle Resize
  window.addEventListener("resize", () => {
    if (container) {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }
  });
}

// Chatbot Logic
let resumeTextContent = "";

let chatResumeData = null;

async function getChatResumeData() {
  if (chatResumeData) return chatResumeData;
  try {
    const response = await fetch("chatBot/resumeChat.json");
    chatResumeData = await response.json();
    return chatResumeData;
  } catch (error) {
    console.error("Error loading resumeChat.json:", error);
    return null;
  }
}

// Kept for backward compatibility if needed, but primary data is now chatResumeData
async function getResumeData() {
  return getChatResumeData();
}

async function getResumeText() {
  // Deprecated in favor of structured JSON
  return "";
}

function generatePassageFromNewJSON(data) {
  if (!data || !data.resume) return "";
  const r = data.resume;

  let passage = `My name is ${r.personal_info.name}. `;
  passage += `I am located in ${r.personal_info.location}. `;
  passage += `You can contact me at ${r.personal_info.contact.email} or ${r.personal_info.contact.phone}. `;
  passage += `My LinkedIn is ${r.personal_info.contact.linkedin} and GitHub is ${r.personal_info.contact.github}. `;

  passage += `I have a ${r.education.degree} from ${r.education.institution}. `;

  passage += `My skills include: `;
  if (r.skills.areas) passage += `Areas: ${r.skills.areas.join(", ")}. `;
  if (r.skills.languages) passage += `Languages: ${r.skills.languages.join(", ")}. `;
  if (r.skills.tools) passage += `Tools: ${r.skills.tools.join(", ")}. `;
  if (r.skills.frameworks) passage += `Frameworks: ${r.skills.frameworks.join(", ")}. `;
  if (r.skills.libraries) passage += `Libraries: ${r.skills.libraries.join(", ")}. `;

  if (r.experience) {
    passage += `My experience: `;
    r.experience.forEach(exp => {
      passage += `${exp.role} at ${exp.organization} (${exp.duration}). ${exp.description.join(" ")} `;
    });
  }

  if (r.projects) {
    passage += `My projects: `;
    r.projects.forEach(proj => {
      passage += `${proj.name} (${proj.date}): ${proj.description.join(" ")} Technologies: ${proj.technologies.join(", ")}. `;
    });
  }

  if (r.certificates) {
    passage += `I have earned the following certificates: `;
    r.certificates.forEach(cert => {
      passage += `${cert.title} from ${cert.issuer} (${cert.date}). ${cert.details.join(" ")} `;
    });
  }

  if (r.publications) {
    passage += `My publications include: `;
    r.publications.forEach(pub => {
      passage += `${pub.title} in ${pub.journal} (${pub.status}). ${pub.description.join(" ")} `;
    });
  }

  if (r.extracurricular) {
    passage += `My extracurricular activities include: `;
    r.extracurricular.forEach(extra => {
      passage += `${extra.role} at ${extra.organization} (${extra.duration}). ${extra.description.join(" ")} `;
    });
  }

  if (r.relevant_coursework) {
    passage += `I have studied the following coursework: ${r.relevant_coursework.join(", ")}. `;
  }

  return passage;
}

function keywordFallback(question, data) {
  const q = question.toLowerCase().trim();
  if (!data || !data.resume) return null;
  const r = data.resume;

  console.log("Fallback checking for:", q);

  if (q === "hi" || q === "hello" || q === "hey") {
    return `Hello! I am an AI assistant for ${r.personal_info.name}. Ask me about skills, projects, or experience.`;
  }

  if (q.includes("help") || q.includes("command")) {
    return `Try asking: "What are your skills?", "Tell me about your projects", "Contact info", or "Education".`;
  }

  if (q.includes("email") || q.includes("contact") || q.includes("phone") || q.includes("reach")) {
    return `Email: ${r.personal_info.contact.email}, Phone: ${r.personal_info.contact.phone}. LinkedIn: ${r.personal_info.contact.linkedin}`;
  }

  if (q.includes("skill") || q.includes("technology") || q.includes("stack") || q.includes("language")) {
    return `Languages: ${r.skills.languages.join(", ")}. Frameworks: ${r.skills.frameworks.join(", ")}.`;
  }

  if (q.includes("education") || q.includes("college") || q.includes("university") || q.includes("degree")) {
    return `${r.education.degree} at ${r.education.institution}.`;
  }

  if (q.includes("project")) {
    return r.projects.map(p => `${p.name}: ${p.description[0]}`).join("\n");
  }

  if (q.includes("experience") || q.includes("work") || q.includes("job") || q.includes("internship")) {
    return r.experience.map(e => `${e.role} at ${e.organization} (${e.duration})`).join("\n");
  }

  if (q.includes("name") || q.includes("who are you") || q.includes("who is aryan")) {
    return `I am ${r.personal_info.name}.`;
  }
  if (q.includes("location") || q.includes("live") || q.includes("where") || q.includes("from")) {
    return `I am located in ${r.personal_info.location}.`;
  }

  if (q.includes("certificate") || q.includes("certification")) {
    return r.certificates.map(c => `${c.title} from ${c.issuer}`).join("\n");
  }

  if (q.includes("publication") || q.includes("paper") || q.includes("research")) {
    return r.publications.map(p => `${p.title} (${p.status})`).join("\n");
  }

  if (q.includes("course") || q.includes("subject")) {
    return `I have studied: ${r.relevant_coursework.join(", ")}.`;
  }

  if (q.includes("extra") || q.includes("club") || q.includes("activity")) {
    return r.extracurricular.map(e => `${e.role} at ${e.organization}`).join("\n");
  }

  return null;
}

function showChatInterface() {
  const output = document.getElementById("command-line-output");
  output.innerHTML = `
        <div class="chat-container">
            <div class="chat-header">> ASK_ARYAN_AI</div>
            <div id="chat-messages" class="chat-messages">
                <div class="message ai-message">Hello! I'm Aryan's AI assistant. Ask me anything about his resume, skills, or experience.</div>
            </div>
            <div class="chat-input-container">
                <input type="text" id="chat-input" placeholder="Type your question here..." autocomplete="off">
                <button id="send-chat-btn">Send</button>
            </div>
        </div>
    `;

  const chatInput = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-chat-btn");

  chatInput.focus();

  const handleSend = async () => {
    const question = chatInput.value.trim();
    if (!question) return;

    addMessageToChat(question, "user-message");
    chatInput.value = "";

    // Show loading state
    const loadingId = addMessageToChat("Thinking...", "ai-message");

    try {
      const answer = await getAIResponse(question);
      // Remove loading message and add actual response
      const messagesContainer = document.getElementById("chat-messages");
      messagesContainer.removeChild(messagesContainer.lastElementChild);
      addMessageToChat(answer, "ai-message");
    } catch (error) {
      console.error("AI Error:", error);
      const messagesContainer = document.getElementById("chat-messages");
      messagesContainer.removeChild(messagesContainer.lastElementChild);
      addMessageToChat("Sorry, I encountered an error while processing your request.", "ai-message");
    }
  };

  sendBtn.addEventListener("click", handleSend);
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  });
}

function addMessageToChat(text, className) {
  const messagesContainer = document.getElementById("chat-messages");
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", className);
  messageDiv.textContent = text;
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  return messageDiv;
}

async function getAIResponse(question) {
  try {
    const data = await getChatResumeData();
    if (!data) return "Error loading resume data.";

    // 1. Try TensorFlow.js QnA model FIRST
    console.log("Generating passage from JSON...");
    const resumePassage = generatePassageFromNewJSON(data);

    if (!resumePassage) {
      return "I'm having trouble reading the resume data right now.";
    }

    // Load the model.
    console.log("Loading QnA model...");
    const model = await qna.load();

    // Finding the answers
    console.log("Finding answers for:", question);
    const answers = await model.findAnswers(question, resumePassage);
    console.log("QnA Answers:", answers); // Debugging

    if (answers && answers.length > 0) {
      // Return the top answer
      return answers[0].text;
    }

    // 2. If model fails, try Keyword Fallback
    console.log("Model failed, trying Keyword Fallback...");
    const fallbackAnswer = keywordFallback(question, data);
    if (fallbackAnswer) {
      console.log("Used Keyword Fallback");
      return fallbackAnswer;
    }

    return "I couldn't find a specific answer. Try asking about 'skills', 'education', 'experience', or 'projects'.";

  } catch (error) {
    console.error("Error using TensorFlow.js QnA:", error);
    return "I'm having trouble processing that request right now.";
  }
}
