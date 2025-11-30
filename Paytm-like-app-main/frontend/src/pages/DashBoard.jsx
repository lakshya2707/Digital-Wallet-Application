import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard(){
    const [balance, setBalance] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        axios.get('http://localhost:3000/api/v1/account/balance', {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then(response => {
            setBalance(response.data.balance);
        })
        .catch(error => {
            console.error('Error fetching balance:', error);
            if (error.response?.status === 403) {
                navigate('/login');
            }
        });
    }, [navigate]);

    return(
        <>
        <AppBar/>
        <Balance amount={balance}/>
        <Users />
        </>
    )
}
export default Dashboard;