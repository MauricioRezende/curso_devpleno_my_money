import React, { useState } from 'react'
import { useMesApi } from '../../api'

const InfoMes = props => {
    const { infoMes } = useMesApi(props.data)
    const [aux, setAux] = useState(true)

    if(props.aux && aux){
        console.log('>> Atualiza')
        infoMes.refetch()
        setAux(false)
        setTimeout(() => {
            setAux(true)   
        }, 1000);   
    }


    if(infoMes.loading){
        return <p>Carregando dados do mês...</p>
    }    
    
    if(infoMes.data){
        return (
            <div>
                Previsão entrada: {infoMes.data.previsao_entrada} / Previsão saída: {infoMes.data.previsao_saida}
                <br />
                Entrada: {infoMes.data.entradas} / Saída: {infoMes.data.saidas}
            </div>
        )
    }

    return null
}

export default InfoMes