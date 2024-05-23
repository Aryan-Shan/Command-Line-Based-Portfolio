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

document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('command-line-input');
    const output = document.getElementById('command-line-output');
    const title = document.getElementById('title');
    const footer = document.getElementById('footer');

    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const command = input.value.trim();
            input.value = '';
            showLoading();
            setTimeout(() => {
                output.innerHTML = '';
                processCommand(command);
            }, 500); // Simulate loading time
        }
    });

    function showLoading() {
        output.innerHTML = '<p>Loading...</p>';
    }

    function processCommand(command) {
      switch (command.toLowerCase()) {
          case 'show_resume':
              output.innerHTML = `
                  <p><strong>Resume:</strong></p>
                  <p>Name: Aryan Shandilya</p>
                  <p>Experience: Web Developer</p>
              `;
              addButton("Go to Projects", "projects.html");
              break;
          case 'show_projects':
              output.innerHTML = `
                  <p><strong>Projects:</strong></p>
                  <p>1. Project One</p>
                  <p>2. Project Two</p>
              `;
              addButton("Go to Resume", "resume.html");
              break;
          // Other cases...
          default:
              output.innerHTML = `<p>Unknown command: ${command}. Type 'hint' for a list of commands.</p>`;
              break;
      }
  }
  
  function addButton(label, link) {
      const button = document.createElement('button');
      button.textContent = label;
      button.addEventListener('click', function() {
          window.location.href = link;
      });
      output.appendChild(button);
  }
  

    // Dark mode toggle
    if (
        localStorage.isDark === "true" ||
        (localStorage.isDark === undefined &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
        document.documentElement.classList.add("dark");
        localStorage.isDark = true;
    }

    document.getElementById('darkmode').addEventListener('click', function () {
        document.documentElement.classList.toggle('dark');
        localStorage.isDark = document.documentElement.classList.contains('dark');
    });

    // Typing effect for title and footer
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

    typeEffect(title, "Aryan Shandilya", 100);
    typeEffect(footer, "© 2024 Aryan Shandilya. All rights reserved.", 50);
});
