import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addClient, failRequest } from "../redux/actions";

const AddClient = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialClientData = {
    fullName: "",
    email: "",
    presenceStatus: "",
    phoneNumber: "",
  };

  const [clientData, setClientData] = useState(initialClientData);

  const handleFormSubmt = (e) => {
    e.preventDefault();

    const client = { ...clientData, id: Date.now() };
    const { fullName, email, phoneNumber, presenceStatus } = clientData;

    if (!fullName || !email || !phoneNumber || !presenceStatus) {
      toast.error("all fields are required");
      navigate("/clients/add");
    } else {
      try {
        dispatch(addClient(client));
        navigate("/");
      } catch (error) {
        dispatch(failRequest(error.message));
        toast.error("something went wrong !!");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md mb-10">
      <h2 className="text-2xl font-semibold mb-6">Add Client</h2>

      <form autoComplete="off" onSubmit={handleFormSubmt}>
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-700 font-semibold mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={clientData.fullName}
            onChange={(e) =>
              setClientData({ ...clientData, fullName: e.target.value })
            }
            placeholder="Enter Full Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={clientData.email}
            onChange={(e) =>
              setClientData({ ...clientData, email: e.target.value })
            }
            placeholder="Enter Email Address"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-gray-700 font-semibold mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phoneNumber"
            value={clientData.phoneNumber}
            onChange={(e) =>
              setClientData({ ...clientData, phoneNumber: e.target.value })
            }
            placeholder="Enter Phone Number"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="prsenceStatus"
            className="block text-gray-700 font-semibold mb-2"
          >
            Presence Status
          </label>
          <select
            id="presenceStatus"
            name="presenceStatus"
            value={clientData.presenceStatus}
            onChange={(e) =>
              setClientData({ ...clientData, presenceStatus: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>
              Status
            </option>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddClient;
