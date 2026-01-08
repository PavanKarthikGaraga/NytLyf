// Theme Context - Manages app-wide theme state
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { THEME_COLORS, ThemeColors } from '../constants/theme';

type ThemeMode = 'dark' | 'light';

interface ThemeContextType {
    theme: ThemeMode;
    isDark: boolean;
    colors: ThemeColors;
    toggleTheme: () => void;
    setTheme: (theme: ThemeMode) => void;
}

const THEME_STORAGE_KEY = '@nytlyf_theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<ThemeMode>('dark');
    const [isLoaded, setIsLoaded] = useState(false);

    // Load saved theme preference on mount
    useEffect(() => {
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
                if (savedTheme === 'light' || savedTheme === 'dark') {
                    setThemeState(savedTheme);
                }
            } catch (error) {
                console.warn('Failed to load theme preference:', error);
            } finally {
                setIsLoaded(true);
            }
        };
        loadTheme();
    }, []);

    // Save theme preference when it changes
    const setTheme = useCallback(async (newTheme: ThemeMode) => {
        setThemeState(newTheme);
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
        } catch (error) {
            console.warn('Failed to save theme preference:', error);
        }
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }, [theme, setTheme]);

    const value: ThemeContextType = {
        theme,
        isDark: theme === 'dark',
        colors: THEME_COLORS[theme],
        toggleTheme,
        setTheme,
    };

    // Don't render children until theme is loaded to prevent flash
    if (!isLoaded) {
        return null;
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextType {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

export default ThemeContext;
