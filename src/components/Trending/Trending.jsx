import { useEffect } from "react";
import { useData } from "../../contexts/DataContext";
import "./Trending.css";

const Trending = () => {
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
    fetchElectronics();
    setTimeout(() => truncateText(".trending-item-title", 30), 1000);
    document
      .getElementById("trending-menu")
      .addEventListener("click", function (event) {
        if (event.target.tagName === "BUTTON") {
          var buttons = document.querySelectorAll("#trending-menu button");
          buttons.forEach(function (button) {
            button.classList.remove("active");
          });
          event.target.classList.add("active");
        }
      });
  }, []);

  return (
    <div className="trending-wrapper">
      <div className="trending-container">
        <div className="trending-top">
          <div className="trending-top-left">
            <h4>Trending Products</h4>
            <p>Our most trending products based on sales.</p>
          </div>
          <div className="trending-top-right">
            <ul id="trending-menu">
              {/* <li>
                <button
                  className="trending-menu-item active"
                  onClick={() => fetchAllData()}
                >
                  All
                </button>
              </li> */}
              <li>
                <button
                  className="trending-menu-item active"
                  onClick={() => fetchElectronics()}
                >
                  Electronics
                </button>
              </li>
              <li>
                <button
                  className="trending-menu-item"
                  onClick={() => fetchJewellery()}
                >
                  Jewellery
                </button>
              </li>
              <li>
                <button
                  className="trending-menu-item"
                  onClick={() => fetchMensCloth()}
                >
                  Men's Clothing
                </button>
              </li>
              <li>
                <button
                  className="trending-menu-item"
                  onClick={() => fetchWomensCloth()}
                >
                  Women's Clothing
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="trending-bottom">
          {state.trendingItems.map((item) => (
            <div
              key={item.id}
              className="trending-item"
              onClick={() => setProductModal("show", item)}
            >
              {item.image && <img src={item.image} alt={item.title} />}
              <div className="trending-item-desc">
                <h4 className="trending-item-title">{item.title}</h4>
                <p>$ {item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trending;
