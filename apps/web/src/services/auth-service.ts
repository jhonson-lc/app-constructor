import { jwtDecode } from "jwt-decode";

type User = {
    fullname: string;
    userId: string;
    JWT: string;
};

export const SaveUser = (token: string) => {
    const decodedToken = jwtDecode(token) as {
        firstname: string;
        lastname: string;
        id: string;
    }

    const user = {
        fullname: `${decodedToken.firstname} ${decodedToken.lastname}`,
        userId: decodedToken.id,
        JWT: token,
    };

    window.localStorage.setItem("TaskManagerUser", JSON.stringify(user));
};

export const DeleteUser = () => {
    window.localStorage.removeItem("TaskManagerUser");
};

export const CheckIsLogin = () => {
    const TaskManagerUser = window.localStorage.getItem("TaskManagerUser")
    if (!TaskManagerUser) return false
    const user = JSON.parse(TaskManagerUser);
    return user ? true : false;
};

export const GetUser = () => {
    const TaskManagerUser = window.localStorage.getItem("TaskManagerUser");
    if (!TaskManagerUser) return null;
    const user = JSON.parse(TaskManagerUser);
    return user;
};

export const GetToken = () => {
    const TaskManagerUser = window.localStorage.getItem("TaskManagerUser");
    if (!TaskManagerUser) return null;
    const user = JSON.parse(TaskManagerUser);
    return user?.JWT;
};

export const GetFullname = () => {
    const TaskManagerUser = window.localStorage.getItem("TaskManagerUser");
    if (!TaskManagerUser) return null;
    const user = JSON.parse(TaskManagerUser);
    return user.fullname;
};

export const GetUserId = () => {
    const TaskManagerUser = window.localStorage.getItem("TaskManagerUser");
    if (!TaskManagerUser) return null;
    const user = JSON.parse(TaskManagerUser);
    return user.userId;
};