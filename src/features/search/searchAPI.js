export function fetchSearchedProducts(query) {
    return new Promise(async (resolve) =>{
      //TODO: we will not hard-code server URL here
      const response = await fetch('http://127.0.0.1:8080/search/' + query) 
      const data = await response.json()
      resolve({data})
    }
    );
  }