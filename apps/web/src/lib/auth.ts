import type { AstroGlobal } from 'astro';

// Helper para verificar si el usuario está autenticado
export function isAuthenticated(Astro: AstroGlobal): boolean {
    return Astro.locals.isAuthenticated || false;
}

// Helper para obtener el usuario actual
export function getCurrentUser(Astro: AstroGlobal) {
    return Astro.locals.user || null;
}

// Helper para requerir autenticación (lanza error si no está autenticado)
export function requireAuth(Astro: AstroGlobal) {
    if (!isAuthenticated(Astro)) {
        throw new Error('Authentication required');
    }
    return getCurrentUser(Astro);
}

// Helper para verificar roles (si implementas roles)
export function hasRole(Astro: AstroGlobal, role: string): boolean {
    const user = getCurrentUser(Astro);
    if (!user) return false;

    // Asumiendo que el usuario tiene un campo 'role' o 'roles'
    // Ajusta según tu estructura de datos
    return (user as any).role === role || (user as any).roles?.includes(role);
}

// Helper para redirigir si no está autenticado
export function redirectIfNotAuthenticated(Astro: AstroGlobal, redirectTo: string = '/auth/login') {
    if (!isAuthenticated(Astro)) {
        return Astro.redirect(redirectTo);
    }
}

// Helper para redirigir si está autenticado
export function redirectIfAuthenticated(Astro: AstroGlobal, redirectTo: string = '/dashboard') {
    if (isAuthenticated(Astro)) {
        return Astro.redirect(redirectTo);
    }
}

// Funciones para usar en el cliente (opcional)
export const clientAuth = {
    // Obtener datos del usuario desde localStorage (solo como fallback)
    getStoredUser() {
        if (typeof window === 'undefined') return null;
        try {
            const userData = localStorage.getItem('userData');
            return userData ? JSON.parse(userData) : null;
        } catch {
            return null;
        }
    },

    // Limpiar datos del cliente
    clearStoredData() {
        if (typeof window === 'undefined') return;
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
    },

    // Verificar si hay token en localStorage
    hasStoredToken() {
        if (typeof window === 'undefined') return false;
        return !!localStorage.getItem('authToken');
    }
};