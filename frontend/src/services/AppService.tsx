import useAuthStore from "../store/useAuthStore";

class AppService {
    
    private API_URL = import.meta.env.VITE_API_URL as string;

    constructor() {
        this.API_URL = import.meta.env.VITE_API_URL as string;
    }

    async login({email, password, accessToken, loginType} : {email?: string, password?: string, accessToken?: string, loginType?: string}) {
        const response = await fetch(`${this.API_URL}/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, accessToken, loginType }),
        });

        if (!response.ok) {
            throw new Error('Unable to login');
        }

        let data = await response.json();

        data = data.data;

        useAuthStore.setState({ user: data.user, session: data.session.id, isAuthenticated: true });

        localStorage.setItem('session', JSON.stringify(data.session.id));

        return data;
    }

    async me(session: string) {
        const response = await fetch(`${this.API_URL}/api/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': session,
            },            
        });

        if (!response.ok) {
            useAuthStore.setState({ isAuthenticated: false, user: null });
            localStorage.removeItem('session');
            throw new Error('Unable to get user');
        }

        const data = await response.json();

        useAuthStore.setState({ user: data.user, isAuthenticated: true });

        return data;

    }
    
}

export default new AppService();