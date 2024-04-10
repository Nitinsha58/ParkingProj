import { Client, Databases } from 'node-appwrite';

export default async ({ req, res, log, error }) => {

    const client = new Client()
        .setEndpoint(process.env.APPWRITE_ENDPOINT)
        .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
        .setKey(process.env.APPWRITE_API_KEY);

    const databases = new Databases(client);

    try {
        const response = await databases.listDocuments(
            process.env.USERS_COLLECTION,
        );

        console.log(response); // Success
        return res.json(response);
    } catch (error) {
        console.log(error); // Failure
        return res.send("Query Failed.");
    }
}




// import { Client, Appwrite } from 'node-appwrite';

// async function main(context) {
//     const client = new Appwrite();
//     client
//         .setEndpoint(process.env.APPWRITE_ENDPOINT)
//         .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
//         .setKey(process.env.APPWRITE_API_KEY);

//     const database = new Appwrite.Database(client);

//     if (context.req.path === "/hello") {
//         if (context.req.method === "POST") {
//             return context.res.send("Hello Path with POST");
//         }

//         if (context.req.method === "GET") {
//             try {
//                 const result = await database.listDocuments(process.env.USERS_COLLECTION);
//                 return context.res.json(result);
//             } catch (error) {
//                 return context.res.send(`Error: ${error.message}`);
//             }
//         }
//     }

//     if (context.req.path === "/parking") {
//         if (context.req.method === "POST") {
//             const queries = ['username=nitinsha58'];

//             try {
//                 const result = await database.listDocuments(process.env.USERS_COLLECTION, queries);
//                 if (result.documents.length > 0) {
//                     return context.res.json(result);
//                 } else {
//                     return context.res.json({ok: false, message: 'Invalid card'}, 400);
//                 }
//             } catch (error) {
//                 return context.res.send(`Error: ${error.message}`);
//             }
//         }
//     }

//     if (context.req.path === "/") {
//         if (context.req.method === "GET") {
//             return context.res.send("Hello, World!");
//         }

//         if (context.req.method === "POST") {
//             try {
//                 const result = await database.listCollections();
//                 return context.res.json(result);
//             } catch (error) {
//                 return context.res.send(`Error: ${error.message}`);
//             }
//         }
//     }

//     return context.res.send("Invalid request method");
// }
