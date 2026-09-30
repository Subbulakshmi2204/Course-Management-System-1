function Footer({ variant = "standard" }) {
    if (variant === "admin") {
        return (
            <footer>
                <div className="container text-center">
                    <p className="mb-0 opacity-75 small">
                        © 2026 Student Course Management System. Secure Administrative Gateway.
                    </p>
                </div>
            </footer>
        );
    }

    return (
        <footer>
            <div className="container text-center text-md-between d-md-flex align-items-center justify-content-between">
                <p className="mb-2 mb-md-0 opacity-75">
                    © 2026 Student Course Management System. All rights reserved.
                </p>
                <div className="d-flex gap-3 justify-content-center">
                    <a className="text-white opacity-75 text-decoration-none small" href="#">
                        Privacy Policy
                    </a>
                    <a className="text-white opacity-75 text-decoration-none small" href="#">
                        Terms of Service
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
