import Navbar from "./Navbar";
import { useState } from "react";
import * as React from "react";
import { uploadFileToIPFS } from "../pinata";
import Factoryabi from "../factory.json";
import Grid from "@mui/material/Grid";
import address from "./Address";
// import axios from "axios";

export default function CreateCollection() {
  // const [fileURL, setFileURL] = useState(null);
  // const [bannerURL, updatebannerURL] = useState(null);
  const FactortAddressTemp= address;
  const ethers = require("ethers");
  const [collectionLogo, setCollectionLogo]=useState();
  const [collectionBanner, setCollectionBanner]=useState();
  async function OnChangeFile(e) {
    var file = e.target.files[0];
    //check htmlFor file extension
    try {
      //upload the file to IPFS
      const response = await uploadFileToIPFS(file);
      setCollectionLogo(response.pinataURL);
      if (response.success === true) {
        // setFileURL(response.pinataURL);
        const el = document.querySelector(".CollectionLogoclass");
        el.style.borderColor = "gray";
      }
    } catch (e) {
      // console.log("Error during file upload", e);
    }
  }

  async function OnChangeFile2(e) {
    var file = e.target.files[0];
    //check htmlFor file extension

    //upload the file to IPFS
    try {
      //upload the file to IPFS
      const response = await uploadFileToIPFS(file);
      setCollectionBanner(response.pinataURL);
      if (response.success === true) {
        // setFileURL(response.pinataURL);
        const el = document.querySelector(".CollectionLogoclass");
        el.style.borderColor = "gray";
      }
    } catch (e) {
      // console.log("Error during file upload", e);
    }
  }

  const [formParamsContract, updateFormParamsContract] = useState({
    collectionname: "",
    description: "",
    collectionsymbol: "",
    collectionURL: "",
    categoryCollection: "",
  });

  // async function Make_functional(e) {
  //   e.preventDefault();
  //   const { categoryCollection } = formParamsContract;
  //   if (!categoryCollection) {
  //     alert("Please! First Select Collection.");
  //     return;
  //   }
  //   //After adding your Hardhat network to your metamask, this code will get providers and signers
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   await provider.send("eth_requestAccounts", []);
  //   const signer = provider.getSigner();

  //   //Pull the deployed contract instance
  //   let contract_factory = new ethers.Contract(
  //     FactortAddressTemp,
  //     Factoryabi,
  //     signer
  //   );
  //   if (categoryCollection === "Artwork") {
  //     await contract_factory.set_updated_listprice("Artwork");
  //   }
  //   if (categoryCollection === "Design Masterpieces") {
  //     await contract_factory.set_updated_listprice("Design Masterpieces");
  //   }
  //   if (categoryCollection === "Interior Designs") {
  //     await contract_factory.set_updated_listprice("Interior Designs");
  //   }
  // }

  async function create_contracts_fun(e) {
    e.preventDefault();
    const {
      categoryCollection,
      collectionURL,
      collectionname,
      collectionsymbol,
      description,
    } = formParamsContract;
    if (!collectionname && !description && !collectionLogo && !collectionBanner) {
      return;
    }
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    //Pull the deployed contract instance
    let contract_factory = new ethers.Contract(
      FactortAddressTemp,
      Factoryabi,
      signer
    );
    // const listedToken = 
    let listPrice= await contract_factory.getListPrice(categoryCollection);
    console.log(listPrice);

// Convert BigNumber to ethers
    const ethersValue = ethers.utils.formatEther(listPrice);
    console.log(ethersValue)
     let cat=await contract_factory.create_contracts(
      collectionname,
      collectionsymbol,
      description,
      collectionURL,
      collectionLogo,
      collectionBanner,
      categoryCollection,
      {
        gasLimit: ethers.utils.parseUnits("0.00000000001", "ether"),
        value: ethers.utils.parseUnits(ethersValue, "ether") ,
      }
    );
    let rreceipt=cat.wait();
    console.log('Contract deployed to:', rreceipt.contractAddress);

    // window.location.replace("/sellNFT");
    // await contract_factory.set_updated_listprice('Artwork')
    // await contract_factory.set_updated_listprice('Design Masterpieces')
    // await contract_factory.set_updated_listprice('Interior Designs')
  }

  return (
    <div className="pb-6 bg-white">
      <Navbar></Navbar>
      <div className="container mx-auto MarketPlacePage">
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
              Create Collection
            </h1>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <label style={{ color: "#6D757D", marginBottom: "10px" }}>
              Collection Logo
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-black hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 CollectionLogoclass"
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
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
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
            <div style={{ width: "100%" }} className="mt-4 mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="collectionname"
                type="text"
                placeholder="Collection Name"
                onChange={(e) =>
                  updateFormParamsContract({
                    ...formParamsContract,
                    collectionname: e.target.value,
                  })
                }
                value={formParamsContract.collectionname}
              ></input>
            </div>
            <div>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline DescriptionField"
                cols="40"
                rows="3"
                id="description"
                type="text"
                placeholder="Collection Description"
                value={formParamsContract.description}
                onChange={(e) =>
                  updateFormParamsContract({
                    ...formParamsContract,
                    description: e.target.value,
                  })
                }
              ></textarea>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <div style={{ width: "100%" }} className="mt-4 mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="collectionsymbol"
                type="text"
                placeholder="Collection Symbol"
                onChange={(e) =>
                  updateFormParamsContract({
                    ...formParamsContract,
                    collectionsymbol: e.target.value,
                  })
                }
                value={formParamsContract.collectionsymbol}
              ></input>
            </div>
            <div style={{ width: "100%" }} className="mt-4 mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="collectionURL"
                type="text"
                placeholder="Collection URL"
                onChange={(e) =>
                  updateFormParamsContract({
                    ...formParamsContract,
                    collectionURL: e.target.value,
                  })
                }
                value={formParamsContract.collectionURL}
              ></input>
            </div>
            <div className="mt-4 mb-4" style={{ width: "100%" }}>
              <label
                className="mt-8"
                style={{ color: "#6D757D", marginBottom: "10px" }}
              >
                Collection Banner
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-black hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600  AddrImages"
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
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-white">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    type={"file"}
                    onChange={OnChangeFile2}
                    style={{ color: "black" }}
                  />
                </label>
              </div>
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
                onChange={(e) => {
                  updateFormParamsContract({
                    ...formParamsContract,
                    categoryCollection: e.target.value,
                  });
                }}
              >
                <option value="">Select Collection</option>
                <option value="Design Masterpieces">Design Masterpiece</option>
                <option value="Artwork">Artwork</option>
                <option value="Interior Designs">Interior Design</option>
              </select>
            </div>
            <div className="flex justify-end">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-black hover:bg-gray-500"
                id="name"
                type="button"
                placeholder="Producer"
                value="Create Collection"
                onClick={create_contracts_fun}
              ></input>
            </div>
            {/* <div className="justify-end mt-2 mb-2">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-black hover:bg-gray-500"
                id="name"
                type="button"
                value="Make it Functional"
                onClick={Make_functional}
              ></input>
              <p className="text-xs">
                Make it functional before using Collection
              </p>
            </div> */}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
