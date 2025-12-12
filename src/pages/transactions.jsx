import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavigationBarComponent from './navigationBarComponent';

export default function Transactions() {
    const navigate = useNavigate();
    
    const [transactions, setTransactions] = useState([]);
    const [transactionFilter, setTransactionFilter] = useState('both'); // 'income', 'expense', 'both'
    const { state } = useLocation();
    const userId = state?.userId;


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

    const filteredTransactions = transactions.filter(transaction => {
        if (transactionFilter === 'both') return true;
        if (transactionFilter === 'income') return transaction.type === true;
        if (transactionFilter === 'expense') return transaction.type === false;
        return true;
    });

    const newTransaction = () => {
        navigate('/new-transaction', { state: { userId } });
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
            <h1>Transactions</h1>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <button 
                    onClick={() => setTransactionFilter('income')}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: transactionFilter === 'income' ? '#22c55e' : '#e0e0e0',
                        color: transactionFilter === 'income' ? 'white' : 'black',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        flex: 1
                    }}>
                    Income
                </button>
                <button 
                    onClick={() => setTransactionFilter('expense')}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: transactionFilter === 'expense' ? '#ef4444' : '#e0e0e0',
                        color: transactionFilter === 'expense' ? 'white' : 'black',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        flex: 1
                    }}>
                    Expenses
                </button>
                <button 
                    onClick={() => setTransactionFilter('both')}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: transactionFilter === 'both' ? '#646cff' : '#e0e0e0',
                        color: transactionFilter === 'both' ? 'white' : 'black',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        flex: 1
                    }}>
                    Both
                </button>
            </div>

            <ul>
                {filteredTransactions.map((transaction) => (
                    <li key={transaction.tid}>
                        {transaction.description}: {' '}
                            <span className={transaction.type ? 'income' : 'expense'}>
                                ${transaction.amount}
                            </span>
                    </li>
                ))}
            </ul>

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

            <div style={{
                position: 'absolute',
                bottom: '0'
            }}>
                <NavigationBarComponent />
            </div>

            
        </div>
    );
}