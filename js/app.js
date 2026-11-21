// Study Support Requests - main application code

const requestForm = document.getElementById("requestForm");
const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("category");
const descriptionInput = document.getElementById("description");
const searchInput = document.getElementById("search");
const statusFilter = document.getElementById("statusFilter");
const requestTable = document.getElementById("requestTable");

let requests = [];
let nextId = 1;

function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function displayRequests() {
    requestTable.innerHTML = "";

    const searchText = searchInput.value.toLowerCase();
    const selectedStatus = statusFilter.value;

    const filteredRequests = requests.filter(function(request) {
        const matchesSearch =
            request.title.toLowerCase().includes(searchText) ||
            request.category.toLowerCase().includes(searchText) ||
            request.description.toLowerCase().includes(searchText);

        const matchesStatus =
            selectedStatus === "" || request.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    filteredRequests.forEach(function(request) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${request.id}</td>
            <td>${escapeHTML(request.title)}</td>
            <td>${escapeHTML(request.category)}</td>
            <td>${escapeHTML(request.description)}</td>
            <td>
                <select class="status-change" data-id="${request.id}">
                    <option value="Pending" ${request.status === "Pending" ? "selected" : ""}>Pending</option>
                    <option value="In progress" ${request.status === "In progress" ? "selected" : ""}>In progress</option>
                    <option value="Completed" ${request.status === "Completed" ? "selected" : ""}>Completed</option>
                </select>
            </td>
            <td>
                <button type="button" class="edit-request" data-id="${request.id}">Edit</button>
                <button type="button" class="delete-request" data-id="${request.id}">Delete</button>
            </td>
        `;

        requestTable.appendChild(row);
    });
}

requestForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const newRequest = {
        id: nextId,
        title: titleInput.value.trim(),
        category: categoryInput.value.trim(),
        description: descriptionInput.value.trim(),
        status: "Pending"
    };

    if (!newRequest.title || !newRequest.category || !newRequest.description) {
        alert("Please fill in all the fields.");
        return;
    }

    requests.push(newRequest);
    nextId++;
    requestForm.reset();
    displayRequests();
});

searchInput.addEventListener("input", displayRequests);
statusFilter.addEventListener("change", displayRequests);

requestTable.addEventListener("change", function(event) {
    if (event.target.classList.contains("status-change")) {
        const requestId = Number(event.target.dataset.id);
        const request = requests.find(function(item) {
            return item.id === requestId;
        });

        if (request) {
            request.status = event.target.value;
            displayRequests();
        }
    }
});

requestTable.addEventListener("click", function(event) {
    const requestId = Number(event.target.dataset.id);

    if (event.target.classList.contains("edit-request")) {
        const request = requests.find(function(item) {
            return item.id === requestId;
        });

        if (request) {
            const newTitle = prompt("Edit the request title:", request.title);
            if (newTitle === null) return;

            const newCategory = prompt("Edit the request category:", request.category);
            if (newCategory === null) return;

            const newDescription = prompt("Edit the request description:", request.description);
            if (newDescription === null) return;

            if (!newTitle.trim() || !newCategory.trim() || !newDescription.trim()) {
                alert("The title, category and description cannot be empty.");
                return;
            }

            request.title = newTitle.trim();
            request.category = newCategory.trim();
            request.description = newDescription.trim();
            displayRequests();
        }
    }

    if (event.target.classList.contains("delete-request")) {
        requests = requests.filter(function(request) {
            return request.id !== requestId;
        });
        displayRequests();
    }
});

displayRequests();