const API_URL = "https://remotive.com/api/remote-jobs";

let allJobs = [];

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

        createCategories();
        displayJobs(allJobs);

        status.innerHTML = `${allJobs.length} jobs found`;

    } catch (error) {
        status.innerHTML = "Unable to load jobs. Please try again later.";
        console.log(error);
    }
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
            <h2>${job.title}</h2>
            <p><b>Company:</b> ${job.company_name}</p>
            <p><b>Location:</b> ${job.candidate_required_location}</p>
            <p><b>Category:</b> ${job.category}</p>
            <a href="${job.url}" target="_blank">Apply Now</a>
        </div>
        `;
    });
}

function searchJobs() {
    const keyword = document.getElementById("searchInput").value;
    fetchJobs(keyword);
}

function createCategories() {
    const select = document.getElementById("categoryFilter");

    const categories = [...new Set(allJobs.map(job => job.category))];

    select.innerHTML = `<option value="">All Categories</option>`;

    categories.forEach(category => {
        select.innerHTML += `
        <option value="${category}">
            ${category}
        </option>`;
    });
}

document.getElementById("categoryFilter").addEventListener("change", function() {
    const selected = this.value;

    const filtered = allJobs.filter(job => {
        return selected === "" || job.category === selected;
    });

    displayJobs(filtered);
});

document.getElementById("sortJobs").addEventListener("change", function() {
    const option = this.value;

    let sorted = [...allJobs];

    if (option === "az") {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (option === "za") {
        sorted.sort((a, b) => b.title.localeCompare(a.title));
    }

    displayJobs(sorted);
});