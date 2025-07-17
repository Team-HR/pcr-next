import API from '@/lib/axios';

export async function logout() {
    try {
        const response = await API.post('/auth/logout');
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
