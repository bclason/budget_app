import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavigationBarComponent from './navigationBarComponent';

export default function Categories() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const { state } = useLocation();
    const userId = state?.userId;

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

    const sortCategories = (categories) => {
        const sortedCats = [...categories].sort((a, b) => {
            if (a.last_used > b.last_used) return -1;
            if (a.last_used < b.last_used) return 1;
            return 0;
        });
        return sortedCats;
    }

    const newCategory = () => {
        navigate('/newcategory', { state: { userId } });
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
            <h1>Categories</h1>



            <ul>                
                {sortCategories(categories).map(category => (
                    <li key={category.id}>
                        {category.name}
                    </li>
                ))}
            </ul>

            <button 
                onClick={newCategory}
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
                    overflow: 'hidden',
                    fontSize: '48px',
                    fontWeight: 'bold',
                }}>
                    +
            </button>


            <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <NavigationBarComponent />
            </div>
        </div>
    );
}