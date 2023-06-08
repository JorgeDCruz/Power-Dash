import { FC } from "react";

interface BeeIconProps {
    className?: string;
}

const BeeIcon: FC<BeeIconProps> = ({className}): JSX.Element => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={className}>
      <path d="M16 10a6 6 0 00-6 6v8a6 6 0 0012 0v-8a6 6 0 00-6-6zm-4.25 7.87h8.5v4.25h-8.5zM16 28.25A4.27 4.27 0 0111.75 24v-.13h8.5V24A4.27 4.27 0 0116 28.25zm4.25-12.13h-8.5V16a4.25 4.25 0 018.5 0zM30.66 19.21L24 13v9.1a4 4 0 008 0 3.83 3.83 0 00-1.34-2.89zM28 24.35a2.25 2.25 0 01-2.25-2.25V17l3.72 3.47A2.05 2.05 0 0130.2 22a2.25 2.25 0 01-2.2 2.35zM0 22.1a4 4 0 008 0V13l-6.66 6.21A3.88 3.88 0 000 22.1zm2.48-1.56L6.25 17v5.1a2.25 2.25 0 01-4.5 0 2.05 2.05 0 01.73-1.56zM15 5.5A3.5 3.5 0 1011.5 9 3.5 3.5 0 0015 5.5zm-5.25 0a1.75 1.75 0 111.75 1.75A1.77 1.77 0 019.75 5.5zM20.5 2A3.5 3.5 0 1024 5.5 3.5 3.5 0 0020.5 2zm0 5.25a1.75 1.75 0 111.75-1.75 1.77 1.77 0 01-1.75 1.75z" />
      <path
        data-name="&lt;Transparent Rectangle&gt;"
        fill="none"
        d="M0 0H32V32H0z"
      />
    </svg>
  );
}

export default BeeIcon;
