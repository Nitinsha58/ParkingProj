fetch('https://66127450a5badd896b6e.appwrite.global/users')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    // Process the received data here
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
// import { Client, Account } from 'appwrite';

// export const client = new Client();

// client
//     .setEndpoint('https://cloud.appwrite.io/v1')
//     .setProject('661454c83dd83a0e345b'); // Replace with your project ID

// export const account = new Account(client);
// export { ID } from 'appwrite';
