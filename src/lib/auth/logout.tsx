import API from '@/lib/axios';

export async function logout() {
    try {
        const response = await API.post('/auth/logout');
        // Clear cookies on the frontend
        document.cookie = 'XSRF-TOKEN=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        // document.cookie = 'ihris_api_service_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
