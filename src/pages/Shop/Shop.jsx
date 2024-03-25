import { useEffect } from "react";
import { useData } from "../../contexts/DataContext";
import "./Shop.css";

const Shop = () => {
  const {
    state,
    fetchAllData,
    fetchElectronics,
    fetchJewellery,
    fetchMensCloth,
    fetchWomensCloth,
    setProductModal,
  } = useData();

  function truncateText(elementSelector, maxLength) {
    const elements = document.querySelectorAll(elementSelector);

    elements.forEach((element) => {
      let text = element.textContent.trim();
      if (text.length > maxLength) {
        text = text.slice(0, maxLength) + "...";
      }
      element.textContent = text;
    });
  }

  useEffect(() => {
    fetchAllData();
    setTimeout(() => truncateText(".shop-item-title", 30), 1000);
    document
      .getElementById("shop-menu")
      .addEventListener("click", function (event) {
        if (event.target.tagName === "BUTTON") {
          var buttons = document.querySelectorAll("#shop-menu button");
          buttons.forEach(function (button) {
            button.classList.remove("active");
          });
          event.target.classList.add("active");
        }
      });
  }, []);

  return (
    <div className="shop-wrapper">
      <div className="shop-container">
        <div className="shop-top">
          <div className="shop-top-left">
            <h4>Products</h4>
          </div>
          <div className="shop-top-right">
            <ul id="shop-menu">
              <li>
                <button
                  className="shop-menu-item active"
                  onClick={() => fetchAllData()}
                >
                  All
                </button>
              </li>
              <li>
                <button
                  className="shop-menu-item"
                  onClick={() => fetchElectronics()}
                >
                  Electronics
                </button>
              </li>
              <li>
                <button
                  className="shop-menu-item"
                  onClick={() => fetchJewellery()}
                >
                  Jewellery
                </button>
              </li>
              <li>
                <button
                  className="shop-menu-item"
                  onClick={() => fetchMensCloth()}
                >
                  Men's Clothing
                </button>
              </li>
              <li>
                <button
                  className="shop-menu-item"
                  onClick={() => fetchWomensCloth()}
                >
                  Women's Clothing
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="shop-bottom">
          {state.trendingItems.map((item) => (
            <div
              key={item.id}
              className="shop-item"
              onClick={() => setProductModal("show", item)}
            >
              {item.image && <img src={item.image} alt={item.title} />}
              <div className="shop-item-desc">
                <h4 className="shop-item-title">{item.title}</h4>
                <p>$ {item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
