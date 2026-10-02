import { forwardRef } from "react";

import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SwiperButton = forwardRef(({ isPrev = false, className = "", ...props }, ref, ) => {
        return (
            <button
                ref={ref}
                type="button"
                {...props}
                aria-label={props["aria-label"] ?? (isPrev ? "Slide anterior" : "Próximo slide")}
                className={`size-10 bg-white text-xl text-black transition duration-300 hover:opacity-90 disabled:border disabled:border-white disabled:text-[#B9B7B6] disabled:opacity-80 disabled:hover:opacity-80 sm:size-12 lg:size-[53px] ${className}`}
            >
                <FontAwesomeIcon
                    icon={isPrev ? faCaretLeft : faCaretRight}
                    aria-hidden="true"
                    focusable="false"
                />
            </button>
        );
    },
);

SwiperButton.displayName = "SwiperButton";