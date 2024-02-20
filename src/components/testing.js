import Navbar from "./Navbar";
import axios from "axios";
import { useState } from "react";
import Footer from "./Footer";
import Table from "react-bootstrap/Table";
import Grid from "@mui/material/Grid";
import "../App.css";

export default function Testing(props) {
  const [data, updateData] = useState({});
  const [dataFetched, updateDataFetched] = useState(false);

  async function getNFTData() {
    let meta = await axios.get(
      "https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/QmbGzrtCxJ2WAA9995Vkt1ee3fuD2mi9zjeVAs2AZbwih8"
      // ,{
      //   header:
      //   {
      //     'Access-Control-Allow-Origin':'*'
      //   }
      // }
    );
    meta = meta.data;
    if (!meta) {
      meta = 1;
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
    if (!meta.wallet) {
      meta.wallet = "N/A";
    }
    if (!meta.collectionAddress) {
      meta.collectionAddress = "N/A";
    }
    if (!meta.designer) {
      meta.designer = "N/A";
    }
    if (!meta.material) {
      meta.material = "N/A";
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
    let item = {
      image: meta.image,
      name: meta.name,
      description: meta.description,
      category: meta.category,
      attributes: meta.attributes,
      wallet: meta.wallet,
      collectionAddress: meta.collectionAddress,
      designer: meta.designer,
      edition101: meta.edition101,
      material: meta.material,
      measures: meta.measures,
      nftid: meta.nftid,
      price: meta.price,
      producer: meta.producer,
      product: meta.product,
      additionalImages: meta.additionalImages,
      renderImages: meta.renderImages,
      photoGallery: meta.photoGallery,
      virtullayTour: meta.virtullayTour,
    };
    updateData(item);
    updateDataFetched(true);
  }
  if (!dataFetched) getNFTData();

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
                        }}
                      >
                        {data.designer}
                      </td>
                    </tr>
                    <tr>
                      <th>Wallet</th>
                      <td>{data.wallet}</td>
                    </tr>
                    <tr>
                      <th>NFTID</th>
                      <td>{data.nftid}</td>
                    </tr>
                    <tr>
                      <th>Collection</th>
                      <td>{data.collectionAddress}</td>
                    </tr>
                    <tr>
                      <th>Category</th>
                      <td style={{ textTransform: "uppercase" }}>
                        {data.category}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        {data.edition101 === "1" ? (
                          <button
                            className="bg-black text-white font-bold py-3 px-6 text-sm"
                            style={{
                              fontSize: "18px",
                              fontFamily: "Montserrat",
                            }}
                          >
                            Edition 1 of 1
                          </button>
                        ) : (
                          <></>
                        )}
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
                        {data.description}
                      </td>
                    </tr>
                    <tr>
                      <th>Producer</th>
                      <td>{data.producer}</td>
                    </tr>
                    <tr>
                      <th>Material</th>
                      <td>{data.material}</td>
                    </tr>
                    <tr>
                      <th>Measures</th>
                      <td>{data.measures}</td>
                    </tr>
                    <tr>
                      <th>Video Link</th>
                      <td>{data.videolink}</td>
                    </tr>
                    <tr>
                      <th colSpan="2">Additional Images</th>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <Grid container spacing={2}>
                          {data.additionalImages ? (
                            <>
                              {data.additionalImages.map((value, index) => {
                                return (
                                  <Grid
                                    item
                                    xs={2}
                                    sm={2}
                                    md={2}
                                    lg={2}
                                    className="dianaCards"
                                  >
                                    <img
                                      src={value}
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
                      <th>Artist Name</th>
                      <td>{data.artist_name}</td>
                    </tr>
                    <tr>
                      <th>Artist Info</th>
                      <td>{data.artist_info}</td>
                    </tr>
                  </tbody>
                </Table>
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
                        Designer
                      </th>
                    </tr>
                    <tr>
                      <td
                        colSpan="2"
                        style={{
                          fontFamily: "Montserrat,serif",
                          fontSize: "22px",
                        }}
                      >
                        {data.designer}
                      </td>
                    </tr>
                    <tr>
                      <th>Wallet</th>
                      <td>{data.wallet}</td>
                    </tr>
                    <tr>
                      <th>NFTID</th>
                      <td>{data.nftid}</td>
                    </tr>
                    <tr>
                      <th>Collection</th>
                      <td>{data.collectionAddress}</td>
                    </tr>
                    <tr>
                      <th>Category</th>
                      <td style={{ textTransform: "uppercase" }}>
                        {data.category}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        {data.edition101 === "1" ? (
                          <button
                            className="bg-black text-white font-bold py-3 px-6 text-sm"
                            style={{
                              fontSize: "18px",
                              fontFamily: "Montserrat",
                            }}
                          >
                            Edition 1 of 1
                          </button>
                        ) : (
                          <></>
                        )}
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
                        {data.description}
                      </td>
                    </tr>
                    <tr>
                      <th>Producer</th>
                      <td>{data.producer}</td>
                    </tr>
                    <tr>
                      <th>Material</th>
                      <td>{data.material}</td>
                    </tr>
                    <tr>
                      <th>Measures</th>
                      <td>{data.measures}</td>
                    </tr>
                    <tr>
                      <th>Video Link</th>
                      <td>{data.videolink}</td>
                    </tr>
                    <tr>
                      <th colSpan="2">Additional Images</th>
                    </tr>
                    <tr>
                      <td colSpan="2" style={{ backgroundColor: "red" }}>
                        <Grid container spacing={2}>
                          {data.additionalImages ? (
                            <>
                              {data.additionalImages.map((value, index) => {
                                return (
                                  <Grid
                                    item
                                    xs={2}
                                    sm={2}
                                    md={2}
                                    lg={2}
                                    className="dianaCards"
                                  >
                                    <img
                                      src={value}
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
                      <th>Artist Name</th>
                      <td>{data.artist_name}</td>
                    </tr>
                    <tr>
                      <th>Artist Info</th>
                      <td>{data.artist_info}</td>
                    </tr>
                  </tbody>
                </Table>
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
                
                <iframe
                  width="400"
                  height="500"
                  src={"https://www.youtube.com/embed/EOa8UmVhw0c"}
                  title="Youtube Player"
                  frameBorder="0"
                  allowFullScreen
                  style={{ margin: "5px", marginLeft: "auto" }}
                />
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
                        }}
                      >
                        {data.designer}
                      </td>
                    </tr>
                    <tr>
                      <th>Wallet</th>
                      <td>{data.wallet}</td>
                    </tr>
                    <tr>
                      <th>NFTID</th>
                      <td>{data.nftid}</td>
                    </tr>
                    <tr>
                      <th>Collection</th>
                      <td>{data.collectionAddress}</td>
                    </tr>
                    <tr>
                      <th>Category</th>
                      <td style={{ textTransform: "uppercase" }}>
                        {data.category}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        {data.edition101 === "1" ? (
                          <button
                            className="bg-black text-white font-bold py-3 px-6 text-sm"
                            style={{
                              fontSize: "18px",
                              fontFamily: "Montserrat",
                            }}
                          >
                            Edition 1 of 1
                          </button>
                        ) : (
                          <></>
                        )}
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
                        {data.description}
                      </td>
                    </tr>
                    <tr>
                      <th>Producer</th>
                      <td>{data.producer}</td>
                    </tr>
                    <tr>
                      <th>Details on Material</th>
                      <td>{data.material}</td>
                    </tr>
                    <tr>
                      <th>Design Masterpieces Inserted</th>
                      <td>{data.measures}</td>
                    </tr>
                    <tr>
                      <th>Video Link</th>
                      <td>{data.videolink}</td>
                    </tr>
                    <tr>
                      <th colSpan="2">Additional Plan</th>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <Grid container spacing={2}>
                          {data.additionalImages ? (
                            <>
                              {data.additionalImages.map((value, index) => {
                                return (
                                  <Grid
                                    item
                                    xs={2}
                                    sm={2}
                                    md={2}
                                    lg={2}
                                    className="dianaCards"
                                  >
                                    <img
                                      src={value}
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
                      <th colSpan="2">Renders</th>
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
                                  >
                                    <img
                                      src={value}
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
                                  >
                                    <img
                                      src={value}
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
                      <th colSpan="2">Virtullay Reality Tour</th>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <Grid container spacing={2}>
                          {data.virtullayTour ? (
                            <>
                              {data.virtullayTour.map((value, index) => {
                                return (
                                  <Grid
                                    item
                                    xs={2}
                                    sm={2}
                                    md={2}
                                    lg={2}
                                    className="dianaCards"
                                  >
                                    <img
                                      src={value}
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
                      <th>Artist Name</th>
                      <td>{data.artist_name}</td>
                    </tr>
                    <tr>
                      <th>Artist Info</th>
                      <td>{data.artist_info}</td>
                    </tr>
                  </tbody>
                </Table>
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
                <iframe
                  width="400"
                  height="500"
                  src={"https://www.youtube.com/embed/EOa8UmVhw0c"}
                  title="Youtube Player"
                  frameBorder="0"
                  allowFullScreen
                  style={{ margin: "5px", marginLeft: "auto" }}
                />
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
