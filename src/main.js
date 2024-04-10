import { Client, Databases, Query } from 'node-appwrite';

export default async ({ req, res, log, error }) => {

    const client = new Client()
        .setEndpoint(process.env.APPWRITE_ENDPOINT)
        .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
        .setKey(process.env.APPWRITE_API_KEY);

    const databases = new Databases(client);

    if (req.path == "/parking" && req.method == "POST"){
        const cardid = req.query.cardid;
        if (!cardid) {
            return res.json({ok: false, message: 'Invalid card'}, 400);
        }
        const response = await databases.listDocuments(
            process.env.APPWRITE_DATABASE_ID,
            process.env.USERS_COLLECTION,
            [Query.equal('cardId', cardid)],
        );

        const document = await databases.getDocument(
            process.env.APPWRITE_DATABASE_ID,
            process.env.USERS_COLLECTION,
            response.documents[0].$id
        );

        // 1. first time parking
        if (document.parkingSpot == null) {

            const spots = await databases.listDocuments(
                process.env.APPWRITE_DATABASE_ID,
                process.env.USERS_COLLECTION,
                [Query.equal('occupied', ['false', 'null'])],
            );

            if (spots.documents.length == 0) {
                return res.json({ok: false, message: 'No spots available'}, 400);
            }

            const spot = spots.documents[0].$id;

            await databases.updateDocument(
                process.env.APPWRITE_DATABASE_ID,
                process.env.USERS_COLLECTION,
                document.$id,
                {
                    parkingSpot: spot
                }
            );
            return res.json({ok: true, message: 'Parked successfully', spot: spot});
        }


        // 2. parked before

        // if (document && document.balance > 30 && document.parkingSpot) {

        //     const previousTime = new Date(document.time.$date);

        //     const timeDifferenceMs = currentTime.getTime() - previousTime.getTime();

        //     const timeDifferenceMinutes = Math.ceil(timeDifferenceMs / (1000 * 60));

        //     // Calculate total charge
        //     const charge = timeDifferenceMinutes * 30; // 30Rs per minute

        //     console.log('Time difference:', timeDifferenceMinutes, 'minutes');
        //     console.log('Total charge:', charge, 'USD');

        //     // Update user document with current time
        //     await database.updateDocument(
        //         'YOUR_COLLECTION_ID', // Replace with your collection ID
        //         'USER_DOCUMENT_ID', // Replace with the ID of the user document
        //         {
        //             time: { '$date': currentTime.toISOString() }, // Store current time as ISO string
        //             balance: document.balance - charge // Update balance by deducting the charge
        //         }
        //     );
        // } else {
        //     // Store current time for the first iteration
        //     await database.createDocument(
        //         'YOUR_COLLECTION_ID', // Replace with your collection ID
        //         {
        //             time: { '$date': currentTime.toISOString() }, // Store current time as ISO string
        //             balance: 0 // Set initial balance
        //         }
        //     );

        //     console.log('Stored current time as previous time');
        // }

        // return res.json(response);
    } 



    return res.send("Invalid request method");
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
