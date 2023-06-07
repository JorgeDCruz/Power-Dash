import { useEffect, RefObject, ChangeEvent } from "react";

const useClickOutside = (refComponent: RefObject<HTMLInputElement>, func: () => void): void => {
	useEffect(() => {
		const clickOutsideHandeler = (e: MouseEvent): void => {
			const target: EventTarget | null = e.target;
			if(refComponent.current && !refComponent.current.contains(target as Node)){
				func();
			}
		}

		document.addEventListener("mousedown", clickOutsideHandeler);

		return () => document.removeEventListener("mousedown", clickOutsideHandeler);
	}, []);
}

export default useClickOutside;