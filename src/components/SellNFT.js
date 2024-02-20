import Navbar from "./Navbar";
import { useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS, EncodeIPFS } from "../pinata";
import Marketplace from "../Marketplace.json";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Factoryabi from "../factory.json";
import address from "./Address";

export default function SellNFT() {
  
  const FactortAddressTemp= address;
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    price: "",
    designer: "",
    artist:"",
    producer: "",
    materials: "",
    measures: "",
    product: "",
    creatorWallet: "",
    art_type: "",
    typeofProject: "",
    serialnumberNFT: "",
    masterpiecesInserted: "",
  });
  const [fileURL, setFileURL] = useState(null);
  const [WalletN, setWalletN] = useState(null);
  async function getAddress() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    setWalletN(addr);
  }
  getAddress();
  const ethers = require("ethers");
  const [message, updateMessage] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [attrubutes] = useState([]);
  const [category, setcategory] = useState("Design Masterpieces");
  const [nftData, setNftData] = useState([]);
  const [collectionAddress, setcollectionAddress] = useState();
  const [collectionName, setcollectionName] = useState();
  let floorPlanImages = [];
  let renderImages = [];
  let photoGallery = [];
  let virtullayTour = [];
  const [VIDEOLink, setVIDEOLink] = useState([]);
  //This function uploads the NFT image to IPFS
  async function OnChangeFile(e) {
    var file = e.target.files[0];
    //check htmlFor file extension
    try {
      //upload the file to IPFS
      const response = await uploadFileToIPFS(file);
      if (response.success === true) {
        setFileURL(response.pinataURL);
        const el = document.querySelector(".ImageoftheNFT");
        el.style.borderColor = "gray";
      }
    } catch (e) {
      console.log("Error during file upload", e);
    }
  }

  async function OnChangeFile2(e) {
    var file = e.target.files;
    //check htmlFor file extension

    //upload the file to IPFS
    for (let i = 0; i < file.length; i++) {
      try {
        const response = await uploadFileToIPFS(file[i]);
        if (response.success === true) {
          floorPlanImages.push(response.pinataURL);
        }
      } catch (e) {
        console.log("Error during file upload", e);
      }
    }
  }
  async function OnChangeFile3(e) {
    var file = e.target.files;
    //check htmlFor file extension
    for (let i = 0; i < file.length; i++) {
      try {
        const response = await uploadFileToIPFS(file[i]);
        if (response.success === true) {
          renderImages.push(response.pinataURL);
        }
      } catch (e) {
        console.log("Error during file upload", e);
      }
    }
  }
  async function OnChangeFile4(e) {
    var file = e.target.files;
    //check htmlFor file extension
    for (let i = 0; i < file.length; i++) {
      try {
        const response = await uploadFileToIPFS(file[i]);
        if (response.success === true) {
          photoGallery.push(response.pinataURL);
        }
      } catch (e) {
        console.log("Error during file upload", e);
      }
    }
  }
  // async function OnChangeFile5(e) {
  //   var file = e.target.files[0];
  //   //check htmlFor file extension
  //   for (let i = 0; i < file.length; i++) {
  //     try {
  //       const response = await uploadFileToIPFS(file[i]);
  //       if (response.success === true) {
  //         virtullayTour.push(response.pinataURL);
  //       }
  //     } catch (e) {
  //       console.log("Error during file upload", e);
  //     }
  //   }
  // }
  async function OnChangeFile6(e) {
    var file = e.target.files;
    //check htmlFor file extension

    //upload the file to IPFS
    for (let i = 0; i < file.length; i++) {
      try {
        const response = await uploadFileToIPFS(file[i]);
        if (response.success === true) {
          setVIDEOLink(response.pinataURL);
        }
      } catch (e) {
        console.log("Error during file upload", e);
      }
    }
  }

  //This function uploads the metadata to IPFS
  async function uploadMetadataToIPFS() {
    const {
      name,
      description,
      price,
      designer,
      producer,
      materials,
      measures,
      product,
      serialnumberNFT,
      art_type,
      artist,
      typeofProject,
      edition101,
      masterpiecesInserted
    } = formParams;
    //Make sure that none of the fields are empty
    if (
      !name &&
      !fileURL &&
      !collectionAddress &&
      !collectionName &&
      !designer 
    ) {
      let count = 0;
      if (!name) {
        const el = document.querySelector(".TitleoftheArt");
        el.style.borderColor = "red";
        count = 1;
      } else {
        const el = document.querySelector(".TitleoftheArt");
        el.style.borderColor = "gray";
        count = 0;
      }
      if (!fileURL) {
        const el = document.querySelector(".ImageoftheNFT");
        el.style.borderColor = "red";
        count = 1;
      }
      else {
        const el = document.querySelector(".ImageoftheNFT");
        el.style.borderColor = "gray";
        count = 0;
      }
      if (!collectionAddress) {
        const el = document.querySelector(".CollectionSelect");
        el.style.borderColor = "red";
        count = 1;
      }
      else {
        const el = document.querySelector(".CollectionSelect");
        el.style.borderColor = "gray";
        count = 0;
      }
      if (!designer) {
        const el = document.querySelector(".DesignerField");
        el.style.borderColor = "red";
        count = 1;
      }
      else {
        const el = document.querySelector(".DesignerField");
        el.style.borderColor = "gray";
        count = 0;
      }
      if (count === 1) {
        const el = document.querySelector(".KindlyFill");
        el.style.display = "block";
        return;
      }
    }

    const nftJSON = {
      name: name,
      description: description,
      price: price,
      edition101: edition101,
      image: fileURL,
      floorPlanImages: floorPlanImages,
      renderImages: renderImages,
      photoGallery: photoGallery,
      virtullayTour: virtullayTour,
      category: category,
      collectionName:collectionName,
      collectionAddress: collectionAddress,
      attributes: attrubutes,
      designer: designer,
      artist: artist,
      art_type:art_type,
      typeofProject:typeofProject,
      masterpiecesInserted:masterpiecesInserted,
      producer: producer,
      NFT_Type:"Certificate",
      serialnumberNFT: serialnumberNFT,
      creatorWallet: WalletN,
      product: product,
      materials: materials,
      measures: measures,
      videolink: VIDEOLink,
      creatorName: creatorName
    };
    console.log(nftJSON);
    // upload the metadata JSON to IPFS
    const response = await uploadJSONToIPFS(nftJSON);
    if (response.success === true) {
      return response.pinataURL;
    }
  }

  async function listNFT(e) {
    e.preventDefault();
    //Upload data to IPFS
    const metadataURL = await uploadMetadataToIPFS();
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const EncodedURL = await EncodeIPFS(metadataURL);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    updateMessage("Please wait.. uploading (upto 5 mins)");
    //Pull the deployed contract instance
    let contract = new ethers.Contract(collectionAddress, Marketplace, signer);
    let listingPrice = await contract.getListPrice(category);
    if(!listingPrice)
    {
      alert("Set List Price!");
    }
    //actually create the NFT
    let transaction = await contract.createToken(EncodedURL, category, {
      value: listingPrice,
      gasLimit: ethers.utils.parseUnits("0.00000000001", "ether"),
    });
    await transaction.wait();

    updateMessage("");
    updateFormParams({ name: "", description: "", price: "" });
    window.location.replace("/");
  }

  async function getcollection_address_by_my_artist_fun(e) {
    e.preventDefault();
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const addr= await signer.getAddress();
    //Pull the deployed contract instance
    let contract_factory = new ethers.Contract(
      FactortAddressTemp,
      Factoryabi,
      signer
    );
    let transaction =
      await contract_factory.getcollection_address_by_artist(ethers.utils.getAddress(addr));

    let ArtistINFO = await contract_factory.getartistdescription(
      ethers.utils.getAddress(addr)
    );
    if(ArtistINFO)
    {
      if(ArtistINFO.artist_name)
      {setCreatorName(ArtistINFO.artist_name)}
    }
    //Fetch all the details of every NFT from the contract and display
    let arraynew=[];
    await Promise.all(
      transaction.map(async (i) => {
        let NFT_Collection = await contract_factory.getcollectiondescription(ethers.utils.getAddress(i));
        
        arraynew.push(NFT_Collection);
        return;
      }) 
    );
    setNftData(arraynew);
  }

  const changeSelect = (e) => {

    const selectedCollectionName = e.target.options[e.target.selectedIndex].text;
    setcollectionName(selectedCollectionName);
    setcollectionAddress(e.target.value);
  };
  function handleShowMarketPlace(e) {}

  const [value, setValue] = React.useState("Design Masterpieces");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setcategory(newValue);
  };
  return (
    <div className="pb-6 bg-white">
      <Navbar></Navbar>
      <div className="container mx-auto MarketPlacePage">
        <form className="bg-white">
          <div
            className="container mx-auto SellNftPage"
            style={{ background: "white" }}
          >
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    value="Artwork"
                    onChange={handleChange}
                    aria-label="NFTs"
                  >
                    <Tab
                      label="Design Masterpieces"
                      onClick={handleShowMarketPlace}
                      value="Design Masterpieces"
                    />
                    <Tab
                      label="Artwork"
                      onClick={handleShowMarketPlace}
                      value="Artwork"
                    />
                    <Tab
                      label="interior designs"
                      onClick={handleShowMarketPlace}
                      value="Interior Designs"
                    />
                  </TabList>
                </Box>
                <TabPanel value="Design Masterpieces">
                  <div
                    style={{
                      textAlign: "center",
                      color: "red",
                      display: "none",
                    }}
                    className="KindlyFill"
                  >
                    <h1>Kindly! Fill the Required Fields</h1>
                  </div>
                  <div
                    style={{ background: "white", width: "85%" }}
                    id="nftForm"
                    className="grid container mx-auto grid-cols-2 gap-4"
                  >
                    <div>
                      <div
                        style={{ background: "white", width: "85%" }}
                        className="flex flex-col place-items-start mt-10"
                        id="nftForm"
                      >
                        <label
                          style={{ color: "#6D757D", marginBottom: "10px" }}
                        >
                          Image of the NFT
                        </label>
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-64 border-2 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-black hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 ImageoftheNFT"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg
                                aria-hidden="true"
                                className="w-10 h-10 mb-3 text-gray-500"
                                fill="none"
                                stroke="gray"
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
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-white">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                              </p>
                            </div>
                            <input
                              type={"file"}
                              onChange={OnChangeFile}
                              style={{ color: "black" }}
                            />
                          </label>
                        </div>
                        <div style={{ width: "100%" }}>
                          <input
                            className="mt-8 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline TitleoftheArt"
                            id="name"
                            type="text"
                            placeholder="Title of the work"
                            onChange={(e) =>
                              updateFormParams({
                                ...formParams,
                                name: e.target.value,
                              })
                            }
                            value={formParams.name}
                          ></input>
                        </div>
                        <div style={{ width: "100%" }}>
                          <input
                            className="mt-8 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline TypeofProduct"
                            id="name"
                            type="text"
                            placeholder="Product"
                            onChange={(e) =>
                              updateFormParams({
                                ...formParams,
                                product: e.target.value,
                              })
                            }
                            value={formParams.product}
                          ></input>
                        </div>
                        <div className="mt-8" style={{ width: "100%" }}>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline DesignerField"
                            id="name"
                            type="text"
                            placeholder="Designer"
                            onChange={(e) =>
                              updateFormParams({
                                ...formParams,
                                designer: e.target.value,
                              })
                            }
                            value={formParams.designer}
                          ></input>
                        </div>
                        <div style={{ width: "100%" }} className="mt-8">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline WalletFeild text-left"
                            id="name"
                            type="button"
                            placeholder="NFT Type"
                            value={`NFT Type: Certificate`}
                          ></input>
                        </div>
                        <div style={{ width: "100%" }} className="mt-8">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline WalletFeild"
                            id="name"
                            type="text"
                            placeholder="Wallet N"
                            value={WalletN ? WalletN : ""}
                          ></input>
                        </div>
                        <div className="mt-8" style={{ width: "100%" }}>
                          <label
                            className="mt-8"
                            style={{ color: "#6D757D", marginBottom: "10px" }}
                          >
                            Video of NFT
                          </label>
                          <div className="flex items-center justify-center w-full">
                            <label
                              htmlFor="dropzone-file"
                              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-black hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 AddrImages"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                  aria-hidden="true"
                                  className="w-10 h-10 mb-3 text-gray-500"
                                  fill="none"
                                  stroke="currentColor"
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
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-white">
                                  MP4, MOV
                                </p>
                              </div>
                              <input
                                type={"file"}
                                onChange={OnChangeFile6}
                                style={{ color: "black" }}
                                multiple
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="mt-12 mb-4">
                        <a href="/create_collection">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-black hover:bg-gray-500"
                            id="name"
                            type="button"
                            value="Create Collection"
                          ></input>
                        </a>
                      </div>
                      <div className=" mb-4">
                        <label
                          style={{
                            padding: "10px 20px 10px 0px",
                            color: "rgb(109, 117, 125)",
                          }}
                        >
                          Select Collection
                        </label>
                        <select
                          className="shadow border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline CollectionSelect"
                          onChange={changeSelect}
                          onFocus={getcollection_address_by_my_artist_fun}
                        >
                          <option value="">Select Collection</option>
                          {nftData.map((value, index) => {
                            return <React.Fragment key={index}>{value.category==="Design Masterpieces" ? <option key={index} value={value.collection_address}>{value.collection_name}</option>:<></>}</React.Fragment>
                          })}
                        </select>
                      </div>
                      <div
                        style={{ background: "white" }}
                        className="flex flex-col place-items-center mt-2"
                        id="nftForm"
                      >
                        <div style={{ width: "100%" }} className="mb-6">
                          <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline DescriptionField"
                            cols="40"
                            rows="5"
                            id="description"
                            type="text"
                            placeholder="Description of the work"
                            value={formParams.description}
                            onChange={(e) =>
                              updateFormParams({
                                ...formParams,
                                description: e.target.value,
                              })
                            }
                          ></textarea>
                        </div>
                        <div style={{ width: "100%" }} className="mb-6">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline MaterialField"
                            id="name"
                            type="text"
                            placeholder="Serial Number NFT"
                            onChange={(e) =>
                              updateFormParams({
                                ...formParams,
                                serialnumberNFT: e.target.value,
                              })
                            }
                            value={formParams.serialnumberNFT}
                          ></input>
                        </div>
                        <div style={{ width: "100%" }} className="mb-4">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Producer"
                            onChange={(e) =>
                              updateFormParams({
                                ...formParams,
                                producer: e.target.value,
                              })
                            }
                            value={formParams.producer}
                          ></input>
                        </div>
                        <div style={{ width: "100%" }} className="mb-6">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline MaterialField"
                            placeholder="Materials"
                            step="0.01"
                            value={formParams.materials}
                            onChange={(e) =>
                              updateFormParams({
                                ...formParams,
                                materials: e.target.value,
                              })
                            }
                          ></input>
                        </div>
                        <div style={{ width: "100%" }} className="mb-6">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline MeasureField"
                            cols="40"
                            rows="5"
                            id="description"
                            type="text"
                            placeholder="Measures"
                            value={formParams.measures}
                            onChange={(e) =>
                              updateFormParams({
                                ...formParams,
                                measures: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="mt-8" style={{ width: "100%" }}>
                          <label
                            style={{ color: "#6D757D", marginBottom: "10px" }}
                          >
                            Photo Galary
                          </label>
                          <div className="flex items-center justify-center w-full">
                            <label
                              htmlFor="dropzone-file"
                              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-black hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 AddrImages"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                  aria-hidden="true"
                                  className="w-10 h-10 mb-3 text-gray-500"
                                  fill="none"
                                  stroke="currentColor"
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
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-white">
                                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                              </div>
                              <input
                                type={"file"}
                                onChange={OnChangeFile4}
                                style={{ color: "black" }}
                                multiple
                              />
                            </label>
                          </div>
                        </div>
                        <div className="text-green text-center">{message}</div>
                        <div className="mt-4 flex justify-end">
                          <button className="ml-4 bg-black hover:bg-gray-700 text-white font-semibold hover:text-white py-2 px-4 border border-black-500 hover:border-transparent rounded">
                            Back
                          </button>
                          <button
                            onClick={listNFT}
                            className="ml-4 bg-black hover:bg-gray-700 text-white font-semibold hover:text-white py-2 px-4 border border-black-500 hover:border-transparent rounded"
                          >
                            Mint
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="Artwork">
                  <div
                    style={{
                      textAlign: "center",
                      color: "red",
                      display: "none",
                    }}
                    className="KindlyFill"
                  >
                    <h1>Kindly! Fill the Required Fields</h1>
                  </div>
                  <div
                    style={{ background: "white", width: "85%" }}
                    id="nftForm"
                    className="grid container mx-auto grid-cols-2 gap-4"
                  >
                    <div>
                      <div
                        style={{ background: "white", width: "85%" }}
                        className="flex flex-col place-items-start mt-10"
                        id="nftForm"
                      >
                        <label
                          style={{ color: "#6D757D", marginBottom: "10px" }}
                        >
                          Image of the NFT
                        </label>

                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-black hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 ImageoftheNFT"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg
                                aria-hidden="true"
                                className="w-10 h-10 mb-3 text-gray-500"
                                fill="none"
                                stroke="currentColor"
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
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-white">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                              </p>
                            </div>
                            <input
                              type={"file"}
                              onChange={OnChangeFile}
                              style={{ color: "black" }}
                            />
                          </label>
                        </div>
                        <div style={{ width: "100%" }}>
                          <input
                            className="mt-8 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline TitleoftheArt"
                            id="name"
                            type="text"
                            placeholder="Title of the work"
                            onChange={(e) =>
                              updateFormParams({
                                ...formParams,
                                name: e.target.value,
                              })
                            }
                            value={formParams.name}
                          ></input>
                        </div>
                        <div style={{ width: "100%" }}>
                          <input
                            className="mt-8 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline TypeofProduct"
                            id="name"
                            type="text"
                            placeholder="Product"
                            onChange={(e) =>
                              updateFormParams({
                                ...formParams,
                                product: e.target.value,
                              })
                            }
                            value={formParams.product}
                          ></input>
                        </div>
                        <div style={{ width: "100%" }}>
                          <input
                            className="mt-8 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline TypeofProduct"
                            id="name"
                            type="text"
                            placeholder="Art Type"
                            onChange={(e) =>
                              updateFormParams({
                                ...formParams,
                                art_type: e.target.value,
                              })
                            }
                            value={formParams.art_type}
                          ></input>
                        </div>
                        <div className="mt-8" style={{ width: "100%" }}>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline DesignerField"
                            id="name"
                            type="text"
                            placeholder="Artist"
                            onChange={(e) =>
                              updateFormParams({
                                ...formParams,
                                artist: e.target.value,
                              })
                            }
                            value={formParams.artist}
                          ></input>
                        </div>
                        <div style={{ width: "100%" }} className="mt-8">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline WalletFeild text-left"
                            id="name"
                            type="button"
                            placeholder="NFT Type"
                            value={`NFT Type: Certificate`}
                          ></input>
                        </div>
                        <div style={{ width: "100%" }} className="mt-8">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline WalletFeild"
                            id="name"
                            type="text"
                            placeholder="Wallet N"
                            value={WalletN ? WalletN : ""}
                          ></input>
                        </div>
                        <div className="mt-8" style={{ width: "100%" }}>
                          <label
                            className="mt-8"
                            style={{ color: "#6D757D", marginBottom: "10px" }}
                          >
                            Video of NFT
                          </label>
                          <div className="flex items-center justify-center w-full">
                            <label
                              htmlFor="dropzone-file"
                              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-black hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 AddrImages"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                  aria-hidden="true"
                                  className="w-10 h-10 mb-3 text-gray-500"
                                  fill="none"
                                  stroke="currentColor"
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
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-white">
                                  MP4, MOV
                                </p>
                              </div>
                              <input
                                type={"file"}
                                onChange={OnChangeFile6}
                                style={{ color: "black" }}
                                multiple
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="mt-12 mb-4">
                        <a href="/create_collection">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-black hover:bg-gray-500"
                            id="name"
                            type="button"
                            value="Create Collection"
                          ></input>
                        </a>
                      </div>
                      <div className=" mb-4">
                        <label
                          style={{
                            padding: "10px 20px 10px 0px",
                            color: "rgb(109, 117, 125)",
                          }}
                        >
                          Select Collection
                        </label>
                        <select
                          className="shadow border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline CollectionSelect"
                          onChange={changeSelect}
                          onFocus={getcollection_address_by_my_artist_fun}
                        >
                          <option value="">Select Collection</option>
                          {nftData.map((value, index) => {
                            return <React.Fragment key={index}>{value.category==="Artwork" ? <option key={index} value={value.collection_address}>{value.collection_name}</option>:<></>}</React.Fragment>
                          })}
                        </select>
                      </div>
                      <div
                        style={{ background: "white" }}
                        className="flex flex-col place-items-center mt-2"
                        id="nftForm"
                      >
                        <div style={{ width: "100%" }} className="mb-6">
                          <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline DescriptionField"
                            cols="40"
                            rows="5"
                            id="description"
                            type="text"
                            placeholder="Description of the work"
                            value={formParams.description}
                            onChange={(e) =>
                              updateFormParams({
                                ...formParams,
                                description: e.target.value,
                              })
                            }
                          ></textarea>
                        </div>
                        <div style={{ width: "100%" }} className="mb-6">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline MaterialField"
                            id="name"
                            type="text"
                            placeholder="Serial Number NFT"
                            onChange={(e) =>
                              updateFormParams({
                                ...formParams,
                                serialnumberNFT: e.target.value,
                              })
                            }
                            value={formParams.serialnumberNFT}
                          ></input>
                        </div>
                        <div style={{ width: "100%" }} className="mb-4">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Producer"
                            onChange={(e) =>
                              updateFormParams({
                                ...formParams,
                                producer: e.target.value,
                              })
                            }
                            value={formParams.producer}
                          ></input>
                        </div>
                        <div style={{ width: "100%" }} className="mb-6">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline MaterialField"
                            placeholder="Materials"
                            step="0.01"
                            value={formParams.materials}
                            onChange={(e) =>
                              updateFormParams({
                                ...formParams,
                                materials: e.target.value,
                              })
                            }
                          ></input>
                        </div>
                        <div style={{ width: "100%" }} className="mb-6">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline MeasureField"
                            cols="40"
                            rows="5"
                            id="description"
                            type="text"
                            placeholder="Measures"
                            value={formParams.measures}
                            onChange={(e) =>
                              updateFormParams({
                                ...formParams,
                                measures: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="mt-8" style={{ width: "100%" }}>
                          <label
                            style={{ color: "#6D757D", marginBottom: "10px" }}
                          >
                            Photo Galary
                          </label>
                          <div className="flex items-center justify-center w-full">
                            <label
                              htmlFor="dropzone-file"
                              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-black hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 AddrImages"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                  aria-hidden="true"
                                  className="w-10 h-10 mb-3 text-gray-500"
                                  fill="none"
                                  stroke="currentColor"
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
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-white">
                                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                              </div>
                              <input
                                type={"file"}
                                onChange={OnChangeFile4}
                                style={{ color: "black" }}
                                multiple
                              />
                            </label>
                          </div>
                        </div>
                        <div className="text-green text-center">{message}</div>
                        <div className="mt-4 flex justify-end">
                          <button className="ml-4 bg-black hover:bg-gray-500 text-white font-semibold hover:text-white py-2 px-4 border border-black-500 hover:border-transparent rounded">
                            Back
                          </button>
                          <button
                            onClick={listNFT}
                            className="ml-4 bg-black hover:bg-gray-500 text-white font-semibold hover:text-white py-2 px-4 border border-black-500 hover:border-transparent rounded"
                          >
                            Mint
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="Interior Designs">
                  <div
                    style={{
                      textAlign: "center",
                      color: "red",
                      display: "none",
                    }}
                    className="KindlyFill"
                  >
                    <h1>Kindly! Fill the Required Fields</h1>
                  </div>
                  <div
                    style={{ background: "white", width: "85%" }}
                    id="nftForm"
                    className="grid container mx-auto grid-cols-2 gap-4"
                  >
                    <div>
                      <div
                        style={{ background: "white", width: "85%" }}
                        className="flex flex-col place-items-start mt-10"
                        id="nftForm"
                      >
                        <label
                          style={{ color: "#6D757D", marginBottom: "10px" }}
                        >
                          Image of the NFT
                        </label>

                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="dropzone-file"
                            className=" flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-black hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 ImageoftheNFT"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg
                                aria-hidden="true"
                                className="w-10 h-10 mb-3 text-gray-500"
                                fill="none"
                                stroke="currentColor"
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
                              <p className="mb-2 text-sm text-gray-500 dark:text-black">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-white">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                              </p>
                            </div>
                            <input
                              type={"file"}
                              onChange={OnChangeFile}
                              style={{ color: "black" }}
                            />
                          </label>
                        </div>
                        <div style={{ width: "100%" }}>
                          <input
                            className="mt-8 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline TitleoftheArt"
                            id="name"
                            type="text"
                            placeholder="Title of the work"
                            onChange={(e) =>
                              updateFormParams({
                                ...formParams,
                                name: e.target.value,
                              })
                            }
                            value={formParams.name}
                          ></input>
                        </div>
                        <div style={{ width: "100%" }}>
                          <input
                            className="mt-8 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline TypeofProduct"
                            id="name"
                            type="text"
                            placeholder="Product"
                            onChange={(e) =>
                              updateFormParams({
                                ...formParams,
                                product: e.target.value,
                              })
                            }
                            value={formParams.product}
                          ></input>
                        </div>
                        <div style={{ width: "100%" }}>
                          <input
                            className="mt-8 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline TypeofProduct"
                            id="name"
                            type="text"
                            placeholder="Type of the Project"
                            onChange={(e) =>
                              updateFormParams({
                                ...formParams,
                                typeofProject: e.target.value,
                              })
                            }
                            value={formParams.typeofProject}
                          ></input>
                        </div>
                        <div className="mt-8" style={{ width: "100%" }}>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline DesignerField"
                            id="name"
                            type="text"
                            placeholder="Designer"
                            onChange={(e) =>
                              updateFormParams({
                                ...formParams,
                                designer: e.target.value,
                              })
                            }
                            value={formParams.designer}
                          ></input>
                        </div>
                        <div style={{ width: "100%" }}>
                          <input
                            className="mt-8 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline TypeofProduct"
                            id="name"
                            type="text"
                            placeholder="Masterpieces Inserted"
                            onChange={(e) =>
                              updateFormParams({
                                ...formParams,
                                masterpiecesInserted: e.target.value,
                              })
                            }
                            value={formParams.masterpiecesInserted}
                          ></input>
                        </div>
                        <div className="mt-8" style={{ width: "100%" }}>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline DesignerField"
                            id="name"
                            type="text"
                            placeholder="Producer"
                            onChange={(e) =>
                              updateFormParams({
                                ...formParams,
                                producer: e.target.value,
                              })
                            }
                            value={formParams.producer}
                          ></input>
                        </div> 
                        <div style={{ width: "100%" }} className="mt-8">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline WalletFeild text-left"
                            id="name"
                            type="button"
                            placeholder="NFT Type"
                            value={`NFT Type: Certificate`}
                          ></input>
                        </div>
                        <div style={{ width: "100%" }} className="mt-8">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline WalletFeild"
                            id="name"
                            type="text"
                            placeholder="Wallet N"
                            value={WalletN ? WalletN : ""}
                          ></input>
                        </div>
                        <div style={{ width: "100%" }} className="mt-8">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline NFTField"
                            id="name"
                            type="text"
                            placeholder="Serial Number NFT"
                            onChange={(e) =>
                              updateFormParams({
                                ...formParams,
                                serialnumberNFT: e.target.value,
                              })
                            }
                            value={formParams.serialnumberNFT}
                          ></input>
                        </div>
                        <div style={{ width: "100%" }} className="mt-8 mb-6">
                          <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline DescriptionField"
                            cols="40"
                            rows="5"
                            id="description"
                            type="text"
                            placeholder="Description of the work"
                            value={formParams.description}
                            onChange={(e) =>
                              updateFormParams({
                                ...formParams,
                                description: e.target.value,
                              })
                            }
                          ></textarea>
                        </div>
                        <div style={{ width: "100%" }} className="mb-6">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline MaterialField"
                            placeholder="Materials"
                            step="0.01"
                            value={formParams.materials}
                            onChange={(e) =>
                              updateFormParams({
                                ...formParams,
                                materials: e.target.value,
                              })
                            }
                          ></input>
                        </div>
                        <div style={{ width: "100%" }} className="mb-6">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline MeasureField"
                            cols="40"
                            rows="5"
                            id="description"
                            type="text"
                            placeholder="Measure"
                            value={formParams.measures}
                            onChange={(e) =>
                              updateFormParams({
                                ...formParams,
                                measures: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="mt-12 mb-4">
                          <a href="/create_collection">
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-black hover:bg-gray-500"
                              id="name"
                              type="button"
                              value="Create Collection"
                            ></input>
                          </a>
                        </div>
                        <div className=" mb-4">
                          <label
                            style={{
                              padding: "10px 20px 10px 0px",
                              color: "rgb(109, 117, 125)",
                            }}
                          >
                            Select Collection
                          </label>
                          <select
                            className="shadow border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline CollectionSelect"
                            onChange={changeSelect}
                            onFocus={getcollection_address_by_my_artist_fun}
                          >
                            <option value="">Select Collection</option>
                            {nftData.map((value, index) => {
                              return <React.Fragment key={index}>{value.category==="Interior Designs" ? <option key={index} value={value.collection_address}>{value.collection_name}</option>:<></>}</React.Fragment>
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div
                        style={{ background: "white" }}
                        className="flex flex-col place-items-center mt-10"
                        id="nftForm"
                      >
                        <div className="mt-2" style={{ width: "100%" }}>
                          <label
                            className="mt-8"
                            style={{ color: "#6D757D", marginBottom: "10px" }}
                          >
                            Video of NFT
                          </label>
                          <div className="flex items-center justify-center w-full">
                            <label
                              htmlFor="dropzone-file"
                              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-black hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 AddrImages"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                  aria-hidden="true"
                                  className="w-10 h-10 mb-3 text-gray-500"
                                  fill="none"
                                  stroke="currentColor"
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
                                <p className="mb-2 text-sm text-gray-500 dark:text-black">
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-black">
                                  MP4, MOV
                                </p>
                              </div>
                              <input
                                type={"file"}
                                onChange={OnChangeFile6}
                                style={{ color: "black" }}
                                multiple
                              />
                            </label>
                          </div>
                        </div>
                        <div className="mt-8" style={{ width: "100%" }}>
                          <label
                            className="mt-8"
                            style={{ color: "#6D757D", marginBottom: "10px" }}
                          >
                            Floor Plan
                          </label>
                          <div className="flex items-center justify-center w-full">
                            <label
                              htmlFor="dropzone-file"
                              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-black hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 AddrImages"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                  aria-hidden="true"
                                  className="w-10 h-10 mb-3 text-gray-500"
                                  fill="none"
                                  stroke="currentColor"
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
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-white">
                                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                              </div>
                              <input
                                type={"file"}
                                onChange={OnChangeFile2}
                                style={{ color: "black" }}
                                multiple
                              />
                            </label>
                          </div>
                        </div>
                        <div className="mt-8" style={{ width: "100%" }}>
                          <label
                            className="mt-8"
                            style={{ color: "#6D757D", marginBottom: "10px" }}
                          >
                            Render Images
                          </label>
                          <div className="flex items-center justify-center w-full">
                            <label
                              htmlFor="dropzone-file"
                              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-black hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                  aria-hidden="true"
                                  className="w-10 h-10 mb-3 text-gray-500"
                                  fill="none"
                                  stroke="currentColor"
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
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-white">
                                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                              </div>
                              <input
                                type={"file"}
                                onChange={OnChangeFile3}
                                style={{ color: "black" }}
                                multiple
                              />
                            </label>
                          </div>
                        </div>
                        <div className="mt-8" style={{ width: "100%" }}>
                          <label
                            className="mt-8"
                            style={{ color: "#6D757D", marginBottom: "10px" }}
                          >
                            Photo Galary
                          </label>
                          <div className="flex items-center justify-center w-full">
                            <label
                              htmlFor="dropzone-file"
                              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-black hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                  aria-hidden="true"
                                  className="w-10 h-10 mb-3 text-gray-500"
                                  fill="none"
                                  stroke="currentColor"
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
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-white">
                                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                              </div>
                              <input
                                type={"file"}
                                onChange={OnChangeFile4}
                                style={{ color: "black" }}
                                multiple
                              />
                            </label>
                          </div>
                        </div>
                        {/* <div className="mt-8" style={{ width: "100%" }}>
                          <label
                            className="mt-8"
                            style={{ color: "#6D757D", marginBottom: "10px" }}
                          >
                            Virtullay Reality Tour
                          </label>
                          <div className="flex items-center justify-center w-full">
                            <label
                              htmlFor="dropzone-file"
                              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-black hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                  aria-hidden="true"
                                  className="w-10 h-10 mb-3 text-gray-500"
                                  fill="none"
                                  stroke="currentColor"
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
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-white">
                                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                              </div>
                              <input
                                type={"file"}
                                onChange={OnChangeFile5}
                                style={{ color: "black" }}
                                multiple
                              />
                            </label>
                          </div>
                        </div> */}
                        <div className="text-green text-center">{message}</div>
                        <div className="mt-4 flex justify-end">
                          <button className="ml-4 bg-black hover:bg-gray-500 text-white font-semibold hover:text-white py-2 px-4 border border-black-500 hover:border-transparent rounded">
                            Back
                          </button>
                          <button
                            onClick={listNFT}
                            className="ml-4 bg-black hover:bg-gray-500 text-white font-semibold hover:text-white py-2 px-4 border border-black-500 hover:border-transparent rounded"
                          >
                            Mint
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </form>
      </div>
    </div>
  );
}
