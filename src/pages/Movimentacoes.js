import React, { useState, useEffect } from 'react'
import Rest from '../utils/rest'

const baseURL = 'https://mymoney-dev-mauricio-default-rtdb.firebaseio.com/'

const { useGet, usePost, useDelete, usePatch} = Rest(baseURL)

const Movimentacoes = (props) => {
    const data = useGet('movimentacoes/' + props.match.params.data)
    const [dataPost, salvar] = usePost('movimentacoes/' + props.match.params.data)

    const dataMeses = useGet('meses/' + props.match.params.data)

    const [dataMesesPost, salvarMeses] = usePost('meses/' + props.match.params.data)

    const [dataAlterarMeses, alterarMeses] = usePatch()
    
    
    const [dataDelete, remover] = useDelete()
    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState('')

    const onChangeDescricao = evt => {
        setDescricao(evt.target.value)
    }
    
    const onChangeValor = res => {
        setValor(res.target.value)
    }
    
    const salvarMovimentacao = async() => {
        if(!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0){
            await salvar({
                descricao,
                valor: parseFloat(valor)
            })

            let entradas = 0
            let saidas = 0
            
            if(data.data){

                if(valor > 0){
                    entradas = parseFloat(valor)
                }else{
                    saidas = parseFloat(valor)
                }

                Object
                    .keys(data.data)
                    .map(movimentacao => {
                        if(data.data[movimentacao].valor > 0){
                            entradas += data.data[movimentacao].valor
                        }else{
                            saidas += data.data[movimentacao].valor
                        }
                    })
            }else{
                if(valor > 0){
                    entradas = parseFloat(valor)
                }else{
                    saidas = parseFloat(valor)
                }
            }
                                
            alterarMeses('meses/' + props.match.params.data, {
                entradas,
                previsao_entrada: 0,
                previsao_saida: 0,
                saidas
            })

            setDescricao('')
            setValor(0)
            data.refetch()
            setTimeout(() => {
                dataMeses.refetch()
            }, 3000);
        }
    }

    const removerMovimentacao = async(id) => {
        await remover('movimentacoes/' + props.match.params.data + '/' + id)
        data.refetch()
    }

    return (
        <div>
            <h1>Movimentações</h1>
            { 
                !dataMeses.loading && dataMeses.data &&
                <div>
                    Previsão entrada: {dataMeses.data.previsao_entrada} / Previsão saída: {dataMeses.data.previsao_saida}
                    <br />
                    Entrada: {dataMeses.data.entradas} / Saída: {dataMeses.data.saidas}
                </div>
            }
            <table className='table'>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { data.data &&
                        Object
                            .keys(data.data)
                            .map(movimentacao => {
                                return (
                                    <tr key={movimentacao}>
                                        <td>{data.data[movimentacao].descricao}</td>
                                        <td>{data.data[movimentacao].valor}</td>
                                        <td><button onClick={() => {removerMovimentacao(movimentacao)}}>-</button></td>
                                    </tr>
                                )
                            })
                    }
                    <tr>
                        <td><input type='text' value={descricao} onChange={onChangeDescricao} /></td>
                        <td><input type='text' value={valor} onChange={onChangeValor}/></td>
                        <td><button onClick={salvarMovimentacao}>+</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        )
}

export default Movimentacoes