import type { DataPlan, NetworkId } from '@/types'

export const networks: { id: NetworkId; name: string; colorClass: string }[] = [
  { id: 'mtn', name: 'MTN', colorClass: 'bg-mtn text-navy-950' },
  { id: 'airtel', name: 'Airtel', colorClass: 'bg-airtel text-white' },
  { id: 'glo', name: 'Glo', colorClass: 'bg-glo text-white' },
]

export const airtimePresets = [100, 200, 500, 1000, 2000] as const

export const dataPlans: DataPlan[] = [
  { id: 'mtn-500', network: 'mtn', label: 'MTN 500MB', size: '500MB', validity: '30 days', priceNgn: 500 },
  { id: 'mtn-1gb', network: 'mtn', label: 'MTN 1GB', size: '1GB', validity: '30 days', priceNgn: 1000 },
  { id: 'mtn-2gb', network: 'mtn', label: 'MTN 2GB', size: '2GB', validity: '30 days', priceNgn: 2000 },
  { id: 'mtn-5gb', network: 'mtn', label: 'MTN 5GB', size: '5GB', validity: '30 days', priceNgn: 4500 },
  { id: 'mtn-10gb', network: 'mtn', label: 'MTN 10GB', size: '10GB', validity: '30 days', priceNgn: 8000 },
  { id: 'airtel-500', network: 'airtel', label: 'Airtel 500MB', size: '500MB', validity: '30 days', priceNgn: 500 },
  { id: 'airtel-1gb', network: 'airtel', label: 'Airtel 1GB', size: '1GB', validity: '7 days', priceNgn: 950 },
  { id: 'airtel-2gb', network: 'airtel', label: 'Airtel 2GB', size: '2GB', validity: '30 days', priceNgn: 1900 },
  { id: 'airtel-5gb', network: 'airtel', label: 'Airtel 5GB', size: '5GB', validity: '30 days', priceNgn: 4300 },
  { id: 'airtel-10gb', network: 'airtel', label: 'Airtel 10GB', size: '10GB', validity: '30 days', priceNgn: 7800 },
  { id: 'glo-500', network: 'glo', label: 'Glo 500MB', size: '500MB', validity: '14 days', priceNgn: 480 },
  { id: 'glo-1gb', network: 'glo', label: 'Glo 1GB', size: '1GB', validity: '14 days', priceNgn: 900 },
  { id: 'glo-2gb', network: 'glo', label: 'Glo 2GB', size: '2GB', validity: '30 days', priceNgn: 1800 },
  { id: 'glo-5gb', network: 'glo', label: 'Glo 5GB', size: '5GB', validity: '30 days', priceNgn: 4200 },
  { id: 'glo-10gb', network: 'glo', label: 'Glo 10GB', size: '10GB', validity: '30 days', priceNgn: 7500 },
]

export function getPlansForNetwork(network: NetworkId): DataPlan[] {
  return dataPlans.filter((p) => p.network === network)
}

export function getNetworkName(id: NetworkId): string {
  return networks.find((n) => n.id === id)?.name ?? id.toUpperCase()
}
