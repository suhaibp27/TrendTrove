import "./Hero.css";
import trendhero from "./../../assets/trendhero.jpg";
import { IoHeart } from "react-icons/io5";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero-wrapper">
      <div className="hero-container">
        <div>CLOTHING,</div>
        <div className="hero-empty">
          <img src={trendhero} alt="" />
        </div>
        <div> ELECTRONICS</div>
        <div>& ACCESSORIES</div>
      </div>
      <div className="hero-bottom">
        <Link className="hero-shop-button" to="/shop">
          Shop Now
        </Link>
        <Link to="/wishlist">
          <IoHeart size={20} />
        </Link>
      </div>
    </div>
  );
};

export default Hero;
