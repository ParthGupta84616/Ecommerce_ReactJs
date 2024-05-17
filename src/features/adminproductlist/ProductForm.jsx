import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { selectBrands, selectCategories } from '../product-list/productListSlice';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';


function ProductForm() {
  const [actualCost, setActualCost] = useState('');
  const [discount, setDiscount] = useState('');
  const [finalPrice, setFinalPrice] = useState('');
  
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);

  const handleActualCostChange = (e) => {
    setActualCost(e.target.value);
  };

  const handleDiscountChange = (e) => {
    setDiscount(e.target.value);
  };
  const calculateFinalPrice = () => {
    const actualCostValue = parseFloat(actualCost);
    const discountValue = parseFloat(discount);

    if (!isNaN(actualCostValue) && !isNaN(discountValue)) {
      const discountAmount = (actualCostValue * discountValue) / 100;
      const calculatedFinalPrice = actualCostValue - discountAmount;
      setFinalPrice(calculatedFinalPrice.toFixed(0));
    } else {
      setFinalPrice('');
    }
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => console.log(data)

  useEffect(() => {
    calculateFinalPrice()
  }, [actualCost , discount])

  return (
    <div className="">
      <section className="py-1 bg-blueGray-50">
        <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  Add Product
                </h6>
                <Link to="/admin" className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
                  Go Back
                </Link>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Product Info
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label htmlFor="title" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Title
                      </label>
                      <input id="title" type="text" {...register("title", { required: "Title Is Required" })} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"  />
                      {errors.title && <p className="text-red-500">{errors.title.message}</p>}                    
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label htmlFor="category" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Category
                      </label>
                      <select {...register("category", { required: "Category Is Required" })} id="category" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.lable}>
                            {category.value}
                          </option>
                        ))}
                      </select>
                        {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                      </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label htmlFor="brand" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Brand
                      </label>
                      <select {...register("brand", { required: "Brand Is Required" })} id="category" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                        <option value="">Select a Brand</option>
                        {brands.map((category) => (
                          <option key={category.id} value={category.lable}>
                            {category.value}
                          </option>
                        ))}
                      </select>
                        {errors.brand && <p className="text-red-500">{errors.brand.message}</p>}
                       </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label htmlFor="stock" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Total Stock
                      </label>
                      <input id="stock" {...register("stock", { required: "Total Stock Is Required" , min : 1  })} type="number" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"  />
                    </div>
                    {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label  htmlFor="rating" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Product Rating (out of 5)
                      </label>
                      <input {...register("rating", { required: "Rating Is Required", min: 0, max: 5  })} id="rating" type="number" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"  />
                    </div>
                    {errors.rating && <p className="text-red-500">{errors.rating.message}</p>}
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Cost Infomation
                </h6>
                <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4"></div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label htmlFor="price" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Actual Cost ($)
                      </label>
                      <input id="price"  {...register("price", { required: "Price Is Required"  })} type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={handleActualCostChange} />
                    </div>
                    {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label htmlFor="discountPercentage" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Discount (%)
                      </label>
                      <input {...register("discountPercentage", { required: "discount Is Required", min: 0 , max: 99  })} id="discountPercentage" type="number" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={handleDiscountChange} />
                    </div>
                    {errors.discountPercentage && <p className="text-red-500">{errors.discountPercentage.message}</p>}
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label htmlFor="sellingprice" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Final Price
                      </label>
                      <input id="sellingprice" type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={finalPrice} readOnly />
                    </div>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Description
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label htmlFor="description" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Description
                      </label>
                      <textarea {...register("description", { required: "Description Is Required" })} id="description" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" rows="4"></textarea>
                    </div>
                  </div>
                  {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                </div>
                
                <div className="">
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Thumbnail
                </h6>
                  <div class="flex items-center justify-center w-full">
                    <label for="thumbnail" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-100  dark:hover:border-gray-500">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id="thumbnail" type="file" class="hidden" />
                    </label>
                </div>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Images
                </h6>
                 <div className="flex gap-4">
                 <div class="flex items-center justify-center w-1/2">
                    <label for="image" class="flex flex-col items-center justify-center w-full h-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-100  dark:hover:border-gray-500">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id="image" type="file" class="hidden" />
                    </label>
                </div> 
                <div class="flex items-center justify-center w-1/2">
                    <label for="image" class="flex flex-col items-center justify-center w-full h-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-100  dark:hover:border-gray-500">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id="image" type="file" class="hidden" />
                    </label>
                </div> 
                 </div>
                 <div className="flex gap-4">
                 <div class="flex items-center justify-center w-1/2">
                    <label for="image" class="flex flex-col items-center justify-center w-full h-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-100  dark:hover:border-gray-500">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id="image" type="file" class="hidden" />
                    </label>
                </div> 
                <div class="flex items-center justify-center w-1/2">
                    <label for="image" class="flex flex-col items-center justify-center w-full h-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-100  dark:hover:border-gray-500">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id="image" type="file" class="hidden" />
                    </label>
                </div> 
                 </div>
                 <div className="grid h-40 place-content-center  " type="submit" >
                    <DrawOutlineButton>Submit</DrawOutlineButton>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


const DrawOutlineButton = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      className="group relative px-10 py-3  text-xl text-gray-900 font-extrabold rounded-lg  bg-slate-400 blur-1 transition-colors duration-[400ms] hover:text-indigo-300"
    >
      <span>{children}</span>

      {/* TOP */}
      <span className="absolute left-0 top-0 h-[2px] w-0 bg-indigo-300 transition-all duration-100 group-hover:w-full" />

      {/* RIGHT */}
      <span className="absolute right-0 top-0 h-0 w-[2px] bg-indigo-300 transition-all delay-100 duration-100 group-hover:h-full" />

      {/* BOTTOM */}
      <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-indigo-300 transition-all delay-200 duration-100 group-hover:w-full" />

      {/* LEFT */}
      <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-indigo-300 transition-all delay-300 duration-100 group-hover:h-full" />
    </button>
  );
};

export default ProductForm;
