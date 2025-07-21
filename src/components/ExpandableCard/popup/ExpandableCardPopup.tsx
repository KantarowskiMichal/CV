import { animated } from 'react-spring';
import ExpandableCardContent from '../content/ExpandableCardContent';
import React from 'react';
import ReactDOM from 'react-dom';
import './ExpandableCardPopup.css';

interface ExpandableCardPopupProps {
    collapsedContent: React.ReactNode;
    expandedContent: React.ReactNode;
    isExpanded: boolean;
    isAnimating: boolean;
    springs: any;
    collapse: () => void;
}

const ExpandableCardPopup: React.FC<ExpandableCardPopupProps> = ({
    collapsedContent,
    expandedContent,
    isExpanded,
    isAnimating,
    springs,
    collapse
}) => {
    return (
        ReactDOM.createPortal(
        <div className="expandable-card-popup-wrapper">
            <animated.div style={isExpanded || isAnimating ? springs : {}} className="expandable-card-popup">
                <ExpandableCardContent
                    collapsedContent={collapsedContent}
                    expandedContent={expandedContent}
                    isExpanded={isExpanded}
                />
            </animated.div>

            {(isExpanded || isAnimating) && (<div className='click-intercepting-layer' onClick={collapse}></div>)}
        </div>,
        document.body
    ));
};

export default ExpandableCardPopup;
