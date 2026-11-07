import type { Category } from '@/types'

export const categories: Category[] = [
  {
    id: 'oil-gas',
    name: 'Oil & Gas',
    slug: 'oil-gas',
    description:
      'Industrial oils, lubricants, and petroleum-related supplies for commercial and operational use.',
    imageUrl:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'solid-minerals',
    name: 'Solid Minerals',
    slug: 'solid-minerals',
    description:
      'Mineral samples and bulk materials for trading partners, processors, and industrial buyers.',
    imageUrl:
      'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'laboratory',
    name: 'Laboratory Consumables',
    slug: 'laboratory',
    description:
      'Everyday labware and consumables for research, quality control, and training facilities.',
    imageUrl:
      'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    description:
      'Business electronics and accessories for offices, field teams, and retail partners.',
    imageUrl:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'chemicals',
    name: 'Industrial Chemicals',
    slug: 'chemicals',
    description:
      'Industrial-grade chemical products for manufacturing, cleaning, and process support.',
    imageUrl:
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
  },
]

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id || c.slug === id)
}
