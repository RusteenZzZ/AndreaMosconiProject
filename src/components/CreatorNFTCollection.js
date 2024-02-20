import * as React from "react";
import Navbar from "./Navbar";
import { useParams,useLocation } from "react-router-dom";
import MarketplaceJSON from "../Marketplace.json";
import Factoryabi from "../factory.json";
import axios from "axios";
import { useState } from "react";
import NFTTile from "./NFTTILE";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Table from "react-bootstrap/Table";
import address from "./Address";
import "../App.css";

export default function CreatorNFTCollection() {
  const [alldata, updateALLData] = useState([]);
  const [allCreatorData, updateCreatorData] = useState([]);
  const [alldataFetched, updateALLFetched] = useState(false);
  const FactortAddressTemp= address;

  async function getALLNFTData(tokenId,WalletAddress) {

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
    try {
      let contract_factory = new ethers.Contract(
        FactortAddressTemp,
        Factoryabi,
        signer
      );

      const NFT_Collection = await contract_factory.getcollectiondescription(WalletAddress);
      updateCreatorData(NFT_Collection);
      // arraynew.push(NFT_Collection);
      // let Address_Collection =
      //   await contract_factory.getAllcollection_address();
      //Fetch all the details of every NFT from the contract and display
      let ADDRESSASD = await contract_factory.getcollection_address_by_artist(tokenId);
      await Promise.all(
        ADDRESSASD.map(async (y) => {
          let contract = new ethers.Contract(WalletAddress, MarketplaceJSON, signer);
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
                contract_address: i.owner,
                signerAddress:tokenId
              };
              alldata.unshift(item);
            })
          );
          const filteredArr = alldata.reduce((acc, current) => {
            const x = acc.find((item) => item.image === current.image);
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          }, []);
          updateALLData(filteredArr);
          updateALLFetched(true);
        })
      );

    } catch (err) {
      // console.log("Errorr:", err);
    }
  }

  const params = useParams();
  const tokenId = params.tokenId;
  const WalletAddress = params.collection_address;
  if (!alldataFetched) getALLNFTData(tokenId,WalletAddress);



  return (
    <div className="profileClass">
      <Navbar></Navbar>
      <div
        className="container mx-auto ProfilePage"
        style={{ paddingTop: "30px", paddingBottom: "30px" }}
      >
        <div>
          <Box sx={{ width: "100%", typography: "body1" }}>
          <div>
            <Grid
              container
              spacing={2}
              style={{ paddingRight: "20px", paddingLeft: "20px" }}
            >
              <Grid item xs={12} sm={12} md={12} lg={12} className="aboutCards">
                <Table striped="columns" className="artworkDetails mt-10">
                  <tbody>
                    <tr>
                      <td colSpan={2} style={{ textAlign: "right" }}>
                        {allCreatorData.collection_image &&
                        allCreatorData.collection_banner ? (
                          <div>
                            <div>
                              <img
                                src={allCreatorData.collection_image.split("/")[0]==="ipfs:" ? 'https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/' + allCreatorData.collection_image.split("/")[2]: allCreatorData.collection_image}
                                alt="Banner"
                                style={{ width: "100%" }}
                              />
                              <div
                                style={{
                                  position: "absolute",
                                  bottom: "50%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                }}
                              >
                                <img
                                  src={allCreatorData.collection_banner.split("/")[0]==="ipfs:" ? 'https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/' + allCreatorData.collection_banner.split("/")[2]: allCreatorData.collection_banner}
                                  alt="Profile"
                                  style={{ width: "100px", borderRadius: "50%" }}
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>Collection Name</th>
                      <td>
                        {allCreatorData.collection_name ? (
                          <>{allCreatorData.collection_name}</>
                        ) : (
                          <></>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>Collection Description</th>
                      <td>
                        {allCreatorData.collection_description ? (
                          <>{allCreatorData.collection_description}</>
                        ) : (
                          <></>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>Collection Address</th>
                      <td>
                        {allCreatorData.collection_address ? (
                          <>{allCreatorData.collection_address}</>
                        ) : (
                          <></>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>Collection Creator Address</th>
                      <td>
                        {allCreatorData.creator ? (
                          <>{allCreatorData.creator}</>
                        ) : (
                          <></>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>Collection Category</th>
                      <td>
                        {allCreatorData.category ? (
                          <>{allCreatorData.category}</>
                        ) : (
                          <></>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>Collection URL</th>
                      <td>
                        {allCreatorData.collection_URL ? (
                          <>{allCreatorData.collection_URL}</>
                        ) : (
                          <></>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Grid>
            </Grid>
          </div>
            <div>
              {alldata.map((value, index) => {
                return (
                  // <>{value.seller===value.signerAddress ? 
                  <div style={{display:'flex'}}><NFTTile
                    data={value}
                    key={index}
                    style={{
                      display: "inline",
                      padding: "20px 20px 20px 0px",
                    }}
                    ></NFTTile>
                      <Table striped="columns" className="artworkDetails  ml-10 mt-10">
                        <tbody>
                          <tr>
                            <th>Name</th>
                            <td>
                              {value.name ? (
                                <>{value.name}</>
                              ) : (
                                <></>
                              )}
                              {value.name ? (
                                <>{value.name}</>
                              ) : (
                                <></>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th>Description</th>
                            <td>
                              {value.description ? (
                                <>{value.description}</>
                              ) : (
                                <></>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th>Category</th>
                            <td>
                              {value.category ? (
                                <>{value.category}</>
                              ) : (
                                <></>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th>Owner</th>
                            <td>
                              {value.owner ? (
                                <>{value.owner}</>
                              ) : (
                                <></>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                    // :<></>}</>
                  );
              })}        
            </div>
            <div>
              {alldata.length === 0
              ? "Oops, No NFT data to display (Are you logged in?)"
              : ""}
            </div>
            <div
              style={{
                padding: "10px 0px",
              }}
            >
              <Link to={"/NFT_Creator/" + tokenId} state={{ collectionAddress: WalletAddress }}>
                <button className="bg-black hover:bg-gray-500 text-white font-bold mt-2 py-2 px-4 text-sm">
                  Creator Details
                </button>
              </Link>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}
