import React, {useEffect, useReducer} from 'react'
import axios from 'axios'

const reducer = (state, action) =>{
    if(action.type == 'REQUEST'){
      return{
        ...state,
        loading: true
      }
    }
  
    if(action.type == 'SUCCESS'){
      return{
        ...state,
        loading: false,
        data: action.data
      }
    }
    
    return state
  }
  
  const useGet = url => {
    const [data, dispatch] = useReducer(reducer,{
      loading: false,
      data: {}
    })
  
    useEffect(()=>{
      dispatch({type: 'REQUEST'})
      axios
        .get(url)
        .then(res => {
            dispatch({type: 'SUCCESS', data: res.data})
        })
    },[])
  
    return data
  }

  export default useGet