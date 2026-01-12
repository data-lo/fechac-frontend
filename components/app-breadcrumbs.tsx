'use client'

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BREADCRUMB_ROUTES } from "@/lib/breadcrumb-routes";
import { Fragment } from "react";

export function AppBreadcrumbs() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  // Filter out ID segments (24-char hex) to build logical paths
  // But keep track of their position to reconstruct valid hrefs if needed, 
  // or simply rely on the config `href`.

  const visibleItems = segments.reduce((acc, segment, index) => {
    // Skip if it looks like an ID (MongoDB ObjectID usually)
    if (/^[a-f\d]{24}$/i.test(segment)) return acc;

    // Construct logical path up to this segment (ignoring IDs for the lookup key)
    // We need to look backward to find the parent context.

    // A simplified approach: 
    // Create a path built only from non-ID segments found so far.
    const logicalPath = segments
      .slice(0, index + 1)
      .filter(s => !/^[a-f\d]{24}$/i.test(s))
      .join("/");

    const config = BREADCRUMB_ROUTES[logicalPath];

    if (config) {
      acc.push({
        key: logicalPath,
        label: config.label,
        href: config.href,
        isLast: index === segments.length - 1 // approximate check
      });
    }

    return acc;
  }, [] as Array<{ key: string, label: string, href: string | null, isLast: boolean }>);

  if (visibleItems.length <= 1) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;

          return (
            <BreadcrumbItem key={item.key}>
              {!isLast && item.href && item.href !== pathname ? (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              ) : (
                <span className="font-medium">{item.label}</span>
              )}

              {!isLast && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
