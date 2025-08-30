import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Fragment } from "react/jsx-runtime";

interface BreadcrumbRoutes {
    href: string;
    title: string;
}

interface Props {
    breadcrumbRoutes: BreadcrumbRoutes[]
}

export function BreadcrumbComponent({
    breadcrumbRoutes
}: Props) {

    const color = useColorStore((state) => state.color);


    const navigate = useNavigate()

    const onClick = (route: string) => {
        navigate(route)
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbRoutes.map((breadcrumbRoute, index) =>
                    <Fragment key={index}>
                        <BreadcrumbItem>
                            <BreadcrumbLink>
                                {index === breadcrumbRoutes.length - 1 ? (
                                    <span
                                        style={{ color: color }}
                                        className="font-bold"
                                    >{breadcrumbRoute.title}</span>
                                ) : (
                                    <button onClick={() => onClick(breadcrumbRoute.href)}>
                                        {breadcrumbRoute.title}
                                    </button>
                                )}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {index === breadcrumbRoutes.length - 1 ? (<></>) : (<BreadcrumbSeparator />)}
                    </ Fragment>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
