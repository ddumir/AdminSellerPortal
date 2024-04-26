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

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

// Reference the Firestore collection
const db = firebase.firestore().collection('seller-register');

// Function to fetch and display pending seller applications
function fetchPendingApplications() {
    const sellerList = document.getElementById('seller-list');
    sellerList.innerHTML = ''; // Clear previous entries

    db.where('status', '==', 'approved').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const sellerData = doc.data();
                const tableRow = document.createElement('tr');

                // Truncate the product description to 50 characters
                const truncatedDescription = sellerData.productDescription.length > 50 ?
                    sellerData.productDescription.substring(0, 25) + '...' :
                    sellerData.productDescription;

                tableRow.innerHTML = `
                    <td>${sellerData.fullName}</td>
                    <td>${sellerData.email}</td>
                    <td>${sellerData.phone}</td>
                    <td>${sellerData.businessGst}</td>
                    <td>${sellerData.bankDetails}</td>
                    <td>${sellerData.businessAddress}</td>
                    <td><span class="truncated" data-description="${sellerData.productDescription}">${truncatedDescription}</span></td>                    <td>${sellerData.businessName}</td>
                    <td>${sellerData.productType}</td>
                    <td>${sellerData.socialMedia}</td>
                    <td><a href="${sellerData.verificationFile.url}" target="_blank">File</a></td>
                    
                `;
                sellerList.appendChild(tableRow);
            });
            // Add event listener to all truncated spans
            const truncatedSpans = document.querySelectorAll('.truncated');
            truncatedSpans.forEach(span => {
                span.addEventListener('click', () => {
                    const modal = document.getElementById('descriptionModal');
                    const fullDescription = span.dataset.description;
                    document.getElementById('fullDescription').textContent = fullDescription;
                    modal.style.display = 'block';
                });
            });

            // Close the modal when the close button is clicked
            const closeBtn = document.querySelector('.close');
            closeBtn.addEventListener('click', () => {
                const modal = document.getElementById('descriptionModal');
                modal.style.display = 'none';
            });

            // Close the modal when clicking outside of it
            window.addEventListener('click', (event) => {
                const modal = document.getElementById('descriptionModal');
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
        })
        .catch((error) => {
            console.error('Error fetching pending applications: ', error);
        });
}
// Fetch and display pending seller applications when the page loads
window.addEventListener('DOMContentLoaded', fetchPendingApplications);