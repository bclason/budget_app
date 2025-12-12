import { useNavigate } from 'react-router-dom';
import NavigationBarComponent from './navigationBarComponent';

export default function Settings() {
    const navigate = useNavigate();

    return (
        <div style={{
            maxWidth: '430px',
            minHeight: '100vh',
            margin: '0 auto',
            border: '2px solid #646cff',
            position: 'relative',
            padding: '16px'
        }}>
            <h1>Settings Page</h1>
            <p>This is where the settings will be displayed.</p>
            <NavigationBarComponent />
        </div>
    );
}