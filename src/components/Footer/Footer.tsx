import styles from "./Footer.module.css";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p>&copy; 2025 Event Manager. All rights reserved.</p>
                <nav>
                    <ul>
                        <li>
                            <a href="/about" className={styles.link}>
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="/privacy-policy" className={styles.link}>
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="/terms-of-service" className={styles.link}>
                                Terms of Service
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};
