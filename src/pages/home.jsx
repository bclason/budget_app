import { useEffect, useState } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useNavigate } from "react-router-dom";
import NavigationBarComponent from "./navigationBarComponent";  

export default function Home() {
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(1); // or get from auth/context
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Fetch user data
                const userResponse = await fetch(`/api/users`);
                const users = await userResponse.json();
                const currentUser = users.find(u => u.id === userId);
                if (currentUser) {
                    setUser(currentUser);
                }

                // Fetch user balance
                // const balanceResponse = await fetch(`/users/${userId}/balance`);
                // const balanceData = await balanceResponse.json();
                // setUserBalance(currentUser.balance || 0);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        
        fetchUser();
    }, [userId]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch(`/api/users/${userId}/transactions`);
                const transactionsData = await response.json();
                // Sort by recency (newest first) - assuming created_at or start_date field
                const sortedData = transactionsData.sort((a, b) => 
                    new Date(b.created_at || b.start_date) - new Date(a.created_at || a.start_date)
                );
                setTransactions(sortedData);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, [userId]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`/api/users/${userId}/categories`);
                const categoriesData = await response.json();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, [userId]);

    const newTransaction = async () => {
        navigate('/newtransaction');
    };

    return (
        <div style={{
            width: '390px',
            height: '844px',
            margin: '0 auto',
            border: '2px solid #646cff',
            position: 'relative',
            padding: '16px',
            boxSizing: 'border-box',
            overflow: 'auto'
        }}>
            <h1>{user ? user.name : 'Loading...'}'s Budget</h1>

            <h2>Balance: ${user ? user.income - user.expenses : 0}</h2>
            <div style={{ height: '22px', width: '100%' }}>
                <ProgressBar style={{ height: '100%' }}>
                    <ProgressBar
                        variant="danger"
                        now={user ? (user.expenses / user.income) * 100 : 0}
                        label={`$${user?.expenses || 0}`} 
                    />
                    <ProgressBar 
                        variant="success"
                        now={user ? ((user.income - user.expenses) / user.income) * 100 : 0}
                        label={`$${user ? user.income - user.expenses : 0}`}
                    />
                </ProgressBar>
            </div>

            <div>
                <div onClick={() => navigate('/transactions', { state: { userId: userId } })}>
                <h3>Transactions</h3>
                </div>
                <ul>
                    {transactions.slice(0, 5).map(transaction => (
                        <li key={transaction.tid}>
                            {transaction.description}: {' '}
                            <span className={transaction.type ? 'income' : 'expense'}>
                                ${transaction.amount}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* add progress bars, add switching between budget and non budget categories, add 5 most recent transactions per category */}
            {/* non budget categories should display balance (category.income - category.expenses) */}
            <div>
                <div onClick={() => navigate('/categories', { state: { userId: userId } })}>
                <h3>Categories</h3>
                </div>
                <ul>
                    {categories.slice(0, 3).map(category => (
                        <li key={category.id}>
                            <span>
                                <button>
                                    {category.name}{category.recurrence_type !== 'none' ? ` (${category.recurrence_type})` : ''}: ${category.budget} ∨
                                </button>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        

            <button 
                onClick={newTransaction}
                style={{
                    position: 'absolute',
                    bottom: '24px',
                    right: '24px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    padding: '0',
                    overflow: 'hidden'
                }}>
                <img 
                    src="/red-green_button.png" 
                    alt="Add transaction"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            </button>


            <div
                style={{
                    position: 'absolute',
                    bottom: '0'
                }}>
                <NavigationBarComponent userId={userId} />
            </div>
        </div>
    );
}