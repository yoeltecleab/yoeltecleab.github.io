document.addEventListener("DOMContentLoaded", () => {
    const updateButton = document.getElementById("update-introduction");
    const form = document.getElementById("intro-form");
    const cancelButton = document.getElementById("cancel");
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
            <input id="course${courseCounter}-code" name="course${courseCounter}-code" required type="text" value="${code}">
            <label for="course${courseCounter}-name">Course Name: <span class="required">*</span></label>
            <input id="course${courseCounter}-name" name="course${courseCounter}-name" required type="text" value="${name}">
            <label for="course${courseCounter}-reason">Reason: <span class="required">*</span></label>
            <textarea id="course${courseCounter}-reason" name="course${courseCounter}-reason" required rows="2">${reason}</textarea>
        `;

        return courseDiv;
    };

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

    // Pre-fill form with current page content
    const prefillForm = () => {
        // Extract name and mascot
        const nameMascot = document.querySelector("main h2:nth-of-type(2)").textContent;
        const [name, mascot] = nameMascot.split(" | ");
        const nameParts = name.trim().split(" ");

        document.getElementById("first-name").value = nameParts[0] || "";
        document.getElementById("middle-name").value = nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "";
        document.getElementById("last-name").value = nameParts[nameParts.length - 1] || "";

        const mascotParts = mascot.trim().split(" ");
        document.getElementById("mascot-adjective").value = mascotParts[0] || "";
        document.getElementById("mascot-animal").value = mascotParts[1] || "";

        // Extract backgrounds
        document.getElementById("personal-background").value =
            document.querySelector("main ul li:nth-child(1)").textContent.replace("Personal Background:", "").trim();
        document.getElementById("academic-background").value =
            document.querySelector("main ul li:nth-child(2)").textContent.replace("Academic Background:", "").trim();
        document.getElementById("picture-caption").value =
            document.querySelector("main figcaption").textContent;

        // Extract and create courses
        coursesContainer.innerHTML = "";
        courseCounter = 0;

        const coursesUl = document.querySelector("main ul li:nth-child(3) ul");
        if (coursesUl) {
            coursesUl.querySelectorAll("li").forEach((li) => {
                const boldText = li.querySelector("b");
                if (boldText) {
                    const courseInfo = boldText.textContent.trim();
                    const [code, ...nameParts] = courseInfo.split(" - ");
                    const courseName = nameParts.join(" - ");
                    const reason = li.textContent.trim().replace(courseInfo, "").trim();

                    coursesContainer.appendChild(createCourseEntry(code.trim(), courseName.trim(), reason));
                }
            });
        }

        // Ensure at least one course
        if (courseCounter === 0) {
            coursesContainer.appendChild(createCourseEntry());
        }
    };

    // Initialize update button
    const initUpdateButton = () => {
        const btn = document.getElementById("update-introduction");
        if (btn) {
            btn.addEventListener("click", () => {
                prefillForm();
                form.style.display = "flex";
                document.body.style.overflow = "hidden";
            });
        }
    };

    // Show form
    updateButton.addEventListener("click", () => {
        prefillForm();
        form.style.display = "flex";
        document.body.style.overflow = "hidden";
    });

    // Hide form
    cancelButton.addEventListener("click", () => {
        form.style.display = "none";
        document.body.style.overflow = "auto";
    });

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
        const currentImg = document.querySelector("main figure img");
        let imgSrc = currentImg ? currentImg.src : 'images/Yoel.JPG';
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

        // Update page content
        document.querySelector("main").innerHTML = `
            <h2>Introduction</h2>
            <h2>${fullName} | ${formData.get("mascot-adjective")} ${formData.get("mascot-animal")}</h2>
            <figure>
                <img alt="Portrait of ${fullName}" src="${imgSrc}">
                <figcaption>${formData.get("picture-caption")}</figcaption>
            </figure>
            <ul>
                <li><b>Personal Background:</b> ${formData.get("personal-background")}</li>
                <li><b>Academic Background:</b> ${formData.get("academic-background")}</li>
                <li><b>Courses:</b>
                    <ul>${courseList}</ul>
                </li>
            </ul>
            <button id="update-introduction">Update Information</button>
        `;

        // Reinitialize and hide form
        initUpdateButton();
        form.style.display = "none";
        document.body.style.overflow = "auto";
    });
});
