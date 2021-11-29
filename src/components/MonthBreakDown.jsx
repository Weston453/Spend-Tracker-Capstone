import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { getDocs, collection, query, where, orderBy, limit, deleteDoc, doc } from 'firebase/firestore'
import backArrow from '../backArrow.svg'

const MonthBreakDown = ({ db }) => {
    const [ currentUserData, setCurrentUserData ] = useState([])
    const usersCollectionRef = collection(db, "users")
    const navigate = useNavigate()

    const userId = JSON.parse(localStorage.getItem('userId'))

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            navigate('/')
        }
        console.log('month')

        const getUsers = async () => {
            const currentUData = query(usersCollectionRef, where("id", "==", userId), orderBy("date", "desc"))
            const snapshot = await getDocs(currentUData);
            setCurrentUserData(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id })))
        }
        getUsers() 
    }, [])

    const runEdit = () => {

    }
    
    const runDelete = async (i) => {
        // const currentEntry = doc(usersCollectionRef, currentUserData)
        // console.log(currentEntry)
        for (let i = 0; i < currentUserData.length; i++){
            console.log(currentUserData[i])
            console.log(currentUserData[i].id)
        }
        // await deleteDoc(currentUserData)
    }

    return (
        <div className="w-full h-100 bg-background bg-no-repeat bg-cover"> 
            {/* <div className="z-0 w-32 overflow-hidden fixed right-0">
                <div className="h-52 bg-green-500 -rotate-45 transform origin-top-left"></div>
            </div> */}
            <div className="w-screen h-20 bg-green-700 mb-10">
                <button>
                    <Link to="/dashboard">
                        <img className="h-8" src={backArrow} alt="settings" />
                    </Link>
                </button>
                <h2 className=" text-white text-xl font-bold mx-5 mb-5">Current Month Spend</h2>
            </div>
            <div>
                <div className="flex-col flex items-center">
                    <select className="w-80 border-grey-200 border-2 rounded p-2 h-10 mx-5 mb-5">
                        <option value="january">January</option>
                        <option value="february">February</option>
                        <option value="march">March</option>
                        <option value="april">April</option>
                        <option value="may">May</option>
                        <option value="june">June</option>
                        <option value="july">July</option>
                        <option value="august">August</option>
                        <option value="september">September</option>
                        <option value="october">October</option>
                        <option value="november">November</option>
                        <option value="december">December</option>
                    </select>
                    <div className="w-80 h-60 bg-white rounded shadow-lg">
                        <p className="text-xl">Chart JS here</p>
                    </div>
                    <div className="flex-col">
                        <h2 className="w-80 text-white text-xl font-bold ">Purchases</h2>
                        <div className="w-80 bg-white rounded shadow-lg mb-10 p-1">
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
                                                    {/* <td className="flex justify-center">
                                                        <button onClick={openEdit}>:</button>
                                                    </td> */}
                                                    <td className="flex justify-center">
                                                        <button onClick={runEdit}>e</button>
                                                    </td>
                                                    <td className="flex justify-center">
                                                        <button onClick={runDelete}>d</button>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MonthBreakDown
