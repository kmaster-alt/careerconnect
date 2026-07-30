const API_URL = "https://remotive.com/api/remote-jobs";

let allJobs = [];
let currentCategory = "";
let currentSort = "default";

window.onload = () => {
    fetchJobs();
};

async function fetchJobs(keyword = "") {
    const status = document.getElementById("status");

    status.innerHTML = "Loading jobs...";

    try {
        const response = await fetch(`${API_URL}?search=${keyword}`);

        if (!response.ok) {
            throw new Error("API unavailable");
        }

        const data = await response.json();

        allJobs = data.jobs;
        currentCategory = "";
        currentSort = "default";
        document.getElementById("categoryFilter").value = "";
        document.getElementById("sortJobs").value = "default";

        createCategories();
        render();

        status.innerHTML = `${allJobs.length} jobs found`;

    } catch (error) {
        status.innerHTML = "Unable to load jobs. Please try again later.";
        console.log(error);
    }
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text ?? "";
    return div.innerHTML;
}

function displayJobs(jobs) {
    const container = document.getElementById("jobsContainer");

    container.innerHTML = "";

    if (jobs.length === 0) {
        container.innerHTML = "<h3>No jobs found</h3>";
        return;
    }

    jobs.forEach(job => {
        container.innerHTML += `
        <div class="job-card">
            <h2>${escapeHtml(job.title)}</h2>
            <p><b>Company:</b> ${escapeHtml(job.company_name)}</p>
            <p><b>Location:</b> ${escapeHtml(job.candidate_required_location)}</p>
            <p><b>Category:</b> ${escapeHtml(job.category)}</p>
            <a href="${job.url}" target="_blank">Apply Now</a>
        </div>
        `;
    });
}

function render() {
    let jobs = allJobs.filter(job => currentCategory === "" || job.category === currentCategory);

    if (currentSort === "az") {
        jobs.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (currentSort === "za") {
        jobs.sort((a, b) => b.title.localeCompare(a.title));
    }

    displayJobs(jobs);
}

function searchJobs() {
    const keyword = document.getElementById("searchInput").value;
    fetchJobs(keyword);
}

document.getElementById("searchInput").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        searchJobs();
    }
});

function createCategories() {
    const select = document.getElementById("categoryFilter");

    const categories = [...new Set(allJobs.map(job => job.category))];

    select.innerHTML = `<option value="">All Categories</option>`;

    categories.forEach(category => {
        select.innerHTML += `
        <option value="${escapeHtml(category)}">
            ${escapeHtml(category)}
        </option>`;
    });
}

document.getElementById("categoryFilter").addEventListener("change", function() {
    currentCategory = this.value;
    render();
});

document.getElementById("sortJobs").addEventListener("change", function() {
    currentSort = this.value;
    render();
});