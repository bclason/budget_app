import { useEffect, useState } from "react";

export default function Home() {
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(1); // or get from auth/context

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:8000/users`);
                const users = await response.json();
                // Get specific user by id
                const currentUser = users.find(u => u.id === userId);
                if (currentUser) {
                    setUser(currentUser);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        
        fetchUser();
    }, [userId]);

    const newTransaction = async () => {
        // Placeholder for future functionality
    };

    return (
        <div>
            <h1>{user ? user.name : 'Loading...'}'s Budget</h1>
            {user && <p>User ID: {user.id}</p>}
        </div>
    );
}