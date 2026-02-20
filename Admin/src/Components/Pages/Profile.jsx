import React, { useEffect, useState, useContext } from 'react';
import Food from '../../Context/Fcontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const { cola } = useContext(Food);
    const [updateHandler, setUpdateHandler] = useState(false);
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState(null); // Store user data
    const navigate = useNavigate();

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8799/user/profile/${cola._id}`);
                const user = response.data?.user;
                if (user) {
                    setUserData(user);
                    setUsername(user.Username || ""); 
                    setEmail(user.email || "");
                    setAddress(user.Address || "");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, [cola._id, updateHandler]); // Removed `setUpdateHandler` from dependencies

    // Update user data
    const updatePush = async (e) => {
        e.preventDefault();
        if (!username || !email || !address) {
            alert("All fields are required!");
            return;
        }
        try {
            await axios.put(`http://localhost:8799/user/update/${cola._id}`, { 
                email, 
                Username: username, 
                Address: address 
            });
            alert("User updated successfully!");
            setUpdateHandler(false);
        } catch (error) {
            console.error("User Update Failed:", error);
            alert("User Update Failed..!");
        }
    };

    // Delete user account
    const dltHandler = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:8799/user/dlt/${cola._id}`);
            alert("Account Deleted..!");
            navigate('/'); // Redirect to home or login page after deletion
            localStorage.removeItem('uesr');
            localStorage.removeItem('christi')
        } catch (error) {
            console.error("Error: Account NOT Deleted", error);
            alert("ERROR: Unable to delete account.");
        }
    };

    if (!userData) {
        return <div className="text-center">Loading...</div>; 
    }

    return (
        <div>
            {updateHandler ? (
                <div className="h-[90vh] w-full flex-col bg-zinc-200 flex justify-center items-center">
                    <form onSubmit={updatePush} className="flex flex-col shadow-2xl bg-white h-[90%] rounded-3xl w-[90%] sm:w-[20%] gap-5 pt-8 items-center">
                        <img src="https://cdn-icons-png.flaticon.com/512/10337/10337609.png" className="h-40 w-40 rounded-full bg-black" />
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            className="text-2xl w-[85%] pl-10 text-zinc-500 rounded-sm font-semibold border-[1px]" 
                            placeholder="Username" 
                        />
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="text-md w-[85%] pl-10 rounded-sm text-zinc-500 font-semibold border-[1px]" 
                            placeholder="Email" 
                        />
                        <input 
                            type="text" 
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)} 
                            className="text-md w-[85%] pl-10 rounded-sm text-zinc-500 font-semibold border-[1px]" 
                            placeholder="Address" 
                        />
                        <button type="submit" className="h-8 w-60 bg-blue-600 rounded-md font-semibold text-white">
                            Submit
                        </button>
                        <button type="button" onClick={() => setUpdateHandler(false)} className="h-8 w-60 bg-blue-600 rounded-md font-semibold text-white">
                            View Profile
                        </button>
                    </form>
                </div>
            ) : (
                <div className="h-[90vh] w-full flex-col bg-zinc-200 flex justify-center items-center">
                    <div className="flex flex-col shadow-2xl bg-white h-[90%] rounded-3xl w-[90%] sm:w-[20%] gap-5 pt-8 items-center">
                        <img src="https://cdn-icons-png.flaticon.com/512/10337/10337609.png" className="h-40 w-40 rounded-full bg-black" />
                        <h2 className="text-2xl font-semibold">{userData.Username}</h2>
                        <h3>{userData.email}</h3>
                        <h3>{userData.Address}</h3>
                        <button onClick={() => setUpdateHandler(true)} className="h-8 w-60 bg-blue-600 rounded-md font-semibold text-white">
                            Edit Profile
                        </button>
                        <button type="button" onClick={dltHandler} className="h-8 w-60 bg-red-600 rounded-md font-semibold text-white">
                            Delete Account
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
