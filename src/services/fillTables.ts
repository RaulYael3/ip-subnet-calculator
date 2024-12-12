import { IPv4 } from "../types/typesIP.ts";

export default function fillTables(ip: IPv4, totalSubnets: number, subnet: number){

    const manipulableIP = ip.split('.').map(Number)
    const indexFinded = manipulableIP.findIndex(num => num === 0)
    while(totalSubnets > 256){
         totalSubnets = Math.ceil(totalSubnets / 256)
    }
    

    let i = 0
    const rows = []
    while (i < 5 && i < subnet) {
        const subNetwork = [...manipulableIP]
        const networkStart = [...subNetwork]
        const networkEnd = [...subNetwork]
        const broadcast = [...subNetwork]
       
        networkStart[3] += 1;

        if(indexFinded < 3) {
            networkEnd[3] = 254;
            broadcast[3] = 255;
        } else{
            networkEnd[3] += totalSubnets - 2;
            broadcast[3] += totalSubnets - 1;
        }

        rows.push({
            ips: [
                subNetwork.join('.'),
                networkStart.join('.'),
                networkEnd.join('.'),
                broadcast.join('.')
            ]
        })

        if (indexFinded < 3){
           manipulableIP[indexFinded] += totalSubnets
        } else {    
           manipulableIP[3] += totalSubnets 
        }
        i++
    }

    return rows

}