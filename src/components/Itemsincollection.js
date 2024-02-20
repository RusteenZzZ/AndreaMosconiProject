import Navbar from "./Navbar";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import Footer from "./Footer";

export default function ItemsInCollection() {
  const sampleData = [
    // {
    //     "name": "NFT#1",
    //     "description": "Alchemy's First NFT",
    //     "website":"http://axieinfinity.io",
    //     "image":"https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
    //     "price":"0.03ETH",
    //     "currentlySelling":"True",
    //     "address":"0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    // },
    // {
    //     "name": "NFT#2",
    //     "description": "Alchemy's Second NFT",
    //     "website":"http://axieinfinity.io",
    //     "image":"https://gateway.pinata.cloud/ipfs/QmdhoL9K8my2vi3fej97foiqGmJ389SMs55oC5EdkrxF2M",
    //     "price":"0.03ETH",
    //     "currentlySelling":"True",
    //     "address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    // },
    // {
    //     "name": "NFT#3",
    //     "description": "Alchemy's Third NFT",
    //     "website":"http://axieinfinity.io",
    //     "image":"https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
    //     "price":"0.03ETH",
    //     "currentlySelling":"True",
    //     "address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    // },
  ];
  const [data, updateData] = useState(sampleData);
  const [dataFetched, updateFetched] = useState(false);

  async function getItemsofCollection() {
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
    let transaction = await contract.getItemsofCollection();

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
    updateData(items.reverse());
  }

  if (!dataFetched) getItemsofCollection();

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
          <div className="flex px-5 py-2 mx-auto lg:pt-12 lg:px-10">
            <div className="block justify-center">
              <div
                style={{ padding: "10px", margin: "5px" }}
                className="rounded-lg shadow-lg bg-white max-w-sm"
              >
                <a href="#!">
                  <img
                    className="rounded-t-lg"
                    src="https://mdbootstrap.com/img/new/standard/nature/184.jpg"
                    alt=""
                  />
                </a>
                <div className="p-6">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">
                    Pirate Nation
                  </h5>
                  <p>0.11 ETH</p> <p>Ends in 23 Hours</p>
                </div>
              </div>
            </div>
            <div className="block justify-center">
              <div
                style={{ padding: "10px", margin: "5px" }}
                className="rounded-lg shadow-lg bg-white max-w-sm"
              >
                <a href="#!">
                  <img
                    className="rounded-t-lg"
                    src="https://mdbootstrap.com/img/new/standard/nature/184.jpg"
                    alt=""
                  />
                </a>
                <div className="p-6">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">
                    Pirate Nation
                  </h5>
                  <p>0.11 ETH</p> <p>Ends in 23 Hours</p>
                </div>
              </div>
            </div>
            <div className="block justify-center">
              <div
                style={{ padding: "10px", margin: "5px" }}
                className="rounded-lg shadow-lg bg-white max-w-sm"
              >
                <a href="#!">
                  <img
                    className="rounded-t-lg"
                    src="https://mdbootstrap.com/img/new/standard/nature/184.jpg"
                    alt=""
                  />
                </a>
                <div className="p-6">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">
                    Pirate Nation
                  </h5>
                  <p>0.11 ETH</p> <p>Ends in 23 Hours</p>
                </div>
              </div>
            </div>
            <div className="block justify-center">
              <div
                style={{ padding: "10px", margin: "5px" }}
                className="rounded-lg shadow-lg bg-white max-w-sm"
              >
                <a href="#!">
                  <img
                    className="rounded-t-lg"
                    src="https://mdbootstrap.com/img/new/standard/nature/184.jpg"
                    alt=""
                  />
                </a>
                <div className="p-6">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">
                    Pirate Nation
                  </h5>
                  <p>0.11 ETH</p> <p>Ends in 23 Hours</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex px-4 py-2 mx-auto lg:pt-12 lg:px-10">
            <div className="block justify-center">
              <div
                style={{ padding: "10px", margin: "5px" }}
                className="rounded-lg shadow-lg bg-white max-w-sm"
              >
                <a href="#!">
                  <img
                    className="rounded-t-lg"
                    src="https://mdbootstrap.com/img/new/standard/nature/184.jpg"
                    alt=""
                  />
                </a>
                <div className="p-6">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">
                    Pirate Nation
                  </h5>
                  <p>0.11 ETH</p> <p>Ends in 23 Hours</p>
                </div>
              </div>
            </div>
            <div className="block justify-center">
              <div
                style={{ padding: "10px", margin: "5px" }}
                className="rounded-lg shadow-lg bg-white max-w-sm"
              >
                <a href="#!">
                  <img
                    className="rounded-t-lg"
                    src="https://mdbootstrap.com/img/new/standard/nature/184.jpg"
                    alt=""
                  />
                </a>
                <div className="p-6">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">
                    Pirate Nation
                  </h5>
                  <p>0.11 ETH</p> <p>Ends in 23 Hours</p>
                </div>
              </div>
            </div>
            <div className="block justify-center">
              <div
                style={{ padding: "10px", margin: "5px" }}
                className="rounded-lg shadow-lg bg-white max-w-sm"
              >
                <a href="#!">
                  <img
                    className="rounded-t-lg"
                    src="https://mdbootstrap.com/img/new/standard/nature/184.jpg"
                    alt=""
                  />
                </a>
                <div className="p-6">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">
                    Pirate Nation
                  </h5>
                  <p>0.11 ETH</p> <p>Ends in 23 Hours</p>
                </div>
              </div>
            </div>
            <div className="block justify-center">
              <div
                style={{ padding: "10px", margin: "5px" }}
                className="rounded-lg shadow-lg bg-white max-w-sm"
              >
                <a href="#!">
                  <img
                    className="rounded-t-lg"
                    src="https://mdbootstrap.com/img/new/standard/nature/184.jpg"
                    alt=""
                  />
                </a>
                <div className="p-6">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">
                    Pirate Nation
                  </h5>
                  <p>0.11 ETH</p> <p>Ends in 23 Hours</p>
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
