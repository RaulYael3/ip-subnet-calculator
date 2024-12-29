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

function createRow(ipArray: number[], totalSubnets: number, type: 'sub' | 'host', indexFinded: number, currOctate: number): { ips: string[] }[] {
  const rows: { ips: string[] }[] = []
  const subNetwork = [...ipArray]

  for (let i = 0; i < Math.min(5, totalSubnets); i++) {
    const networkStart = [...subNetwork]
    const networkEnd = [...subNetwork]
    const broadcast = [...subNetwork]

    if (type === 'host') {
      networkStart[3]++
      networkEnd[3] += totalSubnets - 2
      broadcast[3] += totalSubnets - 1

      if (broadcast[3] === 255) {
        subNetwork[3] = 0
        subNetwork[currOctate]++
        if (subNetwork[currOctate] === 255) {
          currOctate--
        }
      }

      rows.push({ ips: [subNetwork.join('.'), networkStart.join('.'), networkEnd.join('.'), broadcast.join('.')] })
      subNetwork[3] += totalSubnets
    } else {
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

export default function fillTables(ip: IPv4, totalSubnets: number, type: 'sub' | 'host') {
  const manipulableIP = splitIP(ip)
  const indexFinded = findZeroIndex(manipulableIP)
  const adjustedSubnets = adjustTotalSubnets(totalSubnets)

  return createRow(manipulableIP, adjustedSubnets, type, indexFinded, 2)
}
