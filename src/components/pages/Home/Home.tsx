import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../../utils/Auth/AuthContext';
import './home.css'
import { Button } from '@mui/material';

export const Home = () => {

    // const {loginUser} = useAuth()
    const navigate = useNavigate()


    // const handleSignIn = async () => {
    //     loginUser()
    // }

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
                    <Button className="btn" variant='contained' color='primary' onClick={() => navigate('/create-account')}>
                        Get Started
                    </Button>
                </div>
            </div>
        </div>
    )
}




