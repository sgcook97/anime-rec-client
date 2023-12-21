import React from "react";

interface UserData {
    userId: string | null;
    username: string | null;
    hasRatings: boolean;
}
  

function userHandler() {

    const handleLoginSuccess = (userData : any) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('userId', userData.userId);
            localStorage.setItem('username', userData.username);
            localStorage.setItem('hasRatings', userData.hasRatings);
        }
    }; 

    const isLoggedIn = () => {
        if (typeof window !== 'undefined') {
            return !!localStorage.getItem('token');
        }
        return false;
    };

    const getActiveUser = () => {
        if (typeof window !== 'undefined') {
          const userId = localStorage.getItem('userId');
          const username = localStorage.getItem('username');
          const hasRatings = localStorage.getItem('hasRatings') === "false" ? false : true;
      
          if (userId && username) {
            return { userId, username, hasRatings } as UserData;
          }
        }
      
        return undefined;
      };

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('userId');
            localStorage.removeItem('username');
            localStorage.removeItem('hasRatings');
        }

    };

    return {
        handleLoginSuccess,
        isLoggedIn,
        getActiveUser,
        handleLogout
    }
}

export default userHandler;