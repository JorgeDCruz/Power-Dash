import { FC } from "react";

interface CloseIconProps {
    className?: string;
}

const CloseIcon: FC<CloseIconProps> = ({className}): JSX.Element => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={className}>
            <path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z" />
            <path fill="none" d="M0 0H32V32H0z" />
        </svg>
    );
}

export default CloseIcon;
