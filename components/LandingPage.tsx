import React, { useEffect, useState } from 'react'
import AnimeSelection from './AnimeSelection';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import useToken from '@/utils/useToken';
import userHandler from '@/utils/userHandler';
import FrontPage from './FrontPage';

interface UserData {
    userId: string | null;
    username: string | null;
    hasRatings: boolean
}

export default function LandingPage() {

    const [isFrontPage, setIsFrontPage] = useState(true);
    const [currForm, setCurrForm] = useState("login");

    const { setToken, token, removeToken } = useToken();

    const [activeUser, setActiveUser] = useState<UserData | undefined>(undefined);

    const { handleLoginSuccess, isLoggedIn, getActiveUser, handleLogout } = userHandler();
    
    const ToggleForm = (formName : string) => {
        setCurrForm(formName)
    }

    const ToggleFrontPage = () => {
        setIsFrontPage(!isFrontPage);
    }

    useEffect(() => {
        if (isLoggedIn()) {
        setActiveUser(getActiveUser());
        }
    }, [token]);

    const hasRatedItems = () => {
        return activeUser?.hasRatings;
    };

    return (
        <div>
            {isFrontPage ?
                <div className='front-page'>
                    <FrontPage ToggleFrontPage={ToggleFrontPage} />
                </div>
                :
                (!token && token!=="" && token!== undefined) ? 
                    (currForm === "login" ? 
                        <Login setToken={setToken} onFormSwitch={ToggleForm} handleLogin={handleLoginSuccess} ToggleFrontPage={ToggleFrontPage} /> 
                    : 
                        <Register setToken={setToken} onFormSwitch={ToggleForm} handleLogin={handleLoginSuccess} ToggleFrontPage={ToggleFrontPage} />
                    ) : (hasRatedItems() ? (
                        <Home 
                            token={token}
                            setToken={setToken}
                            activeUser={activeUser}
                            removeToken={removeToken}
                            handleLogout={handleLogout}
                        />
                    ) : (
                        <AnimeSelection 
                            token={token}
                            setToken={setToken}
                            activeUser={activeUser}
                            removeToken={removeToken}
                            handleLogout={handleLogout}
                        />
                    )
                )
            }
        </div>
    )
}
