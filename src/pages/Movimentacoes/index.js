import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useMesApi, useMovimentacoesApi} from '../../api'
import InfoMes from './InfoMes'
// import AdicionarMovimentacao from './AdicionarMovimentacao'

const Movimentacoes = (props) => {
    const { infoMes, alterarMeses, salvarMeses } = useMesApi(props.match.params.data)
    const { movimentacoes, salvarNovaMovimentacao, removerMovimentacao } = useMovimentacoesApi(props.match.params.data)
    
    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState('')
    const [aux, setAux] = useState(false)

    const onChangeDescricao = evt => {
        setDescricao(evt.target.value)
    }
    
    const onChangeValor = res => {
        setValor(res.target.value)
    }

    const salvarMovimentacao = async() => {
        if(!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0){
            await salvarNovaMovimentacao({
                descricao,
                valor: parseFloat(valor)
            })

            let entradas = 0
            let saidas = 0
            
            if(movimentacoes.data){

                if(valor > 0){
                    entradas = parseFloat(valor)
                }else{
                    saidas = parseFloat(valor)
                }

                Object
                    .keys(movimentacoes.data)
                    .map(movimentacao => {
                        if(movimentacoes.data[movimentacao].valor > 0){
                            entradas += movimentacoes.data[movimentacao].valor
                        }else{
                            saidas += movimentacoes.data[movimentacao].valor
                        }
                    })
            }else{
                if(valor > 0){
                    entradas = parseFloat(valor)
                }else{
                    saidas = parseFloat(valor)
                }
            }
                                
            alterarMeses({
                entradas,
                previsao_entrada: 0,
                previsao_saida: 0,
                saidas
            })

            setDescricao('')
            setValor(0)
            movimentacoes.refetch()
            
            setTimeout(() => {
                setAux(true) 
                setAux(false) 
            }, 3000);
        }

        
    }

    const removerMovimentacaoClick = async(id) => {
        await removerMovimentacao('movimentacoes/' + props.match.params.data + '/' + id)
        movimentacoes.refetch()

        let entradas = 0
        let saidas = 0

        if(movimentacoes.data){

            if(valor > 0){
                entradas = parseFloat(valor)
            }else{
                saidas = parseFloat(valor)
            }

            Object
                .keys(movimentacoes.data)
                .filter(m => m !== id)
                .map(movimentacao => {
                    if(movimentacoes.data[movimentacao].valor > 0){
                        entradas += movimentacoes.data[movimentacao].valor
                    }else{
                        saidas += movimentacoes.data[movimentacao].valor
                    }
                })
        }else{
            if(valor > 0){
                entradas = parseFloat(valor)
            }else{
                saidas = parseFloat(valor)
            }
        }
                  
        alterarMeses({
            entradas,
            previsao_entrada: 0,
            previsao_saida: 0,
            saidas
        })

        setTimeout(() => {
            setAux(true) 
            setAux(false) 
        }, 3000);

    }
    
    if(movimentacoes.error === 'Permission denied'){
        return <Redirect to='/login' />
    }

    return (
        <div>
            <h1>Movimentações</h1>
            <InfoMes data={props.match.params.data} aux={aux}/>
            
            <table className='table'>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { movimentacoes.data &&
                        Object
                            .keys(movimentacoes.data)
                            .map(movimentacao => {
                                return (
                                    <tr key={movimentacao}>
                                        <td>{movimentacoes.data[movimentacao].descricao}</td>
                                        <td>{movimentacoes.data[movimentacao].valor}</td>
                                        <td><button onClick={() => {removerMovimentacaoClick(movimentacao)}}>-</button></td>
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