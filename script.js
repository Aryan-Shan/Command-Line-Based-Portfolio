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
    const backButton = document.querySelector('.btCls');

    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const command = input.value.trim();
            input.value = '';
            showLoading();
            setTimeout(() => {
                output.innerHTML = '';
                processCommand(command);
                // Show the CMD_dir button only when a command is processed
                backButton.style.display = 'block';
            }, 500);
        }
    });

    function showLoading() {
        output.innerHTML = '<p>Loading...</p>';
    }

    function processCommand(command) {
        switch (command.toLowerCase()) {
            case 'show_resume':
                output.innerHTML = `
                    <div class="about">
                        <h2>Resume</h2>
                        <p>Name: Aryan Shandilya</p>
                        <p>Experience: Web Developer</p>
                        <p>Skills: HTML, CSS, JavaScript</p>
                    </div>
                `;
                break;
            case 'show_projects':
                output.innerHTML = `
                    <div class="ascii-container"><pre>${asciiArtProjects}</pre></div>
                    <div class="project">
                        <h2>Project One</h2>
                        <img src="images/1.jpg" alt="Project Image">
                        <p>${loremIpsum.substring(0, 200)}</p>
                        <div class="project-buttons">
                            <a href="https://example.com/demo1" target="_blank">Project Demo</a>
                            <a href="https://github.com/aryan/project1" target="_blank">GitHub</a>
                        </div>
                    </div>
                    <div class="project">
                        <h2>Project Two</h2>
                        <img src="images/2.jpg" alt="Project Image">
                        <p>${loremIpsum.substring(0, 200)}</p>
                        <div class="project-buttons">
                            <a href="https://example.com/demo2" target="_blank">Project Demo</a>
                            <a href="https://github.com/aryan/project2" target="_blank">GitHub</a>
                        </div>
                    </div>
                `;
                break;
            case 'show_skills':
                output.innerHTML = `
                    <div class="ascii-container"><pre>${asciiArtSkills}</pre></div>
                    <div class="skills">
                        <h2>Skills</h2>
                        <p>HTML, CSS, JavaScript, React, Node.js</p>
                    </div>
                `;
                break;
            case 'show_contact':
                output.innerHTML = `
                    <div class="contact">
                        <h2>Contact Information</h2>
                        <img src="images/3.jpg" alt="Contact Image">
                        <p>Email: aryan@example.com</p>
                        <p>Phone: 123-456-7890</p>
                    </div>
                `;
                break;
            case 'show_about':
                output.innerHTML = `
                    <div class="ascii-container"><pre>${asciiArtAbout}</pre></div>
                    <div class="about">
                        <h2>About Me</h2>
                        <img src="images/3.jpg" alt="About Image">
                        <p>Hello! I am Aryan Shandilya, a passionate web developer with a knack for creating elegant and efficient web applications.</p>
                    </div>
                `;
                break;
            case 'hint':
                showHint();
                // Hide the CMD_dir button when showing the hint section
                backButton.style.display = 'none';
                break;
            default:
                output.innerHTML = `<p>Unknown command: ${command}. Type 'hint' for a list of commands.</p>`;
                break;
        }
    }

    function showHint() {
        output.innerHTML = `
        <p style="color: rgb(255, 255, 255); font-weight: bold;">Available commands:</p>
            ${createHintLink('show_resume')}
            ${createHintLink('show_projects')}
            ${createHintLink('show_skills')}
            ${createHintLink('show_contact')}
            ${createHintLink('show_about')}
        `;
    }

    function createHintLink(command) {
        return `<p><a href="#" class="hint-link" data-command="${command}">${command}</a></p>`;
    }

    output.addEventListener('click', function (e) {
        if (e.target.classList.contains('hint-link')) {
            e.preventDefault();
            const command = e.target.getAttribute('data-command');
            processCommand(command);
        }
    });

    document.querySelector('.back-button').addEventListener('click', showHint);

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