import { FaGithub, FaLinkedin } from "react-icons/fa"
import "./CreditosPage.css"

function CreditosPage() {
    return(
        <>
            <div className="col-12 mt-5 text-center titulo-container">
                <br />
                <h1 className="iluminacion-titulo">Desarrolladores detrás del proyecto</h1>
                <br />
            </div>


            <div className="mt-5 mb-5">
            <div className="rounded-5 bg-white shadow mx-5 px-4 py-4 font-lato">
                    <div className="row align-items-center g-4">
                    <div className="col-12 col-md-4 text-center">
                        <img
                        className="img-fluid rounded-5 shadow-lg"
                        src="https://media.licdn.com/dms/image/v2/D4E03AQHG0bDbH2O6PA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1684172923928?e=1765411200&v=beta&t=01xU-KH0VJ5M1AvpIjyv9cEQyNd-3r4dlg6JbGRKJ0U"
                        alt="Perfil Leonel"
                        />
                    </div>

                    <div className="col-12 col-md-8 text-start">
                        <h3 className="fs-4 fw-bold mb-3">Leonel Briones</h3>
                        <p className="fs-6 text-muted mb-4">
                        El Senior del Dream Team.
                        </p>

                        <div className="d-flex gap-3">
                            <a
                                href="https://www.linkedin.com/in/leonel-briones-palacios/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-decoration-none"
                                title="LinkedIn"
                            >
                                <FaLinkedin className="hover-effect linkedin" />
                            </a>
                            <a
                                href="https://github.com/jarodsmdev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-decoration-none"
                                title="GitHub"
                            >
                                <FaGithub className="hover-effect github" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <br />

            <div className="rounded-5 bg-white shadow mx-5 px-4 py-4 font-lato">
                <div className="row align-items-center g-4">
                    <div className="col-12 col-md-4 text-center">
                        <img
                        className="img-fluid rounded-5 shadow-lg"
                        src="https://avatars.githubusercontent.com/u/173817343?v=4"
                        alt="Perfil Lusho"
                        />
                    </div>

                    <div className="col-12 col-md-8 text-start">
                        <h3 className="fs-4 fw-bold mb-3">Luis Maulén</h3>
                        <p className="fs-6 text-muted mb-4">
                        Miembro random del Dream Team.
                        </p>

                        <div className="d-flex gap-3">
                            <a
                                href="https://linkedin.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-decoration-none"
                                title="LinkedIn"
                            >
                                <FaLinkedin className="hover-effect linkedin" />
                            </a>
                            <a
                                href="https://github.com/L-Maulen"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-decoration-none"
                                title="GitHub"
                            >
                                <FaGithub className="hover-effect github" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

                        <br />

            <div className="rounded-5 bg-white shadow mx-5 px-4 py-4 font-lato">
                <div className="row align-items-center g-4">
                    <div className="col-12 col-md-4 text-center">
                        <img
                        className="img-fluid rounded-5 shadow-lg imagen-andy"
                        src="https://avatars.githubusercontent.com/u/132930876?v=4"
                        alt="Perfil Andy"
                        />
                    </div>

                    <div className="col-12 col-md-8 text-start">
                        <h3 className="fs-4 fw-bold mb-3">Andrés Ortega</h3>
                        <p className="fs-6 text-muted mb-4">
                        El CEO del Dream Team.
                        </p>

                        <div className="d-flex gap-3">
                            <a
                                href="www.linkedin.com/in/andy-ortega-a97706284/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-decoration-none"
                                title="LinkedIn"
                            >
                                <FaLinkedin className="hover-effect linkedin" />
                            </a>
                            <a
                                href="https://github.com/Andythe20"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-decoration-none"
                                title="GitHub"
                            >
                                <FaGithub className="hover-effect github" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <br />
            </div>

        </>
    )
}

export default CreditosPage
