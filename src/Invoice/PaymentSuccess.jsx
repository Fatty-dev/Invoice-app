import React from "react";
import {
  CheckCircle,
  Package,
  Truck,
  MapPin,
  Clock,
  ArrowRight,
  Download,
  Eye,
} from "lucide-react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const hyperLink = () => {
    window.open("https://envia.com/en-US", "_blank");
  };

  const trackOrder = () => {
    navigate("/track");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header with Logo */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-4 sm:px-6 lg:px-10 py-6">
        <div className="flex justify-between items-center">
          <div
            className="cursor-pointer transform hover:scale-105 transition-transform"
            onClick={hyperLink}
          >
            <div className="text-white text-2xl font-bold">
              <img src={logo} alt="Envio Logo" className="w-[70%]" />
            </div>
          </div>
          <div className="text-white text-right">
            <h1 className="text-2xl lg:text-3xl font-bold">PAYMENT SUCCESS</h1>
            <p className="text-blue-100 text-sm">Transaction Confirmed</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-6 animate-pulse">
            <CheckCircle className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Payment Successful!
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your invoice has been paid successfully. Your high-value shipment is
            now being processed for secure delivery.
          </p>
        </div>

        {/* Payment Details Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-2">Payment Confirmed</h3>
                <p className="text-blue-100">
                  Transaction completed on August 12, 2025
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
                <p className="text-sm opacity-90">Amount Paid</p>
                <p className="text-3xl font-bold">$4,675.00</p>
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-800 mb-4">
                  Transaction Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Invoice Number:</span>
                    <span className="font-semibold text-gray-800">
                      ENV-2025-0016
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction ID:</span>
                    <span className="font-semibold text-gray-800">
                      TXN-2025-
                      {Math.random().toString(36).substr(2, 9).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-semibold text-gray-800">Bitcoin</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-semibold text-blue-600">
                      Completed
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-800 mb-4">
                  Shipment Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-semibold text-gray-800">
                      Armored Express
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weight:</span>
                    <span className="font-semibold text-gray-800">4.3kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Time:</span>
                    <span className="font-semibold text-gray-800">
                      5-10 Business Days
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Destination:</span>
                    <span className="font-semibold text-gray-800">
                      Bussnang, Switzerland
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Clock className="w-5 h-5 text-blue-600 mr-2" />
                What Happens Next?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-md border border-blue-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Package className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Processing</p>
                      <p className="text-sm text-gray-600">
                        Package being prepared
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md border border-purple-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Truck className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">In Transit</p>
                      <p className="text-sm text-gray-600">Armored transport</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md border border-green-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <MapPin className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Delivered</p>
                      <p className="text-sm text-gray-600">Secure delivery</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="">
              <button
                onClick={trackOrder}
                className="bg-gradient-to-r w-full from-blue-600 via-blue-700 to-blue-800 
             hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 
             text-white font-bold py-6 px-12 rounded-2xl shadow-2xl 
             transform transition-all duration-200 hover:scale-105 hover:shadow-3xl 
             flex items-center justify-center space-x-3 sm:mx-0"
              >
                <Truck className="w-6 h-6" />
                <span>Track Your Shipment</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Important Information
          </h3>
          <div className="space-y-3 text-gray-700">
            <p className="flex items-start space-x-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              <span>
                You will receive email notifications at key milestones of your
                shipment journey.
              </span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              <span>
                Your package is fully insured and will be handled
                with maximum security protocols.
              </span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              <span>
                For any questions or concerns, contact our support team at{" "}
                <span
                  className="text-blue-600 font-medium cursor-pointer hover:underline"
                  onClick={hyperLink}
                >
                  support@envia.delivery
                </span>
              </span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              <span>
                Please save your Invoice Number for future reference and
                tracking purposes.
              </span>
            </p>
          </div>
          <div className="mt-4 p-4 bg-white rounded-lg border-l-4 border-blue-400">
            <p className="text-sm text-gray-600">
              <strong>Security Notice:</strong> This is a high-value shipment
              requiring special handling protocols. Please ensure recipient
              availability during delivery window.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500">
            Thank you for choosing Envia Logistics for your high-value shipping
            needs.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Secure • Reliable • Professional
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
