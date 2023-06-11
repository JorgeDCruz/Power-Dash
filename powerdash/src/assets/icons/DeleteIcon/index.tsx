import type { FC, SVGProps } from "react"

interface DeleteIconProps {
    className?: string;
}

const DeleteIcon: FC<DeleteIconProps> = ({className}, props: SVGProps<SVGSVGElement>): JSX.Element => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
            <path d="M12 12H14V24H12z" />
            <path d="M18 12H20V24H18z" />
            <path d="M4 6v2h2v20a2 2 0 002 2h16a2 2 0 002-2V8h2V6zm4 22V8h16v20z" />
            <path d="M12 2H20V4H12z" />
            <path
                data-name="&lt;Transparent Rectangle&gt;"
                fill="none"
                d="M0 0H32V32H0z"
            />
        </svg>
    )
}

export default DeleteIcon;
