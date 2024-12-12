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
    ips: (IPv4 | string)[];
  }

export type Rows = string[]

export interface BasicTableProps {
    ip: string;
    totalSubnets: number;
}