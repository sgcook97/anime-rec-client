import React, { useEffect, useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import useToken from '../utils/useToken';
import Home from '../components/Home';
import userHandler from '../utils/userHandler';
import AnimeSelection from '../components/AnimeSelection';

interface UserData {
  userId: string | null;
  username: string | null;
  hasRatings: boolean
}

function Index() {

  const [currForm, setCurrForm] = useState("login")

  const { setToken, token, removeToken } = useToken();

  const [activeUser, setActiveUser] = useState<UserData | undefined>(undefined);

  const { handleLoginSuccess, isLoggedIn, getActiveUser, handleLogout } = userHandler();
  
  const ToggleForm = (formName : string) => {
    setCurrForm(formName)
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
    <div className='index-app' suppressHydrationWarning={true}>
      {(!token && token!=="" && token!== undefined) ? (
        currForm === "login" ? 
        <Login setToken={setToken} onFormSwitch={ToggleForm} handleLogin={handleLoginSuccess} /> 
        : 
        <Register setToken={setToken} onFormSwitch={ToggleForm} handleLogin={handleLoginSuccess} />
      ) : (
        hasRatedItems() ? (
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
      )}
    </div>
  );

}

export default Index;