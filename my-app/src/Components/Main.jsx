import Main2 from './Main2'
import { getUsers, getSpots } from "../appwrite";
import { useEffect, useState } from "react";

const data = [
    {
        "spotId": "1",
        "floor": 0,
        "occupied": false,
        "spotNumber": "G1",
        "$id": "66158f6b78230eed5c0b",
        "$createdAt": "2024-04-09T18:56:43.493+00:00",
        "$updatedAt": "2024-05-14T01:45:10.587+00:00",
        "$permissions": [],
        "users": null,
        "$databaseId": "661504d7451fae29a61c",
        "$collectionId": "661504fa64c17fcc554b"
    },
    {
        "spotId": "2",
        "floor": 0,
        "occupied": false,
        "spotNumber": "G2",
        "$id": "66158fbfca1f9e5c6bc6",
        "$createdAt": "2024-04-09T18:58:07.829+00:00",
        "$updatedAt": "2024-04-09T18:58:07.829+00:00",
        "$permissions": [],
        "users": null,
        "$databaseId": "661504d7451fae29a61c",
        "$collectionId": "661504fa64c17fcc554b"
    },
    {
        "spotId": "3",
        "floor": 0,
        "occupied": false,
        "spotNumber": "G3",
        "$id": "66158fd954a4b5a68fbd",
        "$createdAt": "2024-04-09T18:58:33.353+00:00",
        "$updatedAt": "2024-04-09T18:58:33.353+00:00",
        "$permissions": [],
        "users": null,
        "$databaseId": "661504d7451fae29a61c",
        "$collectionId": "661504fa64c17fcc554b"
    },
    {
        "spotId": "4",
        "floor": 0,
        "occupied": false,
        "spotNumber": "G4",
        "$id": "66158febef758f883842",
        "$createdAt": "2024-04-09T18:58:51.982+00:00",
        "$updatedAt": "2024-04-09T18:58:51.982+00:00",
        "$permissions": [],
        "users": null,
        "$databaseId": "661504d7451fae29a61c",
        "$collectionId": "661504fa64c17fcc554b"
    },
    {
        "spotId": "5",
        "floor": 0,
        "occupied": false,
        "spotNumber": "G5",
        "$id": "66158ffe9782726d1654",
        "$createdAt": "2024-04-09T18:59:10.621+00:00",
        "$updatedAt": "2024-04-09T18:59:10.621+00:00",
        "$permissions": [],
        "users": null,
        "$databaseId": "661504d7451fae29a61c",
        "$collectionId": "661504fa64c17fcc554b"
    },
    {
        "spotId": "6",
        "floor": 0,
        "occupied": false,
        "spotNumber": "G6",
        "$id": "661590101ff94fbab030",
        "$createdAt": "2024-04-09T18:59:28.131+00:00",
        "$updatedAt": "2024-04-09T18:59:28.131+00:00",
        "$permissions": [],
        "users": null,
        "$databaseId": "661504d7451fae29a61c",
        "$collectionId": "661504fa64c17fcc554b"
    }
]
function Main() {
    const [spots, setSpots] = useState([data]);

    console.log(spots)
  
    useEffect(() => {
      getUsers().then(function (response) {
        response
        // setUsers(JSON.parse(response.responseBody));
      }, function (error) {
        console.log("Error: ", error.responseBody)
      });
    
      getSpots().then(function (response) {
        setSpots(JSON.parse(response.responseBody));
      });
    }, []);

  return (
    <>
    <h1 className="mt-8 text-4xl font-semibold">Parking Spots</h1>
    <div className="grid grid-rows-3 grid-flow-col gap-4 p-5">
        {spots.map((spot) => {
            if (spot.occupied) {
                return <div key={spot.$id} className="bg-green-600 px-8 py-4">{spot.spotId} occupied by {spot.users.username} 
                    <p className="text-white">Balance: {spot.users.balance}</p> 
                </div>
            }else { 
                return <div key={spot.$id} className="bg-gray-200 px-8 py-4 border-dashed border-gray-400 border-2">{spot.spotId}</div>
            }

        })}
    </div>
    <main className="w-full h-[80vh] bg-no-repeat bg-cover bg-center flex justify-center items-center" style={{backgroundImage : `url("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D")` , backdropFilter : "blure(16px)"}}>
        <div>
            <div>
                <h1 className="text-5xl font-bold text-white">FIND <span className="text-green-700">PARKING </span>IN ONE CLICK</h1>
                <h3 className='text-xl font-medium text-center mt-2 text-white'>SIMPLE, <span className="text-green-700">SECURED</span> & SMART</h3>
            </div>
            <div className="flex justify-around mt-4">
                <div className="flex gap-3 text-xl items-center font-bold justify-center text-green-900">
                <input type="radio" name='search' id='search'/>
                <label htmlFor="search">QUICK SEARCH</label>
                </div>
                <div className="flex gap-3 text-xl items-center font-bold justify-center text-black-700">
                <input type="radio" name='search' id='advsearch'/>
                <label htmlFor="advsearch">ADVANCED SEARCH</label>
                </div>
            </div>
            <div className="flex gap-5 mt-5">
                <input type="text" name='VehcilceNO' placeholder='Vehicle NO' className="w-full px-4"/>
                <button className="outline-none bg-green-700 p-2 hover:cursor-pointer shadow-lg w-16">GO</button>
            </div> 
        </div>

    </main>
    <Main2/>
    </>
  )
}

export default Main