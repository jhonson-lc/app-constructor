import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { AuthLogin, AuthRegister } from "./api/auth";

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
            'remember-me': z.boolean().optional(),
        }),
        handler: async (input, context) => {

            const response = AuthLogin({
                username: input.username,
                password: input.password,
            })

            try {
                const res = await response;
                const data = await res.json();

                if (!res.ok) {
                    throw new ActionError({
                        code: "UNAUTHORIZED",
                        message: data.message || "Credenciales inválidas",
                    });
                }

                if (data && data.token) {
                    const maxAge = input['remember-me'] ? 30 * 24 * 60 * 60 : 24 * 60 * 60;

                    context.cookies.set('authToken', data.token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'strict',
                        maxAge: maxAge,
                        path: '/'
                    });
                }

                return {
                    success: true,
                    user: data.user,
                    message: "Inicio de sesión exitoso"
                };
            } catch (error) {
                console.error("Error during login:", error);
            }
        },
    }),
    register: defineAction({
        accept: "form",
        input: z.object({
            username: z.string(),
            password: z.string(),
            firstname: z.string(),
            lastname: z.string(),
        }),
        handler: async (input, context) => {

            const response = AuthRegister({
                username: input.username,
                password: input.password,
                firstname: input.firstname,
                lastname: input.lastname,
            });

            try {
                const res = await response;
                const data = await res.json();
                if (!res.ok) {
                    throw new ActionError({
                        code: "BAD_REQUEST",
                        message: data.message || "Error al registrar el usuario",
                    });
                }

                return {
                    success: true,
                    user: data.user,
                    message: "Cuenta creada exitosamente"
                };
            }
            catch (error) {
                console.error("Error during registration:", error);
                throw new ActionError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Error interno del servidor durante el registro",
                });
            }
        },
    }),
    logout: defineAction({
        accept: 'json',
        handler: async (input, context) => {
            context.cookies.delete('authToken', {
                path: '/',
            });

            return {
                success: true,
                message: "Sesión cerrada exitosamente"
            };
        },
    }),
};
