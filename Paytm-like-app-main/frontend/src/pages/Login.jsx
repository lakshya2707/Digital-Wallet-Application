import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import Input from '../components/Input'
import Button from '../components/Button'
import BottomText from '../components/BottomText'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Login = ()=>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    return(
        <div className="grid h-screen place-items-center bg-gray-500">
            <div className="bg-gray-300 h-96 w-80 content-center shadow-2xl" >
                <Heading label={'Sign In'}/>
                <SubHeading lebel={'Enter your information to Signin an'} subLebel={"account"}/>
                <div className="ml-3">
                <Input lebel={"Email"} onChange={(e) => setUsername(e.target.value)} placeholder={"Enter your email"} type={"email"}/>
                <Input lebel={"Password"} onChange={(e) => setPassword(e.target.value)} placeholder={"Enter your password"} type={"password"}/>
               <Button onClick={async() => {
                   try {
                       const response = await axios.post('http://localhost:3000/api/v1/user/signin', {
                           username,
                           password
                       })
                       localStorage.setItem('token', response.data.token);
                       navigate('/dashboard');
                   } catch (error) {
                       alert(error.response?.data?.message || 'Login failed');
                   }
               }} label ={"Sign In"}/>
                </div>
                <BottomText label ={"Don't have account ? "} path={'/signup' } text={'signup'}/>
            </div>
         </div>
    )
}
export default Login