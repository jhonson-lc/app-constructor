const BASEURL = "http://localhost:8081/api/tasks";

export const getAllTasks = (userId: string, token: string) => {
    const url = `${BASEURL}?userId=${userId}`;
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getCompletedTasks = (userId: string, token: string) => {
    const url = `${BASEURL}/finished?userId=${userId}`;
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getIncompletedTasks = (userId: string, token: string) => {
    const url = `${BASEURL}/unfinished?userId=${userId}`;
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getImportantTasks = (userId: string, token: string) => {
    const url = `${BASEURL}/important?userId=${userId}`;
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getTaskById = (taskId: string, token: string) => {
    const url = `${BASEURL}/${taskId}`;
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

export const createTask = (task: any, userId: string, token: string) => {
    const url = `${BASEURL}?userId=${userId}`;
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateTask = (task: any, userId: string, token: string) => {
    const url = `${BASEURL}?userId=${userId}`;
    return fetch(url, {
        method: "PUT",
        body: JSON.stringify(task),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateTaskCompleted = (taskId: string, token: string) => {
    const url = `${BASEURL}/${taskId}`;
    return fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

export const deleteTask = (taskId: string, token: string) => {
    const url = `${BASEURL}/${taskId}`;
    return fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};