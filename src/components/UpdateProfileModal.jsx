import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { getAuth, updateProfile, updatePassword, updateEmail, signOut } from "firebase/auth"

const UpdateProfileModal = ({ modal, setModal, name, setName, setAuthObj, updateName, setUpdateName }) => {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ confirmPassword, setConfirmPassword ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)
    const navigate = useNavigate()
    const auth = getAuth()

    const submitHandler = () => {
        setLoading(true)
        const auth = getAuth()

        //update Name
        const user= auth.currentUser

        if (name !== '') {
            updateProfile(auth.currentUser, { displayName: name })
            setUpdateName(true)
        } 

        //email reset
        const newEmail = email

        updateEmail(auth.currentUser, newEmail)
            .then(console.log(newEmail))
            .catch((e) => alert(e.message))

        //password reset
        if (password !== confirmPassword){
            setError(true)
        }

        const newPassword = password;

        updatePassword(user, newPassword)
            .then(() => navigate('/dashboard'))
            .catch((e) => alert(e.message))
            .finally(() => setLoading(false))
        alert('Your information has been updated!')
        setModal(false)
    }

    const logout = () => {
        signOut(auth)
        .then(() => {
            localStorage.removeItem('token')
            navigate('/')
        })
        .catch((e) => alert(e.message))
    }

    return (
        <div className="top-0 w-screen h-screen fixed bg-gray-600 bg-opacity-80 flex items-center justify-center">
            <div className="w-80 bg-white rounded shadow-lg m-5">
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
                        placeholder="leave blank to keep current name"
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
                        placeholder="leave blank to keep current email"
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
                        placeholder="leave blank to keep current password"
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
                        placeholder="leave blank to keep current password"
                    />
                </div>
                <div className="m-5">
                    {error && <p>Passwords need to match</p>}
                </div>
                <div className="m-5">
                    <button 
                        onClick={submitHandler}
                        className="bg-green-600 text-white px-10 py-2 rounded text-xl font-bold"
                    >
                        { loading ? 'Updating ...' : 'Update' }
                    </button>
                </div>
                <button className="mx-5 mb-5" onClick={logout}>
                    <u>Logout</u>
                </button>
            </div>
        </div>
    )
}

export default UpdateProfileModal
