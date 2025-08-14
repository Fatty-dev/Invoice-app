import React, { useState } from 'react';
import logo from "../assets/logo.svg"
import { CreditCard, ArrowLeft, Lock, Calendar, User, Package, Truck, Weight, MapPin, Clock, Shield, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Invoice = () => {
    const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('invoice');

  const hyperLink = () => {
    window.open('https://envia.com/en-US', '_blank');
  };

  const pay = () => {
    navigate('/payment')
  }

 return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="">
        <div className="bg-white shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-4 sm:px-6 lg:px-10 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex items-center space-x-4">
                <div className="cursor-pointer transform hover:scale-105 transition-transform" onClick={hyperLink}>
                  <div className="w-full">
                    <img src={logo} alt="Envio Logo" className="w-[70%]" />
                  </div>
                </div>
        
              </div>
              <div className="text-left lg:text-right text-white">
                <h2 className="text-4xl lg:text-5xl font-bold mb-4">INVOICE</h2>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 space-y-2 text-sm">
                  <p className="flex justify-between"><span>Invoice no:</span> <span className="font-semibold">ENV-2025-0016
                  </span></p>
                  <p className="flex justify-between"><span>Invoice date:</span> <span className="font-semibold">Jul 29th, 2025</span></p>
                  <p className="flex justify-between"><span>Due date:</span> <span className="font-semibold">Aug 13th, 2025</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Shipment Overview Card */}
          <div className="px-4 sm:px-6 lg:px-10 py-6 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-md border border-blue-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Package Type</p>
                    <p className="font-semibold text-gray-800">Consignment Box</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border border-green-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Weight className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Weight</p>
                    <p className="font-semibold text-gray-800">4.3kg</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border border-purple-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Truck className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Service Type</p>
                    <p className="font-semibold text-gray-800">Armored Express</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border border-orange-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Delivery Time</p>
                    <p className="font-semibold text-gray-800">5-10 Business Days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Route Information */}
          <div className="px-4 sm:px-6 lg:px-10 py-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <MapPin className="w-6 h-6 text-blue-600 mr-2" />
              Shipping Route
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  Origin
                </h4>
                <div className="space-y-2 text-gray-700">
                  <p className="font-medium">Envia Logistics Warehouse</p>
                  <p>2151 NW 79th Ave, Doral, FL</p>
                  <p>33122, United States</p>
                  <p className="text-sm text-green-600 font-medium">Ready for Pickup</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  Destination
                </h4>
                <div className="space-y-2 text-gray-700">
                  <p className="font-medium">Emil Kuster</p>
                  <p>Hauptstrasse 11</p>
                  <p>9565 Bussnang, Switzerland</p>
                  <p className="text-sm text-blue-600 font-medium">Awaiting Delivery</p>
                </div>
              </div>
            </div>
          </div>

          {/* Company Details */}
          <div className="px-4 sm:px-6 lg:px-10 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FileText className="w-5 h-5 text-gray-600 mr-2" />
                From
              </h3>
              <div className="text-gray-600 space-y-2">
                <p className="font-semibold text-gray-800 text-lg">Envia Logistics</p>
                {/* <p className="flex items-center"><User className="w-4 h-4 mr-2" />Sarah Johnson</p> */}
                {/* <p>admin@envia.com</p> */}
                {/* <p>+1-555-0123</p> */}
                <p className="text-blue-600 font-medium cursor-pointer hover:underline" onClick={hyperLink}>envia.com</p>
                <p className="pt-2 border-t border-gray-200">2151 NW 79th Ave, Doral, FL</p>
                <p>33122, United States</p>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <User className="w-5 h-5 text-blue-600 mr-2" />
                Bill to
              </h3>
              <div className="text-gray-600 space-y-2">
                <p className="font-semibold text-gray-800 text-lg">Emil Kuster</p>
                <p>emil.kuster@bluewin.ch</p>
                <p>+410799108181</p>
                <p className="pt-2 border-t border-gray-200">Hauptstrasse 11</p>
                <p>9565 Bussnang, Switzerland</p>
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="px-4 sm:px-6 lg:px-10">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Shield className="w-6 h-6 text-blue-600 mr-2" />
              Service Breakdown
            </h3>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full bg-white">
  <thead>
    <tr className="bg-gradient-to-r from-gray-100 to-gray-200">
      <th className="text-left py-4 px-4 font-bold text-gray-700 text-sm uppercase tracking-wide">Description</th>
      <th className="text-right py-4 px-4 font-bold text-gray-700 text-sm uppercase tracking-wide">Amount</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-100">
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="py-6 px-4">
        <div>
          <p className="font-semibold text-gray-800 mb-1">Armored International Shipping Fee</p>
          <p className="text-sm text-gray-600 leading-relaxed">Covers secure transportation from the origin to the destination airport (High-security handling).</p>
        </div>
      </td>
      <td className="text-right py-6 px-4 font-bold text-gray-800 text-lg">$1,275.00</td>
    </tr>
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="py-6 px-4">
        <div>
          <p className="font-semibold text-gray-800 mb-1">Insurance (Full Value Coverage)</p>
          <p className="text-sm text-gray-600 leading-relaxed">Required to cover risk of theft, loss or damage during transit.</p>
        </div>
      </td>
      <td className="text-right py-6 px-4 font-bold text-gray-800 text-lg">$1200.00</td>
    </tr>
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="py-6 px-4">
        <div>
          <p className="font-semibold text-gray-800 mb-1">Customs Export Documentation</p>
          <p className="text-sm text-gray-600 leading-relaxed">Includes EEI filing, export permits, and compliance documentation for U.S. Customs</p>
        </div>
      </td>
      <td className="text-right py-6 px-4 font-bold text-gray-800 text-lg">$800.00</td>
    </tr>
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="py-6 px-4">
        <div>
          <p className="font-semibold text-gray-800 mb-1">Security Surcharge</p>
          <p className="text-sm text-gray-600 leading-relaxed">Applied for high-value consignments, additional security escort, and handling protocols.</p>
        </div>
      </td>
      <td className="text-right py-6 px-4 font-bold text-gray-800 text-lg">$750.00</td>
    </tr>
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="py-6 px-4">
        <div>
          <p className="font-semibold text-gray-800 mb-1">Packaging and Tamper-Proof Seals</p>
          <p className="text-sm text-gray-600 leading-relaxed">For specialized protective cases, tamper-proof seals, and labeling for high-value cargo.</p>
        </div>
      </td>
      <td className="text-right py-6 px-4 font-bold text-gray-800 text-lg">$500.00</td>
    </tr>
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="py-6 px-4">
        <div>
          <p className="font-semibold text-gray-800 mb-1">Fuel & Airline Surcharge</p>
          <p className="text-sm text-gray-600 leading-relaxed">Standard for all international freight, varies by route and carrier.</p>
        </div>
      </td>
      <td className="text-right py-6 px-4 font-bold text-gray-800 text-lg">$150.00</td>
    </tr>
  </tbody>
