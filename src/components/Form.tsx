import { useState } from 'react'
import calculateIp from '../services/calculateIp'

export function Form(){
  
  type IPv4 = `${number},${number},${number},${number}`
//   type maskHost = [string,number]

  const [ip,setIp] = useState<IPv4>()
  const [subnets, setSubnets] = useState<number>(0)

  const [results,setResults] = useState<number| string | null>(null)

  const handleSubmit = (event : React.FormEvent) => {
    event.preventDefault()
    setResults(null)
    if(!ip || !subnets) { alert('Por favor ingrese una ip y una subred valida'); return}
    
    const newMask = calculateIp(ip,subnets)
    setResults(newMask)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value} = event.target;

    if (name === 'ip') {
      setIp(value as IPv4);
    } else if (name === 'subnets') {
      setSubnets(Number(value));
    }
  }

  return (
    <>
      <h1>Ip Subnet calculator</h1>

        <form onSubmit={handleSubmit}>
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
              value={subnets}
              onChange={handleInputChange}
              min="1"
              placeholder="Número de subredes"
            />
          </div>

          <div>
            <button type="submit">Calcular Subredes</button>
          </div>
        </form>

        {results &&
            <p>{results}</p>    
        }
    </>
  )
}
