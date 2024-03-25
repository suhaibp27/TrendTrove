import { Link, NavLink } from "react-router-dom";
import "./Footer.css";
import { IoMdCall, IoMdMail } from "react-icons/io";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-top-left">
            <Link className="footer-logo" to="/">
              <h3>
                TrendTrove<span>.</span>
              </h3>
            </Link>
            <p className="footer-tagline">Your Trendsetting Companion.</p>
            <p>1234 Trendy Street</p>
            <p>Fashion City, Trendland</p>
            <p className="footer-info">
              <IoMdCall /> +91 98765 43210
            </p>
            <p className="footer-info">
              <IoMdMail /> contact@trendtrove.com
            </p>
          </div>
          <div className="footer-top-right">
            <div>
              <h3>Helpful Links</h3>
              <NavLink to="/" className="footer-link" activeclassname="active">
                Home
              </NavLink>
              <NavLink
                to="/shop"
                className="footer-link"
                activeclassname="active"
              >
                Shop
              </NavLink>
              <NavLink
                to="/wishlist"
                className="footer-link"
                activeclassname="active"
              >
                Wishlist
              </NavLink>
              <p>Terms and Condition</p>
              <p>Privacy Policy</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div>
            <h3>Information</h3>
            <p>About Us</p>
            <p>More Search</p>
            <p>Blog</p>
            <p>Testimonials</p>
            <p>Events</p>
          </div>

          <div>
            <h3>Our Services</h3>
            <p>Brands List</p>
            <p>Order</p>
            <p>Return & Exchange</p>
            <p>Trending list</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
