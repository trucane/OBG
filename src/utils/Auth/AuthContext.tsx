
import React, {createContext, useContext, useEffect, useState,} from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from './config/firebase';
import { signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getDoc, doc, setDoc, increment, collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from './config/firebase';


interface Props {
    loginCredentials: any,
    currentUser: User | null | undefined,
    users: Array<User>
    loading: boolean
    handleAlerts: Function
    dialog: DialogProp
    loginUser: () => void
    logoutUser: () => void
    resetCurrentUser: (userId: string) => void
    signUpwithEmail: (email: string, password: string) => void
    loginWithEmail: (email: string, password: string) => void
    getAllUsers: () => void
    updateUserProgression: Function
    backUserProgression: Function
}

export interface User{
    avatar: string,
    email: string,
    nickName: string,
    phoneNumber: string,
    role:Array<string>,
    onBoardStatus:number,
    igeniusId:string,
    telegramId: string,
    recruitedBy?: string
    account_type: string,
    timestamp: any
    userName: UserName
}

export type DialogProp = {
    alertType: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
    message: string
    open: boolean
}

type UserName = {
    firstName: string,
    lastName: string
}


const ApiContext = createContext<Props>({} as Props);


export const useAuth = () => {
    return useContext(ApiContext)
}

export const AuthProvider = (props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {

    const [loginCredentials, setLoginCredentials] = useState<any>({})
    const [currentUser, setCurrentUser] = useState<User | null | undefined>()
    const [dialog, setDialog] = useState<DialogProp>({
        message:"",
        open: false,
        alertType: 'info'
    })
    const [users, setUsers] = useState<Array<User>>([])
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
                            telegramId: "",
                            account_type:"",
                            timestamp: Timestamp.now().toDate().toString(),
                            userName:{
                                firstName: "",
                                lastName: ""
                            }
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

    const loginWithEmail = async (email: string, password: string) => {


        try {

            await signInWithEmailAndPassword(auth, email,password ).then().catch((error) => {
                let code = error.code.split('/')[1]

                if (code === 'wrong-password') {
                    setDialog({
                            message: 'Email and Password do not match',
                            alertType:'error',
                            open: true
                        }
                    )
                }
            })
            
        } catch (error) {
            
        }
    }

    const signUpwithEmail = async (email: string, password: string) => {

        try{
            await createUserWithEmailAndPassword(auth, email, password).then().catch((error) => {

                let code = error.code.split('/')[1]
                if (code === 'email-already-in-use') {
                    setDialog({
                            message: 'This email Already exist',
                            alertType:'error',
                            open: true
                        }
                    )
                }
            })

            auth.onAuthStateChanged((user) => {
                if(user?.uid){
                    getSingleUser(user.uid).then( async (a) => {
    
                        if(a){
                            setCurrentUser(a as User)
                        } else{
                            //create new user
                            let  userData= {
                                avatar: "",
                                nickName: "",
                                email: user.email || "",
                                phoneNumber: "",
                                role:['client'],
                                onBoardStatus:1,
                                igeniusId:"",
                                telegramId: "",
                                account_type:"",
                                timestamp: Timestamp.now().toDate().toString(),
                                userName:{
                                    firstName: "",
                                    lastName: ""
                                }
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
        }catch(error){
            console.log(`the error: ${error}`)
        }

    }

    const handleAlerts = () => {
        setDialog((prev) => {
            return{
                ...prev,
                message: "",
                open: !prev.open
            }
        })
    }


    const logoutUser = () => {
        setLoading(true)
        
        signOut(auth).then(value => {
            navigate('/')
        })
        auth.onAuthStateChanged((user) => {
            setCurrentUser(null)
            setLoading(false)
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

    const getAllUsers = async () => {
        let usersList: Array<User> = []
        try {
            const userCollection = await getDocs(collection(db, "users"));
            userCollection.forEach( userItem => (
                usersList.push(userItem.data() as User)
            ))
            setUsers(usersList)

            return usersList
        } catch(error) {
            console.log(error)
        }
        
        return null
    }

    const updateUserProgression = async (id: string, obj: {location:string, locationValue: string}) => {
        const userRef = doc(db, 'users', id)
        await setDoc(userRef, {
            onBoardStatus: obj.location === 'onboardStatus' ? null : increment(1),
            [obj.location]: obj.locationValue
        }, {merge: true})



        getSingleUser(id).then( async (a) => {
            if(a){
                setCurrentUser(a as User)}
        })

    }
    const backUserProgression = async (id: string) => {
        const userRef = doc(db, 'users', id)
        await setDoc(userRef, {
            onBoardStatus:  increment(-1),
        }, {merge: true})



        getSingleUser(id).then( async (a) => {
            if(a){
                setCurrentUser(a as User)}
        })

    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const  resetCurrentUser = (userId: string) => {
        setLoading(true)
            getSingleUser(userId).then((a) => {
                setCurrentUser(a as User)
                setLoading(false)
            })
    }

    // const sendAdminAlert = async () => {
    //     const adminCollection = await getDocs(collection(db, "administration")); 
    // }

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
        loading,
        users,
        dialog,
        loginUser,
        handleAlerts,
        logoutUser,
        resetCurrentUser,
        updateUserProgression,
        backUserProgression,
        signUpwithEmail,
        loginWithEmail,
        getAllUsers
    }


    return(
        <ApiContext.Provider value={value}>
            {!loading && props.children}
        </ApiContext.Provider>
    )
}