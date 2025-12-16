import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavigationBarComponent from './navigationBarComponent';

export default function Repeating() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("Select");
    const [interval, setInterval] = useState();

    const [openDay, setOpenDay] = useState(false);
    const [selectedDays, setSelectedDays] = useState([]);
    
    const toggleDay = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(d => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    // const changeType = (new_type) => {
    //     setType = new_type;
    //     if (new_type === "daily") {

    //     }
    // }

    // useEffect on type?

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

            {/* add back button */}
            <h2>Custom Repeating Event</h2>


            <div style={{ 
                position: 'relative', 
                fontSize: '25px',
                gap: '0.5rem',
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '15px'
                }}>
                <button onClick={() => setOpen(!open)}>
                {type} {!open ? "V" : "Ʌ"}</button>

                {open && (
                    <>
                    {type !== "Daily" && <button onClick={() => {setType("Daily"); setOpen(!open);}}>Daily</button>}
                    {type !== "Weekly" && <button onClick={() => {setType("Weekly"); setOpen(!open);}}>Weekly</button>}
                    {type !== "Monthly" && <button onClick={() => {setType("Monthly"); setOpen(!open);}}>Monthly</button>}
                    {type !== "Yearly" && <button onClick={() => {setType("Yearly"); setOpen(!open);}}>Yearly</button>}
                    </>
                )}
            </div>

            {type === "Daily" && (
                <div style={{
                    fontSize: '25px'
                }}
                >Repeat Every {}
                    <input 
                    style={{ 
                        width: '15%',
                        marginBottom: '20px'
                    }} 
                    type='text' 
                    value={interval}
                    onChange={e => setInterval(e.target.value)}
                    />
                    {} Days
                </div>
            )}

            {type === "Weekly" && (
                <div style={{
                    fontSize: '25px'
                }}
                >Repeat Every {}
                    <input 
                    style={{ 
                        width: '15%',
                        marginBottom: '20px'
                    }} 
                    type='text' 
                    value={interval}
                    onChange={e => setInterval(e.target.value)}
                    />
                    {} Weeks

                    <div>
                        On: {selectedDays.length > 0 ? selectedDays.join(', ') : 'Select days'}
                        <div style={{ 
                            fontSize: '20px',
                            gap: '0.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            marginTop: '10px'
                            }}>
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                <button 
                                    key={day}
                                    style={{
                                        backgroundColor: selectedDays.includes(day) ? '#646cff' : '#e0e0e0',
                                        color: selectedDays.includes(day) ? 'white' : 'black'
                                    }} 
                                    onClick={() => toggleDay(day)}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {type === "Monthly" && (
                <div style={{
                    fontSize: '25px'
                }}
                >Repeat Every {}
                    <input 
                    style={{ 
                        width: '15%',
                        marginBottom: '20px'
                    }} 
                    type='text' 
                    value={interval}
                    onChange={e => setInterval(e.target.value)}
                    />
                    {} Months

                    <div>
                        On: {selectedDays.length > 0 ? selectedDays.join(', ') : 'Select days'}
                        <div style={{ 
                            fontSize: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            marginTop: '10px'
                            }}>

                            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 
                            '11', '12', '13', '14', '15', '16', '17', '18', '19', 
                            '20', '21', '22', '23', '24', '25', '26', '27', '28', 
                            '29', '30', '31'].map(day => (
                                <button 
                                    key={day}
                                    style={{
                                        backgroundColor: selectedDays.includes(day) ? '#646cff' : '#e0e0e0',
                                        color: selectedDays.includes(day) ? 'white' : 'black'
                                    }} 
                                    onClick={() => toggleDay(day)}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {type === "Yearly" && (
                <div style={{
                    fontSize: '25px'
                }}
                >Repeat Every {}
                    <input 
                    style={{ 
                        width: '15%',
                        marginBottom: '20px'
                    }} 
                    type='text' 
                    value={interval}
                    onChange={e => setInterval(e.target.value)}
                    />
                    {} Years
                </div>
            )}

            {/* change to navigate back to origin (used for multiple pages) */}
            <button style={{
                position: 'absolute',
                bottom: '23px',
                width: '90%',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                fontSize: '25px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'red'
            }}
            onClick={() => navigate('/newCategory')}>
                Cancel
            </button>


        </div>
    );
}