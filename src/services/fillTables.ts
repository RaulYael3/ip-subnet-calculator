import { IPv4 } from "../types/typesIP.ts";

export default function fillTables(ip: IPv4, totalSubnets: number, subnet: number){

    const manipulableIP = ip.split('.').map(Number)
    const indexFinded = manipulableIP.findIndex(num => num === 0)
    while(totalSubnets > 256){
         totalSubnets = Math.ceil(totalSubnets / 256)
    }
    

    const rows = []
    for (let i = 0; i < Math.min(5, subnet); i++) {
        const subNetwork = [...manipulableIP];
        const networkStart = [...subNetwork];
        const networkEnd = [...subNetwork];
        const broadcast = [...subNetwork];
    
        networkStart[3]++;
        if (indexFinded < 3) {
            networkEnd[3] = 254;
            broadcast[3] = 255;
        } else {
            networkEnd[3] += totalSubnets - 2;
            broadcast[3] += totalSubnets - 1;
        }
    
        rows.push({
            ips: [subNetwork.join('.'), networkStart.join('.'), networkEnd.join('.'), broadcast.join('.')]
        });
    
        manipulableIP[indexFinded < 3 ? indexFinded : 3] += totalSubnets;
    }

    return rows

}