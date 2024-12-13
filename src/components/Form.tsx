import { useState } from 'react'
import calculateIp from '../services/calculateIp'
import BasicTable from './Table'

export function Form(){
  
  type IPv4 = `${number},${number},${number},${number}`
  const objectToCalculate = {
    ip: '',
    maskSubnet: '',
    isLoading: false,
    hostBySubnet: 0,
    error: ''
}

  const [ip,setIp] = useState<IPv4 | string>('')
  const [subnets, setSubnets] = useState<number>(0)

  const [results,setResults] = useState<typeof objectToCalculate>(objectToCalculate)

  const handleSubmit = (event : React.FormEvent) => {
    event.preventDefault()
    if(!ip || !subnets) { alert('Por favor ingrese una ip y una subred valida'); return}
    setResults({...objectToCalculate, isLoading:true})

    const newMask = calculateIp(ip,subnets)
    setResults(newMask)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value} = event.target;
    setResults({...objectToCalculate, isLoading:false})

    if (name === 'ip') {
      setIp(value as IPv4);
    } else if (name === 'subnets') {
      setSubnets(Number(value));
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
            <label htmlFor="subnets">Cantidad de subredes:</label>
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

          <div>
            <button type="submit">Calcular Subredes</button>
          </div>
        </form>

        {(results.isLoading === true) ?
            (
                <main>
                    <p><b>IP:</b> {results.ip}</p> 
                    <p><b>Hosts by subnet:</b> {results.hostBySubnet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>   
                    <p><b>Mask Subnet:</b>  {results.maskSubnet}</p>
                    <BasicTable ip={results.ip} totalSubnets = {results.hostBySubnet + 2} subnets={subnets}/>
                </main>
            ):(
              <p>Aun no se ingresa ningun valor</p>
            )
        }
    </>
  )
}
