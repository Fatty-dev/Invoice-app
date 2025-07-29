const [paymentHistory, setPaymentHistory] = useState([]);
  const [showDatabase, setShowDatabase] = useState(false);
  const [devMode, setDevMode] = useState(false);

  // Persistent database using a global variable (survives component re-renders)
  if (!window.paymentDatabase) {
    window.paymentDatabase = [];
  }