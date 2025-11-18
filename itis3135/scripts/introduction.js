document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("intro-form");
    const resetButton = document.getElementById("reset-btn");
    const clearButton = document.getElementById("clear-btn");
    const coursesContainer = document.getElementById("courses-container");
    const addCourseBtn = document.getElementById("add-course-btn");
    let courseCounter = 0;

    // Create a new course entry
    const createCourseEntry = (code = "", name = "", reason = "") => {
        courseCounter++;
        const courseDiv = document.createElement("div");
        courseDiv.className = "course-entry";
        courseDiv.dataset.courseId = courseCounter;

        courseDiv.innerHTML = `
            <div class="course-header">
                <span class="course-number">Course ${courseCounter}</span>
                <button type="button" class="btn-remove-course" data-course-id="${courseCounter}">× Remove</button>
            </div>
            <label for="course${courseCounter}-code">Course Code: <span class="required">*</span></label>
            <input id="course${courseCounter}-code" name="course${courseCounter}-code" required type="text" value="${code}" placeholder="e.g., ITIS3135">
            <label for="course${courseCounter}-name">Course Name: <span class="required">*</span></label>
            <input id="course${courseCounter}-name" name="course${courseCounter}-name" required type="text" value="${name}" placeholder="e.g., Frontend Web App Development">
            <label for="course${courseCounter}-reason">Reason: <span class="required">*</span></label>
            <textarea id="course${courseCounter}-reason" name="course${courseCounter}-reason" required rows="2" placeholder="Why are you taking this course?">${reason}</textarea>
        `;

        return courseDiv;
    };

    // Initialize with default courses
    function initializeDefaultCourses() {
        const defaultCourses = [
            {
                code: "ITIS3135",
                name: "Frontend Web App Development",
                reason: "Taking it to gain knowledge in frontend frameworks, so I can build a complete website by myself."
            },
            {
                code: "ITSC3160",
                name: "Database Design and Implementation",
                reason: "Taking it to know more about databases and their applications in application development."
            },
            {
                code: "ITCS3153",
                name: "Introduction to Artificial Intelligence",
                reason: "Taking it to learn about the evolution of AI, algorithms and how to create one of my own."
            }
        ];

        defaultCourses.forEach((course) => {
            coursesContainer.appendChild(createCourseEntry(course.code, course.name, course.reason));
        });
    }

    // Initialize default courses on page load
    initializeDefaultCourses();

    // Renumber courses after removal
    const renumberCourses = () => {
        coursesContainer.querySelectorAll(".course-entry").forEach((entry, index) => {
            entry.querySelector(".course-number").textContent = `Course ${index + 1}`;
        });
    };

    // Remove a course entry
    const removeCourse = (courseId) => {
        const courseEntry = document.querySelector(`.course-entry[data-course-id="${courseId}"]`);
        if (courseEntry) {
            courseEntry.remove();
            renumberCourses();
        }
    };

    // Reset button - reset to default values
    if (resetButton) {
        resetButton.addEventListener("click", () => {
            // Reset to default values
            document.getElementById("first-name").value = "Yoel";
            document.getElementById("middle-name").value = "";
            document.getElementById("last-name").value = "Tecleab";
            document.getElementById("mascot-adjective").value = "Yawning";
            document.getElementById("mascot-animal").value = "Tiger";
            document.getElementById("picture-caption").value = "Yoel Tecleab";
            document.getElementById("personal-background").value = "My hobbies include playing tennis, watching movies and hanging out with friends.";
            document.getElementById("professional-background").value = "I started working on Amazon warehouse shortly after I came to the US. In summer of 2022 I took a bootcamp course on Full Stack Java Development and has been working as Software Engineer at Bank of America since 2023.";
            document.getElementById("academic-background").value = "I believe I am senior (confused because I am a part-time student and have no idea) majoring in Computer Science with tentative concentration in AI and Robotics (might end up changing to Software Engineering)";
            document.getElementById("primary-computer").value = "Apple - MacBook Pro M3 Max - Usually working from home, occasionally from coffee shop.";
            document.getElementById("quote").value = "“We’re born alone, we live alone, and we die alone. Only through love and friendship can we create the illusion for a moment that we are not alone.”";
            document.getElementById("author").value = "Orson Welles";

            // Reset file input
            document.getElementById("picture").value = "";

            // Reset courses
            coursesContainer.innerHTML = "";
            courseCounter = 0;
            initializeDefaultCourses();
        });
    }

    // Clear button - clear all fields
    if (clearButton) {
        clearButton.addEventListener("click", () => {
            document.getElementById("first-name").value = "";
            document.getElementById("middle-name").value = "";
            document.getElementById("last-name").value = "";
            document.getElementById("mascot-adjective").value = "";
            document.getElementById("mascot-animal").value = "";
            document.getElementById("picture-caption").value = "";
            document.getElementById("personal-background").value = "";
            document.getElementById("professional-background").value = "";
            document.getElementById("academic-background").value = "";
            document.getElementById("primary-computer").value = "";
            document.getElementById("quote").value = "";
            document.getElementById("author").value = "";
            document.getElementById("picture").value = "";

            // Clear all courses
            coursesContainer.innerHTML = "";
            courseCounter = 0;
        });
    }

    // Add course
    addCourseBtn.addEventListener("click", () => {
        coursesContainer.appendChild(createCourseEntry());
    });

    // Remove course (event delegation)
    coursesContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-remove-course")) {
            removeCourse(e.target.dataset.courseId);
        }
    });

    // Handle form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const file = formData.get("picture");

        // Handle image
        let imgSrc = 'images/Yoel.JPG';
        if (file && file.size > 0) {
            imgSrc = URL.createObjectURL(file);
        }

        // Build full name
        const middleName = formData.get("middle-name").trim();
        const fullName = `${formData.get("first-name")}${middleName ? ' ' + middleName : ''} ${formData.get("last-name")}`;

        // Collect courses
        const courses = Array.from(coursesContainer.querySelectorAll(".course-entry")).map((entry) => ({
            department: entry.querySelector(`input[name*="-code"]`).value,
            name: entry.querySelector(`input[name*="-name"]`).value,
            reason: entry.querySelector(`textarea[name*="-reason"]`).value
        }));

        const courseList = courses.map((course) =>
            `<li><b>${course.department} - ${course.name}</b> ${course.reason}</li>`
        ).join("");

        // Update page content in main
        document.querySelector("main").innerHTML = `
            <h2>Introduction</h2>
            <h2>${fullName} | ${formData.get("mascot-adjective")} ${formData.get("mascot-animal")}</h2>
            <figure>
                <img alt="Portrait of ${fullName}" src="${imgSrc}">
                <figcaption>${formData.get("picture-caption")}</figcaption>
            </figure>
            <ul>
                <li><b>Personal Background:</b> ${formData.get("personal-background")}</li>
                <li><b>Professional Background:</b> ${formData.get("professional-background")}</li>
                <li><b>Academic Background:</b> ${formData.get("academic-background")}</li>
                <li><b>Primary Computer:</b> ${formData.get("primary-computer")}</li>
                <li><b>Courses:</b>
                    <ul>${courseList}</ul>
                </li>
            </ul>
            <span>
            ${formData.get("quote")}<br><em>${formData.get("author")}</em></span>
            <button id="reset-to-form" class="btn-reset">Reset</button>
        `;

        // Hide form
        form.style.display = "none";

        // Add reset functionality
        const resetBtn = document.getElementById("reset-to-form");
        if (resetBtn) {
            resetBtn.addEventListener("click", () => {
                location.reload();
            });
        }
    });
});
