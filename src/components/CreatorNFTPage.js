import * as React from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import MarketplaceJSON from "../Marketplace.json";
import Factoryabi from "../factory.json";
import axios from "axios";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Table from "react-bootstrap/Table";
import address from "./Address";
import { Link } from "react-router-dom";
import NFTTile from "./NFTTILE";
import "../App.css";

export default function Creator_NFT() {
  const [data, updateData] = useState([]);
  const [CreatorNFTS, updateCreatorNFTS] = useState([]);
  const [dataFetched, updateFetched] = useState(false);
  const [ArtistAddress, updateArtistData] = useState([]);
  const [upaddress, updateAddress] = useState("0x");
  const [artistParams, updateArtistParams] = useState({});
  const FactortAddressTemp = address;
  async function getNFTData(tokenId) {
    try {
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
      // Artist NFTS

      // Artist Desciption
      let Address_Collection =
        await contract_factory.getcollection_address_by_artist(
          ethers.utils.getAddress(tokenId)
        );
      let ArtistINFO = await contract_factory.getartistdescription(
        ethers.utils.getAddress(tokenId)
      );
      updateArtistParams(ArtistINFO);
      //Fetch all the details of every NFT from the contract and display
      await Promise.all(
        Address_Collection.map(async (y) => {
          let contract = new ethers.Contract(y, MarketplaceJSON, signer);
          let Creator_NFT_Collection = await contract.getAllNFTs();
          await Promise.all(
            Creator_NFT_Collection.map(async (i) => {
              let tokenURI = await contract.tokenURI(i.tokenId);
              if (tokenURI.split("/")[0] === "ipfs:") {
                tokenURI =
                  "https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/" +
                  tokenURI.split("/")[2];
              }
              let meta = await axios.get(tokenURI);
              meta = meta.data;
              let item = {
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.image,
                name: meta.name,
                description: meta.description,
                category: meta.category,
                contract_address: y,
                signerAddress: tokenId,
              };
              CreatorNFTS.unshift(item);
            })
          );
          const filteredArr = CreatorNFTS.reduce((acc, current) => {
            const x = acc.find((item) => item.image === current.image);

            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          }, []);
          updateCreatorNFTS(filteredArr);
          updateFetched(true);
        })
      );

      //Fetch all the details of every NFT from the contract and display
      await Promise.all(
        Address_Collection.map(async (y) => {
          if (y !== "0x0000000000000000000000000000000000000000") {
            let NFT_Collection =
              await contract_factory.getcollectiondescription(
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
            };
            ArtistAddress.unshift(item);
          }
          updateFetched(true);
          const filteredArr = ArtistAddress.reduce((acc, current) => {
            const x = acc.find(
              (item) => item.collection_name === current.collection_name
            );

            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          }, []);
          updateArtistData(filteredArr);
        })
      );

      let Creator_Address_Collection =
        await contract_factory.getAllcollection_address();
      //Fetch all the details of every NFT from the contract and display
      const items = await Promise.all(
        Creator_Address_Collection.map(async (y) => {
          let contract = new ethers.Contract(y, MarketplaceJSON, signer);
          let NFT_Collection = await contract.getAllNFTs();
          await Promise.all(
            NFT_Collection.map(async (i) => {
              let tokenURI = await contract.tokenURI(i.tokenId);
              if (tokenURI.split("/")[0] === "ipfs:") {
                tokenURI =
                  "https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/" +
                  tokenURI.split("/")[2];
              }
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
                category: meta.category,
                contract_address: y,
                signerAddress: tokenId,
              };
              data.unshift(item);
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

          updateAddress(tokenId);
        })
      );
    } catch (err) {
      // console.log("Errorr:", err);
    }
  }

  const params = useParams();
  const tokenId = params.tokenId;
  if (!dataFetched) getNFTData(tokenId);

  return (
    <div className="profileClass">
      <Navbar></Navbar>
      <div
        className="container mx-auto ProfilePage"
        style={{ paddingTop: "30px", paddingBottom: "30px" }}
      >
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
                      {artistParams.profile_image_uri &&
                      artistParams.user_banner_uri ? (
                        <div>
                          <div>
                            <img
                              src={
                                artistParams.profile_image_uri.split("/")[0] ===
                                "ipfs:"
                                  ? "https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/" +
                                    artistParams.profile_image_uri.split("/")[2]
                                  : artistParams.profile_image_uri
                              }
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
                                src={
                                  artistParams.user_banner_uri.split("/")[0] ===
                                  "ipfs:"
                                    ? "https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/" +
                                      artistParams.user_banner_uri.split("/")[2]
                                    : artistParams.user_banner_uri
                                }
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
                    <th>Artist Name</th>
                    <td>
                      {artistParams.artist_name ? (
                        <>{artistParams.artist_name}</>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Artist Info</th>
                    <td>
                      {artistParams.artist_info ? (
                        <>{artistParams.artist_info}</>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Artist Website</th>
                    <td>
                      {artistParams.website ? (
                        <>{artistParams.website}</>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Wallet Address: </th>
                    <td>{upaddress ? <>{upaddress}</> : <></>}</td>
                  </tr>
                  <tr>
                    <th>No. of NFTs:</th>
                    <td>{data.length ? <>{data.length}</> : <></>}</td>
                  </tr>
                </tbody>
              </Table>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <h1
                style={{
                  display: "block",
                  fontSize: "1.5em",
                  fontWeight: "600",
                  fontFamily: "Mak",
                  marginTop: "35px"
                }}
              >
                Creator Collections
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
              {ArtistAddress ? (
                <>
                  {ArtistAddress.map((value, index) => {
                    return (
                      <Link
                        to={"/NFT_Creator_Collection/" + tokenId+"/"+value.collection_address}
                        key={index}
                      >
                        <div
                          style={{
                            display: "inline-flex",
                            marginLeft: "10px",
                            verticalAlign: "top",
                          }}
                          className="grid grid-cols-3 mt-8"
                          key={index}
                        >
                          <div className="max-w-sm rounded overflow-hidden shadow-lg">
                            <div>
                              <img
                                className="w-full"
                                src={
                                  value.collection_image
                                    ? value.collection_image.split("/")[0] ===
                                      "ipfs:"
                                      ? "https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/" +
                                        value.collection_image.split("/")[2]
                                      : value.collection_image
                                    : "https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/"
                                }
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
                              <div className="font-face-mk text-xl mb-2">
                                {value.collection_name}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
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
                Created NFTs
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
              {CreatorNFTS ? (
                <>
                  {CreatorNFTS.map((value, index) => {
                    return (
                      <div key={index}>
                        {/* {value.seller === value.signerAddress ? ( */}
                          <NFTTile data={value} key={index}></NFTTile>
                        {/* ) : (
                          <></>
                        )} */}
                      </div>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
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
                Collected NFTs
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
                    return (
                      <div key={index}>
                        {value.seller === value.signerAddress ? (
                          <NFTTile
                            data={value}
                            key={index}
                            style={{
                              display: "inline",
                              padding: "20px 20px 20px 0px",
                            }}
                          ></NFTTile>
                        ) : (
                          <></>
                        )}
                      </div>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
