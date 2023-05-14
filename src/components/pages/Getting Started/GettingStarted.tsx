import React, { useEffect } from 'react';
import { useAuth } from '../../../utils/Auth/AuthContext';
import { useNavigate } from 'react-router';


export const GettingStartedComponent = () => {

    const {currentUser, updateUserProgression, loginCredentials} = useAuth()
    const navigate = useNavigate()

    const showProgressionStage = () => {
        // const value = 1
        // switch (value) {
        switch (currentUser?.onBoardStatus) {
            case 1:
                return recruiter()
            case 2:
                return igenius()
            case 3:
                return fxsway()
            case 4:
                return mt4Trader()
            case 5:
                return linkMT4_to_Fxsway()
            case 6:
                return addOptionsOn_Mt4()
            case 7:
                return telegramId()
            case 8:
                return null
        
            default: return null
        }
    }

    const recruiter = () => {
        const onBoardProgression = () => {
            const obj = {
                location: 'recruitedBy',
                locationValue: 'Some one recruited me'
            }
            updateUserProgression(loginCredentials.uid, obj)
        }
    
        return <div className="igenius">
            <button onClick={onBoardProgression} > Who recruited you?</button>
        </div>
    }

    const igenius = () => {
        const onBoardProgression = () => {
            const obj = {
                location: 'igeniusId',
                locationValue: '3464w5ygwe5yw45yw4ew5'
            }
            updateUserProgression(loginCredentials.uid, obj)
        }
    
        return <div className="igenius">
            <button onClick={onBoardProgression} > Provide Igenius #</button>
        </div>
    }


    const fxsway = () => {
        const onBoardProgression = () => {
            const obj = {
                location: 'fxsway',
                locationValue: true
            }
            updateUserProgression(loginCredentials.uid, obj)
        }
    
        return <div className="igenius">
            <button onClick={onBoardProgression} > Did you set up FXSWAY account</button>
        </div>
    }

    const mt4Trader = () => {
        const onBoardProgression = () => {
            const obj = {
                location: 'fxsway',
                locationValue: true
            }
            updateUserProgression(loginCredentials.uid, obj)
        }
    
        return <div className="igenius">
            <button onClick={onBoardProgression} > Did you download MT4 App</button>
        </div>
    }
    const linkMT4_to_Fxsway = () => {
        const onBoardProgression = () => {
            const obj = {
                location: 'link_mt4_fxsway',
                locationValue: true
            }
            updateUserProgression(loginCredentials.uid, obj)
        }
    
        return <div className="igenius">
            <button onClick={onBoardProgression} > Did you link you MT4 trader account to FXWay account?</button>
        </div>
    }

    const addOptionsOn_Mt4 = () => {
        const onBoardProgression = () => {
            const obj = {
                location: 'add_mt4_options',
                locationValue: true
            }
            updateUserProgression(loginCredentials.uid, obj)
        }
    
        return <div className="igenius">
            <button onClick={onBoardProgression} > Add your options on your MT4 trader app</button>
        </div>
    }

    const telegramId = () => {
        const onBoardProgression = () => {
            const obj = {
                location: 'add_mt4_options',
                locationValue: true
            }
            updateUserProgression(loginCredentials.uid, obj)
        }
    
        return <div className="igenius">
            <button onClick={onBoardProgression} > Add your telegramId</button>
        </div>
    }

    useEffect(() => {
        if(currentUser && currentUser.onBoardStatus  === 8){
            navigate('/dashboard')
          }
    }, [currentUser, navigate])




    return <div className="getting-started">
        
        { currentUser?.onBoardStatus !== 8

        ? showProgressionStage()
        : <>complete</>
        }
    </div>
}