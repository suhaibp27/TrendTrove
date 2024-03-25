import "./Highlight.css";
import { useData } from "../../contexts/DataContext";

const Highlight = () => {
  const { state, setProductModal } = useData();

  return (
    <div className="highlight-wrapper">
      <div className="highlight-container">
        {state.highlightItems.map((item) => (
          <div
            key={item.id}
            className="highlight-item"
            onClick={() => setProductModal("show", item)}
          >
            <div className="highlight-item-desc">
              <h4 className="trending-item-title">{item.title}</h4>
              <p>$ {item.price}</p>
            </div>
            {item.image && <img src={item.image} alt={item.title} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Highlight;
