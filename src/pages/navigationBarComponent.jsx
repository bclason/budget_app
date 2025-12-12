import { useNavigate } from "react-router-dom";


export default function NavigationBarComponent() {
    const navigate = useNavigate();
    
    return (
        <div
        style={{
            position: 'absolute',
            left: '-16px',
            bottom: '0',
            width: '390px',
            display: 'flex',
            justifyContent: 'space-around',
            backgroundColor: 'white',
            padding: '0',
            margin: '0',
            borderTop: 'none'
        }}>
            <button 
                onClick={() => navigate('/')}
                style={{ flex: 1, border: 'none', borderRadius: '0' }}
            >
                Home
            </button>
            <button 
                onClick={() => navigate('/transactions')}
                style={{ flex: 1, border: 'none', borderRadius: '0' }}
            >
                Transactions
            </button>
            <button 
                onClick={() => navigate('/categories')}
                style={{ flex: 1, border: 'none', borderRadius: '0' }}
            >
                Categories
            </button>
            <button 
                onClick={() => navigate('/calendar')}
                style={{ flex: 1, border: 'none', borderRadius: '0' }}
            >
                Calendar
            </button>
            <button 
                onClick={() => navigate('/settings')}
                style={{ flex: 1, border: 'none', borderRadius: '0' }}
            >
                Settings
            </button>
        </div>
    );
}