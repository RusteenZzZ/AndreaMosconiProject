import * as React from "react";
import Grid from "@mui/material/Grid";
import Factoryabi from "../factory.json";
import Navbar from "./Navbar";
import { useState } from "react";
import Footer from "./Footer";
import address from "./Address";
import { Link } from "react-router-dom";
import "../App.css";

export default function ExploreCollection() {
  const [data, updateData] = useState([]);
  const [collectiondata, updateCollectionData] = useState([]);
  const [preArtistAddress, updatepreArtistData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);
  const [dataFetched2, updateFetched2] = useState(false);
  const FactortAddressTemp= address;
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
          if (y !== "0x0000000000000000000000000000000000000000") {
            let NFT_Collection = await contract_factory.getcollectiondescription(
              ethers.utils.getAddress(y)
            );
            const item = {
              category: NFT_Collection.category,
              // collectionId: NFT_Collection.collectionId,
              collection_URL: NFT_Collection.collection_URL,
              collection_address: NFT_Collection.collection_address,
              collection_banner: NFT_Collection.collection_banner,
              collection_description: NFT_Collection.collection_description,
              collection_image: NFT_Collection.collection_image,
              collection_name: NFT_Collection.collection_name,
              creator: NFT_Collection.creator,
            }
            data.unshift(item);
            return;
          }

          updateFetched(true);
        })
      );
      const filteredArr = data.reduce((acc, current) => {
        const x = acc.find((item) => item.collection_name === current.collection_name);
  
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      updateCollectionData(filteredArr);
      updateData(filteredArr);
    return;
  }
  if (!dataFetched) get_all_collection();

  async function get_all_address(e) {
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
    let contract_factory = new ethers.Contract(
      FactortAddressTemp,
      Factoryabi,
      signer
    );
    let GETALLArtsits = await contract_factory.getallartists();
    await Promise.all(
      GETALLArtsits.map(async (i) => {
        if (i !== "0x0000000000000000000000000000000000000000") {
          let NFT_Collection = await contract_factory.getartistdescription(
            ethers.utils.getAddress(i)
          );
          const item = {
            artist_info:NFT_Collection.artist_info,
            artist_name:NFT_Collection.artist_name, 
            profile_image_uri:NFT_Collection.profile_image_uri, 
            user_banner_uri:NFT_Collection.user_banner_uri, 
            website: NFT_Collection.website,
          }
          preArtistAddress.unshift(item);
          return;
        }
      })
    );
    const filteredArr = preArtistAddress.reduce((acc, current) => {
      const x = acc.find((item) => item.artist_name === current.artist_name);

      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    updatepreArtistData(filteredArr);
    updateFetched2(true);
  }
  if (!dataFetched2) get_all_address();



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
              Collections
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
            {(collectiondata) ? (
              <>
                {collectiondata.map((value, index) => {
                  return <Link 
                  to={"/NFT_Creator_Collection/" + value.creator+"/"+value.collection_address} key={index}><div
                    style={{
                      display: "inline-flex",
                      marginLeft: "10px",
                      verticalAlign: "top",
                    }}
                    className="grid grid-cols-3 mt-8"
                  >
                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                      <div>
                        <img
                          className="w-full"
                          src={value.collection_image ? value.collection_image.split("/")[0]==="ipfs:" ? 'https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/' + data.data.image.split("/")[2]: data.data.image:'https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/'}
                          alt="NO COLLECTION IMAGE FOUND"
                          style={{
                            maxWidth: "300px",
                            maxHeight: "300px",
                            width: "280px",
                            height: "250px",
                            marginRight: "auto",
                            marginLeft: "auto",
                          }}
                        />
                      </div>
                      <div className="px-6 py-4">
                        <div className="font-face-mk text-xl mb-2">{value.collection_name} {value.collection_image}</div>
                      </div>
                    </div>
                  </div>
                  </Link>
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
