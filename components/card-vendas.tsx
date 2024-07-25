'use client'
import React, { useState, useEffect } from 'react';
import { CardWrapper } from './auth/card-wrapper';
import { FaRegTrashAlt } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import { createVenda } from '@/data/venda';
import { addProdutosToVenda } from '@/data/vendaproduto';

interface Product {
  sku: string;
  qtd: number;
}

interface FormValues {
  buyer: string;
  address: string;
  products: Product[];
  freight: number;
  discount: number;
  maxDiscount: number;
  totalValue: number;
  term: string;
  paymentMethod: string;
}

const SaleCreateCard = () => {
    const [products, setProducts] = useState<Product[]>([{ sku: '', qtd: 0 }]);

    const { control, handleSubmit, register, watch, setValue } = useForm<FormValues>({
        defaultValues: {
            buyer: "",
            address: "",
            products: [{ sku: "", qtd: 0 }],
            freight: 5,
            discount: 0,
            maxDiscount: 0,
            totalValue: 0,
            term: "",
            paymentMethod: "",
        },
    });

    const watchProducts = watch('products');
    const watchTerm = watch('term');
    const watchFreight = watch('freight');
    const watchDiscount = watch('discount');

    useEffect(() => {
        const calculateTotals = () => {
            const sumProducts = products.reduce((acc, product) => acc + (product.qtd * 10), 0); // Ajuste de preço do produto
            const freight = watchFreight;
            const additionalTerm = watchTerm === 'TURBO' ? sumProducts * 0.10 : watchTerm === 'SUPER TURBO' ? sumProducts * 0.20 : 0;
            const totalValue = sumProducts + freight + additionalTerm - watchDiscount;
            const maxDiscount = watchTerm === 'TURBO' 
                ? Math.max(freight, sumProducts * 0.10) 
                : watchTerm === 'SUPER TURBO' 
                ? Math.max(freight, sumProducts * 0.20) 
                : Math.max(freight, sumProducts * 0.05);

            setValue('totalValue', totalValue);
            setValue('maxDiscount', maxDiscount);
        };

        calculateTotals();
    }, [products, watchTerm, watchFreight, watchDiscount, setValue]);

    const handleAddProduct = () => {
        setProducts([...products, { sku: '', qtd: 0 }]);
    };

    const handleRemoveProduct = () => {
        if (products.length === 1) return;
        const values = [...products];
        values.pop();
        setProducts(values);
    };

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const updatedProducts = [...products];
        updatedProducts[index] = {
            ...updatedProducts[index],
            [name]: name === 'qtd' ? Number(value) || 0 : value,
        };
        setProducts(updatedProducts);
        setValue('products', updatedProducts);
    };

    const onSubmit = async (data: FormValues) => {
        const totalValue = data.totalValue;
        const maxDiscount = data.maxDiscount;

        if (data.discount > maxDiscount) {
            alert('Desconto excede o máximo permitido. Solicitação precisa ser aprovada pelo gerente.');
            // Implementar a lógica de solicitação de aprovação se necessário
            return;
        }

        try {
            // Criação da venda
            const venda = await createVenda({
                price: totalValue,
                frete: data.freight,
                totalAmount: totalValue,
                saleDate: new Date(),
                status: "pending", // Ou outro status inicial
                sellerId: "id-do-vendedor", // Substituir pelo ID real do vendedor
                buyer: data.buyer,
            });

            // Adicionar produtos à venda
            const produtos = data.products.map(p => ({
                  //TODO: verificar se o produto existe

                produtoId: parseInt(p.sku), // Ajustar conforme necessário
                quantidade: p.qtd,
                precoUnitario: 10 // Ajustar conforme necessário
            }));

            await addProdutosToVenda(venda.id, produtos);

            alert('Venda cadastrada com sucesso!');
            // Redirecionar ou limpar formulário após o sucesso
        } catch (error) {
            console.error('Erro ao cadastrar venda:', error);
            alert('Erro ao cadastrar venda. Tente novamente.');
        }
    };

    return (
        <CardWrapper headerLabel="Cadastre uma nova venda" backButtonlabel="" showSocial={false} backButtonHref='' headerTitle='Venda'>
            <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Comprador</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border rounded-md shadow-sm p-2"
                            {...register('buyer')}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Endereço</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border rounded-md shadow-sm p-2"
                            {...register('address')}
                        />
                        <label className="block text-sm font-medium text-gray-700">Frete</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border rounded-md shadow-sm p-2"
                            {...register('freight')}
                            readOnly
                        />
                    </div>
                </div>
                {products.map((product, index) => (
                    <div key={index} className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Produto {index + 1}</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                name="sku"
                                value={product.sku}
                                onChange={(event) => handleInputChange(index, event)}
                                placeholder="SKU"
                                className="mt-1 block w-full border rounded-md shadow-sm p-2"
                            />
                            <input
                                type="number"
                                name="qtd"
                                value={product.qtd || ''}
                                onChange={(event) => handleInputChange(index, event)}
                                placeholder="QTD"
                                className="mt-1 block w-24 border rounded-md shadow-sm p-2"
                            />
                            {index === products.length - 1 && (
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={handleAddProduct}
                                        className="border rounded-md p-2 bg-gray-200"
                                    >
                                        +
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleRemoveProduct}
                                        className="border rounded-md p-2 bg-gray-200"
                                    >
                                        <FaRegTrashAlt />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Prazo</label>
                        <select 
                            {...register('term')}
                            className=" block w-full border rounded-md shadow-sm p-3.5"
                        >
                            <option value="" disabled selected>Selecione um prazo</option>
                            <option value="PADRAO">PADRÃO</option>
                            <option value="TURBO">TURBO</option>
                            <option value="SUPER TURBO">SUPER TURBO</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mét. de Pagamento</label>
                        <select 
                            {...register('paymentMethod')}
                            className=" block w-full border rounded-md shadow-sm p-3.5"
                        >
                            <option value="" disabled selected>Selecione um método</option>
                            <option value="creditCard">Cartão</option>
                            <option value="debitCard">PIX</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-between items-center mb-4 gap-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Desconto Máx.</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border rounded-md shadow-sm p-2"
                            {...register('maxDiscount')}
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Valor Total</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border rounded-md shadow-sm p-2"
                            {...register('totalValue')}
                            readOnly
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                <button type="button" className="border rounded-md p-2 bg-gray-200" onClick={() => setProducts([{ sku: '', qtd: 0 }])}>
                        Limpar
                    </button>
                    <button
                        type="submit"
                        className="border rounded-md p-2 bg-blue-500 text-white"
                    >
                        Enviar
                    </button>
                </div>
            </form>
        </CardWrapper>
    );
};


export default SaleCreateCard;

export const SKUs = [
    {
      SKU: "TR.BD.PA.0A",
      produto: "Trucker, logo em Bordado, tecido Padrão, 0 Aplicações Extras",
      preco_cheio: 33.9,
      preco_descontado: 29.9,
    },
    {
      SKU: "TR.BD.PA.1A",
      produto: "Trucker, logo em Bordado, tecido Padrão, 1 Aplicação Extra",
      preco_cheio: 36.1,
      preco_descontado: 31.9,
    },
    {
      SKU: "TR.BD.PA.2A",
      produto: "Trucker, logo em Bordado, tecido Padrão, 2 Aplicações Extras",
      preco_cheio: 38.3,
      preco_descontado: 33.9,
    },
    {
      SKU: "TR.BD.PA.3A",
      produto: "Trucker, logo em Bordado, tecido Padrão, 3 Aplicações Extras",
      preco_cheio: 40.5,
      preco_descontado: 35.9,
    },
    {
      SKU: "TR.BD.PA.4A",
      produto: "Trucker, logo em Bordado, tecido Padrão, 4 Aplicações Extras",
      preco_cheio: 42.7,
      preco_descontado: 37.9,
    },
    {
      SKU: "TR.BD.PA.5A",
      produto: "Trucker, logo em Bordado, tecido Padrão, 5 Aplicações Extras",
      preco_cheio: 44.9,
      preco_descontado: 39.9,
    },
    {
      SKU: "TR.BD.PA.6A",
      produto: "Trucker, logo em Bordado, tecido Padrão, 6 Aplicações Extras",
      preco_cheio: 47.1,
      preco_descontado: 41.9,
    },
    {
      SKU: "TR.BD.PA.7A",
      produto: "Trucker, logo em Bordado, tecido Padrão, 7 Aplicações Extras",
      preco_cheio: 49.3,
      preco_descontado: 43.9,
    },
    {
      SKU: "TR.BD.PA.8A",
      produto: "Trucker, logo em Bordado, tecido Padrão, 8 Aplicações Extras",
      preco_cheio: 51.5,
      preco_descontado: 45.9,
    },
    {
      SKU: "TR.BD.PR.0A",
      produto: "Trucker, logo em Bordado, tecido Premium, 0 Aplicações Extras",
      preco_cheio: 38.3,
      preco_descontado: 33.9,
    },
    {
      SKU: "TR.BD.PR.1A",
      produto: "Trucker, logo em Bordado, tecido Premium, 1 Aplicação Extra",
      preco_cheio: 40.5,
      preco_descontado: 35.9,
    },
    {
      SKU: "TR.BD.PR.2A",
      produto: "Trucker, logo em Bordado, tecido Premium, 2 Aplicações Extras",
      preco_cheio: 42.7,
      preco_descontado: 37.9,
    },
    {
      SKU: "TR.BD.PR.3A",
      produto: "Trucker, logo em Bordado, tecido Premium, 3 Aplicações Extras",
      preco_cheio: 44.9,
      preco_descontado: 39.9,
    },
    {
      SKU: "TR.BD.PR.4A",
      produto: "Trucker, logo em Bordado, tecido Premium, 4 Aplicações Extras",
      preco_cheio: 47.1,
      preco_descontado: 41.9,
    },
    {
      SKU: "TR.BD.PR.5A",
      produto: "Trucker, logo em Bordado, tecido Premium, 5 Aplicações Extras",
      preco_cheio: 49.3,
      preco_descontado: 43.9,
    },
    {
      SKU: "TR.BD.PR.6A",
      produto: "Trucker, logo em Bordado, tecido Premium, 6 Aplicações Extras",
      preco_cheio: 51.5,
      preco_descontado: 45.9,
    },
    {
      SKU: "TR.BD.PR.7A",
      produto: "Trucker, logo em Bordado, tecido Premium, 7 Aplicações Extras",
      preco_cheio: 53.7,
      preco_descontado: 47.9,
    },
    {
      SKU: "TR.BD.PR.8A",
      produto: "Trucker, logo em Bordado, tecido Premium, 8 Aplicações Extras",
      preco_cheio: 55.9,
      preco_descontado: 49.9,
    },
    {
      SKU: "TR.SK.PA.0A",
      produto: "Trucker, logo em Silk 3D, tecido Padrão, 0 Aplicações Extras",
      preco_cheio: 33.9,
      preco_descontado: 29.9,
    },
    {
      SKU: "TR.SK.PA.1A",
      produto: "Trucker, logo em Silk 3D, tecido Padrão, 1 Aplicação Extra",
      preco_cheio: 36.1,
      preco_descontado: 31.9,
    },
    {
      SKU: "TR.SK.PA.2A",
      produto: "Trucker, logo em Silk 3D, tecido Padrão, 2 Aplicações Extras",
      preco_cheio: 38.3,
      preco_descontado: 33.9,
    },
    {
      SKU: "TR.SK.PA.3A",
      produto: "Trucker, logo em Silk 3D, tecido Padrão, 3 Aplicações Extras",
      preco_cheio: 40.5,
      preco_descontado: 35.9,
    }
]