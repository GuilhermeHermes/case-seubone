'use client'
import React from 'react';
import useSWR from 'swr';

import { getAllVendedores } from '@/data/user';
import UserCard from './user-card';

// Função para buscar dados
const fetchVendedores = async () => {
    const vendedores = await getAllVendedores();
    return vendedores;
};

const UsersTable = () => {
    const { data: vendedores, error } = useSWR('vendedores', fetchVendedores, {
        revalidateOnFocus: true, // Revalida ao focar na aba
        refreshInterval: 5000, // Atualiza os dados a cada 5 segundos
    });
    console.log('VENDEDORESSSSSSSSS');

    if (error) return <div>Failed to load</div>;
    if (!vendedores) return <div>Loading...</div>;

    return (
        <div className="pt-14">
            <ul>
                {vendedores.map((vendedor) => (
                    <li className="p-5 rounded-md" key={vendedor.id}>
                        <UserCard user={vendedor} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersTable;
