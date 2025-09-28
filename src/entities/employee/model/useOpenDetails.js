import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router"

export const useOpenDetails = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const openDetails = useCallback((id, data) => {
		navigate(`${location.pathname}/${id}`, {state: {data}});
	}, []);

	return openDetails;
}