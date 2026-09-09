// Demo OAuth Authentication Service
// This simulates OAuth flow for demonstration purposes

export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    provider: 'google' | 'apple' | 'email';
    role?: 'user' | 'admin';
}

class AuthService {
    private static instance: AuthService;
    private currentUser: User | null = null;

    private constructor() {
        // Load user from localStorage on initialization
        if (typeof window !== 'undefined') {
            const savedUser = localStorage.getItem('vip_uzbe_user');
            if (savedUser) {
                this.currentUser = JSON.parse(savedUser);
            }
        }
    }

    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    // Simulate Google OAuth
    async loginWithGoogle(): Promise<User> {
        return new Promise((resolve) => {
            // Simulate OAuth popup delay
            setTimeout(() => {
                const user: User = {
                    id: 'google_' + Date.now(),
                    name: 'VIP Guest',
                    email: 'guest@gmail.com',
                    avatar: 'https://ui-avatars.com/api/?name=VIP+Guest&background=d4af37&color=0a0f1e&size=200',
                    provider: 'google'
                };
                this.setUser(user);
                resolve(user);
            }, 1500);
        });
    }

    // Simulate Apple OAuth
    async loginWithApple(): Promise<User> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const user: User = {
                    id: 'apple_' + Date.now(),
                    name: 'VIP Guest',
                    email: 'guest@icloud.com',
                    avatar: 'https://ui-avatars.com/api/?name=VIP+Guest&background=000000&color=ffffff&size=200',
                    provider: 'apple'
                };
                this.setUser(user);
                resolve(user);
            }, 1500);
        });
    }

    // Email/Password login
    async loginWithEmail(email: string, password: string): Promise<User> {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            if (data.success && data.user) {
                this.setUser(data.user);
                return data.user;
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            throw error;
        }
    }

    // Signup
    async signup(name: string, email: string, password: string): Promise<User> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const user: User = {
                    id: 'email_' + Date.now(),
                    name: name,
                    email: email,
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=d4af37&color=0a0f1e&size=200`,
                    provider: 'email'
                };
                this.setUser(user);
                resolve(user);
            }, 1000);
        });
    }

    private setUser(user: User) {
        this.currentUser = user;
        if (typeof window !== 'undefined') {
            localStorage.setItem('vip_uzbe_user', JSON.stringify(user));
            window.dispatchEvent(new Event('vip_auth_change'));
        }
    }

    getUser(): User | null {
        return this.currentUser;
    }

    logout() {
        this.currentUser = null;
        if (typeof window !== 'undefined') {
            localStorage.removeItem('vip_uzbe_user');
            window.dispatchEvent(new Event('vip_auth_change'));
        }
    }

    isAuthenticated(): boolean {
        return this.currentUser !== null;
    }
}

export default AuthService;
