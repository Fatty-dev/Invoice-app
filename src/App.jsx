import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
import InvoicePage from "./Invoice/invoice";
import Payment from "./Invoice/payment";
import TrackingPage from "./Tracking/Tracking";
import PaymentSuccess from "./Invoice/PaymentSuccess";
const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/payment" element={<Payment />} />
        <Route path="/" element={<PaymentSuccess />} />
        <Route path="/track" element={<TrackingPage />} />

      </Routes>
    </Router>
  );
};

export default App;
