import "./App.css";
import Navbar from "./components/Navbar";
import Marketplace from "./components/Marketplace";
import Profile from "./components/Profile";
import SellNFT from "./components/SellNFT";
import NFTPage from "./components/NFTpage";
import Admin from "./components/admin";
import "./fonts/FontsFree-Net-MAK-bold.ttf";
import { Routes, Route } from "react-router-dom";
import Testing from "./components/testing";
import Explore from "./components/Explore";
import ExploreALLNFTS from "./components/getallNFT";
import dotenv from 'dotenv';
import NFTCreator from "./components/CreatorNFTPage";


function App() {
  dotenv.config();
  return (
    <div className="container">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Marketplace />} />
        <Route path="/nftPage" element={<NFTPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sellNFT" element={<SellNFT />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/explore/designer_collection" element={<ExploreALLNFTS />}/>
        <Route path="/explore" element={<Explore />} />
        <Route path="/testing" element={<Testing />} />
      </Routes>
    </div>
  );
}

export default App;
