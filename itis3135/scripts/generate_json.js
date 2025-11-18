document.addEventListener("DOMContentLoaded", () => {
    const generateJsonBtn = document.getElementById("generate-json-btn");

    if (!generateJsonBtn) return;

    generateJsonBtn.addEventListener("click", () => {
        // Extract form data
        const formData = extractFormData();

        // Convert to JSON string
        const jsonString = JSON.stringify(formData, null, 2);

        // Hide the form
        const form = document.getElementById("intro-form");
        if (form) {
            form.style.display = "none";
        }

        // Replace the form with formatted JSON display
        displayJsonOutput(jsonString);

        // Update H2 title
        const h2Elements = document.querySelectorAll("main h2");
        if (h2Elements.length > 0) {
            h2Elements[0].textContent = "Introduction JSON";
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
        const pictureCaption = document.getElementById("picture-caption")?.value || "";
        const pictureInput = document.getElementById("picture");
        let imageSrc = "images/Yoel.JPG"; // Default image

        // Check if there's an uploaded file
        if (pictureInput && pictureInput.files && pictureInput.files.length > 0) {
            // If a file was uploaded, we can't get the blob URL for JSON, so use the filename
            imageSrc = pictureInput.files[0].name;
        } else {
            // Check if the introduction result is displayed with an image
            const currentImg = document.querySelector("main figure img");
            if (currentImg) {
                imageSrc = currentImg.getAttribute("src");
            }
        }

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
                    const courseCode = codeInput.value.trim();
                    // Parse department and number from course code (e.g., "ITIS3135" -> dept: "ITIS", number: "3135")
                    const match = courseCode.match(/^([A-Z]+)(\d+)$/);
                    let department;
                    let number = "";

                    if (match) {
                        department = match[1];
                        number = match[2];
                    } else {
                        // If it doesn't match the pattern, use the whole code as department
                        department = courseCode;
                    }

                    courses.push({
                        department: department,
                        number: number,
                        name: nameInput.value.trim(),
                        reason: reasonTextarea.value.trim()
                    });
                }
            });
        }

        // Build the JSON object matching the specified format
        return {
            firstName: firstName,
            middleInitial: middleName ? middleName.charAt(0) : "",
            lastName: lastName,
            divider: "|",
            mascotAdjective: mascotAdjective,
            mascotAnimal: mascotAnimal,
            image: imageSrc,
            imageCaption: pictureCaption,
            personalBackground: personalBackground,
            professionalBackground: professionalBackground,
            academicBackground: academicBackground,
            primaryComputer: primaryComputer,
            courses: courses,
            quote: quote,
            author: author,
        };
    }

    function displayJsonOutput(jsonString) {
        const main = document.querySelector("main");

        // Create the JSON display with syntax highlighting
        main.innerHTML = `
            <h2>Introduction JSON</h2>
            <p>Copy the JSON data below:</p>
            <section class="json-output">
                <pre><code class="language-json">${escapeHtml(jsonString)}</code></pre>
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
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, (m) => map[m]);
    }
});