</table>

            </div>
          </div>

          {/* Payment Summary */}
          <div className="px-4 sm:px-6 lg:px-10 py-8 ">
            {/* <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FileText className="w-5 h-5 text-blue-600 mr-2" />
                Payment Instructions
              </h3>
              <div className="text-gray-600 space-y-3">
                <div className="bg-white rounded-lg p-4">
                  <p className="font-semibold text-gray-800 mb-2">Bank Transfer:</p>
                  <div className="text-sm space-y-1">
                    <p>Account: Envio Logistics LLC</p>
                    <p>Routing (ABA): 021000021</p>
                    <p>Account: 1234567890</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-semibold text-gray-800 mb-2">Online Payment:</p>
                  <p className="text-sm">Use the secure payment button below for instant processing</p>
                </div>
              </div>
            </div> */}
            
            <div className="bg-gradient-to-br from-gray-50 to-slate-100 rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold text-gray-800">$4,675.00</span>
                </div>
                {/* <div className="flex justify-between py-2">
                  <span className="text-gray-600">Tax (8.5%):</span>
                  <span className="font-semibold text-gray-800">$325.13</span>
                </div> */}
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-semibold text-gray-800">$0.00</span>
                </div>
                <div className="border-t border-gray-300 pt-4 flex justify-between text-xl">
                  <span className="font-bold text-gray-800">Total:</span>
                  <span className="font-bold text-blue-600">$4,675.00</span>
                </div>
                <div className="flex justify-between py-2 text-sm">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="text-gray-600">$0.00</span>
                </div>
                <div className="border-t border-red-200 pt-4 flex justify-between text-2xl">
                  <span className="font-bold text-red-600">Balance Due:</span>
                  <span className="font-bold text-red-600">$4,675.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Button */}
          <div className="px-4 sm:px-6 lg:px-10 pb-8">
            <div className="text-center">
              <button
                onClick={pay}
                className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white font-bold py-6 px-12 rounded-2xl shadow-2xl transform transition-all duration-200 hover:scale-105 hover:shadow-3xl flex items-center space-x-3 mx-auto text-lg"
              >
                <CreditCard className="w-6 h-6" />
                <span>Pay Securely - $4,675.00</span>
              </button>
              <p className="text-sm text-gray-500 mt-4">Secure payment processing with 256-bit SSL encryption</p>
            </div>
          </div>

          {/* Notes */}
          <div className="px-4 sm:px-6 lg:px-10 pb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Important Notes</h3>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <p className="text-gray-700 leading-relaxed">
                Thank you for choosing Envia Logistics for your high-value shipping needs. This shipment includes specialized armored transport and comprehensive insurance coverage. Payment is due within 14 days of invoice date. For any questions regarding this invoice or your shipment, please contact our dedicated support team at support@envia.delivery.
              </p>
              <div className="mt-4 p-4 bg-white rounded-lg border-l-4 border-yellow-400">
                <p className="text-sm text-gray-600">
                  <strong>Security Notice:</strong> This is a high-value shipment requiring special handling protocols. Please ensure recipient availability during delivery window.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;