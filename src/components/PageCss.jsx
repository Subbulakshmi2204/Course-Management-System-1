import { useEffect } from "react";

/**
 * Loads a page-specific stylesheet from /public/css while the page is
 * mounted, and removes it again on unmount so pages never leak styles
 * into one another (each original .html file only ever loaded its own
 * <link rel="stylesheet">, so this reproduces that behavior in the SPA).
 */
function PageCss({ href }) {
    useEffect(() => {
        const existing = document.querySelector(`link[data-page-css="${href}"]`);
        if (existing) {
            return;
        }
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        link.dataset.pageCss = href;
        document.head.appendChild(link);
        return () => {
            const current = document.querySelector(`link[data-page-css="${href}"]`);
            if (current) {
                current.remove();
            }
        };
    }, [href]);

    return null;
}

export default PageCss;
