export type IPv4 = `${number},${number},${number},${number}`

export interface CalculationResult {
  ip: string;
  maskSubnet: string;
  isLoading: boolean;
  hostBySubnet: number;
  error: string;
}
  
  
export const defaultObjectToCalculate: CalculationResult = {
  ip: '',
  maskSubnet: '',
  isLoading: false,
  hostBySubnet: 0,
  error: '',
}

export interface DataInput {
    networkIP: IPv4 | string;
    ipRangeStart: IPv4 | string;
    ipRangeEnd: IPv4 | string;
    broadCast: IPv4 | string;
  }