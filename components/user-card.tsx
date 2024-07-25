import React, { useState, CSSProperties } from "react";
import Image from 'next/image'
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt, FaSpinner } from "react-icons/fa";
import { deleteUser } from '@/data/user';



interface User {
    id: string;
    name: string | null;
    email: string;
    password: string | null;
    image: string | null;
    role: string;
}

interface UserCardProps {
    user: User;
}

const handleDeleteUser = async (id: string, setLoading: (value: boolean) => void) => {
    setLoading(true);
   
        try {
            console.log('Deleting user with id:', id);
            const deletedUser = await deleteUser(id);
            console.log(deletedUser);
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(async () => {
                setLoading(false);
            }, 5000);
        }

}


const defaultImage = '/assets/default-user-icon.jpg'; // Substitua com o caminho para a imagem padrão

const UserCard = ({user}: UserCardProps) => {
    let [loading, setLoading] = useState(false);
    return (
        <div className="bg-gray-100 shadow-lg rounded-lg p-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <Image
                    src={user.image || defaultImage}
                    alt={user.name || 'Default Image'}
                    className="w-16 h-16 rounded-full object-cover"
                    width={50}
                    height={50}
                />
                <div>
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p className="text-gray-500">{user.email}</p>
                    <p className="text-gray-500">VENDEDOR(A)</p>
                </div>
            </div>
            <div className="ml-auto flex items-center gap-4 text-xl">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <CiEdit/>
                </button>
                <button
                    onClick={() => handleDeleteUser(user.id, setLoading)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    disabled={loading} // Desabilita o botão enquanto está carregando
                >
                    {loading ? (
                        <FaSpinner className="animate-spin" />
                    ) : (
                        <FaRegTrashAlt />
                    )}
                </button>
            </div>
        </div>
    );
};

export default UserCard;
