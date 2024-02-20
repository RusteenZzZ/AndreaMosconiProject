import * as React from "react";
import Grid from "@mui/material/Grid";
import Factoryabi from "../factory.json";
import Navbar from "./Navbar";
import NFTTile from "./NFTTILE";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import Footer from "./Footer";
import address from "./Address";
import "../App.css";

export default function ProducerExploreALLNFTS() {
  const [data, updateData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);
  async function get_all_collection(e) {
    const ethers = require("ethers");

    let provider=null;
    let signer=null;
    if(window.ethereum)
    {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
    }
    else
    {
      provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai-bor.publicnode.com');
      signer = new ethers.Wallet("ac0472481b7a23f89fbc462fcd7f9d16193594001f5f33bce9bf5b3217d1de35", provider);
    }

      const FactortAddressTemp= address;
      //Pull the deployed contract instance
      let contract_factory = new ethers.Contract(
        FactortAddressTemp,
        Factoryabi,
        signer
      );
      let Address_Collection =
        await contract_factory.getAllcollection_address();

      //Fetch all the details of every NFT from the contract and display
      await Promise.all(
        Address_Collection.map(async (y) => {
          let contract = new ethers.Contract(y, MarketplaceJSON, signer);
          let NFT_Collection = await contract.getAllNFTs();
          await Promise.all(
            NFT_Collection.map(async (i) => {
              let tokenURI = await contract.tokenURI(i.tokenId);
              if(tokenURI.split("/")[0]==="ipfs:")
              {
                tokenURI = 'https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/' + tokenURI.split("/")[2];
              }
              let meta = await axios.get(
                tokenURI
              );
              meta = meta.data;
              if(meta.image.split("/")[0]==="ipfs:")
              {
                meta.image='https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/' + meta.image.split("/")[2];
              }
              let item = {
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.image,
                name: meta.name,
                description: meta.description,
                category: meta.category,
                contract_address: y,
                designer: meta.designer,
                producer: meta.producer,
              };
              data.unshift(item);
              data.sort(function(a, b) { 
                return a.producer - b.producer  ||  a.name.localeCompare(b.name);
              });
            })
          );
          updateFetched(true);
        
          const filteredArr = data.reduce((acc, current) => {
            const x = acc.find((item) => item.image === current.image);

            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          }, []);
          updateData(filteredArr);
        })
      );


    return;
  }
  if (!dataFetched) get_all_collection();

  return (
    <div style={{ backgroundColor: "transparent" }}>
      <Navbar></Navbar>
      <div
        className="container mx-auto MarketPlacePage"
        style={{ padding: "0px 0px" }}
      >
        <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
            <h1
              style={{
                display: "block",
                fontSize: "1.5em",
                fontWeight: "600",
                fontFamily: "Mak",
              }}
            >
              Collection
            </h1>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ paddingBottom: "40px" }}
          >
            {data ? (
              <>
                {data.map((value, index) => {
                  return <NFTTile data={value} key={index.image}></NFTTile>;
                })}
              </>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
}
