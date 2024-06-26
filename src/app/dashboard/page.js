"use client";
import{ useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Example authentication check. Replace this with your actual authentication logic.
      const authToken = localStorage.getItem('token'); // or use a context/state
      setIsAuthenticated(!!authToken);
      if (!authToken) {
        router.push('/login');
      } else {
        setLoading(false);
      }
    }
  }, [router]);

  if (loading) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <h1 className="text-4xl font-bold text-white">Welcome to the Dashboard!</h1>
    </div>
  );
};

export default Dashboard;
