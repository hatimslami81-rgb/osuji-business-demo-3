import type { Product } from '@/types'

export const products: Product[] = [
  {
    id: 'p-og-001',
    name: 'Industrial Hydraulic Oil ISO 68',
    slug: 'industrial-hydraulic-oil-iso-68',
    categoryId: 'oil-gas',
    priceNgn: 185000,
    featured: true,
    shortDescription: '200L drum for hydraulic systems and plant equipment.',
    description:
      'A general-purpose industrial hydraulic oil suitable for demo catalog presentation. Presented for commercial ordering workflows — specifications should be confirmed with the supplier before procurement.',
    imageUrl:
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'p-og-002',
    name: 'Premium Engine Oil SAE 15W-40',
    slug: 'premium-engine-oil-15w40',
    categoryId: 'oil-gas',
    priceNgn: 42000,
    featured: true,
    shortDescription: '20L container for fleet and generator maintenance.',
    description:
      'Demo engine oil listing for workshops and fleet operators. Ideal for showcasing multi-quantity checkout and B2B reorder flows on the platform.',
    imageUrl:
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'p-og-003',
    name: 'Petroleum Storage Drum Bundle',
    slug: 'petroleum-storage-drum-bundle',
    categoryId: 'oil-gas',
    priceNgn: 275000,
    shortDescription: 'Set of sealed industrial drums for bulk handling demos.',
    description:
      'A visual catalog item representing bulk petroleum packaging options for trading and distribution partners evaluating online ordering.',
    imageUrl:
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'p-sm-001',
    name: 'Limestone Aggregate Sample Pack',
    slug: 'limestone-aggregate-sample-pack',
    categoryId: 'solid-minerals',
    priceNgn: 95000,
    featured: true,
    shortDescription: 'Sample-grade limestone pack for buyer evaluation.',
    description:
      'Sample packaging for solid mineral trading discussions. Designed to demonstrate product detail pages and related mineral listings.',
    imageUrl:
      'https://images.unsplash.com/photo-1606857521015-7f9fcf423340?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'p-sm-002',
    name: 'Granite Chips (Bulk Sample)',
    slug: 'granite-chips-bulk-sample',
    categoryId: 'solid-minerals',
    priceNgn: 120000,
    shortDescription: 'Construction-grade granite chip sample lot.',
    description:
      'Demo mineral listing for construction and industrial buyers reviewing online catalog and quotation-style ordering experiences.',
    imageUrl:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'p-sm-003',
    name: 'Kaolin Clay Trade Sample',
    slug: 'kaolin-clay-trade-sample',
    categoryId: 'solid-minerals',
    priceNgn: 78000,
    featured: true,
    shortDescription: 'Fine kaolin sample for industrial processing trials.',
    description:
      'A representative solid mineral product entry for demonstrating category filters, search, and B2B product storytelling.',
    imageUrl:
      'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'p-lab-001',
    name: 'Laboratory Glassware Starter Kit',
    slug: 'laboratory-glassware-starter-kit',
    categoryId: 'laboratory',
    priceNgn: 156000,
    featured: true,
    shortDescription: 'Beakers, flasks, and cylinders for routine lab work.',
    description:
      'A curated consumables kit for laboratories and training centres. Used here to showcase multi-item cart and product detail presentation.',
    imageUrl:
      'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'p-lab-002',
    name: 'Disposable Pipette Tips (Case)',
    slug: 'disposable-pipette-tips-case',
    categoryId: 'laboratory',
    priceNgn: 48000,
    shortDescription: 'Bulk pipette tips packed for recurring lab supply.',
    description:
      'Everyday laboratory consumable listing that supports reorder-style shopping journeys in the demo storefront.',
    imageUrl:
      'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'p-lab-003',
    name: 'Nitrile Lab Gloves Carton',
    slug: 'nitrile-lab-gloves-carton',
    categoryId: 'laboratory',
    priceNgn: 36500,
    featured: true,
    shortDescription: 'Powder-free nitrile gloves for laboratory handling.',
    description:
      'Protective consumable carton for labs and light industrial teams. Demonstrates accessible pricing and quick add-to-cart behaviour.',
    imageUrl:
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'p-el-001',
    name: 'Business Laptop Docking Station',
    slug: 'business-laptop-docking-station',
    categoryId: 'electronics',
    priceNgn: 145000,
    featured: true,
    shortDescription: 'USB-C dock for office productivity setups.',
    description:
      'Office electronics item for distribution partners and corporate buyers exploring an online catalogue for accessories and peripherals.',
    imageUrl:
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'p-el-002',
    name: 'Industrial Network Switch 24-Port',
    slug: 'industrial-network-switch-24-port',
    categoryId: 'electronics',
    priceNgn: 312000,
    shortDescription: 'Managed switch for small office and warehouse networks.',
    description:
      'Networking hardware listing that highlights higher-value electronics SKUs within a diversified trading catalogue.',
    imageUrl:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'p-el-003',
    name: 'Handheld Barcode Scanner',
    slug: 'handheld-barcode-scanner',
    categoryId: 'electronics',
    priceNgn: 68000,
    featured: true,
    shortDescription: 'USB barcode scanner for inventory and POS desks.',
    description:
      'Practical electronics accessory for warehouses and retail partners evaluating digital ordering for operational tools.',
    imageUrl:
      'https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'p-ch-001',
    name: 'Industrial Degreaser Concentrate',
    slug: 'industrial-degreaser-concentrate',
    categoryId: 'chemicals',
    priceNgn: 54000,
    featured: true,
    shortDescription: '25L concentrate for workshops and plant cleaning.',
    description:
      'Industrial cleaning chemical listing for factories and service workshops. Copy avoids unsupported performance claims and is intended for demo browsing.',
    imageUrl:
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'p-ch-002',
    name: 'Process Solvent Drum (Demo SKU)',
    slug: 'process-solvent-drum',
    categoryId: 'chemicals',
    priceNgn: 210000,
    shortDescription: 'Bulk solvent packaging for manufacturing support.',
    description:
      'Representative industrial chemical SKU for buyers reviewing category navigation, product imagery, and checkout simulation.',
    imageUrl:
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'p-ch-003',
    name: 'Water Treatment Additive Pack',
    slug: 'water-treatment-additive-pack',
    categoryId: 'chemicals',
    priceNgn: 89000,
    shortDescription: 'Additive pack for facility water-system maintenance.',
    description:
      'Facility-support chemical pack used to round out the industrial chemicals category with realistic Naira pricing and B2B presentation.',
    imageUrl:
      'https://images.unsplash.com/photo-1615486511484-92e39ce4b0cd?auto=format&fit=crop&w=1000&q=80',
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id || p.slug === id)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured).slice(0, 8)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, limit)
}

export function searchProducts(query: string, categoryId?: string): Product[] {
  const q = query.trim().toLowerCase()
  return products.filter((p) => {
    const matchesCategory = !categoryId || categoryId === 'all' || p.categoryId === categoryId
    if (!matchesCategory) return false
    if (!q) return true
    return (
      p.name.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    )
  })
}
