export const getPriorityColor = (priority: boolean) => {
    switch (priority) {
        case true:
            return "bg-red-100 text-red-800 border-red-200";
        case false:
            return "bg-green-100 text-green-800 border-green-200";
        default:
            return "bg-gray-100 text-gray-800 border-gray-200";
    }
};

export const getStatusColor = (status: boolean) => {
    switch (status) {
        case true:
            return "bg-green-100 text-green-800 border-green-200";
        case false:
            return "bg-gray-100 text-gray-800 border-gray-200";
        default:
            return "bg-gray-100 text-gray-800 border-gray-200";
    }
};

export const getPriorityText = (priority: boolean) => {
    switch (priority) {
        case true:
            return "Alta";
        case false:
            return "Baja";
        default:
            return priority;
    }
};

export const getStatusText = (status: boolean) => {
    switch (status) {
        case true:
            return "Completada";
        case false:
            return "Pendiente";
        default:
            return status;
    }
};

