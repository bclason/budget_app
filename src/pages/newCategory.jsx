import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavigationBarComponent from './navigationBarComponent';

export default function NewCategory() {
    // need to get categories to avoid duplicates
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const { state } = useLocation();
    const userId = state?.userId;
    const [budget, setBudget] = useState(0);
    const [catName, setCatName] = useState("");
    const [budgetAmount, setBudgetAmount] = useState("")
    const [catDescription, setCatDescription] = useState("");
    const [budgetType, setBudgetType] = useState("none");
    const [customSelected, setCustomSelected] = useState(false);

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

    // need put for categories

    const saveInfo = () => {
        // update name, description, budget, 
    }   

    // const setBudgetType = (type) => {
    //     // switch between 
    // }


    

    // const updateName = async (name) => {
    //     // check for duplicate names
    //     const duplicate = categories.find(cat => cat.name.toLowerCase() === name.toLowerCase());
    //     if (duplicate) {
    //         alert("Category name already exists. Please choose a different name.");
    //         return;
    //     }

    //     try {
    //         const response = await fetch(`/api/users/${userId}/categories`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ name }),
    //         });

    //         if (response.ok) {
    //             // Successfully created category, navigate back to categories page
    //             navigate('/categories', { state: { userId } });
    //         } else {
    //             console.error('Failed to create category');
    //         }
    //     } catch (error) {
    //         console.error('Error creating category:', error);
    //     }
    // };


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
            <input 
                style={{ 
                    width: '95%',
                    padding: '5px',
                    fontSize: '30px',
                    marginBottom: '20px'
                }} 
                type='text' 
                placeholder="New Category"
                value={catName}
                onChange={e => setCatName(e.target.value)}
            />

            <textarea 
                style={{ 
                    width: '95%',
                    padding: '5px',
                    fontSize: '15px',
                    minHeight: '60px',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                }} 
                placeholder="Description (optional)"
                value={catDescription}
                onChange={e => setCatDescription(e.target.value)}
            />

            {/* <button
            style={{
                marginTop: '20px',
                marginBottom: '20px',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto'
                }}
                >
                {budget ? `Budget:${budget}` : "Set Budget (Optional):"}
            </button> */}
            <h3>Set Budget (optional)</h3>

            <div style={{
                fontSize:'24px',
            }}>
                <>$</>
                <input 
                    style={{ 
                        width: '51.5%',
                        padding: '1px',
                        marginBottom: '20px'
                    }} 
                    type='text' 
                    placeholder="None"
                    value={budgetAmount}
                    onChange={e => setBudgetAmount(e.target.value)}
                />
            </div>


            <div style={{
                position: 'absolute',
                flexDirection: 'column',
                width: '50%',
                display: 'flex',
                gap: '10px',
                left: '50%',
                transform: 'translateX(-50%)'
            }}>
                <button style={{
                    backgroundColor: budgetType === 'daily' ? '#646cff' : '#e0e0e0',
                }}
                    onClick={() => setBudgetType('daily')}
                >Daily</button>
                <button style={{
                    backgroundColor: budgetType === 'weekly' ? '#646cff' : '#e0e0e0',
                }}
                    onClick={() => setBudgetType('weekly')}
                >Weekly</button>
                <button style={{
                    backgroundColor: budgetType === 'monthly' ? '#646cff' : '#e0e0e0',
                }}
                    onClick={() => setBudgetType('monthly')}
                >Monthly</button>
                <button style={{
                    backgroundColor: budgetType === 'yearly' ? '#646cff' : '#e0e0e0',
                }}
                    onClick={() => setBudgetType('yearly')}
                >Yearly</button>
                <button style={{
                    backgroundColor: customSelected ? '#646cff' : '#e0e0e0',
                }}
                    onClick={() => {
                        // setBudgetType('custom');
                        // setCustomSelected(true);
                        navigate('/repeating');
                    }}
                >Custom</button>
                {/* come back to custom */}
            </div>

            {/* <div>
                {customSelected && (
                    <input style={{
                        
                    }}}
            </div> */}

            {/* on click save, save all inputs */}
            <div style={{
                position: 'absolute',
                bottom: '23px',
                width: '90%',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                fontSize: '25px',
                left: '50%',
                transform: 'translateX(-50%)'
            }}>
                <button
                style={{
                    color: 'green',
                    padding: '7px'
                }}
                onClick={saveInfo}
                >
                    Save
                </button>

                <button
                style={{
                    color: 'red',
                    padding: '7px'
                }}
                onClick={() => navigate('/categories', { state: { userId } })}>
                    Cancel
                </button>
            </div>

            {/* <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <NavigationBarComponent userId={userId} />
            </div> */}
        </div>
    );

}
