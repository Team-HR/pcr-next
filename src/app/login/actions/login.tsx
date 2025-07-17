// app/actions/login.ts (or any file you use)
import API from '@/lib/axios';

export async function login(formData: FormData) {
    try {
        // 1. Get CSRF cookie first
        await API.get('/sanctum/csrf-cookie');

        // 2. Then login
        const response = await API.post('/auth/login', formData);

        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}
