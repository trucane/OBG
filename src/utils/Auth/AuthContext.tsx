
import React, {createContext, useContext, useEffect, useState,} from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from './config/firebase';
import { signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getDoc, doc, setDoc, increment, collection, getDocs, Timestamp } from 'firebase/firestore';
import axios from 'axios';
import { db } from './config/firebase';


interface Props {
    loginCredentials: any,
    currentUser: User | null | undefined,
    users: Array<User>
    loading: boolean
    handleAlerts: Function
    smsAdmins: Array<SMSAdmin>
    dialog: DialogProp
    loginUser: () => void
    getSMSAdmins: () => void
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

type SMSAdmin = {
    name: string,
    phoneNumber: string
}

type UserName = {
    firstName: string,
    lastName: string
}


const ApiContext = createContext<Props>({} as Props);


export const useAuth = () => {
    return useContext(ApiContext)
}


const apiDomain = () => {
    const production = process.env.NODE_ENV === 'production'
    return production ? 'https://magenta-duckanoo-a800a9.netlify.app' : `http://localhost:${process.env.REACT_APP_PORT}`
}

export const AuthProvider = (props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {




    const [loginCredentials, setLoginCredentials] = useState<any>({})
    const [currentUser, setCurrentUser] = useState<User | null | undefined>(null)
    const [smsAdmins, setSMSAdmins] = useState<Array<SMSAdmin>>([])
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
                if (code === 'user-not-found') {
                    setDialog({
                            message: 'No account registered with that email',
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
            
        } catch (error) {
            
        }
    }

    const signUpwithEmail = async (email: string, password: string) => {

        try{
            await createUserWithEmailAndPassword(auth, email, password).then().catch((error) => {

                let code = error.code.split('/')[1]
                if (code === 'email-already-in-use') {
                    setDialog({
                            message: 'This email already exist please login to your account',
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
            onBoardStatus: obj.location === 'onBoardStatus' ? null : increment(1),
            [obj.location]: obj.locationValue
        }, {merge: true}).then(() => {
            if(obj.location === 'onBoardStatus'){
                smsAdmins.map(( admin) => sendMessage(admin.phoneNumber))
            }
        })



        getSingleUser(id).then( async (a) => {
            if(a){
                setCurrentUser(a as User)}
        })

    }

    const sendMessage = async(recipient: string) => {
        const message = {
            // recipient: "+12193164600",
            textMessage:`A new client: ${currentUser?.userName.lastName}, ${currentUser?.userName.firstName} has registered on OBG888.com`
        }

        try {
            await axios.get(`${apiDomain()}/send-text?recipient=+${recipient}&textmessage=${message.textMessage} `)
            .then()
            .catch((error) => {
                console.log(error)
            })
        } catch (error) {
            
        }

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

    const getSMSAdmins = async() => {
        let list: Array<SMSAdmin> = []
        try {
            const adminCollection = await getDocs(collection(db, "adminModerators"));
            adminCollection.forEach( admin => (
                list.push(admin.data() as SMSAdmin)
            ))
            setSMSAdmins(list)

            return list
        } catch(error) {
            console.log(error)
        }
        
        return null
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
        smsAdmins,
        dialog,
        loginUser,
        handleAlerts,
        getSMSAdmins,
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