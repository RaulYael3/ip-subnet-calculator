type IPv4 = `${number},${number},${number},${number}`

function calculateIp(ip: IPv4, subnet?: number){


    if( !ip.split(',').every(n => 0 <= Number(n) && Number(n) <= 256 )) return 'Ha ocurrido un error, por favor cambia los numeros a entradas posibles ("0 - 256")'


    const mask = (ip.split(",").findIndex(number => number === "0")) * 8
    const strNum = "1".repeat(mask) + "0".repeat(32 - mask)
    const originalSubnet = [ strNum.slice(0, 8), strNum.slice(8, 16), strNum.slice(16, 24), strNum.slice(24, 32) ].join('.') 


    let [totalSubnets, x] = [0,0]
    if(subnet) {
        x = Math.ceil(Math.log(subnet??1) / Math.log(2))
        totalSubnets = 2 ^ x
    }

    const newBits = "1".repeat(mask) + "1".repeat(x) + "0".repeat(32 - mask)
    const newMask = [ newBits.slice(0, 8), newBits.slice(8, 16), newBits.slice(16, 24), newBits.slice(24, 32) ].join('.') 
    const hostBySubnet = totalSubnets - 2 

    return [originalSubnet,newMask,hostBySubnet]

}

export default calculateIp