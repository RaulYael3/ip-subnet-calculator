export type IPv4 = `${number},${number},${number},${number}`

export interface CalculationResult {
  ip: string;
  maskSubnet: string;
  isLoading: boolean;
  hostOrSubnet: 'sub' | 'host' | '';
  hostBySubnet: number;
  error: string;
  totalSubnets :number ;
}
  
  
export const defaultObjectToCalculate: CalculationResult = {
  ip: '',
  maskSubnet: '',
  isLoading: false,
  hostOrSubnet: '',
  hostBySubnet: 0,
  error: '',
  totalSubnets: 0
}

export interface DataInput { 
    ips: (IPv4 | string)[];
  }

export type Rows = string[]

export interface BasicTableProps {
    ip: string;
    totalSubnets: number;
    subnets: number;
    type:'sub' | 'host'
}