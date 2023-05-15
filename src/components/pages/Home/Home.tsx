import { useAuth } from '../../../utils/Auth/AuthContext';
import './home.css'

export const Home = () => {

    const {loginUser} = useAuth()


    const handleSignIn = async () => {
        loginUser()
    }

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

