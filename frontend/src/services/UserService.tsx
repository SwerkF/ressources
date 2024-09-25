import { Cookies } from 'react-cookie';
import { RegisterForm } from '../types/RegisterForm';
import { toast } from 'react-toastify';

class UserService {
    private readonly url: string;

    constructor() {
        this.url = "http://localhost:3000";
    }

    // Utiliser async/await pour simplifier la gestion des promesses
    async login(e: any) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`${this.url}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error during login:', error);
            throw error; // Rejeter la promesse en cas d'erreur
        }
    }

    async googleLogin(response: any) {
        try {
            const res = await fetch(`${this.url}/api/users/google`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tokenId: response.credential })
            });

            const result = await res.json();
            if(result.error) {
                throw new Error(result.error);
            }
            return result;
        } catch (error) {
            console.error('Error during Google login:', error);
            throw error; // Rejeter la promesse en cas d'erreur
        }
    }

    async register(userForm: RegisterForm) {
        console.log("userForm", userForm);
        try {
            const response = await fetch(`${this.url}/api/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userForm)
            });

            const result = await response.json();
            if(result.error) {
                toast.error(result.error);
                throw new Error(result.error);
            }
            return result;
        } catch (error) {
            console.error('Error during register:', error);
        }
    }

    async getProfile() {
       try {
            const sessionId = await this.getCookies();
            if(!sessionId) {
                return null;
            }
            const response = await fetch(`${this.url}/api/users/me`, {
                headers: {
                    'Authorization': sessionId
                }
            });

            const result = await response.json();
            if(result.error) {
                let cookies = new Cookies();
                cookies.remove('sessionId');
                return null;
            }
            return result;
        } catch (error) {
            console.error('Error during getProfile:', error);
            throw error;
        }
            
    }

    async updateProfile(data: FormData) {
        try {
            const sessionId = await this.getCookies();
            if (!sessionId) {
                return null;
            }
            console.log("sessionId", sessionId);
            const response = await fetch(`${this.url}/api/users/me`, {
                method: 'PUT',
                headers: {
                    'Authorization': sessionId,
                    // Content-Type header is not set here because FormData sets it automatically
                },
                body: data, // Send FormData directly
            });
    
            const result = await response.json();
            console.log("result", result);
            if (result.error) {
                throw new Error(result.error);
            }
            return result;
        } catch (error) {
            console.error('Error during updateProfile:', error);
            throw error;
        }
    }
    
    

    async getCookies() {
        const cookies = new Cookies();
        return await cookies.get('sessionId');
    }
}

export default UserService;
