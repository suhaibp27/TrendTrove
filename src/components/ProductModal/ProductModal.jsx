import "./ProductModal.css";
import React, { useEffect, useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa";
import { useData } from "../../contexts/DataContext";
import { useCart } from "../../contexts/CartContext";
import Tooltip from "../../utils/Tooltip";
import {
  IoHeart,
  IoHeartOutline,
  IoBagAddOutline,
  IoBagCheck,
} from "react-icons/io5";

const ProductModal = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { state, setProductModal, addToWishList, removeFromWishList } =
    useData();
  const { id, title, image, description, price, rating, category } =
    state.productData;
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(price);
  const { cartState, addToCart } = useCart();

  const truncateText = (elementSelector, maxLength) => {
    const elements = document.querySelectorAll(elementSelector);

    elements.forEach((element) => {
      let text = element.textContent.trim();
      if (text.length > maxLength) {
        text = text.slice(0, maxLength) + "...";
      }
      element.textContent = text;
    });
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setIsAddedToCart(false);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    setIsAddedToCart(false);
  };

  const calculateTotal = (q) => {
    setTotalPrice(q > 0 ? parseFloat((q * price).toFixed(2)) : 0);
  };

  const toggleWishList = () => {
    if (isWishlisted) {
      setIsWishlisted(false);
      removeFromWishList(state.productData);
    } else {
      setIsWishlisted(true);
      addToWishList(state.productData);
    }
  };

  const handleCartClick = () => {
    if (isAddedToCart) {
    } else {
      setIsAddedToCart(true);
      addToCart({ ...state.productData, quantity });
    }
  };

  useEffect(() => {
    calculateTotal(quantity);
  }, [quantity]);

  useEffect(() => {
    truncateText(".product-desc", 200);
    truncateText(".product-title", 40);
    setQuantity(1);
    calculateTotal(quantity);
    if (state.wishListIds.indexOf(id) > -1) {
      setIsWishlisted(true);
    } else {
      setIsWishlisted(false);
    }
    const itemInCart = cartState.cartItems.find((item) => item.id == id);
    if (itemInCart) {
      setIsAddedToCart(true);
      setQuantity(itemInCart.quantity);
    } else {
      setIsAddedToCart(false);
    }
  }, [description]);
  return (
    <div
      className={
        state.showProductModal ? "productModal active" : "productModal"
      }
    >
      <div className="productModalContent">
        <div className="productModal-left">
          <img className="product-image" src={image} alt={title} />
        </div>
        <div className="productModal-right">
          <div className="productModalDetails">
            <p className="product-category">{category}</p>
            <Tooltip text={title}>
              <h3 className="product-title">{title}</h3>
            </Tooltip>
            <div className="product-rating">
              <h4>$ {price}</h4>
              <p>
                {rating &&
                  [...Array(Math.round(rating.rate))].map((_, index) => (
                    <FaStar className="productRatingStar active" key={index} />
                  ))}
                {rating &&
                  [...Array(5 - Math.round(rating.rate))].map((_, index) => (
                    <FaStar className="productRatingStar" key={index} />
                  ))}
              </p>
            </div>
            <p className="product-desc-heading">Details</p>
            <Tooltip text={description}>
              <p className="product-desc">{description}</p>
            </Tooltip>
            <div className="product-count">
              <div className="product-select">
                <label>QUANTITY</label>
                <div className="product-select-value product-quantity">
                  <span onClick={decreaseQuantity}>-</span>
                  <p>{quantity}</p>
                  <span onClick={increaseQuantity}>+</span>
                </div>
              </div>
              <div className="product-select">
                <label>TOTAL PRICE</label>
                <p className="product-select-value">$ {totalPrice}</p>
              </div>
            </div>
            {isWishlisted ? (
              <button
                className="product-button product-button-secondary"
                onClick={toggleWishList}
              >
                <IoHeart className="svg-heart" /> Wishlisted
              </button>
            ) : (
              <button
                className="product-button product-button-secondary"
                onClick={toggleWishList}
              >
                <IoHeartOutline />
                Add to Wishlist
              </button>
            )}
            {isAddedToCart ? (
              <button
                className="product-button product-button-primary"
                onClick={handleCartClick}
              >
                <IoBagCheck className="svg-bag" /> Go to Cart
              </button>
            ) : (
              <button
                className="product-button product-button-primary"
                onClick={handleCartClick}
              >
                <IoBagAddOutline /> Add to Cart
              </button>
            )}
          </div>
        </div>
        <button
          className="productModalCloseButton"
          onClick={() => {
            setProductModal("hide");
            document.body.style.overflow = "auto";
          }}
        >
          <FaTimes size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
