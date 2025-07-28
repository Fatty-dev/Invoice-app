import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
import InvoicePage from "./invoice";
import Payment from "./payment";
const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/payment" element={<Payment />} />
        <Route path="/" element={<InvoicePage />} />
      </Routes>
    </Router>
  );
};

export default App;
