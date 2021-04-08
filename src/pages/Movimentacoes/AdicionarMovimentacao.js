import React, { useState } from 'react'

const AdicionarMovimentacao = ({salvarNovaMovimentacao}) => {
    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState('')

    const salvarMovimentacao = async() => {
        salvarNovaMovimentacao()
    }

    const onChangeDescricao = evt => {
        setDescricao(evt.target.value)
    }
    
    const onChangeValor = res => {
        setValor(res.target.value)
    }

    return(
        <tr>
            <td><input type='text' value={descricao} onChange={onChangeDescricao} /></td>
            <td><input type='text' value={valor} onChange={onChangeValor}/></td>
            <td><button onClick={salvarMovimentacao}>+</button></td>
        </tr>
    )
}

export default AdicionarMovimentacao