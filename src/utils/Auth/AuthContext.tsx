import React, {createContext, useContext, useEffect, useState,} from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from './firebase';
import { signInWithPopup, signOut } from 'firebase/auth';


interface Props {
    currentUser: any,
    loginUser: Function
    logoutUser: Function
}


const AuthContext = createContext<Props>({} as Props);


export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = (props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {

    const [currentUser, setCurrentUser] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate() 

    const loginUser = () => {
        signInWithPopup(auth, provider).then(value => {
            navigate('/dashboard')
        })
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
        })
    }
    const logoutUser = () => {
        
        signOut(auth).then(value => {
            navigate('/')
        })
        auth.onAuthStateChanged((user) => {
            setCurrentUser(null)
        })
    }

    useEffect(() => {
        const unsubcribeWhenDone = auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubcribeWhenDone
    },[])

    const value = {
        currentUser,
        loginUser,
        logoutUser
    }


    return(
        <AuthContext.Provider value={value}>
            {!loading && props.children}
        </AuthContext.Provider>
    )
}