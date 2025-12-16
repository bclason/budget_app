import { useNavigate } from "react-router-dom";


export default function NavigationBarComponent({ userId }) {
    const navigate = useNavigate();
    
    return (
        <div
        style={{
            position: 'absolute',
            left: '-16px',
            bottom: '0',
            width: '390px',
            display: 'flex',
            // justifyContent: 'space-around',
            backgroundColor: 'white',
            // padding: '0',
            // margin: '0',
            // marginLeft: 'auto',
            // marginRight: 'auto',
            // borderTopLeftRadius: '8px',
            // borderTopRightRadius: '8px',
            // boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
            // borderTop: 'none'
        }}>
            <button 
                onClick={() => navigate('/')}
                style={{ flex: 1, border: 'none', borderRadius: '0' }}
            >
                Home
            </button>
            <button 
                onClick={() => navigate('/transactions', { state: { userId } })}
                style={{ flex: 1, border: 'none', borderRadius: '0' }}
            >
                Transactions
            </button>
            <button 
                onClick={() => navigate('/categories', { state: { userId } })}
                style={{ flex: 1, border: 'none', borderRadius: '0' }}
            >
                Categories
            </button>
            <button 
                onClick={() => navigate('/calendar', { state: { userId } })}
                style={{ flex: 1, border: 'none', borderRadius: '0' }}
            >
                Calendar
            </button>
            <button 
                onClick={() => navigate('/settings', { state: { userId } })}
                style={{ flex: 1, border: 'none', borderRadius: '0' }}
            >
                Settings
            </button>
        </div>
    );
}