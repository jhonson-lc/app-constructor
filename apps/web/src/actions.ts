import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { AuthLogin } from "./api/auth";
import { SaveUser } from "./services/auth-service";

export function getBaseUrl(): string {
    return (
        process.env.PUBLIC_URL ||
        `http://localhost:${process.env.PORT ?? 8081}`
    );
}

export const server = {
    login: defineAction({
        accept: "form",
        input: z.object({
            username: z.string(),
            password: z.string(),
        }),
        handler: async (input, context) => {

            const response = AuthLogin({
                username: input.username,
                password: input.password,
            })

            try {
                const res = await response;
                console.log({ res })
                const data = await res.json();

                if (!res.ok) {
                    throw new ActionError({
                        code: "UNAUTHORIZED",
                        message: data.message || "Credenciales inválidas",
                    });
                }

                if (data && data.token) {
                    SaveUser(data.token);
                    return {
                        url: "/",
                    };
                }

                throw new ActionError({
                    code: "BAD_REQUEST",
                    message: "Error desconocido durante el login",
                });
            } catch (error) {
                console.error("Error during login:", error);
            }
        },
    }),
    logout: defineAction({
        accept: "form",
        handler: async (_, context) => {
            try {
                SaveUser("");
                return {
                    ok: true,
                };
            } catch (error) {
                throw new ActionError({
                    code: "BAD_REQUEST",
                    message: "Error durante el logout",
                });
            }
        },
    }),
}