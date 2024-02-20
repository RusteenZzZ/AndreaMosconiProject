import Navbar from "./Navbar";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import download from "../download.jpg";
import image from "../image4.png";
import Footer from "./Footer";
import { Link } from "react-router-dom";

export default function InteriorDesign() {
  // const [data, updateData] = useState(sampleData);s
  const [dataFetched, updateFetched] = useState(false);

  async function fetchMarketCollections() {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      MarketplaceJSON.address,
      MarketplaceJSON.abi,
      signer
    );
    //create an NFT Token
    let transaction = await contract.fetchMarketCollections();

    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
        };
        return item;
      })
    );

    updateFetched(true);
    // updateData(items.reverse());
  }

  if (!dataFetched) fetchMarketCollections();

  return (
    <div style={{ backgroundColor: "white" }}>
      <Navbar></Navbar>
      <div style={{ margin: "130px" }}>
        <button className="bg-transparent hover:bg-blue-500 text-black font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Design Masterpieces
        </button>
        <button className="ml-4 bg-transparent hover:bg-blue-500 text-black font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Artworks
        </button>
        <button className="ml-4 mb-8 bg-transparent hover:bg-blue-500 text-black font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Interior Designs
        </button>
        {/* <h1 className="text-5xl mt-8 ml-6">Explore</h1>   */}
        <div className="container grid grid-cols-2 gap-2">
          <h1 style={{ fontSize: "48px", fontWeight: 600 }}>
            <span style={{ color: "#1B6AE4" }}>No Code </span> Require to Create
            "interior Design" NFT
            <p className="mt-4" style={{ fontSize: "14px", fontWeight: 300 }}>
              Our generator is designed to help you launch the next big
              collection. You can design your own masterpieces.
            </p>
          </h1>

          <div>
            <div className="flex flex-wrap justify-end">
              <div style={{ width: "300px", height: "330px" }}>
                <img
                  src={image}
                  alt="..."
                  className="shadow rounded max-w-full h-auto align-middle border-none"
                />
              </div>
            </div>
          </div>
          <Link to="/sellNFT">
            <button
              style={{ width: "100px" }}
              className="mb-10 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
