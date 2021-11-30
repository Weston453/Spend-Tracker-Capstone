import React, { useState, useEffect  } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getDocs, collection, query, where, orderBy, limit, doc } from 'firebase/firestore'

const AddPurchModal = ({ setModal, db, docId }) => {
    const [ currentUserData, setCurrentUserData ] = useState([])
    const usersCollectionRef = collection(db, "users")
    const navigate = useNavigate()
    const userId = JSON.parse(localStorage.getItem('userId'))

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            navigate('/')
        }

        // const getUsers = async () => {
        //     const currentUData = query(usersCollectionRef, where("id", "==", userId), orderBy("date", "desc"), limit(1))
        //     const snapshot = await getDocs(currentUData);
        //     setCurrentUserData(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id })))
        // }
        // getUsers() 

        const getUsers = async () => {
            const docRef = doc(db, "users" )
            console.log(docRef)
        }
        getUsers() 
    }, [])

    return (
        <div className="w-screen h-screen fixed bg-gray-600 bg-opacity-80 flex items-center justify-center">
            <div className="w-80 bg-white rounded shadow-lg mx-5 mb-10 p-3">
                <button 
                    onClick={() => setModal(false)}
                    className="text-xl font-bold"
                >
                    X
                </button>
                <div className="flex flex-col items-center">
                <h2>Purchase Added Successfully!</h2>
                <table className="w-full table-fixed">
                            <thead>
                                <tr>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUserData.map((data, index) => {
                                    return (
                                        <>
                                            <tr className="border-b" key={index}>
                                                <td className="flex justify-center">${data.purchase}</td>
                                                <td>{data.date}</td>
                                                <td>{data.category}</td>
                                            </tr>
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>
                <button onClick={() => setModal(false)}>
                    <Link to="/dashboard"><u>Dashboard</u></Link>
                </button>
                </div>
            </div>
        </div>
    )
}

export default AddPurchModal
