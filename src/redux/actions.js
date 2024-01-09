import axios from "axios";
import {
  ADD_CLIENT_ACTION,
  DELETE_CLIENT_ACTION,
  FAIL_REQUEST_ACTION,
  FETCH_CLIENTS_ACTION,
  GET_SINGLE_CLIENT_ACTION,
  MAKE_REQUEST_ACTION,
  UPDATE_CLIENT_ACTION,
} from "./actionTypes";
import toast from "react-hot-toast";

//? GLOBAL REQUESTS
export const makeRequest = () => {
  return {
    type: MAKE_REQUEST_ACTION,
  };
};

export const failRequest = (err) => {
  return {
    type: FAIL_REQUEST_ACTION,
    payload: err,
  };
};

//? FETCH CLIENTS FROM DB.JSON
export const fetchClientsAction = (clients) => {
  return {
    type: FETCH_CLIENTS_ACTION,
    payload: clients,
  };
};

export const fetchClients = () => (dispatch) => {
  try {
    dispatch(makeRequest());
    axios.get(process.env.REACT_APP_API_URL).then((res) => {
      dispatch(fetchClientsAction(res.data));
      // console.log(res.data);
    });
  } catch (error) {
    dispatch(failRequest(error.message));
  }
};

//? ADD A CLIENT TO THE DB.JSON
export const addClientAction = () => {
  return {
    type: ADD_CLIENT_ACTION,
  };
};

export const addClient = (client) => (dispatch) => {
  try {
    dispatch(makeRequest());
    axios
      .post(process.env.REACT_APP_API_URL, client)
      .then(dispatch(addClientAction()));
    toast.success("Client added successfully");
  } catch (error) {
    dispatch(error.message);
    toast.error("something went wrong !!");
  }
};

//? DELETE CLIENT FROM DB.JSON
export const deleteClientAction = () => {
  return {
    type: DELETE_CLIENT_ACTION,
  };
};

export const deleteClient = (clientIdToDelete) => (dispatch) => {
  try {
    dispatch(makeRequest());
    axios.delete(`${process.env.REACT_APP_API_URL}/${clientIdToDelete}`);
    dispatch(deleteClientAction());
    toast.success("Client deleted successfully");
  } catch (error) {
    dispatch(failRequest(error.message));
    toast.error("Something went wrong!!");
  }
};

//? GET SINGLE CLIENT FROM DB.JSON
export const getSingleClientAction = (client) => {
  return {
    type: GET_SINGLE_CLIENT_ACTION,
    payload: client,
  };
};

export const getSingleClient = (clientIdToGet) => (dispatch) => {
  try {
    dispatch(makeRequest());
    axios
      .get(`${process.env.REACT_APP_API_URL}/${clientIdToGet}`)
      .then((res) => {
        dispatch(getSingleClientAction(res.data));
      });
  } catch (error) {
    dispatch(failRequest(error.message));
  }
};

//? UPDATE CLIENT IN THE DB.SJON
export const updateClientAction = () => {
  return {
    type: UPDATE_CLIENT_ACTION,
  };
};

export const updateClient = (client, clientIdToUpdate) => (dispatch) => {
  try {
    dispatch(makeRequest());
    axios
      .put(`${process.env.REACT_APP_API_URL}/${clientIdToUpdate}`, client)
      .then(dispatch(updateClientAction()));
    toast.success("client updated successfully");
  } catch (error) {
    dispatch(failRequest(error.message));
    toast.error("error updating client!!");
  }
};
