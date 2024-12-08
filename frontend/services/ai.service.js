const BASE_URL = 'http://localhost:5000';

export const aiService = {
    async predict(userScore) {
        try {
            const response = await fetch(`${BASE_URL}/predict`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userScore }),
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch predictions: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data.predictions;
        } catch (error) {
            console.error('Error fetching predictions:', error);
            throw error;
        }
    }
}