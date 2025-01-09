import { create } from "zustand";

interface AuthState {
    isAuthenticated: boolean;
    user: any | null;
    session: string | null;
    setUser?: (user: any) => void;
    setIsAuthenticated?: (isAuthenticated: boolean) => void;
    setSession?: (session: any) => void;
}

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated : false,
    user: null,
    session: "",
    setUser: (user) => set({ user }),
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    setSession: (session) => set({ session }),
}));

export default useAuthStore;
