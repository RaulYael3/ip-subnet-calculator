type IPv4 = `${number},${number},${number},${number}`
// type maskHost = [`${string}`,number]

function calculateIp(ip: IPv4, subnet?: number): number | string{


    if (!ip.split('.').every(n => {
        const num = Number(n);
        return num >= 0 && num <= 255;
      })) {
        return 'Ha ocurrido un error, por favor introduce números válidos entre 0 y 255.';
      }


    const mask = ((ip.split(".").findIndex(number => number === "0")) || 1) * 8
    // const strNum = "1".repeat(mask) + "0".repeat(32 - mask)
    // const originalSubnet = [ strNum.slice(0, 8), strNum.slice(8, 16), strNum.slice(16, 24), strNum.slice(24, 32) ].join('.') 


    let [totalSubnets, x] = [0,0]
    if(subnet) {
        x = 32 - (mask + Math.ceil(Math.log2(subnet)))
        totalSubnets = 2 ** x
    }

    const newBits = "1".repeat(mask) + "1".repeat(x) + "0".repeat(32 - mask)
    const newMaskkBits = [ newBits.slice(0, 8), newBits.slice(8, 16), newBits.slice(16, 24), newBits.slice(24, 32) ]
    const newMaskSubnet:string = newMaskkBits.map(bits => {return parseInt(bits,2)}).join('.')

    const hostBySubnet = totalSubnets - 2 

    return hostBySubnet

}

export default calculateIp