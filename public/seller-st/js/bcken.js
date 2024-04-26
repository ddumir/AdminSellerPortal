const firebaseConfig = {
  apiKey: "yourconfig",
  authDomain: "yourconfig",
  databaseURL: "yourconfig",
  projectId: "yourconfig",
  storageBucket: "yourconfig",
  messagingSenderId: "yourconfig",
  appId: "yourconfig",
  measurementId: "yourconfig"
};

firebase.initializeApp(firebaseConfig);

// Reference to the database
const database = firebase.database();


// Function to show the next form field
function showNextField(currentSectionId, nextSectionId) {
  const currentSection = document.getElementById(currentSectionId);
  const nextSection = document.getElementById(nextSectionId);

  currentSection.style.display = 'none';
  nextSection.style.display = 'block';
}

// Submit form data to Firebase
document.getElementById('gstForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get form values
  const gstNumber = document.getElementById('gstNumber').value;
  const storeName = document.getElementById('storeName').value;
  const taxDetails = document.getElementById('taxDetails').value;
  const shippingPreferences = document.getElementById('shippingPreferences').value;
  const pickupAddress = document.getElementById('pickupAddress').value;
  const bankDetails = document.getElementById('bankDetails').value;

  // Push data to Firebase
  database.ref('gstFormData').push({
    gstNumber: gstNumber,
    storeName: storeName,
    taxDetails: taxDetails,
    shippingPreferences: shippingPreferences,
    pickupAddress: pickupAddress,
    bankDetails: bankDetails
  }).then(() => {
    // Clear form fields after successful submission
    document.getElementById('gstForm').reset();
    alert('Data submitted successfully!');
  }).catch((error) => {
    console.error('Error submitting data:', error);
    alert('An error occurred while submitting data. Please try again.');
  });
});