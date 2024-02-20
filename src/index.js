import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./fonts/FontsFree-Net-MAK-bold.ttf";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SellNFT from "./components/SellNFT";
import Marketplace from "./components/Marketplace";
import Profile from "./components/Profile";
import NFTPage from "./components/NFTpage";
import AllCollections from "./components/Allcollections";
import Artist from "./components/Artist";
import ItemsInCollection from "./components/Itemsincollection";
import CreateNft from "./components/CreateNft";
import DesignMasterPiece from "./components/DesignMasterpeice";
import Artworks from "./components/Artworks";
import InteriorDesign from "./components/InteriorDesign";
import Admin from "./components/admin";
import Testing from "./components/testing";
import Explore from "./components/Explore";
import ExploreALLNFTS from "./components/DesignergetallNFT";
import ProducerExploreALLNFTS from "./components/producergetallNFT";
import CreateCollection from "./components/CreateCollection";
import Creator_NFT from "./components/CreatorNFTPage";
import CreatorNFTCollection from "./components/CreatorNFTCollection";
import ExploreCollection from "./components/ExploreCollections";
import ExploreCreator from "./components/ExploreCreators";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Marketplace />} />
        <Route path="/sellNFT" element={<SellNFT />} />
        <Route path="/nftPage/:contract_address/:tokenId" element={<NFTPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/NFT_Creator/:tokenId" element={<Creator_NFT/>}/>
        <Route path="/NFT_Creator_Collection/:tokenId/:collection_address" element={<CreatorNFTCollection/>}/>
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/explore/designer_collection"
          element={<ExploreALLNFTS />}
        />
        <Route path="/create_collection" element={<CreateCollection />} />
        <Route
          path="/explore/producer_collection"
          element={<ProducerExploreALLNFTS />}
        />
        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/Creator" element={<ExploreCreator/>} />
        <Route path="/explore/Collections" element={<ExploreCollection/>} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/allcollections" element={<AllCollections />} />
        <Route path="/artist" element={<Artist />} />
        <Route path="/itemsincollection" element={<ItemsInCollection />} />
        <Route path="/create" element={<CreateNft />} />
        <Route path="/designmaster" element={<DesignMasterPiece />} />
        <Route path="/artworks" element={<Artworks />} />
        <Route path="/interiordesign" element={<InteriorDesign />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
