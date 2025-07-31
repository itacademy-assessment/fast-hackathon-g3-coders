import { Header } from "../components/Header";

export const AboutPage = () => {
    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
            <Header />

            <main
                style={{
                    maxWidth: "1280px",
                    margin: "0 auto",
                    padding: "24px 16px",
                }}
            >
                <div
                    style={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                        padding: "24px",
                    }}
                >
                    <h1
                        style={{
                            fontSize: "2rem",
                            fontWeight: "bold",
                            color: "#111827",
                            marginBottom: "24px",
                        }}
                    >
                        About G3-Coders
                    </h1>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                        }}
                    >
                        <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
                            Welcome to G3-Coders! We are a passionate team of
                            developers working on innovative solutions and
                            cutting-edge technologies.
                        </p>

                        <div
                            style={{
                                backgroundColor: "#f9fafb",
                                borderRadius: "8px",
                                padding: "16px",
                            }}
                        >
                            <h3
                                style={{
                                    fontWeight: "600",
                                    color: "#111827",
                                    marginBottom: "12px",
                                }}
                            >
                                Our Mission
                            </h3>
                            <p
                                style={{
                                    color: "#6b7280",
                                    lineHeight: "1.6",
                                    margin: 0,
                                }}
                            >
                                To create amazing web applications that solve
                                real-world problems and provide exceptional user
                                experiences through modern technologies and best
                                practices.
                            </p>
                        </div>

                        <div
                            style={{
                                backgroundColor: "#f9fafb",
                                borderRadius: "8px",
                                padding: "16px",
                            }}
                        >
                            <h3
                                style={{
                                    fontWeight: "600",
                                    color: "#111827",
                                    marginBottom: "12px",
                                }}
                            >
                                Technologies We Use
                            </h3>
                            <ul
                                style={{
                                    color: "#6b7280",
                                    lineHeight: "1.6",
                                    paddingLeft: "20px",
                                    margin: 0,
                                }}
                            >
                                <li>React & TypeScript</li>
                                <li>Firebase Authentication</li>
                                <li>Tanstack Query</li>
                                <li>React Router</li>
                                <li>Modern CSS & Bootstrap</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
