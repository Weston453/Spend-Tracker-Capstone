import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import UpdateProfileModal from './UpdateProfileModal'
import cog from '../cog.png'

const Dashboard = () => {
    const [ modal, setModal ] = useState(false)
    const navigate = useNavigate()

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

    const auth = getAuth()
    const user = auth.currentUser

    return (
        <div className="w-full h-screen bg-gradient-to-r from-yellow-200 via-red-500 to-pink-500 flex">
        {modal && <UpdateProfileModal modal={modal} setModal={setModal}/>}
        <div>
            <div className="m-5 text-white font-bold">
                <button 
                    onClick={logout}
                >
                    <u>Logout</u>
                </button>
                <button onClick={() => {setModal(true)}}>
                    <img className="h-10" src={cog} alt="settings" />
                </button>
            </div>
        <div className="m-5 text-white font-bold text-xl">
                <p>{user && user.displayName}</p>
        </div>
        </div>
    </div>
    )
}

export default Dashboard
