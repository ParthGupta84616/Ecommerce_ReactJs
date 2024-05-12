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
export function deleteItemFromCart(itemId) {
return new Promise(async (resolve) => {
    console.log("http://localhost:8080/cart/"+itemId)
    const response = await fetch("http://localhost:8080/cart/"+itemId,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    // const data = await response.json();
    resolve({ data:{id:itemId} });
});
}
export function updateUser(update) {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:8080/users/"+update.id,{
            method: 'PATCH',
            body: JSON.stringify(update),
            
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        resolve({ data });
    });
}
export function deleteUserCart(userId) {
    return new Promise(async (resolve) => {
        const response = await fetchItemByUserId(userId);
        const items = response.data;
        
        var bag=0
        for (var item of items) {
            
            console.log(item.id);
            await deleteItemFromCart(item.id)
        }
        // console.log("kam25")
        resolve({ status : "Success" });
        
    });
}
