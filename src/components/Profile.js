import * as React from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import MarketplaceJSON from "../Marketplace.json";
import Factoryabi from "../factory.json";
import axios from "axios";
import { useState } from "react";
import NFTTile from "./NFTTILE";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Table from "react-bootstrap/Table";
import { uploadFileToIPFS } from "../pinata";
import address from "./Address";
import "../App.css";

export default function Profile() {
  const [data, updateData] = useState([]);
  const [alldata, updateALLData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);
  const [alldataFetched, updateALLFetched] = useState(false);
  const [ArtistFetched, updateArtistFetched] = useState(false);
  const [ifArtistAllowed, updateIfArtistAllowed] = useState(false);

  const [upaddress, updateAddress] = useState("0x");
  const ethers = require("ethers");
  const [formParams, updateFormParams] = useState({
    ArtistUsername: "",
    description: "",
    ArtistURL: "",
  });
  const [artistParams, updateArtistParams] = useState({});
  const [profiledp, updateProfileDP] = useState([]);
  const [profilebanner, updateBanner] = useState([]);
  const FactortAddressTemp= address;

  async function OnChangeFile(e) {
    var file = e.target.files;
    //check htmlFor file extension
    for (let i = 0; i < file.length; i++) {
      try {
        const response = await uploadFileToIPFS(file[i]);
        if (response.success === true) {
          updateProfileDP(response.pinataURL);
        }
      } catch (e) {
        // console.log("Error during file upload", e);
      }
    }
  }
  async function OnChangeFile2(e) {
    var file = e.target.files;
    //check htmlFor file extension
    for (let i = 0; i < file.length; i++) {
      try {
        const response = await uploadFileToIPFS(file[i]);
        if (response.success === true) {
          updateBanner(response.pinataURL);
        }
      } catch (e) {
        // console.log("Error during file upload", e);
      }
    }
  }

  async function listNFT(e) {
    e.preventDefault();

    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      FactortAddressTemp,
      Factoryabi,
      signer
    );
    let { ArtistUsername, description, ArtistURL } = formParams;

    let Artist_Data = await contract.getartistdescription(addr);
    if (ArtistUsername === "") {
      ArtistUsername = Artist_Data.artist_name;
    }
    if (description === "") {
      description = Artist_Data.artist_info;
    }
    if (ArtistURL === "") {
      ArtistURL = Artist_Data.website;
    }
    if (profiledp === "") {
      updateProfileDP(Artist_Data.profile_image_uri);
    }
    if (profilebanner === "") {
      updateBanner(Artist_Data.user_banner_uri);
    }
    //actually Set The Artist
    let SETTING = await contract.setanartistsdesc(
      addr,
      ArtistUsername,
      description,
      profiledp,
      profilebanner,
      ArtistURL
    );
    await SETTING.wait();

    updateFormParams({ name: "", description: "", price: "" });
    window.location.replace("/");
  }

  async function getNFTData(tokenId) {
    const ethers = require("ethers");
    try {
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (!provider._isProvider) {
        console.log("Provider");
      }
      const signer = provider.getSigner();
      const addr = await signer.getAddress();
      let contract_factory = new ethers.Contract(
        FactortAddressTemp,
        Factoryabi,
        signer
      );

      let Address_Collection =
        await contract_factory.getcollection_address_by_artist(ethers.utils.getAddress(addr));
      let ArtistINFO = await contract_factory.getartistdescription(ethers.utils.getAddress(addr));
      updateArtistParams(ArtistINFO);
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
              };
              console.log(item);
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
          updateAddress(addr);
        })
      );
      updateAddress(addr);
    } catch (err) {
      // console.log("Errorr:", err);
    }
  }

  async function getALLNFTData(tokenId) {
    const ethers = require("ethers");
    try {
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (!provider._isProvider) {
        console.log("Provider");
      }
      const signer = provider.getSigner();
      const addr = await signer.getAddress();
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
                signerAddress:addr
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
  if (!dataFetched) getNFTData(tokenId);
  if (!alldataFetched) getALLNFTData(tokenId);

  async function IsAllowedArtistOrNOT(tokenId) {
    const ethers = require("ethers");
    try {
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (!provider._isProvider) {
        console.log("Provider");
      }
      const signer = provider.getSigner();
      const addr = await signer.getAddress();
      let contract_factory = new ethers.Contract(
        FactortAddressTemp,
        Factoryabi,
        signer
      );
      let SETTING = await contract_factory.isArtistAllowed(
        ethers.utils.getAddress(addr)
      );
      updateIfArtistAllowed(SETTING);
      updateArtistFetched(true);
    } catch (err) {
      // console.log("Errorr:", err);
    }
  }
  if (!ArtistFetched) IsAllowedArtistOrNOT();
  const [value, setValue] = React.useState("All_NFT_Tab");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let CollectionNFT=0;
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
                              src={artistParams.profile_image_uri.split("/")[0]==="ipfs:" ? 'https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/' + artistParams.profile_image_uri.split("/")[2]: artistParams.profile_image_uri}
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
                                src={artistParams.user_banner_uri.split("/")[0]==="ipfs:" ? 'https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/' + artistParams.user_banner_uri.split("/")[2]: artistParams.user_banner_uri}
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
                  {/* <tr>
                    <th>Profile Banner</th>
                  </tr>
                  <tr>
                    <td colSpan={2} style={{ textAlign: "right" }}>
                      {artistParams.user_banner_uri ? (
                        <>
                          <img
                            className="w-full"
                            src={artistParams.user_banner_uri}
                            alt="Sunset in the mountains"
                            style={{
                              maxWidth: "150px",
                              maxHeight: "150px",
                            }}
                          />
                        </>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr> */}
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
        </div>
        <div>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  value="All_NFT_Tab"
                  onChange={handleChange}
                  aria-label="NFTs"
                >
                  <Tab label="All NFTs" value="All_NFT_Tab" />
                  <Tab label="Collected" value="collected" />
                  <Tab label="Created" value="created" />
                </TabList>
              </Box>
              <TabPanel value="All_NFT_Tab" style={{ textAlign: "center" }}>
                <div>
                  {alldata.map((value, index) => {
                    return (
                      <>
                        <NFTTile
                          data={value}
                          key={index}
                          style={{
                            display: "inline",
                            padding: "20px 20px 20px 0px",
                          }}
                        ></NFTTile>
                      </>
                    );
                  })}
                </div>
                <div>
                  {alldata.length === 0
                    ? "Oops, No NFT data to display (Are you logged in?)"
                    : ""}
                </div>
              </TabPanel>
              <TabPanel value="collected" style={{ textAlign: "center" }}>
                <div>
                  {alldata.map((value, index) => {
                    if(value.seller === value.signerAddress)
                    {
                      CollectionNFT++;
                    }
                    return (
                      <>{value.seller===value.signerAddress ? <NFTTile
                          data={value}
                          key={index}
                          style={{
                            display: "inline",
                            padding: "20px 20px 20px 0px",
                          }}
                        ></NFTTile>:<></>}</>
                    );
                  })}
                  
                </div>
                <div>
                  {CollectionNFT === 0
                    ? "Oops, You have no NFT data to display (Are you logged in?)"
                    : ""}
                </div>
              </TabPanel>
              <TabPanel value="created" style={{ textAlign: "center" }}>
                <div>
                  {data.map((value, index) => {
                    return (
                      <>
                        <NFTTile
                          data={value}
                          key={index}
                          style={{
                            display: "inline",
                            padding: "20px 20px 20px 0px",
                          }}
                        ></NFTTile>
                      </>
                    );
                  })}
                </div>
                <div>
                  {data.length === 0
                    ? "Oops, No NFT data to display (Are you logged in?)"
                    : ""}
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
        {ifArtistAllowed ? (
          <>
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
                  Set Artist Bio
                </h1>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <div style={{ width: "100%" }} className="mt-4 mb-4">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="ArtistUsername"
                    type="text"
                    placeholder="Artist Username"
                    onChange={(e) =>
                      updateFormParams({
                        ...formParams,
                        ArtistUsername: e.target.value,
                      })
                    }
                    value={formParams.ArtistUsername}
                  ></input>
                </div>
                <div>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline DescriptionField"
                    cols="40"
                    rows="3"
                    id="description"
                    type="text"
                    placeholder="Artist Description"
                    value={formParams.description}
                    onChange={(e) =>
                      updateFormParams({
                        ...formParams,
                        description: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
                <div style={{ width: "100%" }} className="mt-2 mb-2">
                  <label style={{ color: "#6D757D", marginBottom: "10px" }}>
                    Userbanner Image
                  </label>
                </div>
                <div className="mt-4 mb-4 flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-black hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 ImageoftheNFT"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        className="w-10 h-10 mb-3 text-white-400"
                        fill="none"
                        stroke="white"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-white">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-white">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      type={"file"}
                      onChange={OnChangeFile}
                      style={{ color: "white" }}
                    />
                  </label>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <div style={{ width: "100%" }} className="mt-2 mb-2">
                  <label style={{ color: "#6D757D", marginBottom: "10px" }}>
                    Userprofile Image
                  </label>
                </div>
                <div className="mt-4 mb-4 flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-black hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 ImageoftheNFT"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        className="w-10 h-10 mb-3 text-white-400"
                        fill="none"
                        stroke="white"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-white">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-white">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      type={"file"}
                      onChange={OnChangeFile2}
                      style={{ color: "white" }}
                    />
                  </label>
                </div>
                <div style={{ width: "100%" }} className="mt-4 mb-4">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="ArtistURL"
                    type="text"
                    placeholder="Artist URL"
                    onChange={(e) =>
                      updateFormParams({
                        ...formParams,
                        ArtistURL: e.target.value,
                      })
                    }
                    value={formParams.ArtistURL}
                  ></input>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={listNFT}
                    className="bg-black hover:bg-gray-500 text-white font-semibold hover:text-white py-2 px-4 border border-black-500 hover:border-transparent rounded"
                  >
                    Set Artist Bio
                  </button>
                </div>
              </Grid>
            </Grid>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
