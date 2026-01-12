'use client'

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { breadcrumbRoutes } from "@/lib/breadcrumb-routes";
import { Fragment } from "react";

export function AppBreadcrumbs() {
  const pathname = usePathname();

  const visibleSegments = pathname
    .split("/")
    .filter(Boolean)
    .filter(
      (segment) =>
        !/^[a-f\d]{24}$/i.test(segment) &&
        breadcrumbRoutes[segment as keyof typeof breadcrumbRoutes]
    );

  if (visibleSegments.length <= 1) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {visibleSegments.map((segment, index) => {
          const config =
            breadcrumbRoutes[segment as keyof typeof breadcrumbRoutes];

          const isLast = index === visibleSegments.length - 1;

          return (
            <BreadcrumbItem key={segment}>
              {config.href && !isLast ? (
                <Fragment> {config.href && config.href !== pathname ? (<BreadcrumbLink href={config.href}> {config.label} </BreadcrumbLink>) : (<span className="font-medium">{config.label}</span>)} </Fragment>
              ) : (
                <span className="font-medium">{config.label}</span>
              )}

              {!isLast && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
