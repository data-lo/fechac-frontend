'use client'

import { usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import routeLabels from '@/lib/route-labels'

export function AppBreadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  const visibleSegments = segments.slice(0, -1)

  if (visibleSegments.length === 0) return null

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {visibleSegments.map((segment, index) => {
          const href =
            '/' + visibleSegments.slice(0, index + 1).join('/')

          const label = routeLabels[segment.replace(/-/g, ' ') as keyof typeof routeLabels]
          
          return (
            <BreadcrumbItem key={href}>
              <BreadcrumbLink className='font-medium text-black text-base' href={href}>
                {label}
              </BreadcrumbLink>

              {index < visibleSegments.length - 1 && (
                <BreadcrumbSeparator />
              )}
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
