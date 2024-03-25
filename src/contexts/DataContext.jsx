import { createContext, useContext, useReducer } from "react";

// Define api end points
const FETCH_ALL_DATA_API = "https://fakestoreapi.com/products";
const FETCH_ELECTRONICS_API =
  "https://fakestoreapi.com/products/category/electronics";
const FETCH_JEWELLERY_API =
  "https://fakestoreapi.com/products/category/jewelery";
const FETCH_MENSCLOTH_API =
  "https://fakestoreapi.com/products/category/men's clothing";
const FETCH_WOMENSCLOTH_API =
  "https://fakestoreapi.com/products/category/women's clothing";

// Define action types
const FETCH_ALL_DATA = "FETCH_ALL_DATA";
const FETCH_ELECTRONICS = "FETCH_ELECTRONICS";
const FETCH_JEWELLERY = "FETCH_JEWELLERY";
const FETCH_MENSCLOTH = "FETCH_MENSCLOTH";
const FETCH_WOMENSCLOTH = "FETCH_WOMENSCLOTH";
const SET_SHOW_PRODUCT_MODAL = "SET_SHOW_PRODUCT_MODAL";
const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
const REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST";

// Define initial state
const initialState = {
  highlightItems: [
    {
      id: 17,
      title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
      price: 39.99,
      description:
        "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
      category: "women's clothing",
      image: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
      rating: {
        rate: 3.8,
        count: 679,
      },
    },
    {
      id: 13,
      title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
      price: 599,
      description:
        "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
      category: "electronics",
      image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
      rating: {
        rate: 2.9,
        count: 250,
      },
    },
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: {
        rate: 3.9,
        count: 120,
      },
    },
    {
      id: 7,
      title: "White Gold Plated Princess",
      price: 9.99,
      description:
        "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
      rating: {
        rate: 3,
        count: 400,
      },
    },
  ],
  trendingItems: [],
  showProductModal: false,
  productData: {},
  wishListItems: [],
  wishListIds: [],
};

// Define reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_DATA:
      return { ...state, trendingItems: action.payload };
    case FETCH_ELECTRONICS:
      return { ...state, trendingItems: action.payload };
    case FETCH_JEWELLERY:
      return { ...state, trendingItems: action.payload };
    case FETCH_MENSCLOTH:
      return { ...state, trendingItems: action.payload };
    case FETCH_WOMENSCLOTH:
      return { ...state, trendingItems: action.payload };
    case SET_SHOW_PRODUCT_MODAL:
      return {
        ...state,
        showProductModal: action.payload[0],
        productData: action.payload[1],
      };
    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishListItems: [action.payload, ...state.wishListItems],
        wishListIds: [action.payload.id, ...state.wishListIds],
      };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishListItems: state.wishListItems.filter(
          (item) => item.id != action.payload.id
        ),
        wishListIds: state.wishListIds.filter(
          (itemId) => itemId != action.payload.id
        ),
      };
    default:
      return state;
  }
};

function getRandomNumbers(n) {
  const uniqueNumbers = new Set();

  while (uniqueNumbers.size < 4) {
    const randomNumber = Math.floor(Math.random() * n) + 1;
    uniqueNumbers.add(randomNumber);
  }

  return Array.from(uniqueNumbers);
}

// Create context
const DataContext = createContext();

// Create provider component
export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Functions to fetch data
  const fetchAllData = async () => {
    // Fetch data from API
    const data = await fetch(FETCH_ALL_DATA_API);
    const jsonData = await data.json();
    // Dispatch action to update state
    dispatch({ type: FETCH_ALL_DATA, payload: jsonData });
  };

  const fetchElectronics = async () => {
    // Fetch data from API
    const data = await fetch(FETCH_ELECTRONICS_API);
    const jsonData = await data.json();
    // Dispatch action to update state
    dispatch({ type: FETCH_ELECTRONICS, payload: jsonData });
  };

  const fetchJewellery = async () => {
    // Fetch data from API
    const data = await fetch(FETCH_JEWELLERY_API);
    const jsonData = await data.json();
    // Dispatch action to update state
    dispatch({ type: FETCH_JEWELLERY, payload: jsonData });
  };

  const fetchMensCloth = async () => {
    // Fetch data from API
    const data = await fetch(FETCH_MENSCLOTH_API);
    const jsonData = await data.json();
    // Dispatch action to update state
    dispatch({ type: FETCH_MENSCLOTH, payload: jsonData });
  };

  const fetchWomensCloth = async () => {
    // Fetch data from API
    const data = await fetch(FETCH_WOMENSCLOTH_API);
    const jsonData = await data.json();
    // Dispatch action to update state
    dispatch({ type: FETCH_WOMENSCLOTH, payload: jsonData });
  };

  const setProductModal = (visibility, data) => {
    if (visibility == "show") {
      document.body.style.overflow = "hidden";
      // console.log(JSON.stringify(data));
      dispatch({ type: SET_SHOW_PRODUCT_MODAL, payload: [true, data] });
    } else {
      document.body.style.overflow = "auto";
      dispatch({ type: SET_SHOW_PRODUCT_MODAL, payload: [false, {}] });
    }
  };

  const addToWishList = (data) => {
    dispatch({ type: ADD_TO_WISHLIST, payload: data });
  };

  const removeFromWishList = (data) => {
    dispatch({ type: REMOVE_FROM_WISHLIST, payload: data });
  };

  return (
    <DataContext.Provider
      value={{
        state,
        fetchAllData,
        fetchElectronics,
        fetchJewellery,
        fetchMensCloth,
        fetchWomensCloth,
        setProductModal,
        addToWishList,
        removeFromWishList,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to consume context
export const useData = () => useContext(DataContext);
