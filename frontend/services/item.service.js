import { parseJwt } from './jwt.service';
const BASE_URL = 'http://localhost:3000/item';

export const itemService = {
    async getAllItems() {
        try {
            const response = await fetch(BASE_URL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error;
        }
    },

    async getItemsByType(type) {
        try {


            const response = await fetch(`${BASE_URL}/by-type/${type}`);
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
            console.error('Error fetching items:', error);
            throw error;
        }
    },
};


