import { useEffect } from 'react';
// import { db } from '../../../utils/Auth/config/firebase';
// import {collection, getDocs, doc } from 'firebase/firestore';
import { useAuth } from '../../../utils/Auth/AuthContext';

import './home.css'
import { useNavigate } from 'react-router-dom';

export const Home = () => {

    const navigate = useNavigate()

    // const [loading, setLoading] = useState<boolean>(true)
    // const userCollection = collection(db, 'users')
    // const userRef = doc(db, 'users', "IrUeQAIdqFva4j6NjO47")

    const {loginUser, currentUser} = useAuth()


    const handleSignIn = async () => {
        try {
          await loginUser()
        } catch (error) {
          console.log('error')
        }
      }
    
    useEffect(() => {

        


        // const callUserAction = async () => {
        //     const list: Array<any> = []
        //     if(loading){
        //         setLoading(false)

        //         try {
        //             const data = await getDocs(userCollection)
        //             data.docs.map(a => list.push({...a.data(), id: a.id}))
        //         } catch (error) {
        //             setLoading(false)
        //             console.log(error)
        //         }
        //     }

        //     return false

        // }
        // const getSingleUser = async () => {
        //     try {
        //         // const docSnap = await getDoc(userRef);
        //         // console.log(docSnap.data());
        //     } catch(error) {
        //         console.log(error)
        //     }

        // }

        
        // callUserAction()
        // getSingleUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentUser])
    // },[loading, userCollection, userRef])


    return(
        <div className="home-page">
            <div className="container">

                <iframe
                    className="hero-video"
                    src="https://www.youtube.com/embed/mpiKMCv2N3k?rel=0&enablejsapi=1"
                    title="YouTube video player"  
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen/>
                <div className="get-started">
                    <button className="btn" onClick={handleSignIn}> Get Started</button>
                </div>
            </div>
        </div>
    )
}

