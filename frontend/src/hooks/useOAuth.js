import toast from 'react-hot-toast'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from "../firebase";
import { useNavigate } from 'react-router-dom';

const useOAuth = () => {
    const navigate = useNavigate();
    const oauth = async() => {
        try{
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            
            const res = await fetch('/api/auth/oauth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                })
            })
            const data = await res.json();
            console.log(data);
            
            navigate('/')
            toast.success("Successfully Logged In")
            
        } catch (error) {
            toast.error(error)
        }
    }

    return { oauth };
}

export default useOAuth;