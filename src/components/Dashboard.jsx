import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'

const Dashboard = ({history}) => {
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
        <div className="w-full h-screen bg-gradient-to-r from-yellow-200 via-red-500 to-pink-500 flex justify-center items-center">
        <div className="w-96 bg-white shadow-lg m-5">
            <div className="m-5">
                <p>{user && user.displayName}</p>
            </div>
            <div className="m-5">
                <button 
                    onClick={logout}
                    className="bg-gradient-to-r from-yellow-200 via-red-500 to-pink-500 text-white px-10 py-2 rounded text-xl font-bold"
                >
                    Logout
                </button>
            </div>
        </div>
    </div>
    )
}

export default Dashboard
