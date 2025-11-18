document.addEventListener("DOMContentLoaded", () => {
    const generateHtmlBtn = document.getElementById("generate-html-btn");

    if (!generateHtmlBtn) return;

    generateHtmlBtn.addEventListener("click", () => {
        // Extract form data
        const formData = extractFormData();

        // Generate HTML string
        const htmlString = generateHtmlString(formData);

        // Hide the form
        const form = document.getElementById("intro-form");
        if (form) {
            form.style.display = "none";
        }

        // Replace the form with formatted HTML display
        displayHtmlOutput(htmlString);

        // Update H2 title
        const h2Elements = document.querySelectorAll("main h2");
        if (h2Elements.length > 0) {
            h2Elements[0].textContent = "Introduction HTML";
        }
    });

    function extractFormData() {
        // Extract personal details
        const firstName = document.getElementById("first-name") ? document.getElementById("first-name").value : "";
        const middleName = document.getElementById("middle-name") ? document.getElementById("middle-name").value : "";
        const lastName = document.getElementById("last-name") ? document.getElementById("last-name").value : "";

        // Extract mascot info
        const mascotAdjective = document.getElementById("mascot-adjective") ? document.getElementById("mascot-adjective").value : "";
        const mascotAnimal = document.getElementById("mascot-animal") ? document.getElementById("mascot-animal").value : "";

        // Extract background info
        const personalBackground = document.getElementById("personal-background") ? document.getElementById("personal-background").value : "";
        const academicBackground = document.getElementById("academic-background") ? document.getElementById("academic-background").value : "";
        const professionalBackground = document.getElementById("professional-background") ? document.getElementById("professional-background").value : "";
        const primaryComputer = document.getElementById("primary-computer") ? document.getElementById("primary-computer").value : "";
        const quote = document.getElementById("quote") ? document.getElementById("quote").value : "";
        const author = document.getElementById("author") ? document.getElementById("author").value : "";

        // Extract image info
        const pictureCaption = document.getElementById("picture-caption") ? document.getElementById("picture-caption").value : "";
        const pictureInput = document.getElementById("picture");
        let imageSrc = "images/Yoel.JPG"; // Default image

        // Check if there's an uploaded file
        if (pictureInput && pictureInput.files && pictureInput.files.length > 0) {
            imageSrc = pictureInput.files[0].name;
        } else {
            // Check if the introduction result is displayed with an image
            const currentImg = document.querySelector("main figure img");
            if (currentImg) {
                imageSrc = currentImg.getAttribute("src");
            }
        }

        // Build full name
        const fullName = `${firstName}${middleName ? ' ' + middleName : ''} ${lastName}`;
        const mascot = `${mascotAdjective} ${mascotAnimal}`;

        // Extract courses
        const coursesContainer = document.getElementById("courses-container");
        const courses = [];

        if (coursesContainer) {
            const courseEntries = coursesContainer.querySelectorAll(".course-entry");
            courseEntries.forEach((entry) => {
                const codeInput = entry.querySelector('input[name*="-code"]');
                const nameInput = entry.querySelector('input[name*="-name"]');
                const reasonTextarea = entry.querySelector('textarea[name*="-reason"]');

                if (codeInput && nameInput && reasonTextarea) {
                    courses.push({
                        code: codeInput.value.trim(),
                        name: nameInput.value.trim(),
                        reason: reasonTextarea.value.trim()
                    });
                }
            });
        }

        return {
            fullName,
            mascot,
            imageSrc,
            pictureCaption,
            personalBackground,
            academicBackground,
            professionalBackground,
            primaryComputer,
            quote,
            author,
            courses
        };
    }

    function generateHtmlString(data) {
        // Build courses HTML
        let coursesHtml = '';
        data.courses.forEach(course => {
            coursesHtml += `        <li>\n`;
            coursesHtml += `            <b>${course.code} - ${course.name}</b>\n`;
            coursesHtml += `            ${course.reason}\n`;
            coursesHtml += `        </li>\n`;
        });

        // Generate the complete HTML
        return `<main>
    <h2>Introduction</h2>
    <h2>${data.fullName} | ${data.mascot}</h2>
    <figure>
        <img alt="Portrait of ${data.fullName}" src="${data.imageSrc}">
        <figcaption>${data.pictureCaption}</figcaption>
    </figure>
    <ul>
        <li>
            <b>Personal Background:</b> ${data.personalBackground}
        </li>
        <li>
            <b>Academic Background:</b> ${data.academicBackground}
        </li>        
        <li>
            <b>Professional Background:</b> ${data.professionalBackground}
        </li>
        <li>
            <b>Primary Computer:</b> ${data.primaryComputer}
        </li>
        <li><b>Courses:</b>
            <ul>
${coursesHtml}            </ul>
        </li>
    </ul>
    <span>${data.quote}
    <br>
    <em>${data.author}</em>
    </span>
</main>`;
    }

    function displayHtmlOutput(htmlString) {
        const main = document.querySelector("main");

        // Create the HTML display with syntax highlighting
        main.innerHTML = `
            <h2>Introduction HTML</h2>
            <p>Copy the HTML code below:</p>
            <section class="json-output">
                <pre><code class="language-html">${escapeHtml(htmlString)}</code></pre>
            </section>
            <button id="reset-form-btn" class="btn-reset">Reset to Form</button>
        `;

        // Initialize syntax highlighting if highlight.js is available
        if (window.hljs) {
            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
            });
        }

        // Add reset functionality
        const resetBtn = document.getElementById("reset-form-btn");
        if (resetBtn) {
            resetBtn.addEventListener("click", () => {
                location.reload();
            });
        }
    }

    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, (m) => map[m]);
    }
});

