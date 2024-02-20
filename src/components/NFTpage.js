import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import MarketplaceJSON from "../Marketplace.json";
import Factoryabi from "../factory.json";
import axios from "axios";
import { useState } from "react";
import Footer from "./Footer";
import Table from "react-bootstrap/Table";
import Grid from "@mui/material/Grid";
import address from "./Address";
import { Link } from "react-router-dom";
import "../App.css";

export default function NFTPage() {
  const [data, updateData] = useState({});
  const [dataFetched, updateDataFetched] = useState(false);

  async function getNFTData(tokenId, contract_address) {
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
    let contract = new ethers.Contract(
      contract_address,
      MarketplaceJSON,
      signer
    );
    const listedToken = await contract.getListedTokenForId(tokenId);
    const FactortAddressTemp= address;
    let contract_factory = new ethers.Contract(
      FactortAddressTemp,
      Factoryabi,
      signer
    );
    let tokenURI = await contract.tokenURI(tokenId);
    if(tokenURI.split("/")[0]==="ipfs:")
    {
      tokenURI = 'https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/' + tokenURI.split("/")[2];
    }
    let meta = await axios.get(
      tokenURI
    );
    meta = meta.data;
    if(meta.image && meta.image.split("/")[0]==="ipfs:")
    {
      meta.image='https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/' + meta.image.split("/")[2];
    }

    if (!meta) {
      meta = 1;
    }
    if (!tokenId) {
      tokenId = 0;
    }
    if (!listedToken.seller) {
      listedToken.seller = "N/A";
    }
    if (!listedToken.owner) {
      listedToken.owner = "N/A";
    }
    if (!meta.image) {
      meta.image = "N/A";
    }
    if (!meta.name) {
      meta.name = "N/A";
    }
    if (!meta.description) {
      meta.description = "N/A";
    }
    if (!meta.category) {
      meta.category = "N/A";
    }
    if (!meta.attributes[0]) {
      meta.attributes[0] = "N/A";
    }
    if (!meta.creatorWallet) {
      meta.creatorWallet = "N/A";
    }
    if (!meta.collectionAddress) {
      meta.collectionAddress = "N/A";
    }
    if (!meta.designer) {
      meta.designer = "N/A";
    }
    if (!meta.materials) {
      meta.materials = "N/A";
    }
    if (!meta.measures) {
      meta.measures = "N/A";
    }
    if (!meta.nftid) {
      meta.nftid = "N/A";
    }
    if (!meta.price) {
      meta.price = "N/A";
    }
    if (!meta.producer) {
      meta.producer = "N/A";
    }
    if (!meta.product) {
      meta.product = "N/A";
    }
    if(meta.image)
    {
      if(meta.image.split("/")[0]==="ipfs:")
      {
        meta.image='https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/' + meta.image.split("/")[2];
      }
    }
    if(meta.videolink)
    {
      if(meta.videolink.split("/")[0]==="ipfs:")
      {
        meta.videolink='https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/' + meta.videolink.split("/")[2];
      }
    }
    let ArtistINFO = await contract_factory.getartistdescription(
      meta.creatorWallet
    );
    let item = {
      tokenId: tokenId,
      seller: listedToken.seller,
      owner: listedToken.owner,
      creator_name: ArtistINFO.artist_name,
      creator_info: ArtistINFO.artist_info,
      image: meta.image,
      name: meta.name,
      description: meta.description,
      category: meta.category,
      art_type:meta.art_type,
      attributes: meta.attributes,
      creatorWallet: meta.creatorWallet,
      collectionName: meta.collectionName,
      collectionAddress: meta.collectionAddress,
      artist: meta.artist,
      NFT_Type: meta.NFT_Type,
      designer: meta.designer,
      materials: meta.materials,
      measures: meta.measures,
      typeofProject: meta.typeofProject,
      masterpiecesInserted: meta.masterpiecesInserted,
      nftid: meta.nftid,
      price: meta.price,
      producer: meta.producer,
      product: meta.product,
      serialnumberNFT: meta.serialnumberNFT,
      floorPlanImages: meta.floorPlanImages,
      renderImages: meta.renderImages,
      photoGallery: meta.photoGallery,
      virtullayTour: meta.virtullayTour,
      videolink:meta.videolink
    };
    console.log("TOKEN ID",tokenId);
    console.log("Token URI: " + tokenURI);
    console.log("META DATA",item);
    updateData(item);
    updateDataFetched(true);
  }

  const params = useParams();

  const tokenId = params.tokenId;
  const contract_address = params.contract_address;
  if (!dataFetched) getNFTData(tokenId, contract_address);
  const [TOAddress, setToAddress] = useState("");
  async function handleTransfersubmit(e) {
    e.preventDefault();
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      contract_address,
      MarketplaceJSON,
      signer
    );
    // const listedToken = ttTransferfrom
    // await contract.transferFrom(addr, TOAddress, tokenId);
    let x= await contract.approve(contract_address,tokenId);
    let y= await x.wait();
    if(y.status===1)
    await contract.ttTransferfrom(addr, TOAddress, tokenId);
    else
    return;

  }

  return (
    <div style={{ background: "white" }}>
      <Navbar></Navbar>
      {data.category === "Design Masterpieces" ? (
        <div
          className="container mx-auto NFTPAGEPage"
          style={{ paddingTop: "10px", paddingBottom: "10px" }}
        >
          <Grid container spacing={2} className="aboutCardsALL">
            <Grid item xs={12} sm={6} md={6} lg={6} className="aboutCards">
              <div style={{ textAlign: "left", padding: "20px 0px" }}>
                <h1
                  style={{
                    fontFamily: "Mak,serif",
                    fontSize: "36px",
                    fontWeight: "600",
                    padding: "0px 0px 3px 0px",
                  }}
                >
                  {data.name}
                </h1>
                <div
                  style={{
                    padding: "0px 0px 10px 0px",
                    fontSize: "28px",
                    fontFamily: "Montserrat",
                  }}
                >
                  <p>{data.product}</p>
                </div>
                <Table striped="columns" className="artworkDetails">
                  <tbody>
                    <tr>
                      <th
                        style={{
                          fontFamily: "Montserrat,serif",
                          fontSize: "23px",
                          fontWeight: "600",
                          padding: "3px 0px",
                        }}
                      >
                        Designer
                      </th>
                    </tr>
                    <tr>
                      <td
                        colSpan="2"
                        style={{
                          fontFamily: "Montserrat,serif",
                          fontSize: "22px",
                          paddingLeft:'30px'
                        }}
                      >
                        {data.designer}
                      </td>
                    </tr>
                    <tr>
                      <th>Creator Wallet</th>
                      <td>{data.creatorWallet}</td>
                    </tr>
                    <tr>
                      <th>Serial Number NFT</th>
                      <td>{data.serialnumberNFT}</td>
                    </tr>
                    <tr>
                      <th>Token ID</th>
                      <td>{data.tokenId}</td>
                    </tr>
                    <tr>
                      <th>Collection Name</th>
                      <td>{data.collectionName}</td>
                    </tr>
                    <tr>
                      <th>Collection Address</th>
                      <td>{data.collectionAddress}</td>
                    </tr>
                    <tr>
                      <th>Category</th>
                      <td style={{ textTransform: "uppercase" }}>
                        {data.category}
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan="2"
                        style={{
                          color: "white",
                          fontSize: "10px",
                        }}
                      >
                        .
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan="2"
                        style={{
                          borderTop: "2px solid black",
                          fontFamily: "Montserrat,serif",
                          fontSize: "21px",
                        }}
                      >
                        <th>Description</th>
                        {data.description}
                      </td>
                    </tr>
                    <tr>
                      <th>Producer</th>
                      <td>{data.producer}</td>
                    </tr>
                    <tr>
                      <th>NFT Type</th>
                      <td>{data.NFT_Type}</td>
                    </tr>
                    <tr>
                      <th>Materials</th>
                      <td>{data.materials}</td>
                    </tr>
                    <tr>
                      <th>Measures</th>
                      <td>{data.measures}</td>
                    </tr>
                    {/* 
                      // @ts-ignore */} 
                    <tr>
                      <th colSpan="2">Photo Gallery</th>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <Grid container spacing={2}>
                          {data.photoGallery ? (
                            <>
                              {data.photoGallery.map((value, index) => {
                                return (
                                  <Grid
                                    item
                                    xs={2}
                                    sm={2}
                                    md={2}
                                    lg={2}
                                    className="dianaCards"
                                    key={index}
                                  >
                                    <img
                                      src={value.split("/")[0]==="ipfs:" ? 'https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/' + value.split("/")[2]: value}
                                      alt="NoImage"
                                      style={{
                                        width: "200px",
                                        height: "200px",
                                        maxWidth: "100%",
                                        margin: "3px",
                                      }}
                                      className="w-1/2"
                                    />
                                  </Grid>
                                );
                              })}
                            </>
                          ) : (
                            <></>
                          )}
                        </Grid>
                      </td>
                    </tr>
                    <tr style={{ borderTop: "2px solid black" }}>
                      <th>Creator Name</th>
                      <td>{data.creator_name ? data.creator_name:"Creator Name Not Set Yet!!!"}</td>
                    </tr>
                    <tr>
                      <th>Creator Info</th>
                      <td>{data.creator_info ? data.creator_info:"Creator Name Not Set Yet!!!"}</td>
                    </tr>
                  </tbody>
                </Table>
                <div
                  style={{
                    padding: "10px 0px",
                  }}
                >
                  <form onSubmit={handleTransfersubmit}>
                    <input
                      type="text"
                      style={{
                        border: "1px solid black",
                        marginRight: "auto",
                        marginLeft: "auto",
                        padding: "5px",
                        margin: "0px 5px 0px 0px",
                        width: "300px",
                      }}
                      placeholder="Address"
                      name="toAddress"
                      onChange={(event) => setToAddress(event.target.value)}
                    />
                    <button
                      className="bg-black hover:bg-gray-500 text-white font-bold mt-2 py-2 px-4 text-sm"
                      type="submit"
                    >
                      Transfer
                    </button>
                  </form>
                </div>
                <div
                  style={{
                    padding: "10px 0px",
                  }}
                >
                  <Link to={"/NFT_Creator/" + data.creatorWallet} state={{ collectionAddress: data.collectionAddress }}>
                      <button className="bg-black hover:bg-gray-500 text-white font-bold mt-2 py-2 px-4 text-sm">
                        Creator Details
                      </button>
                  </Link>
                </div>
                <div
                  style={{
                    padding: "10px 0px",
                  }}
                >
                  <Link to={"/NFT_Creator_Collection/" + data.creatorWallet+"/"+data.collectionAddress}>
                    <button className="bg-black hover:bg-gray-500 text-white font-bold mt-2 py-2 px-4 text-sm">
                      Creator Collection
                    </button>
                  </Link>
                </div>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              style={{ padding: "40px 0px" }}
            >
              {data.image ? (
                <>
                  <img
                    src={data.image}
                    alt="NoImage"
                    style={{
                      width: "90%",
                      maxWidth: "100%",
                      marginLeft: "auto",
                      borderBottom: "2px solid black",
                    }}
                    className="w-1/2"
                  />
                </>
              ) : (
                <></>
              )}

              <div>
                <video
                  style={{ margin: "5px", marginLeft: "auto" }}
                  width="400"
                  height="500"
                  controls
                  loop
                >
                  <source src={data.videolink} type="video/mp4" />
                </video>
              </div>
            </Grid>
          </Grid>
        </div>
      ) : (
        <></>
      )}
      {data.category === "Artwork" ? (
        <div
          className="container mx-auto"
          style={{ paddingTop: "10px", paddingBottom: "10px" }}
        >
          <Grid container spacing={2} className="aboutCardsALL">
            <Grid item xs={12} sm={6} md={6} lg={6} className="aboutCards">
              <div style={{ textAlign: "left", padding: "20px 0px" }}>
                <h1
                  style={{
                    fontFamily: "Mak,serif",
                    fontSize: "36px",
                    fontWeight: "600",
                    padding: "0px 0px 3px 0px",
                  }}
                >
                  {data.name}
                </h1>
                <div
                  style={{
                    padding: "0px 0px 10px 0px",
                    fontSize: "28px",
                    fontFamily: "Montserrat",
                  }}
                >
                  <p>{data.product}</p>
                </div>
                <Table striped="columns" className="artworkDetails">
                  <tbody>
                    <tr>
                      <th
                        style={{
                          fontFamily: "Montserrat,serif",
                          fontSize: "23px",
                          fontWeight: "600",
                          padding: "3px 0px",
                        }}
                      >
                        Artist
                      </th>
                    </tr>
                    <tr>
                      <td
                        colSpan="2"
                        style={{
                          fontFamily: "Montserrat,serif",
                          fontSize: "22px",
                          paddingLeft:'30px'
                        }}
                      >
                        {data.artist}
                      </td>
                    </tr>
                    <tr>
                      <th>Creator Wallet</th>
                      <td>{data.creatorWallet}</td>
                    </tr>
                    <tr>
                      <th>Serial Number NFT</th>
                      <td>{data.serialnumberNFT}</td>
                    </tr>
                    <tr>
                      <th>Token ID</th>
                      <td>{data.tokenId}</td>
                    </tr>
                    <tr>
                      <th>Art Type</th>
                      <td>{data.art_type ? data.art_type:''}</td>
                    </tr>
                    <tr>
                      <th>Collection Name</th>
                      <td>{data.collectionName}</td>
                    </tr>
                    <tr>
                      <th>Collection Address</th>
                      <td>{data.collectionAddress}</td>
                    </tr>
                    <tr>
                      <th>Category</th>
                      <td style={{ textTransform: "uppercase" }}>
                        {data.category}
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan="2"
                        style={{
                          color: "white",
                          fontSize: "10px",
                        }}
                      >
                        .
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan="2"
                        style={{
                          borderTop: "2px solid black",
                          fontFamily: "Montserrat,serif",
                          fontSize: "21px",
                        }}
                      >
                        <th>Description</th>
                        {data.description}
                      </td>
                    </tr>
                    <tr>
                      <th>Producer</th>
                      <td>{data.producer}</td>
                    </tr>
                    <tr>
                      <th>NFT Type</th>
                      <td>{data.NFT_Type}</td>
                    </tr>
                    <tr>
                      <th>Materials</th>
                      <td>{data.materials}</td>
                    </tr>
                    <tr>
                      <th>Measures</th>
                      <td>{data.measures}</td>
                    </tr>
                    <tr>
                      <th colSpan="2">Photo Gallery</th>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <Grid container spacing={2}>
                          {data.photoGallery ? (
                            <>
                              {data.photoGallery.map((value, index) => {
                                return (
                                  <Grid
                                    item
                                    xs={2}
                                    sm={2}
                                    md={2}
                                    lg={2}
                                    className="dianaCards"
                                    key={index}
                                  >
                                    <img
                                      src={value.split("/")[0]==="ipfs:" ? 'https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/' + value.split("/")[2]: value}
                                      alt="NoImage"
                                      style={{
                                        width: "200px",
                                        height: "200px",
                                        maxWidth: "100%",
                                        margin: "3px",
                                      }}
                                      className="w-1/2"
                                    />
                                  </Grid>
                                );
                              })}
                            </>
                          ) : (
                            <></>
                          )}
                        </Grid>
                      </td>
                    </tr>
                    <tr style={{ borderTop: "2px solid black" }}>
                      <th>Creator Name</th>
                      <td>{data.creator_name}</td>
                    </tr>
                    <tr>
                      <th>Creator Info</th>
                      <td>{data.creator_info}</td>
                    </tr>
                  </tbody>
                </Table>
                <div
                  style={{
                    padding: "10px 0px",
                  }}
                >
                  <form onSubmit={handleTransfersubmit}>
                    <input
                      type="text"
                      style={{
                        border: "1px solid black",
                        marginRight: "auto",
                        marginLeft: "auto",
                        padding: "5px",
                        margin: "0px 5px 0px 0px",
                        width: "300px",
                      }}
                      placeholder="Address"
                      name="toAddress"
                      onChange={(event) => setToAddress(event.target.value)}
                    />
                    <button
                      className="bg-black hover:bg-gray-500 text-white font-bold mt-2 py-2 px-4 text-sm"
                      type="submit"
                    >
                      Transfer
                    </button>
                  </form>
                </div>
                <div
                  style={{
                    padding: "10px 0px",
                  }}
                >
                  <Link to={"/NFT_Creator/" + data.creatorWallet} state={{ collectionAddress: data.collectionAddress }}>
                      <button className="bg-black hover:bg-gray-500 text-white font-bold mt-2 py-2 px-4 text-sm">
                        Creator Details
                      </button>
                  </Link>
                </div>
                <div
                  style={{
                    padding: "10px 0px",
                  }}
                >
                  <Link to={"/NFT_Creator_Collection/" + data.creatorWallet+"/"+data.collectionAddress}>
                    <button className="bg-black hover:bg-gray-500 text-white font-bold mt-2 py-2 px-4 text-sm">
                      Creator Collection
                    </button>
                  </Link>
                </div>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              style={{ padding: "40px 0px" }}
            >
              {data.image ? (
                <>
                  <img
                    src={data.image}
                    alt="NoImage"
                    style={{
                      width: "90%",
                      maxWidth: "100%",
                      marginLeft: "auto",
                      borderBottom: "2px solid black",
                    }}
                    className="w-1/2"
                  />
                </>
              ) : (
                <></>
              )}
              <div>
              <video
                  style={{ margin: "5px", marginLeft: "auto" }}
                  width="400"
                  height="500"
                  controls
                  loop
                >
                  <source src={data.videolink} type="video/mp4" />
                </video>
              </div>
            </Grid>
          </Grid>
        </div>
      ) : (
        <></>
      )}
      {data.category === "Interior Designs" ? (
        <div
          className="container mx-auto"
          style={{ paddingTop: "10px", paddingBottom: "10px" }}
        >
          <Grid container spacing={2} className="aboutCardsALL">
            <Grid item xs={12} sm={6} md={6} lg={6} className="aboutCards">
              <div style={{ textAlign: "left", padding: "20px 0px" }}>
                <h1
                  style={{
                    fontFamily: "Mak,serif",
                    fontSize: "36px",
                    fontWeight: "600",
                    padding: "0px 0px 3px 0px",
                  }}
                >
                  {data.name}
                </h1>
                <div
                  style={{
                    padding: "0px 0px 10px 0px",
                    fontSize: "28px",
                    fontFamily: "Montserrat",
                  }}
                >
                  <p>{data.product}</p>
                </div>
                <Table striped="columns" className="artworkDetails">
                  <tbody>
                    <tr>
                      <th
                        style={{
                          fontFamily: "Montserrat,serif",
                          fontSize: "23px",
                          fontWeight: "600",
                          padding: "3px 0px",
                        }}
                      >
                        Designer
                      </th>
                    </tr>
                    <tr>
                      <td
                        colSpan="2"
                        style={{
                          fontFamily: "Montserrat,serif",
                          fontSize: "22px",
                          paddingLeft: '30px'
                        }}
                      >
                        {data.designer}
                      </td>
                    </tr>
                    <tr>
                      <th>Creator Wallet</th>
                      <td>{data.creatorWallet}</td>
                    </tr>
                    <tr>
                      <th>Serial Number NFT</th>
                      <td>{data.serialnumberNFT}</td>
                    </tr>
                    <tr>
                      <th>Token ID</th>
                      <td>{data.tokenId}</td>
                    </tr>
                    <tr>
                      <th>Type of Project</th>
                      <td>{data.typeofProject}</td>
                    </tr>
                    <tr>
                      <th>Masterpieces Inserted</th>
                      <td>{data.masterpiecesInserted}</td>
                    </tr>
                    <tr>
                      <th>Product</th>
                      <td>{data.product}</td>
                    </tr>
                    <tr>
                      <th>Collection Name</th>
                      <td>{data.collectionName}</td>
                    </tr>
                    <tr>
                      <th>Collection Address</th>
                      <td>{data.collectionAddress}</td>
                    </tr>
                    <tr>
                      <th>Category</th>
                      <td style={{ textTransform: "uppercase" }}>
                        {data.category}
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan="2"
                        style={{
                          color: "white",
                          fontSize: "10px",
                        }}
                      >
                        .
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan="2"
                        style={{
                          borderTop: "2px solid black",
                          fontFamily: "Montserrat,serif",
                          fontSize: "21px",
                        }}
                      >
                        <th>Description</th>
                        {data.description}
                      </td>
                    </tr>
                    <tr>
                      <th>Producer</th>
                      <td>{data.producer}</td>
                    </tr>
                    <tr>
                      <th>NFT Type</th>
                      <td>{data.NFT_Type}</td>
                    </tr>
                    <tr>
                      <th>Materials</th>
                      <td>{data.materials}</td>
                    </tr>
                    <tr>
                      <th>Measures</th>
                      <td>{data.measures}</td>
                    </tr>
                    <tr>
                      <th colSpan="2">Floor Plan</th>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <Grid container spacing={2}>
                          {data.floorPlanImages ? (
                            <>
                              {data.floorPlanImages.map((value, index) => {
                                return (
                                  <Grid
                                    item
                                    xs={2}
                                    sm={2}
                                    md={2}
                                    lg={2}
                                    className="dianaCards"
                                    key={index}
                                  >
                                    <img
                                      src={value.split("/")[0]==="ipfs:" ? 'https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/' + value.split("/")[2]: value}
                                      alt="NoImage"
                                      style={{
                                        width: "200px",
                                        height: "200px",
                                        maxWidth: "100%",
                                        margin: "3px",
                                      }}
                                      className="w-1/2"
                                    />
                                  </Grid>
                                );
                              })}
                            </>
                          ) : (
                            <></>
                          )}
                        </Grid>
                      </td>
                    </tr>
                    <tr>
                      <th colSpan="2">Render Images</th>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <Grid container spacing={2}>
                          {data.renderImages ? (
                            <>
                              {data.renderImages.map((value, index) => {
                                return (
                                  <Grid
                                    item
                                    xs={2}
                                    sm={2}
                                    md={2}
                                    lg={2}
                                    className="dianaCards"
                                    key={index}
                                  >
                                    <img
                                      src={value.split("/")[0]==="ipfs:" ? 'https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/' + value.split("/")[2]: value}
                                      alt="NoImage"
                                      style={{
                                        width: "200px",
                                        height: "200px",
                                        maxWidth: "100%",
                                        margin: "3px",
                                      }}
                                      className="w-1/2"
                                    />
                                  </Grid>
                                );
                              })}
                            </>
                          ) : (
                            <></>
                          )}
                        </Grid>
                      </td>
                    </tr>
                    <tr>
                      <th colSpan="2">Photo Gallery</th>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <Grid container spacing={2}>
                          {data.photoGallery ? (
                            <>
                              {data.photoGallery.map((value, index) => {
                                return (
                                  <Grid
                                    item
                                    xs={2}
                                    sm={2}
                                    md={2}
                                    lg={2}
                                    className="dianaCards"
                                    key={index}
                                  >
                                    <img
                                      src={value.split("/")[0]==="ipfs:" ? 'https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/' + value.split("/")[2]: value}
                                      alt="NoImage"
                                      style={{
                                        width: "200px",
                                        height: "200px",
                                        maxWidth: "100%",
                                        margin: "3px",
                                      }}
                                      className="w-1/2"
                                    />
                                  </Grid>
                                );
                              })}
                            </>
                          ) : (
                            <></>
                          )}
                        </Grid>
                      </td>
                    </tr>
                    <tr style={{ borderTop: "2px solid black" }}>
                      <th>Creator Name</th>
                      <td>{data.creator_name ? data.creator_name:"Creator Name Not Set Yet!!!"}</td>
                    </tr>
                    <tr>
                      <th>Creator Info</th>
                      <td>{data.creator_info ? data.creator_info:"Creator Name Not Set Yet!!!"}</td>
                    </tr>
                  </tbody>
                </Table>
                <div
                  style={{
                    padding: "10px 0px",
                  }}
                >
                  <form onSubmit={handleTransfersubmit}>
                    <input
                      type="text"
                      style={{
                        border: "1px solid black",
                        marginRight: "auto",
                        marginLeft: "auto",
                        padding: "5px",
                        margin: "0px 5px 0px 0px",
                        width: "300px",
                      }}
                      placeholder="Address"
                      name="toAddress"
                      onChange={(event) => setToAddress(event.target.value)}
                    />
                    <button
                      className="bg-black hover:bg-gray-500 text-white font-bold mt-2 py-2 px-4 text-sm"
                      type="submit"
                    >
                      Transfer
                    </button>
                  </form>
                </div>
                <div
                  style={{
                    padding: "10px 0px",
                  }}
                >
                  <Link to={"/NFT_Creator/" + data.creatorWallet} state={{ collectionAddress: data.collectionAddress }}>
                      <button className="bg-black hover:bg-gray-500 text-white font-bold mt-2 py-2 px-4 text-sm">
                        Creator Details
                      </button>
                  </Link>
                </div>
                <div
                  style={{
                    padding: "10px 0px",
                  }}
                >
                  <Link to={"/NFT_Creator_Collection/" + data.creatorWallet+"/"+data.collectionAddress}>
                    <button className="bg-black hover:bg-gray-500 text-white font-bold mt-2 py-2 px-4 text-sm">
                      Creator Collection
                    </button>
                  </Link>
                </div>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              style={{ padding: "40px 0px" }}
            >
              {data.image ? (
                <img
                  src={data.image}
                  alt="NoImage"
                  style={{
                    width: "90%",
                    maxWidth: "100%",
                    marginLeft: "auto",
                    borderBottom: "2px solid black",
                  }}
                  className="w-1/2"
                />
              ) : (
                <></>
              )}
              <div>
              <video
                  style={{ margin: "5px", marginLeft: "auto" }}
                  width="400"
                  height="500"
                  controls
                  loop
                >
                  <source src={data.videolink} type="video/mp4" />
                </video>
                {/* <iframe
                  width="400"
                  height="500"
                  src={"https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/QmeV2KKURZsug56eGzNEtGwyVerbZPmUK5jXRhC15Fn335"}
                  title="Youtube Player"
                  frameBorder="0"
                  allowFullScreen
                  style={{ margin: "5px", marginLeft: "auto" }}
                /> */}
              </div>
            </Grid>
          </Grid>
        </div>
      ) : (
        <></>
      )}
      <Footer />
    </div>
  );
}
