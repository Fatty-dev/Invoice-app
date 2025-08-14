import React, { useState } from 'react';
import logo from "../assets/logo.svg"
import { Search, Package, Truck, MapPin, Clock, CheckCircle, AlertCircle, Plane, Shield, FileText } from 'lucide-react';

const TrackingPage = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [trackingData, setTrackingData] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);


  const sampleTrackingData = {
    trackingNumber: 'ENV-2025-0016',
    status: 'In Transit',
    estimatedDelivery: 'Aug 14-28, 2025',
    service: 'Armored Express',
    weight: '4.3kg',
    from: {
      name: 'Envia Logistics Warehouse',
      address: '2151 NW 79th Ave, Doral, FL 33122, United States'
    },
    to: {
      name: 'Emil Kuster',
      address: 'Hauptstrasse 11, 9565 Bussnang, Switzerland'
    },
    timeline: [
      {
        status: 'Package Received',
        date: 'Jul 29, 2025',
        time: '09:15 AM',
        location: 'Doral, FL',
        completed: true,
        description: 'Package received at Envia Logistics facility'
      },
      {
        status: 'Security Processing',
        date: 'Jul 29, 2025',
        time: '11:30 AM',
        location: 'Doral, FL',
        completed: true,
        description: 'Security screening and documentation completed'
      },
      {
        status: 'Export Clearance',
        date: 'Jul 30, 2025',
        time: '02:45 PM',
        location: 'Miami, FL',
        completed: true,
        description: 'Customs export clearance approved'
      },
      {
        status: 'In Transit to Airport',
        date: 'Aug 11, 2025',
        time: '08:00 AM',
        location: 'Miami, FL',
        completed: true,
        description: 'Package en route to Miami International Airport'
      },
      {
        status: 'Departed Origin Airport',
        date: 'Aug 14, 2025',
        time: '06:30 PM',
        location: 'Miami, FL (MIA)',
        completed: true,
        description: 'Flight departed - Next stop: Zurich, Switzerland'
      },
      {
        status: 'In Transit - International',
        date: 'Aug 14, 2025',
        time: '10:15 AM',
        location: 'Over Atlantic Ocean',
        completed: false,
        current: true,
        description: 'Package in transit on international flight'
      },
      {
        status: 'Arrival at Destination Airport',
        date: 'Expected Aug 19, 2025',
        time: 'TBD',
        location: 'Zurich, Switzerland (ZUR)',
        completed: false,
        description: 'Expected arrival at destination airport'
      },
      {
        status: 'Import Clearance',
        date: 'Expected Aug 20, 2025',
        time: 'TBD',
        location: 'Zurich, Switzerland',
        completed: false,
        description: 'Import customs processing'
      },
      {
        status: 'Out for Delivery',
        date: 'Expected Aug 25, 2025',
        time: 'TBD',
        location: 'Bussnang, Switzerland',
        completed: false,
        description: 'Package out for final delivery'
      },
      {
        status: 'Delivered',
        date: 'Expected Aug 28, 2025',
        time: 'TBD',
        location: 'Bussnang, Switzerland',
        completed: false,
        description: 'Package delivered'
      }
    ]
  };

  const handleTrack = () => {
    if (!trackingNumber.trim()) return;
  
    setHasSearched(true);
    setIsTracking(true);
  
    setTimeout(() => {
      if (trackingNumber.trim().toUpperCase() === 'ENV-2025-0016') {
        setTrackingData(sampleTrackingData);
      } else {
        setTrackingData(null); // invalid number
      }
      setIsTracking(false);
    }, 1500);
  };
  

  const hyperLink = () => {
    window.open('https://envia.com/en-US', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-4 sm:px-6 lg:px-10 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex items-center space-x-4">
            <div className="cursor-pointer transform hover:scale-105 transition-transform" onClick={hyperLink}>
              <div className="w-full">
                <img src={logo} alt=""/>
              </div>
            </div>
          </div>
          <div className="text-left lg:text-right text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-2">TRACK YOUR SHIPMENT</h1>
            <p className="text-blue-100">Real-time tracking for your secure deliveries</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tracking Input */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Enter Tracking Number</h2>
          
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Enter tracking number (e.g., ENV-2025-0011)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
              />
            </div>
            <button
              onClick={handleTrack}
              disabled={isTracking || !trackingNumber.trim()}
              className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white font-bold py-4 px-8 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isTracking ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                <>
                  <Search className="w-6 h-6" />
                  <span>Track</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tracking Results */}
        {trackingData && (
          <div className="space-y-8">
            {/* Status Overview */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl p-4 shadow-md border border-blue-100">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Package className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Tracking #</p>
                        <p className="font-semibold text-gray-800">{trackingData.trackingNumber}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 shadow-md border border-green-100">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Truck className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <p className="font-semibold text-gray-800">{trackingData.status}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 shadow-md border border-purple-100">
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <Shield className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Service</p>
                        <p className="font-semibold text-gray-800">{trackingData.service}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 shadow-md border border-orange-100">
                    <div className="flex items-center space-x-3">
                      <div className="bg-orange-100 p-2 rounded-lg">
                        <Clock className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Est. Delivery</p>
                        <p className="font-semibold text-gray-800">{trackingData.estimatedDelivery}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Route Information */}
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <MapPin className="w-6 h-6 text-blue-600 mr-2" />
                Shipping Route
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    From
                  </h4>
                  <div className="space-y-2 text-gray-700">
                    <p className="font-medium">{trackingData.from.name}</p>
                    <p>{trackingData.from.address}</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    To
                  </h4>
                  <div className="space-y-2 text-gray-700">
                    <p className="font-medium">{trackingData.to.name}</p>
                    <p>{trackingData.to.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-8 flex items-center">
                <FileText className="w-6 h-6 text-blue-600 mr-2" />
                Tracking Timeline
              </h3>
              
              <div className="space-y-6">
                {trackingData.timeline.map((event, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        event.completed 
                          ? 'bg-green-500 text-white' 
                          : event.current
                          ? 'bg-blue-500 text-white animate-pulse'
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        {event.completed ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : event.current ? (
                          <Plane className="w-6 h-6" />
                        ) : (
                          <Clock className="w-6 h-6" />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className={`p-4 rounded-xl border-l-4 ${
                        event.completed 
                          ? 'bg-green-50 border-green-400' 
                          : event.current
                          ? 'bg-blue-50 border-blue-400'
                          : 'bg-gray-50 border-gray-200'
                      }`}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                          <h4 className={`font-semibold ${
                            event.completed 
                              ? 'text-green-800' 
                              : event.current
                              ? 'text-blue-800'
                              : 'text-gray-600'
                          }`}>
                            {event.status}
                          </h4>
                          <div className={`text-sm ${
                            event.completed 
                              ? 'text-green-600' 
                              : event.current
                              ? 'text-blue-600'
                              : 'text-gray-500'
                          }`}>
                            {event.date} {event.time}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-1">{event.description}</p>
                        <p className={`text-sm font-medium ${
                          event.completed 
                            ? 'text-green-600' 
                            : event.current
                            ? 'text-blue-600'
                            : 'text-gray-500'
                        }`}>
                          <MapPin className="w-4 h-4 inline mr-1" />
                          {event.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Shield className="w-5 h-5 text-blue-600 mr-2" />
                Security Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4">
                  <p className="font-semibold text-gray-800 mb-2">High-Value Shipment</p>
                  <p className="text-sm text-gray-600">This package is being handled with enhanced security protocols and full insurance coverage.</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-semibold text-gray-800 mb-2">Delivery Requirements</p>
                  <p className="text-sm text-gray-600">Signature and Identification required upon delivery. Recipient must be available to receive the package.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Results */}
        {hasSearched && !isTracking && trackingData === null && trackingNumber.trim().toUpperCase() !== 'ENV-2025-0016' && (
  <div className="bg-white mb-10 rounded-2xl shadow-2xl p-8 text-center">
    <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-gray-800 mb-2">Tracking Number Not Found</h3>
    <p className="text-gray-600 mb-4">
    We couldn't find any shipment with that tracking number. Please check the number and try again.
    </p>
  </div>
)}



        {/* Instructions */}
        {!trackingData && (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">How to Track Your Package</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Find Your Tracking Number</h4>
                <p className="text-sm text-gray-600">Look for your tracking number on your invoice or confirmation email</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Enter Tracking Number</h4>
                <p className="text-sm text-gray-600">Type or paste your tracking number in the search box above</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">View Real-Time Updates</h4>
                <p className="text-sm text-gray-600">Get detailed information about your package's journey</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingPage;