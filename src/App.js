import { Route, Routes } from "react-router-dom";
import AddBook from "./Component/pages/AddBook";
import EditBook from "./Component/pages/EditBook";
import Home from "./Component/pages/Home";
import Navbar from "./Component/Share/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addBook" element={<AddBook />} />
        <Route path="/editBook/:bookId" element={<EditBook />} />
      </Routes>
    </div>
  );
}

export default App;
