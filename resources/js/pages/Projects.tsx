export default function Projects({ projects, title }: any) {
    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h1>{title}</h1>

            <table border={1} cellPadding={10} style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                    <tr style={{ backgroundColor: "#f4f4f4" }}>
                        <th>ID</th>
                        <th>Назва проекту</th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project: any) => (
                        <tr key={project.id}>
                            <td>{project.id}</td>
                            <td>{project.name}</td>
                            <td>{project.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}