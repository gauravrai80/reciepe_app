import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../services/authApi';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('recipeExplorer_token'));
    const [loading, setLoading] = useState(true);

    // Restore session on mount
    useEffect(() => {
        const restoreSession = async () => {
            if (token) {
                try {
                    const data = await getCurrentUser(token);
                    setUser(data.user);
                } catch (error) {
                    // Token is invalid or expired
                    console.error('Session restore failed:', error);
                    localStorage.removeItem('recipeExplorer_token');
                    setToken(null);
                    setUser(null);
                }
            }
            setLoading(false);
        };
        restoreSession();
    }, []);

    const login = (tokenValue, userData) => {
        localStorage.setItem('recipeExplorer_token', tokenValue);
        setToken(tokenValue);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('recipeExplorer_token');
        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        token,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
