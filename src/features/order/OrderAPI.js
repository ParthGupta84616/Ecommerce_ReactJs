export function createOrder(orderInfo) {
    return fetch("http://localhost:8080/orders", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderInfo)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        return { data };
    })
    .catch(error => {
        console.error('Error creating order:', error);
        throw error; // Re-throw the error to propagate it further
    });
}
