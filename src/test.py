import requests
import json

def fetch_data():
    url = 'http://localhost:8080/products'

    # Send GET request to the API
    response = requests.get(url)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Parse JSON response
        data = response.json()

        # Extract unique brand and category values
        brands = set(product['brand'] for product in data)
        categories = set(product['category'] for product in data)

        # Convert to JSON strings
        brands_json = json.dumps({"brands": list(brands)})
        categories_json = json.dumps({"categories": list(categories)})

        return brands_json, categories_json
    else:
        print("Failed to retrieve data. Status code:", response.status_code)
        return None, None

if __name__ == "__main__":
    brands_data, categories_data = fetch_data()
    if brands_data and categories_data:
        print(brands_data)
        print(categories_data)
