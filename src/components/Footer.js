import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function Footer() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_iurqdei', 'template_2hrhu3o', form.current, 'JpJJ-AArfuPh5g1x1')
      .then((result) => {
          window.location.reload();
      }, (error) => {
          // console.log(error.text);
      });
  };

  return (
    <div>
      <div
        style={{
          padding: 100,
          backgroundColor: "#18191b",
          display: "block",
          textAlign: "center",
        }}
      >
        <div>
          <h1 className="text-5xl mt-6 ml-6 text-white font-face-mk">Create</h1>

          <p style={{ color: "white" }} className="font-face-mt">
            In order to create your NFTs on our platform, you must be verified
            by
            <br /> our experts.
          </p>
          <br />
          <p style={{ color: "white" }} className="font-face-mt">
            Contact us and start the on boarding.
          </p>
          <p style={{ color: "white" }} className="font-face-mt">
            info@nftmarket.io
          </p>
        </div>
        <form className="" style={{ width: "80%", marginTop: "30px" }} ref={form} onSubmit={sendEmail} >
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <input
                className="bg-transparent appearance-none border-gray-200 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500 focus:text-white"
                id="inline-full-name"
                type="text"
                placeholder="Jane Doe"
                style={{ borderBottom: "2px solid gray" }}
                name="from_name"
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <input
                className="bg-transparent appearance-none border-gray-200 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500 focus:text-white"
                id="inline-full-name"
                type="text"
                placeholder="Janedoe@gmail.com"
                style={{ borderBottom: "2px solid gray" }}
                name="from_email"
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                style={{
                  background: "white",
                  color: "black",
                  width: "100%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  fontSize: "22px",
                }}
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded font-face-mk"
                type="submit"
              >
                Send Email{" "}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div>
        <h1
          style={{
            height: 70,
            textAlign: "center",
            paddingTop: 25,
            fontSize: "x-large",
            fontFamily: "Montserrat,serif",
          }}
        >
          2022
        </h1>
      </div>
    </div>
  );
}
