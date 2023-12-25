import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { failRequest, getSingleClient, updateClient } from "../redux/actions";
import toast from "react-hot-toast";

const UpdateClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentClient = useSelector((state) => state.clientReducer.client);
  const { clientId } = useParams();

  const initialClientData = {
    id: clientId,
    fullName: "",
    email: "",
    presenceStatus: "",
    phoneNumber: "",
  };
  const [clientData, setClientData] = useState(initialClientData);

  const handleSubmite = (e) => {
    e.preventDefault();
    const client = { ...clientData };
    const { fullName, email, phoneNumber, presenceStatus } = clientData;

    if (!fullName || !email || !phoneNumber || !presenceStatus) {
      toast.error("All fields are required!!");
      navigate(`/clients/update/${clientId}`);
    } else {
      try {
        dispatch(updateClient(client, clientId));
        navigate("/");
      } catch (error) {
        dispatch(failRequest(error.message));
      }
    }
  };

  useEffect(() => {
    dispatch(getSingleClient(clientId));
  }, [clientId, dispatch]);

  useEffect(() => {
    if (currentClient) {
      setClientData({
        id: clientId,
        fullName: currentClient.fullName,
        email: currentClient.email,
        phoneNumber: currentClient.phoneNumber,
        presenceStatus: currentClient.presenceStatus,
      });
    }
  }, [clientId, currentClient]);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md mb-10">
      <h1 className="text-xl mb-6">
        Update Client with ID: <span className="underline">{clientId}</span>
      </h1>
      <form onSubmit={handleSubmite} autoComplete="off">
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-700 font-semibold mb-2"
          >
            Full Name:
          </label>
          <input
            type="text"
            id="fullName"
            placeholder="Jhon Doe..."
            value={clientData.fullName}
            onChange={(e) =>
              setClientData({ ...clientData, fullName: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            placeholder="Jhon@gmail.com"
            value={clientData.email}
            onChange={(e) =>
              setClientData({ ...clientData, email: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-gray-700 font-semibold mb-2"
          >
            Phone Number:
          </label>
          <input
            type="tel"
            id="phoneNumber"
            placeholder="123-4567-890"
            value={clientData.phoneNumber}
            onChange={(e) =>
              setClientData({ ...clientData, phoneNumber: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="presenceStatus"
            className="block text-gray-700 font-semibold mb-2"
          >
            Presence Status:
          </label>
          <select
            name="presenceStatus"
            id="presenceStatus"
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
          className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateClient;
