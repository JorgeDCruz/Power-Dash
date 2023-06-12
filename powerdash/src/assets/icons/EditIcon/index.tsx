import type { FC, SVGProps } from "react";

interface EditIconProps {
    className?: string;
}

const EditIcon: FC<EditIconProps> = ({className}, props: SVGProps<SVGSVGElement>): JSX.Element => {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="32px"
            height="32px"
            viewBox="0 0 32 32"
            xmlSpace="preserve"
            {...props}
        >
            <path d="M2 26H30V28H2z" />
            <path d="M25.4 9c.8-.8.8-2 0-2.8l-3.6-3.6c-.8-.8-2-.8-2.8 0l-15 15V24h6.4l15-15zm-5-5L24 7.6l-3 3L17.4 7l3-3zM6 22v-3.6l10-10 3.6 3.6-10 10H6z" />
            <path fill="none" d="M0 0H32V32H0z" />
        </svg>
    );
}

export default EditIcon;
