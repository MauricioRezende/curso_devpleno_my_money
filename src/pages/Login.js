import React, { useEffect } from 'react'
import { usePost } from '../utils/rest'

const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBwAKAXwCVyZqadjQ-_xTwj5TRuz8BXEkM'

const Login = () => {
    const [postData, signin] = usePost(url)

    useEffect(() => {
        if(Object.keys(postData.data).length > 0){
            console.log(postData.data.idToken)
            localStorage.setItem('token', postData.data.idToken)
        }
    },[postData])

    const login = async() => {
        await signin({
            email: 'lmauricio-2010@hotmail.com',
            password: '123456a',
            returnSecureToken: true
        })
    }

    return(
        <div>
            <h1>Login</h1>
            {JSON.stringify(postData)}
            <button onClick={login}>Login</button>
        </div>
    )
}

export default Login
