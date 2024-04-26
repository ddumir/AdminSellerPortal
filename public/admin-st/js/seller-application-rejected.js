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

    db.where('status', '==', 'rejected').get()
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
                    <td>
                    <button onclick="approveSeller('${doc.id}', '${sellerData.email}')">Appr</button>
                    </td>
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

// Function to generate a random alphanumeric password
function generateRandomPassword(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
}

// Function to approve a seller application and send email with login credentials
// Function to approve a seller application and send email with login credentials
function approveSeller(sellerId, sellerEmail) {
    // Generate a random password for the user
    const password = generateRandomPassword(8);

    db.doc(sellerId).get()
        .then((doc) => {
            const sellerData = doc.data();
            
            return db.doc(sellerId).update({ status: 'approved' })
                .then(() => {
                    console.log('Seller application approved successfully');

                    // Authenticate user in Firebase
                    firebase.auth().createUserWithEmailAndPassword(sellerEmail, password)
                        .then(() => {
                            console.log('User created successfully in Firebase');

                            // Send email with login credentials
                            Email.send({
                                Host: "smtp.elasticemail.com",
                                Username: "devanshdumir@gmail.com",
                                Password: "urpass",
                                To: sellerEmail,
                                From: "devanshdumir@gmail.com",
                                Subject: "This is the subject",
                                Body: `Your Login Credentials:\nEmail: ${sellerEmail}\nPassword: ${password}`
                            })
                            .then(() => {
                                alert('Seller Approved Successfully! Email sent with login credentials.');
                                fetchPendingApplications();
                            })
                            .catch((error) => {
                                console.error('Error sending email:', error);
                                // If there's an error sending email, display an error message
                                alert('Error approving seller: Email could not be sent.');
                                // Rollback the status change
                                return db.doc(sellerId).update({ status: 'pending' });
                                
                            });
                        })
                        .catch((error) => {
                            console.error('Error creating user in Firebase:', error);
                            alert('Error approving seller: User could not be created.');
                            // Rollback the status change
                            return db.doc(sellerId).update({ status: 'pending' });
                        });
                })
                .catch((error) => {
                    console.error('Error approving seller application: ', error);
                });
        })
        .catch((error) => {
            console.error('Error retrieving seller data:', error);
        });
}


// Fetch and display pending seller applications when the page loads
window.addEventListener('DOMContentLoaded', fetchPendingApplications);