export function fetchAllProducts() {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:8080/products') 
      const data = await response.json()
      resolve({data})
    }
    );
  }
  export async function fetchProductByFilter(filter) {
    const queryString = new URLSearchParams(filter).toString();
    
  
    try {
      const response = await fetch(`http://localhost:8080/products?${queryString}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('Error fetching products:', error);
      return { error: error.message };
    }
  }
  