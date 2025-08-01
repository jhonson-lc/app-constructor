import { defineMiddleware } from 'astro:middleware';
import { getSecret } from 'astro:env/server';
import jwt from 'jsonwebtoken';

export interface User {
    id: string;
    username: string;
    firstname: string;
    lastname: string;
}

function verifyToken(token: string): User | null {
    try {
        const JWT_SECRET = getSecret("JWT_SECRET") as string;
        const secretKey = Buffer.from(JWT_SECRET, 'base64');
        const decoded = jwt.verify(token, secretKey) as any;
        return {
            id: decoded.id,
            username: decoded.sub,
            firstname: decoded.firstname,
            lastname: decoded.lastname,
        };
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}

// Función para obtener el token de las cookies o headers
function getTokenFromRequest(request: Request): string | null {
    // Primero intenta obtener de las cookies
    const cookieHeader = request.headers.get('cookie');
    if (cookieHeader) {
        const cookies = Object.fromEntries(
            cookieHeader.split('; ').map(c => {
                const [key, ...v] = c.split('=');
                return [key, decodeURIComponent(v.join('='))];
            })
        );
        if (cookies.authToken) {
            return cookies.authToken;
        }
    }

    // Si no hay en cookies, intenta obtener del header Authorization
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.substring(7);
    }

    return null;
}

export const onRequest = defineMiddleware(async (context, next) => {
    const { request, locals, url } = context;

    const token = getTokenFromRequest(request);

    if (token) {
        const user = verifyToken(token);
        if (user) {
            locals.user = user;
            locals.isAuthenticated = true;
        } else {
            locals.user = null;
            locals.isAuthenticated = false;
        }
    } else {
        locals.user = null;
        locals.isAuthenticated = false;
    }

    const protectedRoutes = ['/dashboard'];

    const isProtectedRoute = protectedRoutes.some(route =>
        url.pathname.startsWith(route)
    );

    // Si es una ruta protegida y no está autenticado, redirigir al login
    if (isProtectedRoute && !locals.isAuthenticated) {
        return new Response(null, {
            status: 302,
            headers: {
                Location: '/auth/login'
            }
        });
    }

    // Si está autenticado y trata de acceder al login, redirigir al dashboard
    if (locals.isAuthenticated && url.pathname === '/auth/login') {
        return new Response(null, {
            status: 302,
            headers: {
                Location: '/dashboard'
            }
        });
    }

    return next();
});