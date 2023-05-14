import React, {createContext, useContext, useEffect, useState,} from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from './config/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { db } from './config/firebase';


interface Props {
    loginCredentials: any,
    currentUser: any,
    loginUser: Function
    logoutUser: Function
}

interface User{
    avatar: string,
    email: string,
    nickName: string,
    phoneNumber: string,
    role:Array<string>,
    onBoardStatus:string,
    igeniusId:string,
    telegram: string,
}


const ApiContext = createContext<Props>({} as Props);


export const useAuth = () => {
    return useContext(ApiContext)
}

export const AuthProvider = (props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {

    const [loginCredentials, setLoginCredentials] = useState<any>({})
    const [currentUser, setCurrentUser] = useState<User | null>()
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate() 

    const loginUser = () => {
        provider.setCustomParameters({
            prompt:'select_account'
        })
        signInWithPopup(auth, provider)

        auth.onAuthStateChanged((user) => {
            if(user?.uid){
                getSingleUser(user.uid).then( async (a) => {

                    if(a){
                        setCurrentUser(a as User)
                    } else{
                        //create new user
                        let  userData= {
                            avatar: user?.photoURL || "",
                            nickName: user.displayName || "",
                            email: user.email || "",
                            phoneNumber: user.phoneNumber || "",
                            role:['client'],
                            onBoardStatus:'not complete',
                            igeniusId:"",
                            telegram: "",
                        }
                        try {
                                await setDoc(doc(db, "users", user.uid), userData);
                                setCurrentUser(userData)
                                
                            
                        } catch (error) {
                            console.log(error)
                        }
                    }
                })
            }
            setLoginCredentials(user)
        })
    }
    const logoutUser = () => {
        
        signOut(auth).then(value => {
            navigate('/')
        })
        auth.onAuthStateChanged((user) => {
            setLoginCredentials(null)
            setCurrentUser(null)
        })
    }

    const getSingleUser = async (id: string) => {
        const userRef = doc(db, 'users', id)
        try {
            const docSnap = await getDoc(userRef);
                return docSnap.data();
        } catch(error) {
            console.log(error)
        }
        
        return null
    }

    useEffect(() => {
        const unsubcribeWhenDone = auth.onAuthStateChanged((user) => {
            setLoginCredentials(user)
            setLoading(false)
        })

        if(currentUser){
            navigate('/dashboard')
        }


        return unsubcribeWhenDone
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentUser])

    const value = {
        loginCredentials,
        currentUser,
        loginUser,
        logoutUser
    }

    // console.log(currentUser)


    return(
        <ApiContext.Provider value={value}>
            {!loading && props.children}
        </ApiContext.Provider>
    )
}