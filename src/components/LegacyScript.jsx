import { useEffect, useRef } from "react";

/**
 * Bridges the original vanilla-JS files (now under /public/legacy/js) into
 * the React-rendered DOM. Each of those files still queries the DOM with
 * document.getElementById / addEventListener exactly as before - this
 * component just injects the <script> tag *after* React has painted the
 * page, then re-fires the events those old files listen for.
 */
function LegacyScript({ src, module = true }) {
    const executed = useRef(false);

    useEffect(() => {
        // React 18 StrictMode intentionally double-invokes effects in dev.
        // Guard so the same legacy script never runs twice for one mount.
        if (executed.current) {
            return;
        }
        executed.current = true;

        const script = document.createElement("script");
        script.src = src;
        script.type = module ? "module" : "text/javascript";
        script.async = false;

        script.onload = function () {
            // The legacy files use DOMContentLoaded / window.onload, both of
            // which have already fired by the time React mounts this page,
            // so we replay them once the script has actually loaded.
            document.dispatchEvent(new Event("DOMContentLoaded"));
            window.dispatchEvent(new Event("load"));
        };

        script.onerror = function (error) {
            console.error("Unable to load legacy script:", src, error);
        };

        document.body.appendChild(script);

        // Intentionally not removed on unmount: ES module scripts are
        // cached by the browser per URL, and removing/re-adding the tag on
        // every navigation would not re-run its top-level side effects
        // anyway - the module registry is what matters.
    }, [src, module]);

    return null;
}

export default LegacyScript;
