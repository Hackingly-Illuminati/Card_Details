import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const url = "http://localhost:4000";

  // const getPartner = async () => {
  //   // const response = await axios.post(url + "/api/partner/add", {
  //   //   partnerName: "Ashish Srivastav madam",
  //   //   partnerType: "Distributor",
  //   //   contactDetails: {
  //   //     email: "avni@hackijnjnngly.com",
  //   //     phone: "7777778989",
  //   //   },
  //   //   address: {},
  //   // });

  //   // const response = await axios.put(url + "/api/partner/updatePartner", {
  //   //   id: "673b2dc9222d95ed234d3993",
  //   //   updateData: {
  //   //     partnerName: "Ashish Srivastav madam",
  //   //     partnerType: "Operations",
  //   //     contactDetails: {
  //   //       email: "avni@hackijnjnngly.com",
  //   //       phone: "11111111111",
  //   //     },
  //   //     address: {},
  //   //   },
  //   // });

  //   const response = await axios.get(url + "/api/partner/list", {});

  //   console.log(response.data);
  //   console.log("vkhbdvbjkbvfbvdjkb");
  // };

  const [partnerData, setPartnerData] = useState({});
  const [photo, setPhoto] = useState(null);

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append each key-value pair from partnerData to FormData
    Object.keys(partnerData).forEach((key) => {
      if (key === "contactDetails" || key === "address") {
        formData.append(key, JSON.stringify(partnerData[key])); // Serialize contactDetails
      } else {
        formData.append(key, partnerData[key]);
      }
    });

    // Append the file (photo) to FormData
    if (photo) {
      formData.append("photoUrl", photo); // "photoUrl" must match the key expected by multer
    }

    try {
      const response = await axios.post(`${url}/api/partner/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data); // Log server response
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {/* <button
        onClick={() => {
          getPartner();
        }}
      >
        Click
      </button> */}
      {/* <form onSubmit={handleSubmit}>
        <div>
          <label>Partner Name:</label>
          <input
            type="text"
            name="partnerName"
            onChange={(e) =>
              setPartnerData({ ...partnerData, partnerName: e.target.value })
            }
          />
        </div>
        <div>
          <label>Partner Type:</label>
          <input
            type="text"
            name="partnerType"
            onChange={(e) =>
              setPartnerData({ ...partnerData, partnerType: e.target.value })
            }
          />
        </div>
        <div>
          <label>Contact Email:</label>
          <input
            type="email"
            name="email"
            onChange={(e) =>
              setPartnerData({
                ...partnerData,
                contactDetails: {
                  ...partnerData.contactDetails,
                  email: e.target.value,
                },
              })
            }
          />
        </div>
        <div>
          <label>Contact Phone:</label>
          <input
            type="text"
            name="phone"
            onChange={(e) =>
              setPartnerData({
                ...partnerData,
                contactDetails: {
                  ...partnerData.contactDetails,
                  phone: e.target.value,
                },
              })
            }
          />
        </div>
        <div>
          <label>Photo:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <button type="submit">Add Partner</button>
      </form> */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Partner Name:</label>
          <input
            type="text"
            name="partnerName"
            onChange={(e) =>
              setPartnerData({ ...partnerData, partnerName: e.target.value })
            }
          />
        </div>
        <div>
          <label>Partner Type:</label>
          <input
            type="text"
            name="partnerType"
            onChange={(e) =>
              setPartnerData({ ...partnerData, partnerType: e.target.value })
            }
          />
        </div>
        <div>
          <label>Contact Email:</label>
          <input
            type="email"
            name="email"
            onChange={(e) =>
              setPartnerData({
                ...partnerData,
                contactDetails: {
                  ...partnerData.contactDetails,
                  email: e.target.value,
                },
              })
            }
          />
        </div>
        <div>
          <label>Contact Phone:</label>
          <input
            type="text"
            name="phone"
            onChange={(e) =>
              setPartnerData({
                ...partnerData,
                contactDetails: {
                  ...partnerData.contactDetails,
                  phone: e.target.value,
                },
              })
            }
          />
        </div>
        <div>
          <label>Street:</label>
          <input
            type="text"
            name="street"
            onChange={(e) =>
              setPartnerData({
                ...partnerData,
                address: {
                  ...partnerData.address,
                  street: e.target.value,
                },
              })
            }
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            onChange={(e) =>
              setPartnerData({
                ...partnerData,
                address: {
                  ...partnerData.address,
                  city: e.target.value,
                },
              })
            }
          />
        </div>
        <div>
          <label>State:</label>
          <input
            type="text"
            name="state"
            onChange={(e) =>
              setPartnerData({
                ...partnerData,
                address: {
                  ...partnerData.address,
                  state: e.target.value,
                },
              })
            }
          />
        </div>
        <div>
          <label>Postal Code:</label>
          <input
            type="text"
            name="postalCode"
            onChange={(e) =>
              setPartnerData({
                ...partnerData,
                address: {
                  ...partnerData.address,
                  postalCode: e.target.value,
                },
              })
            }
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            onChange={(e) =>
              setPartnerData({
                ...partnerData,
                address: {
                  ...partnerData.address,
                  country: e.target.value,
                },
              })
            }
          />
        </div>
        <div>
          <label>Photo:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <button type="submit">Add Partner</button>
      </form>
    </>
  );
}

export default App;
