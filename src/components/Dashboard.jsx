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
        <div className="w-full h-screen bg-gradient-to-r from-yellow-200 via-red-500 to-pink-500 flex center-items justify-center">
        {modal && <UpdateProfileModal modal={modal} setModal={setModal} name={name} setName={setName} updateName={updateName} setUpdateName={setUpdateName} / >}
        <div>
            <div className="m-5 text-white font-bold">
                <button onClick={logout}>
                    <u>Logout</u>
                </button>
                <button className="mx-10">
                    <Link to="/AddPurchase">+</Link>
                </button>
                <button className="mx-10">
                    <Link to="/MonthBreakDown">-</Link>
                </button>
                <button onClick={() => {setModal(true)}}>
                    <img className="h-10" src={cog} alt="settings" />
                </button>
            </div>
        <div className="text-white font-bold text-xl m-5">
        {
            !updateName
                ?
                auth.currentUser ? auth.currentUser.displayName : 'loading'
                    :
                    name
        }   
        </div>
        <div className="w-96 h-40 bg-white rounded shadow-lg p-5 m-5">
        </div>
        </div>
    </div>
    )
}

export default Dashboard
