import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchSearchedProductsAsync, selectSearchedProducts } from './searchSlice'

function Search() {
  const param = useParams()
  const dispatch = useDispatch()
  const products = useSelector(selectSearchedProducts)
  console.log(products);
    useEffect(() => {
      dispatch(fetchSearchedProductsAsync(param.search))
    }, [param.search])
    

    return (
      <div>
        {products && (
          <section class="text-gray-600 body-font">
          <div class="container px-5 py-24 mx-auto" bis_skin_checked="1">
            <div class="flex flex-wrap " bis_skin_checked="1">
              {products.products.map((products) => (
                <Link to={"/product/"+products.id} class="lg:w-1/4 md:w-1/2 p-4 w-full" bis_skin_checked="1">
                <a class="block relative h-72 border rounded-xl overflow-hidden">
                  <img alt="ecommerce" class="w-full h-full " src={products.thumbnail}></img>
                </a>
                <div class="mt-4" bis_skin_checked="1">
                  <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">{products.category}</h3>
                  <h2 class="text-gray-900 title-font text-lg font-medium">{products.title}</h2>
                  <p class="mt-1">${products.price}</p>
                </div>
              </Link>
              ))}
              
            </div>
          </div>
        </section>
        )
        

        }
      </div>
    )
  }


export default Search