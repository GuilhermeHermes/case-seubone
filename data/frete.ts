'use server'

export const obterEndereco = async (cep: string) => {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    console.log('Obtendo endereço:', url);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro na resposta da API');
        }
        const dados = await response.json();
        return dados;
    } catch (error) {
        console.error('Erro ao obter endereço:', error);
        return null;
    }
}

export const calcularFrete = async (cep: string) => {
    const endereco = await obterEndereco(cep);

    if (!endereco || !endereco.localidade || !endereco.uf) {
        console.error('Endereço inválido');
        return null;
    }

    const { localidade, uf } = endereco;

    // Verificar o estado e localidade para determinar o custo do frete
    if (uf === 'RN') {
        if (localidade === 'Natal') {
            return 20; // Frete para Natal/RN
        } else {
            return 50; // Frete para outras localidades no RN
        }
    } else {
        return 100; // Frete para fora do RN
    }
};
