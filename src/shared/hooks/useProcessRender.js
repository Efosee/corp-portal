import { useState, useCallback } from "react";
import { Skeleton, Loading, Error } from "../ui";

export const useProcessRender = () => {
	const [process, setProcess] = useState('waiting');

	const renderContent = useCallback((process, Component) => {
		switch (process) {
			case 'waiting':
				return Skeleton;
			case 'loading':
				return Loading;
			case 'error':
				return Error;
			case 'success':
				return Component
			default:
				throw new Error("Unknown process");
		}
	}, [])

	return {process, setProcess, renderContent}
}