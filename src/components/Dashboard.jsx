import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import { getDocs, collection } from 'firebase/firestore'
import UpdateProfileModal from './UpdateProfileModal'
import cog from '../cog.svg'

const Dashboard = ({ db, users, setUsers }) => {
    const [ modal, setModal ] = useState(false)
    const [ updateName, setUpdateName ] = useState(false)
    const [ name, setName ] = useState('')
    const usersCollectionRef = collection(db, "users")
    const navigate = useNavigate()
    const auth = getAuth()
    
    const logout = () => {
        signOut(auth)
        .then(() => {
            localStorage.removeItem('token')
            navigate('/')
        })
        .catch((e) => alert(e.message))
    }
    
    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            navigate('/')
        }

        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef)
            setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
        }
        getUsers()
    })

    return (
        <div className="w-100 h-100 bg-gradient-to-r from-yellow-200 via-red-500 to-pink-500 flex justify-center">
            {modal && <UpdateProfileModal modal={modal} setModal={setModal} name={name} setName={setName} updateName={updateName} setUpdateName={setUpdateName} / >}
            <div>
                <div className="text-white space-x-28">
                    <button className="mx-10 text-3xl">
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
                    {
                        !updateName
                            ?
                            auth.currentUser ? auth.currentUser.displayName : '...'
                                :
                                name
                    }   
                </div>
                <div className="mx-5">
                    <h2 className="text-white text-xl font-bold mx-5 mb-2 mt-2">Current month's Spend</h2>
                    <div className="bg-white rounded shadow-lg mx-5 mb-3 p-1">
                        <p className="m-5 text-xl">$1240.00</p>
                    </div>
                    <div className="w-96 h-80 bg-white rounded shadow-lg mx-5 p-1 flex justify-center items-center">
                        <p className="m-5 text-xl">Chart JS here</p>
                    </div>
                    <h2 className="text-white text-xl font-bold mx-5 mb-2 mt-2">Recent Purchases</h2>
                    <div className="w-96 h-80 bg-white rounded shadow-lg mx-5 p-1 flex justify-center items-center">
                        <p className="m-5 text-xl">5 recent purchases</p>
                        <div>
                            {users.map((user) => {
                                return (
                                    <div className="flex">
                                        <h1>Amount: {user.purchase}</h1>
                                        <h1>date: {user.date}</h1>
                                        <h1>Category: {user.category}</h1>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <h2 className="text-white text-xl font-bold mx-5 mb-2 mt-2">Month Breakdown</h2>
                    <div className="w-96 bg-white rounded shadow-lg mx-5 mb-10 p-3 flex flex-col items-center">
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
                        <button>
                            <Link to="/MonthBreakDown">-</Link>
                        </button>
                        <button className="bg-gradient-to-r from-yellow-200 via-red-500 to-pink-500 text-white px-10 py-2 rounded font-bold">
                            See Months Spend
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
