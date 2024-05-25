export function createOrder(item) {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:8080/orders",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        const data = await response.json();
        // console.log(first)
        resolve({ data });
    });
}
export function fetchOrderById(orderId) {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:8080/orders/' + orderId) 
      const data = await response.json()
      resolve({data})
    }
    );
  }
export function fetchAllOrderById(userId) {
return new Promise(async (resolve) =>{
    // console.log('http://localhost:8080/orders/?user.id=' + userId)
    const response = await fetch('http://localhost:8080/orders/?user.id=' + userId) 
    const data = await response.json()
    // console.log(data)
    resolve({data})
}
);
}
export function fetchAllOrders() {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:8080/orders/') 
      const data = await response.json()
      resolve({data})
    }
    );
  }
export function updateOrder(update) {
  // console.log(update)
  return new Promise(async (resolve) => {
    
      const response = await fetch("http://localhost:8080/orders/"+update.id,{
          method: 'PATCH',
          body: JSON.stringify(update),
          
          headers: {
              'Content-Type': 'application/json'
          },
      });
      const data = await response.json();
      console.log({data})
      resolve({ data });
  });
}