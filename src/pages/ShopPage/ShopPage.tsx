// ShopPage.jsx
import React from "react";
import { useParams } from "react-router-dom";

const ShopPage = () => {
  const { category, id } = useParams();

  return (
    <div>
      <h1>Shop Page</h1>
      <p>Category: {category}</p>
      <p>Page: {id}</p>
      {/* Add your shop content here */}
    </div>
  );
};

export default ShopPage;
