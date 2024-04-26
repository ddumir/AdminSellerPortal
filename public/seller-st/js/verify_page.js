// const firebaseConfig = {
//     apiKey: "yourconfig",
//     authDomain: "yourconfig",
//     databaseURL: "yourconfig",
//     projectId: "yourconfig",
//     storageBucket: "yourconfig",
//     messagingSenderId: "yourconfig",
//     appId: "yourconfig",
//     measurementId: "yourconfig"
//   };

//   // initialize firebase
//   firebase.initializeApp(firebaseConfig);

// // Reference your Firestore collection
//   var db = firebase.firestore().collection('products');

//   const getElementVal = (id) => {
//     return document.getElementById(id).value;
//   };

// document.getElementById('seller-form').addEventListener('submit',submitForm);

// function submitForm(e) {
//     e.preventDefault();
  
//     var fullName = getElementVal("fullName");
//     var email = getElementVal("email");
//     var phone = getElementVal("phone");
//     var businessName = getElementVal("businessName");
//     var businessAddress = getElementVal("businessAddress");
//     var businessGst = getElementVal("businessGst");
//     var productType = getElementVal("productType");
//     var productDescription = getElementVal("productDescription");
//     var bankDetails = getElementVal("bankDetails");
//     var socialMedia = getElementVal("socialMedia");
//     var verificationFile = getElementVal("verificationFile");

  
//     saveMessages(fullName, email, phone,businessName , businessAddress,businessGst,productType,productDescription
//         ,bankDetails, socialMedia,verificationFile);
  
//     //   enable alert
//     document.querySelector(".alert").style.display = "block";
  
//     //   remove the alert
//     setTimeout(() => {
//       document.querySelector(".alert").style.display = "none";
//     }, 3000);
  
//     //   reset the form
//     document.getElementById("seller-form").reset();
    
//   }
  
//   const saveMessages = (fullName, email, phone,businessName , businessAddress,businessGst,productType,productDescription
//     ,bankDetails, socialMedia,verificationFile) => {
//         const fileInput = document.getElementById("verificationFile");
//         const file = fileInput.files[0];
    
//         // Upload the file to Firebase Storage
//         const storageRef = firebase.storage().ref('verificationFiles/' + file.name);
//         storageRef.put(file).then((snapshot) => {
//             console.log('File uploaded successfully:', snapshot);
    
//             // Get the download URL for the uploaded file
//             storageRef.getDownloadURL().then((downloadURL) => {
//                 // Store file metadata in Firestore
//                 db.add({
//                     fullName: fullName,
//                     email: email,
//                     phone: phone,
//                     businessName: businessName,
//                     businessAddress: businessAddress,
//                     businessGst: businessGst,
//                     productType: productType,
//                     productDescription: productDescription,
//                     bankDetails: bankDetails,
//                     socialMedia: socialMedia,
//                     verificationFile: {
//                         name: file.name,
//                         url: downloadURL,
//                     },
//                     status: "pending", // Set the default status to "pending"
//                 })
//     .then((docRef) => {
//         console.log("Document written with ID: ", docRef.id);
//     })
//     .catch((error) => {
//         console.error("Error adding document: ", error);
//     }); 
// });
// });
// };

// document.getElementById('addButton').addEventListener('click', function() {
//     createProductCard();
// });

// function createProductCard() {
//     const productContainer = document.getElementById('productContainer');
//     const productCard = document.createElement('div');
//     productCard.className = 'productCard';

//     const productForm = document.createElement('div');
//     productForm.className = 'product-form';

//     productForm.innerHTML = `
//         <input type="text" class="productName" placeholder="Product Name">
//         <div class="image-input">
//             <input type="file" class="productImage" accept="image/*" onchange="previewImage(event)">
//             <label for="productImage">Change Image</label>
//             <img class="imagePreview" src="ima/image.png" alt="Product Image">
//         </div>
//         <input type="number" class="productPrice" placeholder="Product Price">
//         <input type="number" class="productMrpPrice" placeholder="Product MRP Price">
//         <textarea class="productDescription" placeholder="Product Description"></textarea>
//         <input type="hidden" class="seller_id">
//         <select class="category">
//             <option value="electronics">Electronics</option>
//             <option value="clothing">Clothing</option>
//             <option value="books">Books</option>
//         </select>
//         <input type="file" class="additionalImages" accept="image/*" multiple style="display:none;">
//         <button onclick="addMultipleImages(this)">Add Multiple Images</button>
//         <input type="checkbox" class="statusToggle" checked>
//         <label for="statusToggle">Active</label>
//         <input type="number" class="inventory" placeholder="Inventory">
//         <select class="variation">
//             <option value="kg">Kg</option>
//             <option value="grams">Grams</option>
//             <option value="unit">Unit</option>
//             <option value="liter">Liter</option>
//             <option value="ml">Ml</option>
//         </select>
//         <button onclick="saveProduct(this)">Save</button>
//     `;

//     productCard.appendChild(productForm);
//     productContainer.appendChild(productCard);
// }

// function previewImage(event) {
//     const input = event.target;
//     const file = input.files[0];
//     const reader = new FileReader();

//     reader.onload = function() {
//         const productImage = reader.result;
//         input.parentNode.querySelector('.imagePreview').src = productImage;
//     }

//     reader.readAsDataURL(file);
// }

// function addMultipleImages(button) {
//     const productCard = button.parentNode;
//     productCard.querySelector('.additionalImages').click();
// }

