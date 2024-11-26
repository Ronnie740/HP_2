import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchUser = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoading(false);
          return;
        }

        const response = await axios.get('/getUserInfo', {
          headers: { Authorization: token },
        });

        if (isMounted) {
          setUser(response.data);
          setError(null);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching user:', error);
          setError('Failed to fetch user data');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    user,
    isLoading,
    error,
    refetch: () => {
      setIsLoading(true);
      setError(null);
      fetchUser();
    }
  };
};

export default useFetchUser;