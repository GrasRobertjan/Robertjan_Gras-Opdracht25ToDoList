const endPoint = `https://jsonbox.io/box_604614bda9086f0015b62895`;


const getTasksAPI = async () => {
    try {
        const res = await fetch(endPoint, { method: "GET" });
        return await res.json();
    }
    catch (error) {
        console.log(error)
    }
};


const addTaskAPI = async (task) => {
    try {
        const res = await fetch(endPoint, {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await res.json();
    }
    catch (error) {
        console.log(error)
    }
};


const updateTaskAPI = async (id, task) => {
    try {
        const res = await fetch(`${endPoint}/${id}`, {
            method: "PUT",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await res.json();
    }
    catch (error) {
        console.log(error)
    }
};


const deleteTaskAPI = async (id) => {
    try {
        const res = await fetch(`${endPoint}/${id}`, {
            method: "DELETE"
        });
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}