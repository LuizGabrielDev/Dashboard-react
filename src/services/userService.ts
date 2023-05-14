import api from "./api";

export interface User {
    id: number;
    password: string;
    email: string;
}

export async function getUserByEmail(email: string): Promise<User> {
    const response = await api.get(`/usuarios`, { params: { email } });
    return response.data[0];
}
