import React, { useState } from 'react';

const Account = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform validation on the username and password
        if (!username || !password) {
            setErrorMessage('Please enter both username and password.');
            return;
        }

        // Update the user's account information
        // Replace this with your actual API call or database update logic
        // For simplicity, we'll just log the updated information
        console.log('Updated username:', username);
        console.log('Updated password:', password);

        setSuccessMessage('Account information updated successfully.');
    };

    return (
        <div>
            <h2>Account</h2>
            {errorMessage && <p>{errorMessage}</p>}
            {successMessage && <p>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">Update Account</button>
            </form>
        </div>
    );
};

export default Account;
