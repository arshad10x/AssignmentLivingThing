
//  fetch chart data (GET request)
export const fetchChartData = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/charts');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching chart data:", error);
        return [];
    }
};

// add new chart data (POST request)
export const addChartData = async (newData) => {
    try {
        const response = await fetch('http://localhost:5000/api/charts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error adding chart data:", error);
        return null;
    }
};
