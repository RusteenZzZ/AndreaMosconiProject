import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Grid from "@mui/material/Grid";
import Factoryabi from "../factory.json";

import Navbar from "./Navbar";
import DMNFTTile from "./dmNFT";
import AWNFTTile from "./awNFT";
import IDNFTTile from "./idNFT";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import download from "../download.jpg";
import Footer from "./Footer";
import address from "./Address";
import "../App.css";

export default function Marketplace() {
  const [data, updateData] = useState([]);
  const [fisrData, updateFirstData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);
  async function get_all_collection(e) {
    const ethers = require("ethers");
    const FactortAddressTemp= address;
    let provider=null;
    let signer=null;
    if(window.ethereum)
    {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
      // Desired chain ID
      const desiredChainId = "0x13881";
      // Get the current chain ID of the connected wallet
      const currentChainId = await provider.send("eth_chainId", []);
      // Compare the current chain ID with the desired one
      if (currentChainId !== desiredChainId) {
            // Request to add the desired chain to the wallet
            try {
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [{
                        chainId: desiredChainId,
                        rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
                        chainName: "Mumbai",
                        nativeCurrency: {
                            name: "MATIC",
                            symbol: "MATIC",
                            decimals: 18
                        },
                        blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
                    }]
                });
                updateFetched(false);
                // Refresh the page or take necessary actions after switching chains
                // For example: window.location.reload();
            } catch (error) {
                console.error("Error adding chain:", error);
            }
        }
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
      let Address_Collection =
        await contract_factory.getAllcollection_address();
      //Fetch all the details of every NFT from the contract and display
      await Promise.all(
        Address_Collection.map(async (y) => {
          let contract = new ethers.Contract(y, MarketplaceJSON, signer);
          try
          {
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
                };
                data.unshift(item);
              })
            );
            await Promise.all(
              NFT_Collection.map(async (a) => {
                let tokenURI = await contract.tokenURI(1);
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
                let itemFirst = {
                  tokenId: a.tokenId.toNumber(),
                  seller: a.seller,
                  owner: a.owner,
                  image: meta.image,
                  name: meta.name,
                  description: meta.description,
                  category: meta.category,
                };
                fisrData.unshift(itemFirst);
              })
            );
            updateFetched(true);
            const filteredArrFirst = fisrData.reduce((acc, current) => {
              const x = acc.find((item) => item.owner === current.owner);
              if (!x) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            }, []);
            updateFirstData(filteredArrFirst);
            const filteredArr = data.reduce((acc, current) => {
              const x = acc.find((item) => item.image === current.image);
              if (!x) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            }, []);
            updateData(filteredArr);
          }
          catch(e)
          {}
        })
      );

    return;
  }
  if (!dataFetched) get_all_collection();

  const [value, setValue] = React.useState("Design Masterpieces");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ backgroundColor: "transparent" }}>
      <Navbar></Navbar>
      <div
        className="container mx-auto MarketPlacePage"
        style={{ paddingTop: "30px", paddingBottom: "30px" }}
      >
        <Grid container spacing={2} className="aboutCardsALL">
          <Grid item xs={12} sm={12} md={6} lg={6} className="aboutCards">
            <div
              style={{ textAlign: "left", padding: "50px 0px" }}
              className="profileLeft"
            >
              <h1
                style={{
                  fontSize: "52px",
                  lineHeight: "62px",
                  padding: "20px 0px",
                }}
                className="font-face-mk"
              >
                Market Place
              </h1>
              <p
                className="font-face-mt"
                style={{
                  fontSize: "18px",
                  lineHeight: "26px",
                }}
              >
                What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
                printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book. It has survived not only five centuries, but
                also the leap into electronic typesetting, remaining essentially
                unchanged.
                <br></br>
                <br></br>
                It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.
              </p>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            className="MountainsCards"
            style={{ padding: "20px 20px" }}
          >
            <img
              className="w-80"
              src={download}
              alt="Sunset in the mountains"
              style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}
            />
          </Grid>
        </Grid>
      </div>
      <div
        className="container mx-auto MarketPlacePage"
        style={{ paddingTop: "0px", paddingBottom: "60px" }}
      >
        <Grid container spacing={2} className="dianaCardsALL">
          {fisrData ? (
            <>
              {fisrData.map((value, index) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={2}
                    className="dianaCards"
                    key={index}
                  >
                    <img
                      src={value.image}
                      alt="Mountain"
                      style={{
                        maxWidth: "300px",
                        maxHeight: "300px",
                        width: "200px",
                        height: "200px",
                      }}
                    />
                    <h1
                      style={{
                        margin: "10px 0px",
                        padding: "0",
                        fontFamily: "Mak,serif",
                        fontSize: "20px",
                        lineHeight: "26px",
                        textTransform: "uppercase",
                        fontWeight: "bolder",
                      }}
                    >
                      {value.name}
                    </h1>
                    <div className="borderBottomART"></div>
                  </Grid>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </Grid>
      </div>
      <div style={{ backgroundColor: "#18191b", padding: "60px 0px" }}>
        <div
          className="container mx-auto MarketPlacePage"
          style={{ paddingTop: "30px", paddingBottom: "30px", color: "white" }}
        >
          <Grid container spacing={2} className="dianaCardsALL">
            <Grid item xs={12} sm={12} md={6} lg={6} className="dianaCards">
              <div style={{ textAlign: "left", padding: "60px 0px" }}>
                <h1
                  style={{
                    fontFamily: "Mak,serif",
                    fontSize: "52px",
                    lineHeight: "62px",
                    padding: "20px 0px",
                  }}
                >
                  About
                </h1>
                <p
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "18px",
                    lineHeight: "26px",
                  }}
                >
                  What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make
                  a type specimen book. It has survived not only five centuries,
                  but also the leap into electronic typesetting, remaining
                  essentially unchanged.
                  <br></br>
                  <br></br>
                  It was popularised in the 1960s with the release of Letraset
                  sheets containing Lorem Ipsum passages, and more recently with
                  desktop publishing software like Aldus PageMaker including
                  versions of Lorem Ipsum.
                  <br></br>
                  <br></br>
                  It was popularised in the 1960s with the release of Letraset
                  sheets containing Lorem Ipsum passages, and more recently with
                  desktop publishing software like Aldus PageMaker including
                  versions of Lorem Ipsum. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <div
        className="container mx-auto MarketPlacePage"
        style={{ padding: "60px 0px" }}
      >
        <h1 className="text-5xl mt-6 mx-auto font-face-mk">Explore</h1>
        <div style={{ backgroundColor: "white" }}>
          <div style={{ margin: "50px 0px", background: "white" }}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    value="Design Masterpieces"
                    onChange={handleChange}
                    aria-label="NFTs"
                  >
                    <Tab
                      label="Design Masterpieces"
                      value="Design Masterpieces"
                    />
                    <Tab label="Artwork" value="Artwork" />
                    <Tab label="interior designs" value="Interior Designs" />
                  </TabList>
                </Box>
                <TabPanel
                  value="Design Masterpieces"
                  style={{ textAlign: "center" }}
                >
                  {data ? (
                    <>
                      {data.map((value, index) => {
                        return (
                          <DMNFTTile data={value} key={index.image}></DMNFTTile>
                        );
                      })}
                    </>
                  ) : (
                    <></>
                  )}
                </TabPanel>

                <TabPanel value="Artwork" style={{ textAlign: "center" }}>
                  {data ? (
                    <>
                      {data.map((value, index) => {
                        return <AWNFTTile data={value} key={index}></AWNFTTile>;
                      })}
                    </>
                  ) : (
                    <></>
                  )}
                </TabPanel>
                <TabPanel
                  value="Interior Designs"
                  style={{ textAlign: "center" }}
                >
                  {data ? (
                    <>
                      {data.map((value, index) => {
                        return (
                          <IDNFTTile data={value} key={index.image}></IDNFTTile>
                        );
                      })}
                    </>
                  ) : (
                    <></>
                  )}
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
