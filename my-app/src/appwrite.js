import { Server } from "./config";
import { Client, Functions } from "appwrite";


export const getUsers = async () => {
    const client = new Client();
    const functions = new Functions(client);
    client
        .setEndpoint(Server.endpoint)
        .setProject(Server.project);
    const promise = functions.createExecution(
        '66127450293b56e02c67',  // functionId
        '<BODY>',  // body (optional)
        false,  // async (optional)
        '/users',  // path (optional)
        'GET',  // method (optional)
        {} // headers (optional)
    );
    return promise;
}

export const getSpots = async () => {
    const client = new Client();
    const functions = new Functions(client);
    client
        .setEndpoint(Server.endpoint)
        .setProject(Server.project);
    const promise = functions.createExecution(
        '66127450293b56e02c67',  // functionId
        '<BODY>',  // body (optional)
        false,  // async (optional)
        '/spots',  // path (optional)
        'GET',  // method (optional)
        {} // headers (optional)
    );
    return promise;
}

// const client = new Client();

// const functions = new Functions(client);

// client
//     .setEndpoint('https://cloud.appwrite.io/v1')
//     .setProject(Server.project);

// const promise = functions.createExecution(
//         '66127450293b56e02c67',  // functionId
//         '<BODY>',  // body (optional)
//         false,  // async (optional)
//         '/users',  // path (optional)
//         'GET',  // method (optional)
//         {} // headers (optional)
//     );

// promise.then(function (response) {
//     console.log(JSON.parse(response.responseBody)); // Success
// }, function (error) {
//     console.log(error); // Failure
// });