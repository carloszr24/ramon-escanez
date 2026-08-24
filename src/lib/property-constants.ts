export const MAX_FEATURED_ON_HOME = 3
export const MAX_PROPERTY_IMAGES = 50

export function isFeaturedFlag(value: unknown): boolean {
  return value === true || value === 'true' || value === 't' || value === 1
}

export function isArchivedFlag(value: unknown): boolean {
  return value === true || value === 'true' || value === 't' || value === 1
}

export function wouldExceedFeaturedHomeLimit(
  properties: { id: string; featured: unknown; archived?: boolean }[],
  opts: { wantFeatured: boolean; editingPropertyId: string | null }
): boolean {
  if (!opts.wantFeatured) return false
  const featuredIds = properties
    .filter((p) => isFeaturedFlag(p.featured) && !isArchivedFlag(p.archived))
    .map((p) => p.id)
  if (opts.editingPropertyId && featuredIds.includes(opts.editingPropertyId)) return false
  return featuredIds.length >= MAX_FEATURED_ON_HOME
}
