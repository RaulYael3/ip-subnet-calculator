import { CalculationResult, defaultObjectToCalculate as objectToCalculate, IPv4 } from '../types/typesIP.ts';

function calculateIp(ip: IPv4 | string, [type,subnet] : [type:'sub'|'host',subnet:number]): CalculationResult{
    console.log(type, subnet)
    
    //------------------------------------------------------------
    //Check that the function inputs are in the range of 0 to 255.
    if( !(ip.split('.').every(n => 0 <= Number(n) && Number(n) <= 256 ))) return {
        ...objectToCalculate, 
        error:'Ha ocurrido un error, por favor cambia los numeros a entradas posibles ("0 - 256")'
    }
    

    //---------------------------------
    //Find how many times 1 is repeated.
    const mask = ((ip.split(".").findIndex(number => number === "0")) || 1) * 8
    

    //-------------------------------------------------------------------------------------
    //Calculate how many parts the IP is divided into and how many hosts each network has..
    let [totalSubnets, totalBits] = [0,0]
    let hostBySubnet = 0
    if(type === 'sub') {
        totalBits = Math.ceil(Math.log2(subnet))
        hostBySubnet = (2** (32 - (mask  + totalBits)))- 2 
    } 
    else if(type === 'host'){
        totalBits = Math.ceil(Math.log2(subnet + 2))
        hostBySubnet = Math.pow(2,totalBits) - 2
    }   
    totalSubnets = Math.pow(2,totalBits)
    console.log(totalSubnets)

    
    
    const newBits = "1".repeat((mask + Math.ceil(Math.log2(subnet??1)))) + "0".repeat(32 - mask)
    const newMaskkBits = [ newBits.slice(0, 8), newBits.slice(8, 16), newBits.slice(16, 24), newBits.slice(24, 32) ]
    const newMaskSubnet:string = newMaskkBits.map(bits => {return parseInt(bits,2)}).join('.')
          
    return {...objectToCalculate, 
        ip: ip, 
        maskSubnet:newMaskSubnet,
        hostOrSubnet: type,
        hostBySubnet: hostBySubnet,
        isLoading:true
    }
    
}

export default calculateIp