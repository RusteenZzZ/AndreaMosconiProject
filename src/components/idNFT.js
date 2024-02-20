import { Link } from "react-router-dom";

function IDNFTTile(data) {
  const newTo = {
    pathname: "/nftPage/" + data.data.contract_address + "/"+ data.data.tokenId,
  };
  return (
    <>
      {data.data.category.value === "Interior Designs" ||
      data.data.category === "Interior Designs" ? (
        <Link state={{ address: data.data.contract_address }} to={newTo}>
          <div
            style={{
              display: "inline-flex",
              marginLeft: "10px",
              verticalAlign: "top",
            }}
            className="grid grid-cols-3 mt-8"
          >
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <div>
              {data.data.image &&
                <img
                className="w-full"
                src={data.data.image.split("/")[0]==="ipfs:" ? 'https://salmon-thirsty-sheep-857.mypinata.cloud/ipfs/' + data.data.image.split("/")[2]: data.data.image}
                alt="Sunset in the mountains"
                style={{
                  maxWidth: "300px",
                  maxHeight: "300px",
                  width: "280px",
                  height: "250px",
                  marginRight: "auto",
                  marginLeft: "auto",
                }}
              />}
              </div>
              <div className="px-6 py-4">
                <div className="font-face-mk text-xl mb-2">{data.data.name}</div>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <></>
      )}
    </>
  );
}

export default IDNFTTile;
