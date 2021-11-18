import React from 'react'
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Home.css';
import SearchIcon from '@mui/icons-material/Search';
// import Footer from './Footer';





function Home() {
    return (
        <>

            <div className="main">


                <div className="area-texto">
                    <div className="texto-home">
                        <h1>Soluciona tus necesidades de codigo más rapido que nunca</h1>

                    </div>
                    <div className="texto-secundario">
                        <p>Pon recompensas por tus problemas más dificiles y ve como la comunidad lo resuelve</p>

                    </div>
                    <div className="button-container">
                    <NavLink to="/contratos"><Button
                            className="busca-contratos"
                            variant="contained"
                            startIcon={<SearchIcon />}
                        >Buscar Contratos</Button></NavLink>
                        
                    </div>
                    <div className="contenedor-secundario">
                        <div className="wrap-downpage">
                            <div className="texto-motivador">
                                <p>Mi abuelo siempre me decía: "Hazlo lento que voy apurado". Codear primero los tests puede parecer más lento pero los beneficios son increíbles.</p> <br />
                                <p>Desde evitar romper hasta la detección de bugs que habíamos olvidado, automatizar los tests nos ayuda a construír sin miedo y de forma robusta</p>
                            </div>

                        </div>
                    </div>



                </div>

                <div className="wraper-images">
                    <div className="imagen-home">

                        <img src="/images/assetHome2.png" alt="imagen para home" />

                    </div>
                    <div className="imagen-azul">
                        <img src="/images/azul.png" alt="imagen azul" />
                    </div>
                </div>


            </div>

            <div className="divisor-home"></div>

            {/* <Footer /> */}
                    {/* Aquí empieza el footer */}
            <div className="footer-home">
                <div className="home-izquierda">
                <NavLink to="/"> <span><h4>SmartContracts</h4></span> </NavLink>
                    <div className="logos-footer">
                        
                    <NavLink to={{pathname:"https://www.facebook.com/"}}><img src="/images/facebook.png" alt="facebook logo" /></NavLink>
                        <NavLink to={{pathname:"https://www.instagram.com/"}}>
                        <img src="/images/instagram.png" alt="instagram logo" />
                        </NavLink>
                        
                        <NavLink to={{pathname:"https://www.linkedin.com/"}}>
                        <img src="/images/linkedin.png" alt="linkedin logo" />
                        </NavLink>

                    </div>
                    
                </div>
                <div className="home-derecha">
                    <ul>
                        <li>
                            <NavLink to="/home">Inicio</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contratos">Contratos</NavLink>
                        </li>
                        <li>
                            <NavLink to="/aboutus">Quiénes Somos</NavLink>
                        </li>

                        <li>
                            <NavLink to="/registro">Regístrate</NavLink>
                        </li>
                    </ul>

                </div>
            </div>


        </>

    )
}

export default Home
