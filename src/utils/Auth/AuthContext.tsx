
import React, {createContext, useContext, useEffect, useState,} from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from './config/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { getDoc, doc, setDoc, increment  } from 'firebase/firestore';
// import { updateDoc  } from 'firebase/firestore';
import { db } from './config/firebase';


interface Props {
    loginCredentials: any,
    currentUser: User | null | undefined,
    loginUser: () => void
    logoutUser: () => void
    resetCurrentUser: (userId: string) => void
    updateUserProgression: Function
}

interface User{
    avatar: string,
    email: string,
    nickName: string,
    phoneNumber: string,
    role:Array<string>,
    onBoardStatus:number,
    igeniusId:string,
    telegram: string,
}


const ApiContext = createContext<Props>({} as Props);


export const useAuth = () => {
    return useContext(ApiContext)
}

export const AuthProvider = (props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {

    const [loginCredentials, setLoginCredentials] = useState<any>({})
    const [currentUser, setCurrentUser] = useState<User | null | undefined>()
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
                            onBoardStatus:1,
                            igeniusId:"",
                            telegram: "",
                        }
                        try {
                                await setDoc(doc(db, "users", user.uid), userData);
                                setCurrentUser(userData)
                                navigate('/dashboard')
                                
                            
                        } catch (error) {
                            console.log(error)
                        }
                    }
                })
            }
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

    const updateUserProgression = async (id: string, obj: {location:string, locationValue: string}) => {
        const userRef = doc(db, 'users', id)
        await setDoc(userRef, {
            onBoardStatus: increment(1),
            [obj.location]: obj.locationValue
        }, {merge: true})
        getSingleUser(id).then( async (a) => {

            if(a){
                setCurrentUser(a as User)}})
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const  resetCurrentUser = (userId: string) => {
            getSingleUser(userId).then((a) => {
                setCurrentUser(a as User)
            })
    }

    useEffect(() => {
        const unsubcribeWhenDone = auth.onAuthStateChanged((user) => {
            setLoginCredentials(user)
            setLoading(false)
        })


        return unsubcribeWhenDone
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentUser])

    const value = {
        loginCredentials,
        currentUser,
        loginUser,
        logoutUser,
        resetCurrentUser,
        updateUserProgression
    }


    return(
        <ApiContext.Provider value={value}>
            {!loading && props.children}
        </ApiContext.Provider>
    )
}