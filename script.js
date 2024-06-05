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
                    <p>Skills: HTML, CSS, JavaScript</p>
                `;
                addNavigationButton('Resume', 'resume');
                break;
            case 'show_projects':
                output.innerHTML = `
                    <div class="ascii-container"><pre>${asciiArtProjects}</pre></div>
                    <p><strong>Projects:</strong></p>
                    <p>1. Project One - ${loremIpsum.substring(0, 40)}</p>
                    <p>2. Project Two - ${loremIpsum.substring(0, 40)}</p>
                `;
                addNavigationButton('Projects', 'projects');
                break;
            case 'show_skills':
                output.innerHTML = `
                    <div class="ascii-container"><pre>${asciiArtSkills}</pre></div>
                    <p><strong>Skills:</strong></p>
                    <p>HTML, CSS, JavaScript, React, Node.js</p>
                `;
                addNavigationButton('Skills', 'skills');
                break;
            case 'show_contact':
                output.innerHTML = `
                    <p><strong>Contact Information:</strong></p>
                    <p>Email: aryan@example.com</p>
                    <p>Phone: 123-456-7890</p>
                `;
                addNavigationButton('Contact', 'contact');
                break;
            case 'show_about':
                output.innerHTML = `
                    <div class="ascii-container"><pre>${asciiArtAbout}</pre></div>
                    <p><strong>About Me:</strong></p>
                    <p>Hello! I am Aryan Shandilya, a passionate web developer with a knack for creating elegant and efficient web applications.</p>
                `;
                addNavigationButton('About', 'about');
                break;
            case 'hint':
                output.innerHTML = `
                    <p>Available commands:</p>
                    <p>1. show_resume - Display resume</p>
                    <p>2. show_projects - Display projects</p>
                    <p>3. show_skills - Display skills</p>
                    <p>4. show_contact - Display contact information</p>
                    <p>5. show_about - Display about section</p>
                `;
                break;
            default:
                output.innerHTML = `<p>Unknown command: ${command}. Type 'hint' for a list of commands.</p>`;
                break;
        }
    }
  
    function addNavigationButton(label, section) {
        const button = document.createElement('button');
        button.textContent = `Visit ${label}`;
        button.onclick = function () {
            scrollToSection(section);
        };
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
