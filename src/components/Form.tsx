import { useState } from 'react'
import calculateIp from '../services/calculateIp'
import BasicTable from './Table'

export function Form(){
  
  type IPv4 = `${number},${number},${number},${number}`
  const objectToCalculate = {
    ip: '',
    maskSubnet: '',
    isLoading: false,
    hostOrSubnet: '',
    hostBySubnet: 0,
    error: '',
    totalSubnets: 0
}

  const [ip,setIp] = useState<IPv4 | string>('')
  const [subnets, setSubnets] = useState<number>(0)

  const [results,setResults] = useState<typeof objectToCalculate>(objectToCalculate)

  const handleSubmit = (event : React.FormEvent) => {

    event.preventDefault()
    
    if(!ip || !subnets || results.hostOrSubnet === '') { alert('Por favor ingrese una ip y una subred valida'); return}
    setResults({...objectToCalculate, isLoading:true})

    const newMask = calculateIp(ip,[results.hostOrSubnet as 'sub'|'host',subnets])
    setResults(newMask)

  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const {name, value} = event.target;
    setResults({...objectToCalculate, isLoading:false})

    if (name === 'ip') {
      setIp(value as IPv4);
    } else if (name === 'subnets') {
      setSubnets(Number(value));
    } else if (name === 'tipo') {
      setResults({
        ...objectToCalculate, 
        hostOrSubnet: value
      })
    }

  }


  return (
    <>
      <h1>Ip Subnet calculator</h1>

        <form onSubmit={handleSubmit} className='form'>
        <div>
            <label htmlFor="ip">IP:</label>
            <input
              type="text"
              id="ip"
              name="ip"
              value={ip}
              onChange={handleInputChange}
              placeholder="Ej: 192.168.1.0"
            />
          </div>

          <div>


            <label htmlFor="subnets">Value to calculate:</label>
            <input
              type="number"
              id="subnets"
              name="subnets"
              value={subnets=== 0?'': subnets}
              onChange={handleInputChange}
              min="1"
              placeholder="Número de subredes"
            />
          </div>

          <section className='radio-content'>

            <div className='input-radio'>
              <input type="radio" id="subredes" name="tipo" value="sub" checked={results.hostOrSubnet === 'sub'}  onChange={handleInputChange}  /> 
              <label htmlFor="subredes">Subnets</label>
            </div>

            <div className='input-radio'>
              <input type="radio" id="hosts" name="tipo" value="host" checked={results.hostOrSubnet === 'host'} onChange={handleInputChange}/> 
              <label htmlFor="hosts">Hosts</label> 
            </div>

          </section>

          <div>
            <button type="submit">Calculate Subnets</button>
          </div>
        </form>

        {(results.isLoading === true) ?
            (
                <main>
                    <p><b>IP:</b> {results.ip}</p> 
                    <p><b>Hosts by subnet:</b> {results.hostBySubnet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>   
                    <p><b>Mask Subnet:</b>  {results.maskSubnet}</p>
                    {
                      subnets > 5 
                        ? <i>It is divided into {results.totalSubnets} networks, but only the first 5 are shown</i>
                        : <br />
                    }

                    <BasicTable ip={results.ip} totalSubnets = {results.totalSubnets} subnets={subnets} type={results.hostOrSubnet as 'sub' | 'host'}/>
                </main>
            ):(
              results.error !== '' 
                ? <p>{results.error}</p>
                : <p>No value entered yet</p>
            )
        }
    </>
  )
}
