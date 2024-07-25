import { auth } from '@/auth';
import SalesCreateCard from '@/components/card-vendas';
import { Venda, columns } from "./columns"
import { DataTable } from "./data-table"
import CreateVendas from './create-venda';
import FilterBar from './filter-bar';

async function getData(): Promise<Venda[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      seller: 'João',
      amount: 100,
      status: "Pendente",
      cliente: "Cleiton Rasta miguelito suarez comercio e raçoes LTDA @CIA",
    },
    {
      id: "1f3ed52f",
      seller: 'Casimiro',
      amount: 1500,
      status: "Confirmado",
      cliente: "Miguelito",
    },
    {
      id: "1f3ed52f",
      seller: 'Casimiro',
      amount: 1500,
      status: "Confirmado",
      cliente: "Miguelito",
    },
    {
      id: "1f3ed52f",
      seller: 'Casimiro',
      amount: 1500,
      status: "Confirmado",
      cliente: "Miguelito",
    },
    {
      id: "1f3ed52f",
      seller: 'Casimiro',
      amount: 1500,
      status: "Confirmado",
      cliente: "Miguelito",
    },
    {
      id: "1f3ed52f",
      seller: 'Casimiro',
      amount: 1500,
      status: "Confirmado",
      cliente: "Miguelito",
    },
    {
      id: "1f3ed52f",
      seller: 'Casimiro',
      amount: 1500,
      status: "Confirmado",
      cliente: "Miguelito",
    },
    {
      id: "1f3ed52f",
      seller: 'Casimiro',
      amount: 1500,
      status: "Confirmado",
      cliente: "Miguelito",
    },
    {
      id: "1f3ed52f",
      seller: 'Casimiro',
      amount: 1500,
      status: "Confirmado",
      cliente: "Miguelito",
    },
    {
      id: "1f3ed52f",
      seller: 'Casimiro',
      amount: 1500,
      status: "Confirmado",
      cliente: "Miguelito",
    },
    {
      id: "1f3ed52f",
      seller: 'Casimiro',
      amount: 1500,
      status: "Confirmado",
      cliente: "Miguelito",
    },
    {
      id: "1f3ed52f",
      seller: 'Casimiro',
      amount: 1500,
      status: "Confirmado",
      cliente: "Miguelito",
    },
    {
      id: "1f3ed52f",
      seller: 'Casimiro',
      amount: 1500,
      status: "Confirmado",
      cliente: "Miguelito",
    },
    {
      id: "1f3ed52f",
      seller: 'Casimiro',
      amount: 1500,
      status: "Confirmado",
      cliente: "Miguelito",
    },
    {
      id: "1f3ed52f",
      seller: 'Casimiro',
      amount: 1500,
      status: "Confirmado",
      cliente: "Miguelito",
    },
    {
      id: "1f3ed52f",
      seller: 'Casimiro',
      amount: 1500,
      status: "Confirmado",
      cliente: "Miguelito",
    },

  ]
}


const SalesPage = async () => {
    const session = await auth()
    const data = await getData()

    return (  
        <div className='flex flex-col justify-center items-center'>
          <div className='flex mt-2'>
            <FilterBar/>
          <CreateVendas/>
          </div>
           <DataTable columns={columns} data={data} />
        </div>
    );
};

export default SalesPage;
