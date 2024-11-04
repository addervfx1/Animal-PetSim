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

    async updateAnimal(id, name) {
        try {
            const response = await fetch(`${BASE_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }), // Enviando o novo nome do animal
            });

            if (!response.ok) {
                throw new Error('Failed to update the animal');
            }

            return await response.json(); // Retorna os dados atualizados
        } catch (error) {
            console.error('Error updating animal:', error);
            throw error;
        }
    },
};


