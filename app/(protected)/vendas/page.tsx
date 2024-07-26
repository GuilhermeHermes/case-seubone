
import { auth } from '@/auth';
import { Venda, columns } from "./columns"
import { DataTable } from "./data-table"
import CreateVendas from './create-venda';
import FilterBar from './filter-bar';
import { getAllVendas, getVendasByUser } from '@/data/venda';
import { getUserById } from '@/data/user';
import { CurrentUser } from '@/lib/auth';

const SalesPage = async () => {
  const user = await CurrentUser();
  let vendas; // Declare the 'vendas' variable here
  
  if (user?.role === 'USER') {
      vendas = await getVendasByUser(user?.id || ''); // Await the promise here
  } else {
      vendas = await getAllVendas(); // Await the promise here
  }
  
  const data = await Promise.all(vendas?.map(async (venda: Venda) => {
    const vendedor = await getUserById(venda.sellerId ?? '');
    return {
        id: venda.id,
        totalAmount: venda.totalAmount,
        status: venda.status,
        buyer: venda.buyer,
        saleDate: venda.saleDate,
        sellerId: venda.sellerId,
        discount: venda.discount,
        maxDiscount: venda.maxDiscount,
        frete: venda.frete,
        sellerName: vendedor?.name ?? ''// Add the 'vendedor' property here
    };
}) ?? []);
  
  return (  
      <div className='flex flex-col justify-center items-center'>
          <div className='flex mt-2'>
              <FilterBar/>
              <CreateVendas idSeller={user?.id ?? ''}/>
          </div>
          <DataTable columns={columns} data={data} />
      </div>
  );
};

export default SalesPage;
