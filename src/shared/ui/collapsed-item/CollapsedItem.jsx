import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
import './collapsedItem.scss';

export const CollapseedItem = ({ children, isCollapsed, duration }) => {

	const nodeRef = useRef(null);

	return (
		<CSSTransition
			nodeRef={nodeRef}
			in={!isCollapsed}
			timeout={duration}
			classNames="collapse"
			unmountOnExit
		>
			<div className="collapse-item" ref={nodeRef}>
				{children}
			</div>
		</CSSTransition>
	)
}