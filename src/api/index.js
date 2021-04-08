import Rest from '../utils/rest'

const baseURL = 'https://mymoney-dev-mauricio-default-rtdb.firebaseio.com/'

const { useGet, usePost, useDelete, usePatch} = Rest(baseURL)

export const useMesApi = (data) => {
    const infoMes = useGet('meses/' + data)
    const [dataMesesPost, salvarMeses] = usePost('meses/' + data)
    const [dataAlterarMeses, alterarMeses] = usePatch('meses/' + data)
    return { infoMes, alterarMeses, salvarMeses }
}

export const useMovimentacoesApi = (data) => {
    const movimentacoes = useGet('movimentacoes/' + data)
    const [dataPost, salvarNovaMovimentacao] = usePost('movimentacoes/' + data)
    const [dataDelete, removerMovimentacao] = useDelete()
    return {movimentacoes, salvarNovaMovimentacao, removerMovimentacao }
}