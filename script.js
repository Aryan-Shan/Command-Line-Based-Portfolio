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
                    loadProjects();
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
                    <div class="contact-form">
                        <h1>Contact Me</h1>
                        <form id="contactForm">
                            <div class="form-group">
                                <label for="name">Name:</label>
                                <input type="text" id="name" name="name" required>
                            </div>
                            <div class="form-group">
                                <label for="email">Email:</label>
                                <input type="email" id="email" name="email" required>
                            </div>
                            <div class="form-group">
                                <label for="message">Message:</label>
                                <textarea id="message" name="message" rows="5" required></textarea>
                            </div>
                            <button type="submit">Send</button>
                        </form>
                    </div>
                `;
                document.getElementById('contactForm').addEventListener('submit', function (e) {
                    e.preventDefault();
                    sendEmail();
                });
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
    function loadProjects() {
        fetch('projects.json')
            .then(response => response.json())
            .then(projects => {
                output.innerHTML = `
                    <div class="ascii-container"><pre>${asciiArtProjects}</pre></div>
                `;
                projects.forEach(project => {
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
            .catch(error => {
                output.innerHTML = '<p>Error loading projects.</p>';
                console.error('Error:', error);
            });
    }
    function showHint() {
        output.innerHTML = `
        <p id="titleCmd">Available commands:</p>
            ${createHintLink('show_resume')}
            ${createHintLink('show_projects')}
            ${createHintLink('show_skills')}
            ${createHintLink('show_contact')}
            ${createHintLink('show_about')}
        `;
    }

    function createHintLink(command) {
        return `<p><a href="#" id="links" class="hint-link" data-command="${command}">${command}</a></p>`;
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


    if (
        localStorage.isDark === "true" ||
        (localStorage.isDark === undefined &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
        document.body.classList.add("dark");
        localStorage.isDark = true;
    }

    document.getElementById('darkmode').addEventListener('click', function () {
        document.body.classList.toggle('dark');
        localStorage.isDark = document.body.classList.contains('dark');
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
    typeEffect(footer, "© 2024 | Made with ❤️ by a.s", 50);

    // EmailJS integration
    (function(){
        emailjs.init("YOUR_EMAILJS_USER_ID"); // Replace with your EmailJS user ID
    })();

    function sendEmail() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const templateParams = {
            from_name: name,
            from_email: email,
            message: message
        };

        emailjs.send("YOUR_EMAILJS_SERVICE_ID", "YOUR_EMAILJS_TEMPLATE_ID", templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Your message has been sent!');
            }, function(error) {
                console.log('FAILED...', error);
                alert('Failed to send the message. Please try again.');
            });
    }
});
