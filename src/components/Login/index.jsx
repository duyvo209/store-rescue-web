import React from 'react';
import { auth, db } from '../../firebase';
import { useHistory } from "react-router-dom"
import './style.css';


export default function Login() {
    const [user, setUser] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [hasUser, setHasUser] = React.useState(false);
    const history = useHistory();

    const handleLogin = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(user => {
            history.push('/home');
        }).catch(err => {
            console.log(err);
        });
        
    }

    const authListener = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log(user);
                setUser(user);
            } else {
                setUser('');
            }
        });
    }

    React.useEffect(() => {
        authListener();
    }, []);

    return (
        <body>
            <div className='container'>
            <form className='login' onSubmit={handleLogin}>
                <div className='loginContainer'>
                    <p>Email</p>
                    <input className='input' type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='loginContainer'>
                    <p>Mật khẩu</p>
                    <input className='input' type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className='btnContainer'>
                    {hasUser ? (
                        <>
                            <div></div>     
                        </>
                    ) : (
                        <>
                        <input type="submit" className='btn' onClick={handleLogin} value="Đăng nhập" /> 
                        </>          
                    )}     
                            
                </div>
            </form>
        </div>
        </body>
        
        
    );
}


