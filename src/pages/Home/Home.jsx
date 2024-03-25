import Hero from "../../components/Hero/Hero";
import Highlight from "../../components/Highlight/Highlight";
import Trending from "../../components/Trending/Trending";

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="app-content">
        <Highlight />
        <Trending />
      </div>
    </div>
  );
};

export default Home;
