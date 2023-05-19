import { FC } from "react";

interface SearchIconProps {
	className?: string | undefined;
}

const SearchIcon: FC<SearchIconProps> = ({className}): JSX.Element => {
	//<!-- Generator: Adobe Illustrator 26.3.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
	// * Compiled from SVG to TSX With https://transform.tools
	return(
		<svg
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			width="32px"
			height="32px"
			viewBox="0 0 32 32"
			xmlSpace="preserve"
			className={className}>
			<path d="M6 17H14V19H6z" />
			<circle cx={3} cy={18} r={1} />
			<circle cx={13} cy={14} r={1} />
			<path d="M2 13H10V15H2z" />
			<path d="M6 9H14V11H6z" />
			<circle cx={3} cy={10} r={1} />
			<path d="M30 28.6l-7.4-7.4c1.5-2 2.4-4.5 2.4-7.2 0-6.6-5.4-12-12-12-3.3 0-6.4 1.3-8.7 3.8l1.5 1.4C7.6 5.1 10.2 4 13 4c5.5 0 10 4.5 10 10s-4.5 10-10 10c-3 0-5.8-1.3-7.7-3.6l-1.5 1.3C6 24.4 9.4 26 13 26c3.2 0 6.1-1.3 8.3-3.3l7.3 7.3 1.4-1.4z" />
			<path fill="none" d="M0 0H32V32H0z" />
    	</svg>
	);
}

export default SearchIcon;
