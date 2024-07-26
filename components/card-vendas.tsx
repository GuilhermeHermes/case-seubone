'use client'
import React, { useState, useEffect } from 'react';
import { CardWrapper } from './auth/card-wrapper';
import { FaRegTrashAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { createVenda } from '@/data/venda';
import { adicionarProdutoAVenda } from '@/data/vendaproduto';
import {getProdutoBySku } from '@/data/produto';
import { calcularFrete} from '@/data/frete';



interface Product {
  sku: string;
  qtd: number;
  price?: number;
  id:   string;
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

interface SaleCreateCardProps {
    idSeller: string;
  }
  
  const SaleCreateCard: React.FC<SaleCreateCardProps> = ({ idSeller }) => {
    const [warningMessage, setWarningMessage] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[]>([{ sku: '', qtd: 0 , id: ''}]);
    const [sum, setSum] = useState(0);
    const [termValue, setTermValue] = useState(0);
    const [productsWithPrices, setProductsWithPrices] = useState<Product[]>([]);
    const [validDiscount, setValidDiscount] = useState(true);
    const { control, handleSubmit, register, watch, setValue, formState: { errors } } = useForm<FormValues>({
      defaultValues: {
        buyer: "",
        address: "",
        products: [{ sku: "", qtd: 0 }],
        freight: 0,
        discount: 0,
        maxDiscount: 0,
        totalValue: 0,
        term: "",
        paymentMethod: "",
      },
    });
  
    function roundToDecimal(num: number, decimals: number) {
      const factor = Math.pow(10, decimals);
      return Math.round(num * factor) / factor;
    }
  
    const watchProducts = watch('products');
    const watchTerm = watch('term');
    const watchFreight = watch('freight');
    const watchDiscount = watch('discount');
    const watchPaymentMethod = watch('paymentMethod');
    const watchAddress = watch('address');
  
    useEffect(() => {
      const calculateTotals = async () => {
        if (watchAddress.length === 8) {
          const watchFreight = await calcularFrete(watchAddress);
          setValue('freight', watchFreight || 0);
        }
        
        


        const paymentMethod = watchPaymentMethod;
        
        const productPromises = watchProducts.map(async (product) => {
          const produto = await getProdutoBySku(product.sku);
          return {
            ...product,
            price: (paymentMethod && paymentMethod === 'creditCard') ? produto?.preco_cheio || 0 : produto?.preco_descontado || 0,
            id: produto?.id || '',
          };
        });
  
        const productsWithPrices = await Promise.all(productPromises);
        setProductsWithPrices(productsWithPrices);
  
        const sumProducts = productsWithPrices.reduce((acc, product) => {
          const price = product.price || 0;
          return acc + (price * product.qtd);
        }, 0);

        setSum(sumProducts);

            const freight = watchFreight;
            const additionalTerm = watchTerm === 'TURBO' ?  0.10 : watchTerm === 'SUPER TURBO' ?  0.20 : 0;
            setTermValue(additionalTerm);
            const parcialValue = roundToDecimal(sumProducts * (1 + additionalTerm) + watchFreight, 2);
            const totalValue = roundToDecimal(parcialValue - (parcialValue * watchDiscount / 100), 2);
            const maxDiscount = roundToDecimal(
                watchTerm === 'TURBO' 
                    ? Math.max(watchFreight, sumProducts * 0.10) 
                    : watchTerm === 'SUPER TURBO' 
                    ? Math.max(watchFreight, sumProducts * 0.20) 
                    : Math.max(watchFreight, sumProducts * 0.05), 
                2
            );Math.max(freight, sumProducts * 0.05);
            
            

            setValue('totalValue', totalValue);
            setValue('maxDiscount', maxDiscount);
            
            const valueDiscount = totalValue * watchDiscount / 100;
            
            if (valueDiscount > maxDiscount) {
                setValidDiscount(true);
                setWarningMessage('Desconto excede o máximo permitido. Solicitação precisa ser aprovada pelo gerente.');
              } else {
                setWarningMessage(null);
              }
        };

        

        calculateTotals();
    }, [products, watchTerm, watchFreight, watchDiscount, watchPaymentMethod, watchProducts, watchAddress, setValue]);


    const handleAddProduct = () => {
        setProducts([...products, { sku: '', qtd: 0 , id: '' }]);
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
            [name]: name === 'qtd' ? (Number(value)>0 || 0 ? Number(value) : 0) : value,
        };
        setProducts(updatedProducts);
        setValue('products', updatedProducts);
    };

    const onSubmit = async (data: FormValues) => {
        if (!data.products.some(product => product.qtd > 0)) {
            alert('É necessário adicionar pelo menos um produto à venda.');
            return;
          }
        const totalValue = data.totalValue;
        const maxDiscount = data.maxDiscount;
        const discount = Number(data.discount);
        const finalStatus = validDiscount ? 'pending' : 'completed';
        console.log('Desconto:', finalStatus);
        if (data.discount > maxDiscount) {
            alert('Desconto excede o máximo permitido. Solicitação precisa ser aprovada pelo gerente.');
            return;
        }
        
        try {
            const venda = await createVenda({
                price: totalValue,
                frete: data.freight,
                totalAmount: totalValue,
                saleDate: new Date(),
                status: finalStatus,
                sellerId: idSeller, 
                buyer: data.buyer,
                discount: discount,
                maxDiscount: maxDiscount,
            });

            const produtos = productsWithPrices.map(p => ({
                SKU: p.sku,
                quantidade: p.qtd,
                precoUnitario: p.price || 0,
                produtoId: p.id, 
            }));

            produtos.forEach(async produto => {
                await adicionarProdutoAVenda(venda.id, produto);
              });

            alert('Venda cadastrada com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar venda:', error);
            alert('Erro ao cadastrar venda. Tente novamente.');
        }
    };
    
    const formatCurrency = (value:number) => `R$ ${roundToDecimal(value, 2).toFixed(2).replace('.', ',')}`;
    
    return (
        <CardWrapper BaseOrDark='dark' width='' headerLabel="Cadastre uma nova venda" backButtonlabel="" showSocial={false} backButtonHref='' headerTitle='Venda'>
            <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Comprador</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border rounded-md shadow-sm p-1.5 text-sm"
                            {...register('buyer' , { required: 'O nome do comprador é obrigatório' })}
                        />
                        {errors.buyer && <span className="text-red-500">{errors.buyer.message}</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">CEP</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border rounded-md shadow-sm p-1.5 text-sm"
                            {...register('address' , { required: 'O endereço é obrigatório' })}
                        />
                        {errors.address && <span className="text-red-500">{errors.address.message}</span>}
                        <label className="block text-sm font-medium text-gray-700 mt-2">Frete</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border rounded-md shadow-sm p-1.5 text-sm"
                            {...register('freight')}
                            readOnly
                            value={formatCurrency(watch('freight'))}
                        />
                    </div>
                </div>
                {products.map((product, index) => (
                    <div key={index} className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">Produto {index + 1}</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                name="sku"
                                value={product.sku}
                                onChange={(event) => handleInputChange(index, event)}
                                placeholder="SKU"
                                className="mt-1 block w-full border rounded-md shadow-sm p-1.5 text-sm"
                            />
                            <input
                                type="number"
                                name="qtd"
                                value={product.qtd || 0}
                                onChange={(event) => handleInputChange(index, event)}
                                placeholder="QTD"
                                className="mt-1 block w-24 border rounded-md shadow-sm p-1.5 text-sm"
                            />
                            {index === products.length - 1 && (
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={handleAddProduct}
                                        className="border rounded-md p-1.5 bg-gray-200 text-sm"
                                    >
                                        +
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleRemoveProduct}
                                        className="border rounded-md p-1.5 bg-gray-200 text-sm"
                                    >
                                        <FaRegTrashAlt />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Total dos Produtos</label>
                    <span className="block text-sm text-gray-900">{formatCurrency(sum)}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Prazo</label>
                        <select 
                            {...register('term')}
                            className="block w-full border rounded-md shadow-sm p-2 text-sm"
                        >
                            <option value="" disabled selected>Selecione um prazo</option>
                            <option value="PADRAO">PADRÃO</option>
                            <option value="TURBO">TURBO  +10%</option>
                            <option value="SUPER TURBO">SUPER TURBO   +20%</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mét. de Pagamento</label>
                        <select 
                            {...register('paymentMethod')}
                            className="block w-full border rounded-md shadow-sm p-2 text-sm"
                        >
                            <option value="" disabled selected>Selecione um método</option>
                            <option value="creditCard">Cartão</option>
                            <option value="debitCard">PIX</option>
                            <option value="debitCard">Boleto bancário</option>
                        </select>
                    </div>
                    <div className="mb-2 block" >
                    <label className="block text-sm font-medium text-gray-700">Desconto(%)</label> 
                    <input
                        type="number"
                        className="mt-1 block w-full border rounded-md shadow-sm p-1.5 text-sm"
                        {...register('discount')}
                        value={watchDiscount}
                        onChange={(e) => setValue('discount', Math.max(0, Math.min(100, Number(e.target.value))))} // Garante que o valor esteja entre 0 e 100
                    />
                </div>
                </div>
                <div className="flex justify-between items-center mb-2 gap-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Desconto Máx.</label>

                        <input
                            type="text"
                            className="mt-1 block w-full border rounded-md shadow-sm p-1.5 text-sm"
                            {...register('maxDiscount')}
                            value={formatCurrency(watch('maxDiscount'))}
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Valor Total</label>
                        <span className="block text-sm">(
                            <span className="text-gray-900">{formatCurrency(sum + watch('freight'))}</span> + 
                            <span className="text-red-500"> {termValue*100}%</span>) -
                            <span className="text-green-500"> {watch('discount')}%</span>
                        </span> 
                        <input
                        type="text"
                        className="mt-1 block w-full rounded-md p-2 focus:outline-none focus:ring-0 focus:border-gray-300"
                        {...register('totalValue')}
                        value={formatCurrency(watch('totalValue'))}
                        readOnly
/>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                    <button type="button" className="border rounded-md p-1.5 bg-gray-200 text-sm" onClick={() =>{ setValue('products', [{ sku: '', qtd: 0 , id: ''}] ), setProducts([{ sku: '', qtd: 0, id: '' }])}}>
                        Limpar
                    </button>
                    <button
                        type="submit"
                        className="border rounded-md p-1.5 bg-blue-500 text-white text-sm"
                    >
                        Enviar
                    </button>
                </div>
                {warningMessage && (
  <div className="mb-2 p-2 text-yellow-800 bg-yellow-200 rounded-md">
    {warningMessage}
  </div>
)}
            </form>
        </CardWrapper>
    );
};

export default SaleCreateCard;
