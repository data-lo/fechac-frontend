import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/npx shadcn@latest add form"

import { Fragment } from "react/jsx-runtime";

interface BreadcrumbRoutes {
    href: string;
    title: string;
}

interface Props {
    breadcrumbRoutes: BreadcrumbRoutes[]
    showBorder?: boolean
}

const NavigationBreadcrumb = ({
    breadcrumbRoutes
}: Props) => {

    return (
        <Breadcrumb>
            <Breadcrumb>
                <BreadcrumbList>
                    {breadcrumbRoutes.map((breadcrumbRoute, index) => {
                        const isLast = index === breadcrumbRoutes.length - 1
                        return (
                            <Fragment key={index}>
                                <BreadcrumbItem>
                                    {isLast ? (
                                        <span
                                            className="font-bold text-base text-black"
                                        >
                                            {breadcrumbRoute.title}
                                        </span>
                                    ) : (

                                        <BreadcrumbLink
                                            href={breadcrumbRoute.href}
                                            className="font-bold text-base text-gray-600 hover:text-black"
                                        >
                                            {breadcrumbRoute.title}
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>

                                {!isLast && <BreadcrumbSeparator />}
                            </Fragment>
                        )
                    })}
                </BreadcrumbList>
            </Breadcrumb>

        </Breadcrumb>
    )
}

export default NavigationBreadcrumb