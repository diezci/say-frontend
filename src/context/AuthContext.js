import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, refreshToken } from '../services/api';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    error: null
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken();
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const verifyToken = async () => {
    try {
      const response = await refreshToken();
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: response.user,
          token: response.token
        }
      });
      localStorage.setItem('token', response.token);
    } catch (error) {
      localStorage.removeItem('token');
      dispatch({ type: 'AUTH_ERROR', payload: error.message });
    }
  };

  const login = async (email, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await apiLogin(email, password);
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: response.user,
          token: response.token
        }
      });
      
      localStorage.setItem('token', response.token);
      return response;
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: error.message });
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await apiRegister(userData);
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: response.user,
          token: response.token
        }
      });
      
      localStorage.setItem('token', response.token);
      return response;
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: error.message });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  const value = {
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    error: state.error,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
