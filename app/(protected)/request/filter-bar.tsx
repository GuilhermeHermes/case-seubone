const FilterBar = () => {
    return (
      <div className="flex items-center space-x-4 mb-4">
        <label className="flex items-center space-x-2">
          <span>Filtros</span>
          <select className="border rounded p-2">
            <option>Situação</option>
            <option>Pendente</option>
            <option>Confirmado</option>
            <option>Cancelado</option>
          </select>
        </label>
        <select className="border rounded p-2">
          <option>Tipo de Pagamento</option>
          <option>Cartão de Crédito</option>
          <option>Boleto</option>
          <option>PIX</option>
        </select>
        <select className="border rounded p-2">
          <option>Tipo de Entrega</option>
          <option>Entrega Rápida</option>
          <option>Entrega Normal</option>
          <option>Retirada na Loja</option>
        </select>
        <input type="date" className="border rounded p-2" placeholder="Data" />
      </div>
    );
  };
  export default FilterBar;