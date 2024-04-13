import React from 'react'
import ProductOverview from '../features/productOverview/ProductOverview'
import Navbar from '../features/navbar/Navbar'

function ProductOverviewPage() {
  return (
    <div>
      <Navbar>
      <ProductOverview  />
      </Navbar>
    </div>
  )
}

export default ProductOverviewPage