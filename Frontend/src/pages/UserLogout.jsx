import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
    const token = localStorage.getItem('token') 
    const navigate = useNavigate(); 

    axios.post(`${import.meta.env.VITE_API_URL}/user/logout`, {
        headers:{
            Authorization : `Bearer ${token}`
        }
    }).then((response)=>{
        if(response.status === 200){
            localStorage.removeItem('token');
            navigate('/login');
        }
    })
      .catch(error => {
      console.log(error);
    });


  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  )
}

export default UserLogout
