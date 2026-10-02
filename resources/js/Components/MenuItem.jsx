import { useEffect, useRef, useState } from "react";

import { CustomLink } from "./ui/CustomLink";

export const MenuItem = ({ item, index, isMenuOpen, isAtTop }) => {
    const [isOpen, setIsOpen] = useState(false);

    const menuRef = useRef(null);
    const toggleRef = useRef(null);

    const toggleSubmenu = () => {
        setIsOpen((currentState) => !currentState);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                toggleRef.current &&
                !toggleRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const desktopTextColor = isAtTop
        ? "xl:text-white xl:after:text-white"
        : "xl:text-custom-gray xl:after:text-custom-gray";

    const itemClassName = [
        "relative block font-secondary text-white transition-all xl:p-2",
        "!text-opacity-0",
        "after:absolute after:top-1/2 after:left-1/2",
        "after:-translate-x-1/2 after:-translate-y-1/2",
        "after:whitespace-nowrap after:leading-none",
        "after:content-[attr(data-after)]",
        "after:text-white after:transition-all after:duration-300",
        "hover:after:font-bold hover:after:text-opacity-100",
        desktopTextColor,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <li
            ref={menuRef}
            className="max-xl:translate-y-[-20px] max-xl:opacity-0"
            style={
                typeof window !== "undefined" && window.innerWidth < 1280
                    ? {
                          opacity: isMenuOpen ? 1 : 0,
                          transform: isMenuOpen
                              ? "translateY(0)"
                              : "translateY(-20px)",
                          transition: `opacity 0.4s ease-out ${
                              index * 0.1
                          }s, transform 0.4s ease-out ${index * 0.1}s`,
                      }
                    : undefined
            }
        >
            {item.external ? (
                <a
                    href={item.route}
                    className={itemClassName}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-after={item.name}
                >
                    {item.name}
                </a>
            ) : Array.isArray(item.submenu) && item.submenu.length > 0 ? (
                <>
                    <button
                        ref={toggleRef}
                        type="button"
                        onClick={toggleSubmenu}
                        className={itemClassName}
                        data-after={item.name}
                        aria-expanded={isOpen}
                    >
                        {item.name}

                        <span aria-hidden="true" className="ml-2 text-base">
                            {isOpen ? "▲" : "▼"}
                        </span>
                    </button>
                </>
            ) : typeof item.submenu === "string" &&
              item.submenu === "Produtos" ? (
                <>
                    <button
                        ref={toggleRef}
                        type="button"
                        onClick={toggleSubmenu}
                        className={itemClassName}
                        data-after={item.name}
                        aria-expanded={isOpen}
                    >
                        {item.name}
                    </button>
                </>
            ) : (
                <CustomLink
                    href={route(item.route)}
                    to={item.to}
                    className={itemClassName}
                    data-after={item.name}
                >
                    {item.name}
                </CustomLink>
            )}
        </li>
    );
};
