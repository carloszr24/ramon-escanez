'use client'

import dynamic from 'next/dynamic'

const CoverageMap = dynamic(() => import('./CoverageMap.client').then((m) => m.CoverageMap), {
  ssr: false,
  loading: () => <div className="skeleton h-[320px] w-full rounded-sm" />,
})

export { CoverageMap }
