import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import UpdateProfileModal from './UpdateProfileModal'
import cog from '../cog.png'

const Dashboard = ({ db }) => {
    const [ modal, setModal ] = useState(false)
    const [ updateName, setUpdateName ] = useState(false)
    const [ name, setName ] = useState('')
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
        <div>
            <h2 className="text-white text-xl font-bold mx-5 mb-2 mt-2">Current month's Spend</h2>
            <div className="w-96 bg-white rounded shadow-lg mx-5 mb-3 p-1">
                <p className="m-5 text-xl">$1240.00</p>
            </div>
            <div className="w-96 h-80 bg-white rounded shadow-lg mx-5 p-1 flex justify-center items-center">
                <p className="m-5 text-xl">Chart JS here</p>
            </div>
            <h2 className="text-white text-xl font-bold mx-5 mb-2 mt-2">Recent Purchases</h2>
            <div className="w-96 h-80 bg-white rounded shadow-lg mx-5 p-1 flex justify-center items-center">
                <p className="m-5 text-xl">5 recent purchases</p>
            </div>
            <h2 className="text-white text-xl font-bold mx-5 mb-2 mt-2">Month Breakdown</h2>
            <div className="w-96 bg-white rounded shadow-lg mx-5 mb-10 p-3 flex flex-col items-center">
                <select className="border-grey-200 border-2 rounded w-full p-2 h-10 mb-5">
                    <option value="">January</option>
                    <option value="">February</option>
                    <option value="">March</option>
                    <option value="">April</option>
                    <option value="">May</option>
                    <option value="">June</option>
                    <option value="">July</option>
                    <option value="">August</option>
                    <option value="">September</option>
                    <option value="">October</option>
                    <option value="">November</option>
                    <option value="">December</option>
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
