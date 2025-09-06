import React, { useState, useEffect } from "react";
import axios from "axios";

// Describe what this PR does so that reviewer can understand the purpose of the code

const ProductCatalog = ({ categoryId, searchTerm }) => {
  // Always try to define types here
  // Also, define cases when when the props are invalid or not provided
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Consider refactoring this to a custom hook so that we can reuse it in other components -> useLoading
  const [error, setError] = useState(null); // Is this error state necessary? It appears that there's only one possible case of error, which is "failed to load products". If this is what you want, what's preventing you from just using a static string?
  const [favorites, setFavorites] = useState([]); // Favorites doesn't have to be a state of its own - consider attaching "isFavorite" boolean to each product
  const [sortBy, setSortBy] = useState("name"); //sortBy is not used anywhere - is there a reason why you're storing this value?
  const [filteredProducts, setFilteredProducts] = useState([]);
  // This "filteredProducts" works, but renewing filtered products ever time doesn't seem to be the best way to deal with filters
  // If the backend can take filter values to use in their queries, that would be ideal.
  // If that's not possible, products can just be filtered upon render because displaying the products is the only flow that matters for filtering

  useEffect(() => {
    loadProducts();
    // It is true that useEffect should contain side effects, but consider other ways to refactor this
    // For example, you could use react-query to handle fetching and storing altogether.
    // Alternatively, you could use a custom hook if this logic is used in multiple places.
    // If custom hooks are not an option either, you could still use useCallback to memoize the products.
    // Also, you could define the function within useEffect. This lets you clean up loadProducts function from useEffect.
  }, [categoryId]);

  const loadProducts = async () => {
    //no cleanup - potential memory leak
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/products?category=${categoryId}`); // Move calls like this to "Service" instead of calling it straight from the component
      // Always a good idea to implement error recovery - maybe implement a retry mechanism
      setProducts(response.data);
      setFilteredProducts(response.data); // Unnecessary because filteredProducts are
    } catch (err) {
      setError("Failed to load products");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // Unnecessary if we're using the above strategy of filtering only during render
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleAddToFavorites = (productId) => {
    // As mentioned above, you might want to have "isFavorite" in each product.
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  const handleSort = (field) => {
    setSortBy(field);
    const sorted = [...filteredProducts].sort((a, b) => {
      if (field === "price") {
        return a.price - b.price;
      }
      return a[field].localeCompare(b[field]);
    });
    setFilteredProducts(sorted);
  };

  //this function looks like it can be moved to a utils function collection - that would mean this function doesn't get redefined every time this component re-renders
  const calculateDiscount = (originalPrice, discountPercent) => {
    return originalPrice * (1 - discountPercent / 100);
  };

  //this function looks like it can be moved to a utils function collection
  const getProductRating = (product) => {
    // You can use useCallback for this function because going through all the reviews for the same product is expensive
    if (!product.reviews || product.reviews.length === 0) return 0; // 0 is a falsy value - you can just do !product.review.length
    const sum = product.reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / product.reviews.length;
  };

  const handleProductClick = (productId) => {
    window.location.href = `/product/${productId}`;
  };

  return (
    <div className="product-catalog">
      <div className="catalog-header">
        <h2>Products</h2>
        <div className="sort-controls">
          <button onClick={() => handleSort("name")}>Sort by Name</button>
          {/* Interactive elements like this should have proper aria labels */}
          <button onClick={() => handleSort("price")}>Sort by Price</button>
        </div>
      </div>

      {isLoading && <div>Loading products...</div>}

      {error && <div className="error">{error}</div>}
      {/* instead of just displaying the error, creating an error component can be more user-friendly */}

      <div className="products-grid">
        {/* this whole div should only be rendered when isLoading and error conditions are met */}
        {filteredProducts.map(
          (
            product // As mentioned above, use products.map and filter here instead of using the unnecessary "filteredProducts"
          ) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                onClick={() => handleProductClick(product.id)}
                // use <a> instead of using window.locagtion.href within handleProductClick
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              {/* product.description is used directly without sanitization - this could be a security risk */}

              <div className="price-section">
                <span className="original-price">${product.price}</span>
                {product.discount && (
                  <span className="discounted-price">
                    ${calculateDiscount(product.price, product.discount)}
                  </span>
                )}
              </div>

              <div className="rating">
                {Array.from(
                  { length: 5 },
                  (
                    _,
                    i //just Array.from(5) is sufficient and more readable. Also, it's probably a better idea to make "getProductRating" return an array of "star filled" or "star", then configure the UI based on that using Array.map. Using an empty array then checking if the current star should be filled is a little counter intuitive. Also, this could be memoized
                  ) => (
                    <span
                      key={i}
                      className={
                        i < getProductRating(product) ? "star filled" : "star"
                      }
                    >
                      {/* Try not to use symbols in this format - there are icons available for our design system */}
                      ★
                    </span>
                  )
                )}
              </div>

              <button
                className="favorite-btn"
                onClick={() => handleAddToFavorites(product.id)}
              >
                {/* same comment about icons */}
                {/* also, if we get rid of "favorites" as previously mentioned, this code becomes easier because you can just check for product.isFavorite */}
                {favorites.includes(product.id) ? "❤️" : "🤍"}
              </button>
            </div>
          )
        )}
      </div>

      {filteredProducts.length === 0 &&
        !isLoading && ( //again, no need to check === 0 because 0 is falsy
          <div>No products found</div>
        )}
    </div>
  );
};

// Consider adding an error boundary that can be used generally throughout the application. This way, if any function throws an error, the whole app doesn't go down.

export default ProductCatalog;
