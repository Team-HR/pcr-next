import API from '@/lib/axios';

export async function checkAuth() {
    try {
        const response = await API.get('/api/user');
        return response.data;
    } catch (error) {
        console.error('Error test:', error);
        throw error;
    }
}
