import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar.jsx';
import Alert from './Alert.jsx';
import RatingsAndReviews from '../components/ratingAndReviews/RatingsAndReviews.jsx';
import SearchBar from '../components/reusableComponents/SearchBar.jsx';
import Modal from '../components/reusableComponents/Modal.jsx';
import Button from '../components/reusableComponents/Button.jsx';

const App = () => {
  const [productId, setProductId] = useState(37318);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/products/${productId}`)
      .then(({ data }) => setCurrentProduct(data))
      .catch(err =>
        setAlert({ type: 'error', message: 'Product Not Found'})
      );
  }, [productId]);

  const handleSearch = (searchId) => {
    if (!isNaN(+searchId)) {
      setProductId(searchId);
      setAlert(null);
    } else {
      setAlert({ type: 'error', message: 'Invalid Product ID'});
    }
  };
  return (
    <div>
      <NavBar onSearch={handleSearch}/>
      {alert && <Alert type={alert.type} message={alert.message}/>}
      {currentProduct && <RatingsAndReviews productId={productId} currentProduct={currentProduct}/>}
    </div>
  );
};

export default App;
