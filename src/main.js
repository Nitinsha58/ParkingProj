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

        if (document.parkingSpot == null) {

            const spots = await databases.listDocuments(
                process.env.APPWRITE_DATABASE_ID,
                process.env.PARKINGSPOT_COLLECTION,
                [Query.equal('occupied', false)],
            );

            if (spots.documents.length == 0) {
                return res.json({ok: false, message: 'No spots available'}, 400);
            }

            if (document.balance < 30) {
                return res.json({ok: false, message: 'Insufficient balance'}, 400);
            }

            const spot = spots.documents[0];

            await databases.updateDocument(
                process.env.APPWRITE_DATABASE_ID,
                process.env.USERS_COLLECTION,
                document.$id,
                {
                    parkingSpot: spot.$id
                }
            );

            await databases.updateDocument(
                process.env.APPWRITE_DATABASE_ID,
                process.env.PARKINGSPOT_COLLECTION,
                spot.$id,
                {
                    occupied: true
                }
            );
            return res.json({ok: true, message: 'Parked successfully', id: spot.$id, spotNumber: spot.spotNumber});
        }else {
            const spot = document.parkingSpot;
            await databases.updateDocument(
                process.env.APPWRITE_DATABASE_ID,
                process.env.USERS_COLLECTION,
                document.$id,
                {
                    parkingSpot: null,
                    balance: document.balance - 30
                }
            );
            await databases.updateDocument(
                process.env.APPWRITE_DATABASE_ID,
                process.env.PARKINGSPOT_COLLECTION,
                spot.$id,
                {
                    occupied: false
                }
            );
            return res.json({ok: true, message: 'Unparked successfully', username: document.username, balance: document.balance - 30});
        }
    } 

    if (req.path == "/users" && req.method == "GET"){
        const users = await databases.listDocuments(
            process.env.APPWRITE_DATABASE_ID,
            process.env.USERS_COLLECTION,
        );
        return res.json(users.documents);
    }

    if (req.path == "/spots" && req.method == "GET"){
        const spots = await databases.listDocuments(
            process.env.APPWRITE_DATABASE_ID,
            process.env.PARKINGSPOT_COLLECTION,
        );
        return res.json(spots.documents);
    }

    return res.send("Invalid request method");
}