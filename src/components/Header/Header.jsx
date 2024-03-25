import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import { IoCart, IoHeart } from "react-icons/io5";
import { useCart } from "../../contexts/CartContext";
import { useData } from "../../contexts/DataContext";

const Header = () => {
  const { cartState } = useCart();
  const { state } = useData();

  return (
    <div className="header-wrapper">
      <div className="header-container">
        <div className="header-left">
          <Link className="header-link" to="/">
            <h3>
              TrendTrove<span>.</span>
            </h3>
          </Link>
        </div>
        <div className="header-right">
          <ul className="header-menu">
            <li className="header-menu-item">
              <NavLink to="/" activeclassname="active">
                Home
              </NavLink>
            </li>
            <li className="header-menu-item">
              <NavLink to="/shop" activeclassname="active">
                Shop
              </NavLink>
            </li>
            <li className="header-menu-item header-cart">
              <NavLink to="/wishlist" activeclassname="active">
                <IoHeart size={20} />
              </NavLink>
              <p>{state.wishListItems.length}</p>
            </li>
            <li className="header-menu-item header-cart">
              <NavLink to="/cart" activeclassname="active">
                <IoCart size={20} />
              </NavLink>
              <p>{cartState.cartItems.length}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
