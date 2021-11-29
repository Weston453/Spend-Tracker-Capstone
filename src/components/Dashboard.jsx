import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import { getDocs, collection, query, where, orderBy, limit } from 'firebase/firestore'
import UpdateProfileModal from './UpdateProfileModal'
import cog from '../cog.svg'

// const Dashboard = ({ db, currentUserData, setCurrentUserData }) => {
const Dashboard = ({ db }) => {
    const [ currentUserData, setCurrentUserData ] = useState([])
    const [ modal, setModal ] = useState(false)
    const [ updateName, setUpdateName ] = useState(false)
    const [ name, setName ] = useState('')
    const usersCollectionRef = collection(db, "users")
    const navigate = useNavigate()
    const auth = getAuth()
    
    const userId = JSON.parse(localStorage.getItem('userId'))
    console.log(userId)

    const logout = () => {
        signOut(auth)
        .then(() => {
            localStorage.removeItem('token')
            navigate('/')
        })
        .catch((e) => alert(e.message))
    }

    const pickMonth = () => {
        navigate('/monthBreakDown')
    }
    

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            navigate('/')
        }
       
        // const getUsers = async () => {
        //     const currentUData = query(usersCollectionRef, where("id", "==", userId))
        //     const snapshot = await getDocs(currentUData);
        //     setCurrentUserData(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id })))
        // }
        // getUsers() 
        const getUsers = async () => {
            const currentUData = query(usersCollectionRef, where("id", "==", userId), orderBy("date", "desc"), limit(5))
            const snapshot = await getDocs(currentUData);
            setCurrentUserData(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id })))
        }
        getUsers() 
    }, [])

    return (
        <div className="w-screen h-100 bg-background bg-no-repeat bg-cover flex justify-center items-center">
            {modal && <UpdateProfileModal modal={modal} setModal={setModal} name={name} setName={setName} updateName={updateName} setUpdateName={setUpdateName} / >}
            <div>
                <div className="w-screen h-20 bg-green-700">
                    <div className="text-white space-x-">
                        <button className="mx- text-3xl">
                            <Link to="/AddPurchase">+</Link>
                        </button>
                        <button onClick={logout}>
                            <u>Logout</u>
                        </button>
                        <button onClick={() => {setModal(true)}}>
                            <img className="h-10" src={cog} alt="settings" />
                        </button>
                    </div>
                    <div className="text-white font-bold text-xl mx-5">
                        Welcome, {
                            !updateName
                            ?
                            auth.currentUser ? auth.currentUser.displayName : '...'
                            :
                            name
                        }   
                    </div>
                </div>
                <div className="mx-5">
                    <h2 className="text-white text-xl font-bold mx-5 mb-2 mt-2">Current Month Spend</h2>
                    <div className="w-80 bg-white rounded shadow-lg mx-5 mb-3 p-1">
                        <p className="m-5 text-xl">$1240.00</p>
                    </div>
                    <div className="w-80 h-80 bg-white rounded shadow-lg mx-5 p-1 flex justify-center items-center">
                        <p className="m-5 text-xl">Chart JS here</p>
                    </div>
                    <h2 className="text-white text-xl font-bold mx-5 mb-2 mt-2">Recent Purchases</h2>
                    <div className="w-80 bg-white rounded shadow-lg mx-5 p-1 flex justify-center items-center">
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
                    </div>
                    <h2 className="text-white text-xl font-bold mx-5 mb-2 mt-2">Month Breakdown</h2>
                    <div className="w-80 bg-white rounded shadow-lg mx-5 mb-10 p-3 flex flex-col items-center">
                        <select className="border-grey-200 border-2 rounded w-full p-2 h-10 mb-5">
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
                        <button 
                            className="bg-green-600 text-white px-10 py-2 rounded text-xl font-bold"
                            onClick={pickMonth}
                        >
                            See Months Spend
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
