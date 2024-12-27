import { IPv4 } from "../types/typesIP.ts";

export default function fillTables(ip: IPv4, totalSubnets: number, subnet: number, type :'sub' | 'host'){

    const manipulableIP = ip.split('.').map(Number)
    const indexFinded = manipulableIP.findIndex(num => num === 0)
    while(totalSubnets > 256){
         totalSubnets = Math.ceil(totalSubnets / 256)
    }

    const rows = []
    if(type === 'sub'){

        for (let i = 0; i < Math.min(5, subnet); i++) {
            const subNetwork = [...manipulableIP]
            const networkStart = [...subNetwork]
            const networkEnd = [...subNetwork]
            const broadcast = [...subNetwork]
            
            networkStart[3]++;
            if (indexFinded < 3) {
                networkEnd[3] = 254
                broadcast[3] = 255
            } else {
                networkEnd[3] += totalSubnets - 2
                broadcast[3] += totalSubnets - 1
            }
            
            manipulableIP[indexFinded < 3 ? indexFinded : 3] += totalSubnets
            
            rows.push({
                ips: [subNetwork.join('.'), networkStart.join('.'), networkEnd.join('.'), broadcast.join('.')]
            })
            
        }
    } else {
        let i = 0
        let currOCtate = 3
        const subNetwork = [...manipulableIP]
        while (i < 5) {
            const networkStart = [...subNetwork]
            const networkEnd = [...subNetwork]
            const broadcast = [...subNetwork]

            networkStart[currOCtate]++
            networkEnd[currOCtate] += subnet - 2
            broadcast[currOCtate] += subnet - 1

            rows.push({
                ips: [subNetwork.join('.'), networkStart.join('.'), networkEnd.join('.'), broadcast.join('.')]
            })

            i++
            subNetwork[3] += subnet

            if(subNetwork[3] === 255){
                subNetwork[3] = 0
                subNetwork[currOCtate]++
                if(subNetwork[currOCtate] === 255){
                    currOCtate-- 
                }
            }
        }
    }


    return rows

}