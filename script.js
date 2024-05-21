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

document.getElementById("input").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    const input = event.target.value.trim();
    const output = document.getElementById("output");
    event.target.value = "";

    switch (input) {
      case "show_resume":
        output.innerHTML = "<p>Loading resume...</p>";
        setTimeout(() => {
          output.innerHTML =
            "<p><strong>Resume:</strong><br>Name: Aryan Shandilya<br>Experience: Web Developer<br>Skills: HTML, CSS, JavaScript</p>";
        }, 500);
        break;
      case "show_projects":
        output.innerHTML = "<p>Loading projects...</p>";
        setTimeout(() => {
          output.innerHTML =
            '<div class="ascii-container"><pre>' +
            asciiArtProjects +
            "</pre></div>" +
            "<p><strong>Projects:</strong><br>1. Project One - " + loremIpsum.substring(0, 40) + "<br>2. Project Two - " + loremIpsum.substring(0, 40) + "</p>";
        }, 500);
        break;
      case "show_skills":
        output.innerHTML = "<p>Loading skills...</p>";
        setTimeout(() => {
          output.innerHTML =
            '<div class="ascii-container"><pre>' +
            asciiArtSkills +
            "</pre></div>" +
            "<p><strong>Skills:</strong><br>HTML, CSS, JavaScript, React, Node.js</p>";
        }, 500);
        break;
      case "show_contact":
        output.innerHTML = "<p>Loading contact information...</p>";
        setTimeout(() => {
          output.innerHTML =
            "<p><strong>Contact Information:</strong><br>Email: aryan@example.com<br>Phone: 123-456-7890</p>";
        }, 500);
        break;
      case "show_about":
        output.innerHTML = "<p>Loading about section...</p>";
        setTimeout(() => {
          output.innerHTML =
            '<div class="ascii-container"><pre>' +
            asciiArtAbout +
            "</pre></div>" +
            "<p><strong>About Me:</strong><br>Hello! I am Aryan Shandilya, a passionate web developer with a knack for creating elegant and efficient web applications.</p>";
        }, 500);
        break;
      case "hint":
        output.innerHTML =
          "<p>Available commands:<br>1. show_resume - Display resume<br>2. show_projects - Display projects<br>3. show_skills - Display skills<br>4. show_contact - Display contact information<br>5. show_about - Display about section<br>6. show_projects - Display projects</p>";
        break;
      case "show_projects":
        output.innerHTML = "<p>Loading projects section...</p>";
        setTimeout(() => {
          output.innerHTML =
          '<div class="ascii-container"><pre>' +
          asciiArtProjects +
          "</pre></div>" +
          "<p><strong>Projects:</strong><br>1. Project One - " + loremIpsum + "<br>2. Project Two - " + loremIpsum + "</p>";
          }, 500);
        break;
      default:
        output.innerHTML = `<p>Unknown command: ${input}. Type 'hint' for a list of commands.</p>`;
        break;
    }
  }
});

if (
  "true" === localStorage.isDark ||
  (undefined === localStorage.isDark &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
  localStorage.isDark = true;
}

function toggleTheme() {
  document.documentElement.classList.toggle("dark");
  localStorage.isDark = "true" !== localStorage.isDark;
}
