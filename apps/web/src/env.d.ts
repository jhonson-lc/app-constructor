/// <reference types="astro/client" />

interface User {
    id: string;
    username: string;
    firstname: string;
    lastname: string;
}

declare namespace App {
    interface Locals {
        user: User | null;
        isAuthenticated: boolean;
    }
}