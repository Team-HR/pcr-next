import API from '@/lib/axios';

export async function getUser() {
    try {
        const response = await API.get('/api/user');
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
