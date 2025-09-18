import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { useContext, useState } from 'react';
import { UserContext } from '../Context/UserContext';


const UserProtectWrapper = ({
    children
}) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { setUser} = React.useContext(UserContext)
    const [isLoading,setIsLoading] = useState(true);

    useEffect(()=>{
        if(!token){
            navigate('/login');
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`,{
            headers : {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response =>{
            if(response.status === 200){
                setUser(response.data.user);
                setIsLoading(false);
            }
        })
        .catch(error =>{
            console.log(error);
            localStorage.removeItem('token');
            navigate('/login');
        })

    },[token])

    if(isLoading){
        return <div>Loading...</div>
    }

    return (
        <>
            {children}
        </>
    )
}

export default UserProtectWrapper
