import React, { useState, useEffect } from 'react'
import Rest from '../utils/rest'

const baseURL = 'https://mymoney-dev-mauricio-default-rtdb.firebaseio.com/'

const { useGet, usePost, useDelete} = Rest(baseURL)

const Movimentacoes = (props) => {
    const data = useGet('movimentacoes/' + props.match.params.data)
    const [dataPost, salvar] = usePost('movimentacoes/' + props.match.params.data)
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
            setDescricao('')
            setValor(0)
            data.refetch()
        }
    }

    const removerMovimentacao = async(id) => {
        await remover('movimentacoes/' + props.match.params.data + '/' + id)
        data.refetch()
    }

    return (
        <div>
            <h1>Movimentações</h1>
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