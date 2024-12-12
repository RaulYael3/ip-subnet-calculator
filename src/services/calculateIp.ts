import { CalculationResult, defaultObjectToCalculate as objectToCalculate, IPv4 } from '../types/typesIP.ts';


// type maskHost = [`${string}`,number]

function calculateIp(ip: IPv4 | string, subnet?: number): CalculationResult{
    
    //------------------------------------------------------------
    //Check that the function inputs are in the range of 0 to 255.
    if( !(ip.split('.').every(n => 0 <= Number(n) && Number(n) <= 256 ))) return {...objectToCalculate, error:'Ha ocurrido un error, por favor cambia los numeros a entradas posibles ("0 - 256")'}
    

    //---------------------------------
    //Find how many times 1 is repeated.
    const mask = ((ip.split(".").findIndex(number => number === "0")) || 1) * 8
    // const strNum = "1".repeat(mask) + "0".repeat(32 - mask)
    // const originalSubnet = [ strNum.slice(0, 8), strNum.slice(8, 16), strNum.slice(16, 24), strNum.slice(24, 32) ].join('.') 
    

    //------------------------------------------------
    //Calculate how many parts the IP is divided into and how many hosts each network has..
    let [totalSubnets, x] = [0,0]
    if(subnet) {
        x = 32 - (mask + Math.ceil(Math.log2(subnet)))
        totalSubnets = 2 ** x
    }
    const hostBySubnet = totalSubnets - 2 
    
    
    const newBits = "1".repeat(mask) + "1".repeat(x) + "0".repeat(32 - mask)
    const newMaskkBits = [ newBits.slice(0, 8), newBits.slice(8, 16), newBits.slice(16, 24), newBits.slice(24, 32) ]
    const newMaskSubnet:string = newMaskkBits.map(bits => {return parseInt(bits,2)}).join('.')
          
    return {...objectToCalculate, 
        ip: ip, 
        maskSubnet:newMaskSubnet, 
        hostBySubnet: hostBySubnet,
        isLoading:true
    }
    
}

export default calculateIp