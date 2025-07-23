import { useTransition, animated } from "react-spring";
import './ExpandableCardContent.css';
import { useEffect, useState } from "react";

interface ExpandableCardContentProps {
    collapsedContent: React.ReactNode;
    expandedContent: React.ReactNode;
    isExpanded: boolean;
}

const OPACITY_HIDDEN = 0;
const OPACITY_VISIBLE = 1;

const TRANSLATE_X_FROM_PERCENT = 150;
const TRANSLATE_X_ENTER_PERCENT = 0;
const TRANSLATE_X_LEAVE_PERCENT = -100;

const ExpandableCardContent: React.FC<ExpandableCardContentProps> = ({ collapsedContent, expandedContent, isExpanded}) => {
    const [isFirstRender, setIsFirstRender] = useState(true);
    const SPRING_CONFIG = { tension: 170, friction: 200, duration: isFirstRender ? 1000 : 500 };

    useEffect(() => {
        if (isExpanded) {
            setIsFirstRender(false);
        }
    }, [isExpanded]);

    const initialTransformation = useTransition(isFirstRender, {
        from: { opacity: OPACITY_VISIBLE, transform: `translateX(${TRANSLATE_X_ENTER_PERCENT}%)` },
        leave: {
            opacity: OPACITY_HIDDEN,
            transform: `translateX(${TRANSLATE_X_LEAVE_PERCENT}%)`,
            position: 'absolute',
            width: '100%',
            height: '100%',
        },
        config: SPRING_CONFIG,
        onRest: () => setIsFirstRender(false),
    });

    const transitions = useTransition(isExpanded, {
        from: { opacity: OPACITY_HIDDEN, transform: `translateX(${TRANSLATE_X_FROM_PERCENT}%)` },
        enter: { opacity: OPACITY_VISIBLE, transform: `translateX(${TRANSLATE_X_ENTER_PERCENT}%)` },
        leave: {
            opacity: OPACITY_HIDDEN,
            transform: `translateX(${TRANSLATE_X_LEAVE_PERCENT}%)`,
            position: 'absolute',
            width: '100%',
            height: '100%',
        },
        config: SPRING_CONFIG,
    });

    return (
        <div className="expandable-card-content">
            {initialTransformation((style, item) => item ?
                (
                    <animated.div className="collapsed-content" style={style}>
                        {collapsedContent}
                    </animated.div>
                ) : (
                    <div/>
                )
            )}

            {!isFirstRender && (transitions((style, item) =>
                item ? (
                <animated.div className="expanded-content" style={style}>
                    {expandedContent}
                </animated.div>
                ) : (
                <animated.div className="collapsed-content" style={style}>
                    {collapsedContent}
                </animated.div>
                )
            ))}
        </div>
    );
};

export default ExpandableCardContent;