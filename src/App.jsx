import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AddClient, ClientsList, Header, UpdateClient } from "./components";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ClientsList />} />
          <Route path="/clients/add" element={<AddClient />} />
          <Route path="/clients/update/:clientId" element={<UpdateClient />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
