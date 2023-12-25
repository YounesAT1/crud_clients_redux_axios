import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteClient, fetchClients } from "../redux/actions";
import Loading from "./Loading";
import Error from "./Error";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ClientsList = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clientReducer.clients);
  const isLoading = useSelector((state) => state.clientReducer.isLoading);
  const errMessage = useSelector((state) => state.clientReducer.errMessage);

  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (errMessage) {
    return (
      <>
        <Error error={errMessage} />
      </>
    );
  }

  const handleDeleteClient = (clientIdToDelete) => {
    try {
      dispatch(deleteClient(clientIdToDelete));
      dispatch(fetchClients());
      setShowDeleteModal(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const filteredClients = clients.filter((client) =>
    client.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const openDeleteModal = (clientId) => {
    setClientToDelete(clientId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setClientToDelete(null);
  };

  return (
    <main className="p-6 container mx-auto">
      <div className="flex justify-between mb-3">
        <input
          type="text"
          placeholder="Search by Full Name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={`border border-gray-300 rounded-md py-2 px-4 w-1/4 h-[50px] ${
            clients.length === 0 ? "bg-gray-100 pointer-events-none" : ""
          }`}
          disabled={clients.length === 0}
        />
        <h1 className="w-[180px] text-2xl mb-4 p-2 rounded-md text-slate-700 bg-slate-200 font-semibold text-center">
          {clients.length === 1 ? "Client" : "Clients"} : (
          {filteredClients.length})
        </h1>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Full Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Presence Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 font-semibold text-slate-800">
          {filteredClients.length > 0 ? (
            filteredClients.map((client) => (
              <tr key={client.id} className="text-left">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-slate-700 bg-slate-200 p-2 rounded-md font-semibold">
                    {client.id}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {client.fullName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{client.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {client.phoneNumber}
                </td>
                <td
                  className={
                    "px-6 py-4 whitespace-nowrap text-white font-semibold"
                  }
                >
                  <span
                    className={`rounded-lg px-2 py-2 ${
                      client.presenceStatus === "Available"
                        ? "bg-green-500"
                        : "bg-orange-500"
                    }`}
                  >
                    {client.presenceStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/clients/update/${client.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => openDeleteModal(client.id)}
                    className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="px-6 py-4 whitespace-nowrap bg-slate-600 text-white text-center text-xl font-semibold"
              >
                No clients
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showDeleteModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            {/* MODAL OVERLAY */}

            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={closeDeleteModal}
            ></div>

            {/* MODAL BODY */}

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    {/* CONFIRMATION ICON */}

                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Confirm Deletion
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this client?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => handleDeleteClient(clientToDelete)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={closeDeleteModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ClientsList;
