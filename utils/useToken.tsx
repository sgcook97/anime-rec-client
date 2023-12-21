import { useState } from 'react';

function useToken() {
  function getToken(): string | null {
    if (typeof window !== 'undefined') {
      const userToken = localStorage.getItem('token');
      return userToken || null; // Return null explicitly if userToken is falsy
    }
    return null; // Handle case when window is undefined
  }

  const [token, setToken] = useState<string | null>(getToken());

  function saveToken(userToken: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', userToken);
      setToken(userToken);
    }
  }

  function removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      setToken(null);
    }
  }

  return {
    setToken: saveToken,
    token,
    removeToken,
  };
}
 
export default useToken;