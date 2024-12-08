import { parseJwt } from './jwt.service';
const BASE_URL = 'http://localhost:3000/users';

export const userService = {
    async getAllUsers() {
        try {
            const response = await fetch(BASE_URL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    async getUserById() {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                throw new Error('Access token is not available in localStorage.');
            }
           
            const payload = parseJwt(accessToken)

            const response = await fetch(`${BASE_URL}/${payload.userId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const textResponse = await response.text();
    
            if (textResponse) {
                const data = JSON.parse(textResponse);
                return data; 
            } else {
                return null; 
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },  
};


