type IPv4 = `${number},${number},${number},${number}`

function calculateIp(ip: IPv4, host?: number, subnet?: number){
    if( !ip.split(',').every(n => 0 <= Number(n) && Number(n) <= 256 )) return 'Ha ocurrido un error, por favor cambia los numeros a entradas posibles ("0 - 256")'


    const mascara = (ip.split(",").findIndex(number => number === "0")) * 8
    const strNum = "1".repeat(mascara) + "0".repeat(32 - mascara)
    const subred = [ strNum.slice(0, 8), strNum.slice(8, 16), strNum.slice(16, 24), strNum.slice(24, 32) ].join('.') 

    return subred

}
