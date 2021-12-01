import React, { useState, useEffect } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ loading, setLoading ] = useState(false)


    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            navigate('/dashboard')
        }
    })

    // const onLogin = () => {
    //     setLoading(true)
    //     const auth = getAuth()
    //     signInWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {
    //             localStorage.setItem('token', userCredential._tokenResponse.idToken)
    //             navigate('/dashboard')
    //         })
    //         .catch(e => alert(e.message))
    //         .finally(() => setLoading(false))
    // }
    const onLogin = () => {
        setLoading(true)
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                localStorage.setItem('token', userCredential._tokenResponse.idToken)
                localStorage.setItem('userId', JSON.stringify(auth.currentUser.uid || 'we suck at life'))
                navigate('/dashboard')
            })
            .catch(e => alert(e.message))
            .finally(() => setLoading(false))
    }

    return (
        <div className="w-full h-screen bg-background bg-no-repeat bg-cover flex items-center justify-center"> 
            <div className="flex-col flex items-center">
                <h1 className="text-white text-4xl font-bold mb-5">Spend Tracker</h1>
                <div className="w-80 bg-white rounded shadow-lg mx-5">
                    <div className="m-5">
                        <h2 className="block text-xl font-bold mb-2 flex justify-center">Login</h2>
                    </div>
                    <div className="m-5">
                        <label className="block text-xl font-bold mb-2">Email</label>
                        <input 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        name="email" 
                        type="email" 
                        className="border-grey-200 border-2 rounded w-full p-2 h-10"
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
                        />
                    </div>
                    <div className="m-5 flex justify-center">
                        <button 
                            onClick={onLogin}
                            className="bg-green-600 text-white px-10 py-2 rounded text-xl font-bold">
                            { loading ? 'Logging in ...' : 'Login' }
                        </button>
                    </div>
                    <div className="mt-5 ml-5 mb-2 text-lg">
                        Need an Account? <Link to="/signup"><u>Sign Up</u></Link>
                    </div>
                    <div className="ml-5 mb-2 text-lg">
                        Forgot Password? <Link to="/ForgotPassword"><u>Reset Now</u></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
