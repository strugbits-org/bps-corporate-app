import React from 'react'
import { Helmet } from 'react-helmet'

const PageNotFound = () => {
  return (
    <div>
        <Helmet>
        <title>Page Not Found </title>
        <meta
          name="description"
          content="Events are crucial for enhancing brand awareness, offering exclusive
           chances to showcase ideas, products, and services intimately."
        />
      </Helmet>
      <h1>404 page not found</h1>
    </div>
  )
}

export default PageNotFound
