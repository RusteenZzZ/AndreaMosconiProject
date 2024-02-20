import Navbar from "./Navbar";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import download from "../download.jpg";
import Footer from "./Footer";

export default function AllCollections() {
  // const sampleData = [
  //   // {
  //   //     "name": "NFT#1",
  //   //     "description": "Alchemy's First NFT",
  //   //     "website":"http://axieinfinity.io",
  //   //     "image":"https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
  //   //     "price":"0.03ETH",
  //   //     "currentlySelling":"True",
  //   //     "address":"0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
  //   // },
  //   // {
  //   //     "name": "NFT#2",
  //   //     "description": "Alchemy's Second NFT",
  //   //     "website":"http://axieinfinity.io",
  //   //     "image":"https://gateway.pinata.cloud/ipfs/QmdhoL9K8my2vi3fej97foiqGmJ389SMs55oC5EdkrxF2M",
  //   //     "price":"0.03ETH",
  //   //     "currentlySelling":"True",
  //   //     "address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
  //   // },
  //   // {
  //   //     "name": "NFT#3",
  //   //     "description": "Alchemy's Third NFT",
  //   //     "website":"http://axieinfinity.io",
  //   //     "image":"https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
  //   //     "price":"0.03ETH",
  //   //     "currentlySelling":"True",
  //   //     "address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
  //   // },
  // ];
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
    await Promise.all(
      transaction.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        // let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          // price,
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
  }

  if (!dataFetched) fetchMarketCollections();

  return (
    <div style={{ backgroundColor: "white" }}>
      <Navbar></Navbar>
      <div>
        <h1 className="text-5xl mt-6 ml-6">Explore</h1>
        {/* <div style={{backgroundColor: "white", margin:120}}>                              
              <div style={{display:"block", textAlign:"center"}}>
              <div className="ml-2 inline-block">   
              <div>
              <button style={{marginRight: 50}} className="bg-transparent hover:bg-black-500 text-black-700 font-semibold hover:text-black py-2 px-4 border border-black-900 hover:border-transparent rounded">
                Design Masterpieces
              </button>
              <button style={{marginRight: 50}} className="bg-transparent hover:bg-black-500 text-black-700 font-semibold hover:text-black py-2 px-4 border border-black-900 hover:border-transparent rounded">
                Artworks
              </button>
              <button style={{marginRight: 50}} className="bg-transparent hover:bg-black-500 text-black-700 font-semibold hover:text-black py-2 px-4 border border-black-900 hover:border-transparent rounded">
                Interior Design
              </button>
              </div>
              </div>
              </div>               
              {data.map((value, index) => {
                return <NFTTile data={value} key={index}></NFTTile>;
              })}        
            </div> */}
        <section className="overflow-hidden text-gray-700 ">
          <div className="container flex px-5 py-2 mx-auto lg:pt-12 lg:px-32">
            {/* <div className="flex flex-wrap -m-1 md:-m-2">
              <div className="flex flex-wrap w-1/3">
                <div className="w-full p-1 md:p-2">
                  <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp" />
                </div>
                <div>
                <h1>dasdsfsdf</h1>
                </div>
              </div>
              <div className="flex flex-wrap w-1/3">
                <div className="w-full p-1 md:p-2">
                  <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp" />
                </div>
              </div>
              <div className="flex flex-wrap w-1/3">
                <div className="w-full p-1 md:p-2">
                  <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp" />
                </div>
              </div>
              <div className="flex flex-wrap w-1/3">
                <div className="w-full p-1 md:p-2">
                  <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp" />
                </div>
              </div>
              <div className="flex flex-wrap w-1/3">
                <div className="w-full p-1 md:p-2">
                  <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(76).webp" />
                </div>
              </div>
              <div className="flex flex-wrap w-1/3">
                <div className="w-full p-1 md:p-2">
                  <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp" />
                </div>
              </div>
            </div> */}
            <div className="block justify-center">
              <div
                style={{ padding: "10px" }}
                className="rounded-lg shadow-lg bg-white max-w-sm"
              >
                <a href="#!">
                  <img
                    className="rounded-t-lg"
                    src="https://mdbootstrap.com/img/new/standard/nature/184.jpg"
                    alt=""
                  />
                </a>
                <div className="p-6 flex">
                  <img
                    className="w-10 h-10 rounded"
                    src={download}
                    alt="Default avatar"
                  />
                  <h5 className="text-gray-900 ml-4 text-xl font-medium mb-2">
                    Pirate Nation
                  </h5>
                </div>
              </div>
            </div>
            <div className="block justify-center">
              <div
                style={{ padding: "10px" }}
                className="rounded-lg shadow-lg bg-white max-w-sm"
              >
                <a href="#!">
                  <img
                    className="rounded-t-lg"
                    src="https://mdbootstrap.com/img/new/standard/nature/184.jpg"
                    alt=""
                  />
                </a>
                <div className="p-6 flex">
                  <img
                    className="w-10 h-10 rounded"
                    src={download}
                    alt="Default avatar"
                  />
                  <h5 className="text-gray-900 ml-4 text-xl font-medium mb-2">
                    Pirate Nation
                  </h5>
                </div>
              </div>
            </div>
            <div className="block justify-center">
              <div
                style={{ padding: "10px" }}
                className="rounded-lg shadow-lg bg-white max-w-sm"
              >
                <a href="#!">
                  <img
                    className="rounded-t-lg"
                    src="https://mdbootstrap.com/img/new/standard/nature/184.jpg"
                    alt=""
                  />
                </a>
                <div className="p-6 flex">
                  <img
                    className="w-10 h-10 rounded"
                    src={download}
                    alt="Default avatar"
                  />
                  <h5 className="text-gray-900 ml-4 text-xl font-medium mb-2">
                    Pirate Nation
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
