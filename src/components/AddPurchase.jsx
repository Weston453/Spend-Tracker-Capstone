import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

const AddPurchase = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            navigate('/')
        }
    })



    return (
        <div className="w-full h-screen bg-gradient-to-r from-yellow-200 via-red-500 to-pink-500 flex center-items justify-center">
            add purchases
        </div>
    )
}

export default AddPurchase
