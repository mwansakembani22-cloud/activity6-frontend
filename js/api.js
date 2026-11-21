// API helper functions for Study Support Requests
// These functions use the browser's local storage for this frontend activity.

const API_STORAGE_KEY = "studySupportRequests";

function getRequestsFromStorage() {
    const savedRequests = localStorage.getItem(API_STORAGE_KEY);
    return savedRequests ? JSON.parse(savedRequests) : [];
}

function saveRequestsToStorage(requests) {
    localStorage.setItem(API_STORAGE_KEY, JSON.stringify(requests));
}

function addRequestToStorage(request) {
    const requests = getRequestsFromStorage();
    requests.push(request);
    saveRequestsToStorage(requests);
    return request;
}

function updateRequestInStorage(requestId, newStatus) {
    const requests = getRequestsFromStorage();
    const updatedRequests = requests.map(function(request) {
        if (request.id === requestId) {
            return { ...request, status: newStatus };
        }
        return request;
    });

    saveRequestsToStorage(updatedRequests);
    return updatedRequests;
}

function deleteRequestFromStorage(requestId) {
    const requests = getRequestsFromStorage();
    const updatedRequests = requests.filter(function(request) {
        return request.id !== requestId;
    });

    saveRequestsToStorage(updatedRequests);
    return updatedRequests;
}