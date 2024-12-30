/* eslint-disable @typescript-eslint/no-unused-expressions */
import { IPv4 } from "../types/typesIP.ts"

function splitIP(ip: IPv4): number[] {
  return ip.split('.').map(Number)
}

function findZeroIndex(ipArray: number[]): number {
  return ipArray.findIndex(num => num === 0)
}

function adjustTotalSubnets(totalSubnets: number): number {
  while (totalSubnets > 256) {
    totalSubnets = Math.ceil(totalSubnets / 256)
  }
  return totalSubnets
}

function createRow(
          ipArray: number[], 
          totalSubnets: number, 
          type: 'sub' | 'host', 
          indexFinded: number, 
          currOctate: number,
          subnet: number
        ): { ips: string[] }[] 
            {

  const rows: { ips: string[] }[] = []
  const subNetwork = [...ipArray]
  let changeIndex =3
  
  
  for (let i = 0; i < Math.min(20, totalSubnets); i++) {
    
    if (type === 'host') {
      const networkStart = [...subNetwork]
      const broadcast = [...subNetwork]
      if(subnet > 255){
        subnet = totalSubnets / 255
        changeIndex = 2
        if(subnet >255) { changeIndex = 1}
      }
      
      networkStart[3]++
       
      changeIndex !== 3 
      ? (broadcast[changeIndex] += totalSubnets - 1,
        broadcast[3] = 255)
        : (broadcast[3] += totalSubnets - 1)
        
        
      const networkEnd = [...broadcast]
      networkEnd[3]--
      
      rows.push({ ips: [subNetwork.join('.'), networkStart.join('.'), networkEnd.join('.'), broadcast.join('.')] })
      
      subNetwork[changeIndex] += totalSubnets
      
      if (subNetwork[changeIndex] >= 255) {
        subNetwork[changeIndex] = 0 
        subNetwork[currOctate]  === 0 ? (subNetwork[currOctate] = 0) : subNetwork[currOctate]++
        subNetwork[changeIndex - 1]++
        if (subNetwork[currOctate] === 255) {
          currOctate--
          console.log('kkk')
        }
      }

    } 
    else
    {  
      const subNetwork = [...ipArray]
      const networkStart = [...subNetwork]
      const broadcast = [...subNetwork]
      const networkEnd = [...broadcast]
      networkStart[3]++
      if (indexFinded < 3) {
        networkEnd[3] = 254
        broadcast[3] = 255
      } else {
        networkEnd[3] += totalSubnets - 2
        broadcast[3] += totalSubnets - 1
      }

      rows.push({ ips: [subNetwork.join('.'), networkStart.join('.'), networkEnd.join('.'), broadcast.join('.')] })
      ipArray[indexFinded < 3 ? indexFinded : 3] += totalSubnets
    }
  }

  return rows
}

export default function fillTables(ip: IPv4, totalSubnets: number, type: 'sub' | 'host', subnets:number) {
  const manipulableIP = splitIP(ip)
  const indexFinded = findZeroIndex(manipulableIP)
  const adjustedSubnets = adjustTotalSubnets(totalSubnets)

  return createRow(manipulableIP, adjustedSubnets, type, indexFinded, 2, subnets)
}
