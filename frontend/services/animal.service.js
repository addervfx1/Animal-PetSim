// animalService.js
const BASE_URL = 'http://localhost:3000/animals';

export const animalService = {
    async getAllAnimals() {
        try {
            const response = await fetch(BASE_URL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching animals:', error);
            throw error;
        }
    },

    async getAnimalsByUser(id) {
        try {
            const response = await fetch(`${BASE_URL}/by-user/${id}`);
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
            console.error('Error fetching animals:', error);
            throw error;
        }
    },

    async insertAnimal(type, name, breed, userId) {
        try {
            const response = await fetch(`${BASE_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({type, breed, name, age: 1, health: 100, userId}),
            });

            if (!response.ok) {
                throw new Error('Failed to update the animal');
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating animal:', error);
            throw error;
        }
    },
};


