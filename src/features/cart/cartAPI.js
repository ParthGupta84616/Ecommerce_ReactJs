export function addToCart(item) {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:8080/cart",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        const data = await response.json();
        resolve({ data });
    });
}
export function fetchItemByUserId(userId) {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:8080/cart?userId='+userId) 
      const data = await response.json()
      resolve({data})
    }
    );
  }