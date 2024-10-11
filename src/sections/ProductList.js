import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
   const [products, setProducts] = useState([]);
   const [filteredProducts, setFilteredProducts] = useState([]);
   const [category, setCategory] = useState('');
   const [size, setSize] = useState('');
   const [searchTerm, setSearchTerm] = useState('');
   const [cart, setCart] = useState([]);
   const [categories, setCategories] = useState([]);
   const [sizes, setSizes] = useState([]);
   const navigate = useNavigate();

   useEffect(() => {
      axios.get('https://fakestoreapi.com/products')
         .then(response => {
            const data = response.data;
            setProducts(data);
            setFilteredProducts(data);

            const uniqueCategories = [...new Set(data.map(product => product.category))];
            const uniqueSizes = ['S', 'M', 'L', 'XL', 'XXL'];
            setCategories(uniqueCategories);
            setSizes(uniqueSizes);
         })
         .catch(error => console.error('Error fetching products:', error));
   }, []);

   useEffect(() => {
      let filtered = products;
      if (category) filtered = filtered.filter(product => product.category === category);
      if (size) filtered = filtered.filter(product => product.size === size);
      if (searchTerm) filtered = filtered.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredProducts(filtered);
   }, [category, size, searchTerm, products]);

   const resetFilters = () => {
      setCategory('');
      setSize('');
      setSearchTerm('');
      setFilteredProducts(products);
   };

   const updateCart = (productId, newQuantity) => {
      setCart(cart.map(item =>
         item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
   };

   const handleQuantityChange = (productId, newQuantity) => {
      // Update the quantity in the filteredProducts state for rendering
      const updatedProducts = filteredProducts.map(product =>
         product.id === productId ? { ...product, selectedQuantity: newQuantity } : product
      );
      setFilteredProducts(updatedProducts);

      // If the product is already in the cart, update the quantity in the cart as well
      const existingProduct = cart.find(item => item.id === productId);
      if (existingProduct) {
         updateCart(productId, parseInt(newQuantity));
      }
   };

   const toggleCartSelection = (product, isSelected) => {
      const selectedQuantity = product.selectedQuantity || 1; // Default to 1 if no quantity selected

      if (isSelected) {
         const existingProduct = cart.find(item => item.id === product.id);
         if (existingProduct) {
            updateCart(product.id, selectedQuantity);
         } else {
            setCart([...cart, { ...product, quantity: selectedQuantity }]);
         }
      } else {
         setCart(cart.filter(item => item.id !== product.id));
      }
   };

   const goToCart = () => {
      navigate('/cart', { state: { cartItems: cart } });
   };

   return (
      <>
         <header>
            <div className="header">
               <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">All Categories</option>
                  {categories.map((cat, index) => (
                     <option key={index} value={cat}>{cat}</option>
                  ))}
               </select>

               <select value={size} onChange={(e) => setSize(e.target.value)}>
                  <option value="">All Sizes</option>
                  {sizes.map((sizeOption, index) => (
                     <option key={index} value={sizeOption}>{sizeOption}</option>
                  ))}
               </select>

               <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />

               <button onClick={resetFilters}>Reset</button>
               <button onClick={goToCart}>Add to Cart ({cart.length})</button>
            </div>
         </header>

         <div className="product-table-container">
            <table className="product-table">
               <thead>
                  <tr>
                     <th>Image</th>
                     <th>Product</th>
                     <th>Category</th>
                     <th>Price</th>
                     <th>Quantity</th>
                     <th>Buy</th>
                  </tr>
               </thead>
               <tbody>
                  {filteredProducts.map((product) => (
                     <tr key={product.id}>
                        <td><img src={product.image} alt={product.title} /></td>
                        <td>{product.title}</td>
                        <td>{product.category}</td>
                        <td>${product.price}</td>
                        <td>
                           <input
                              type="number"
                              min="1"
                              max={product.quantityAvailable || 10}
                              value={product.selectedQuantity || 1}
                              onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                           />
                        </td>
                        <td>
                           <input
                              type="checkbox"
                              onChange={(e) => {
                                 const isSelected = e.target.checked;
                                 toggleCartSelection(product, isSelected);
                              }}
                           />
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </>
   );
};

export default ProductList;
