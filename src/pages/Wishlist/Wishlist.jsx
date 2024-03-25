import { useData } from "../../contexts/DataContext";
import "./Wishlist.css";

const Wishlist = () => {
  const { state, setProductModal } = useData();

  return (
    <div className="wishlist-wrapper">
      <div className="wishlist-container">
        <div className="wishlist-top">
          <h4>Wishlist</h4>
        </div>
        <div className="wishlist-bottom">
          {state.wishListItems.length > 0 ? (
            state.wishListItems.map((item) => (
              <div
                key={item.id}
                className="wishlist-item"
                onClick={() => setProductModal("show", item)}
              >
                {item.image && <img src={item.image} alt={item.title} />}
                <div className="wishlist-item-desc">
                  <h4 className="wishlist-item-title">{item.title}</h4>
                  <p>$ {item.price}</p>
                </div>
              </div>
            ))
          ) : (
            <h3>No items in wishlist.</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
