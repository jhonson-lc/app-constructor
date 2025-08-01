const BASEURL = "http://localhost:8081/api/auth";

type AuthLoginBody = {
    username: string;
    password: string;
};

type AuthRegisterBody = {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
};

export const AuthLogin = async (body: AuthLoginBody) => {
    const url = `${BASEURL}/login`;

    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                username: body.username,
                password: body.password
            }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        });

        return response;
    } catch (error) {
        console.error('Network error in AuthLogin:', error);
        throw error;
    }
};

export const AuthRegister = async (body: AuthRegisterBody) => {
    const url = `${BASEURL}/register`;

    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: body.username,
                password: body.password,
                firstname: body.firstname,
                lastname: body.lastname
            }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        });

        return response;
    } catch (error) {
        console.error('Network error in AuthRegister:', error);
        throw error;
    }
};