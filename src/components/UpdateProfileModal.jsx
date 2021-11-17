import React, { useState } from 'react'
import { getAuth, updateProfile } from "firebase/auth";

const UpdateProfileModal = ({ modal, setModal }) => {
    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ confirmPassword, setConfirmPassword ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)

    const submitHandler = () => {
        const auth = getAuth()
        updateProfile(auth.currentUser, {

        })
    }

    return (
        <div className="fixed w-screen h-screen bg-gradient-to-r from-yellow-200 via-red-500 to-pink-500 flex justify-center items-center">
        <div className="w-96 bg-white rounded shadow-lg m-5">
        <div className="m-5">
            <button 
                onClick={() => setModal(false)}
                className="text-xl font-bold"
            >
                X
            </button>
            <h2 className="text-xl font-bold mb-2">Update Account</h2>
        </div>
        <div className="m-5">
            <label className="block text-xl font-bold mb-2">Name</label>
            <input 
                value={name}
                onChange={e => setName(e.target.value)}
                name="name" 
                type="name" 
                className="border-grey-200 border-2 rounded w-full p-2 h-10"
                required
            />
        </div>
        <div className="m-5">
            <label className="block text-xl font-bold mb-2">Email</label>
            <input 
                value={email}
                onChange={e => setEmail(e.target.value)}
                name="email" 
                type="email" 
                className="border-grey-200 border-2 rounded w-full p-2 h-10"
                required
            />
        </div>
        <div className="m-5">
            <label className="block text-xl font-bold mb-2">Password</label>
            <input 
                value={password}
                onChange={e => setPassword(e.target.value)}
                name="password" 
                type="password" 
                className="border-grey-200 border-2 rounded w-full p-2 h-10"
                required
            />
        </div>
        <div className="m-5">
            <label className="block text-xl font-bold mb-2">Confirm Password</label>
            <input 
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                name="password" 
                type="password" 
                className="border-grey-200 border-2 rounded w-full p-2 h-10"
                required
            />
        </div>
        <div className="m-5">
        {error && <p>Passwords need to match</p>}
        </div>
        <div className="m-5">
            <button 
                onClick={submitHandler}
                className="bg-gradient-to-r from-yellow-200 via-red-500 to-pink-500 text-white px-10 py-2 rounded text-xl font-bold"
            >
                { loading ? 'Updating ...' : 'Update' }
            </button>
        </div>
        <div className="m-5">
        <button onClick={() => setModal(false)}><u>Cancel</u></button>
        </div>
    </div>
    </div>
    )
}

export default UpdateProfileModal
