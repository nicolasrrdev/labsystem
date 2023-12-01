// import { Component } from "react";

// import UserService from "../services/user.service";

// export default class Home extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       content: ""
//     };
//   }

//   componentDidMount() {
//     UserService.getPublicContent().then(
//       response => {
//         this.setState({
//           content: response.data
//         });
//       },
//       error => {
//         this.setState({
//           content:
//             (error.response && error.response.data) ||
//             error.message ||
//             error.toString()
//         });
//       }
//     );
//   }

//   render() {
//     return (
//       <div className="container">
//         <header className="jumbotron">
//           <center>
//             <h2>Home</h2>
//             <h3>{this.state.content}</h3>
//           </center>
//         </header>
//       </div>
//     );
//   }
// }

import { useState } from 'react'
import Confetti from 'react-confetti'
// import Usco2 from '../assets/usco.png'
import Usco from '../assets/logo-usco.png'

const Home = () => {
  const [confettiVisible, setConfettiVisible] = useState(false)
  const triggerConfetti = () => {
    setConfettiVisible(true)
    setTimeout(() => {
      setConfettiVisible(false)
    }, 10000)
  }

  return (
    <div>
      <center> <br />
        <h2>Sistema de Información</h2>
        <h2>Laboratorio De Neurocognición y Psicofisiología</h2>
        <h2>Bienvenido</h2> <br />
        <img src={Usco} alt='Usco' onClick={triggerConfetti} className='uscoLogo' /> <br /> <br />
        {confettiVisible && <Confetti />}
        <div style={{ textAlign: 'justify', maxWidth: '800px', margin: '20px' }}>
          <h3>Reseña Histórica</h3>
          <p>
          El 17 de diciembre de 1968, mediante la Ley 55 se crea el Instituto Técnico Universitario Surcolombiano, ITUSCO, con la misión de preparar y calificar los profesionales que requerían la región y el conocimiento de su realidad concreta. Inició labores académicas el 30 de marzo de 1970, con tres programas de Tecnología, en Administración de Empresas, en Administración Educativa y en Contaduría Pública, con 305 alumnos y cuatro profesores de tiempo completo. Mediante la Ley 13 de 1976 se transformó el ITUSCO en Universidad Surcolombiana, con estructura similar a la de la Universidad Nacional de Colombia, excepto en la conformación del Consejo Superior; en consecuencia, limitó la competencia de la Universidad al ofrecimiento sólo de programas académicos establecidos por la Universidad Nacional. El 23 de agosto de 2017 fue inaugurado el Laboratorio de Neurocognición y Psicofisiología del Grupo de Investigación Midneuropsy del Programa de Psicología de la Universidad Surcolombiana. El espacio de investigación está ubicado en el Barrio Altico de Neiva, antiguo Consultorio Jurídico. En ese momento, Mario Alfredo Parra miembro fundador del Grupo de Investigación y docente de la Universidad Heriot-Watt de Edimburgo, fue uno de los profesionales encargados en el asesoramiento en la adquisición de los equipos del Laboratorio.
          </p>
          <h3>Misión</h3>
          <p>
          La Universidad Surcolombiana orienta y lidera la formación integral, humana y crítica de profesionales e investigadores, fundamentada en conocimientos disciplinares, de las profesiones, interdisciplinares y multiculturales, mediante procesos académicos, sociales y políticos transformadores, comprometidos prioritariamente con la construcción de una nación democrática, deliberativa, participativa y en paz, sustentada en el desarrollo humano, social, sostenible y sustentable en la región Surcolombiana; su accionar será orientado por la ética cívica, el diálogo multicultural, la preservación y defensa del medio ambiente y el Pensamiento Complejo, con proyección nacional e internacional.
          </p>
          <h3>Visión</h3>
          <p>
          En el año 2024, la Universidad Surcolombiana consolidará el liderazgo de los procesos de formación integral y crítica de profesionales y será vanguardia en generación de conocimientos mediante la investigación y en la formación de investigadores, que promuevan los procesos de apropiación, producción y aplicación de los conocimientos, en la construcción de una sociedad democrática, deliberativa, participativa, con el fin de que éstos contribuyan a la solución de los problemas relevantes de la realidad regional, con proyección nacional e internacional y perspectiva de sustentabilidad ambiental, equidad, justicia, pluralismo, solidaridad y respeto por la dignidad humana.
          </p>
          <h3>Valores</h3>
          <p>
          -El Laboratorio de Neurocognición y Psicofisiología permitirá evaluar los procesos que se necesitan para generar conductas humanas adaptativas, es decir, la capacidad de funcionar normal en el entorno, cualquiera que este sea. Estos procesos consisten en poder recibir estímulos del ambiente y darles acceso al Sistema Nervioso Central permitiéndole interpretar y generar respuestas adecuadas.<br />
          -Aportar en la formación académica en el área de la psicología - Entre los recursos de MinCiencias y el apoyo de la Universidad Surcolombiana, se invirtieron para la dotación del laboratorio una gran inversión, lo que ubica a la institución en la primera de la región en contar con este tipo de espacios para la formación de los futuros psicólogos.<br />
          -Abrir nuevas oportunidades para investigar el cerebro y su función en individuos sanos que se están desarrollando, en individuos maduros, o en pacientes que debido a daños cerebrales o del sistema nervioso, están perdiendo la capacidad de funcionar, de adaptarse a su entorno, o están dependiendo de ayuda o servicios de salud.<br />
          </p>
          <h3>Productos y/o Servicios</h3>
          <p>
          -El laboratorio está equipado con tres unidades básicas que permiten explorar el sistema nervioso en su ejecución, a través de la recepción de los estímulos, el procesamiento central de los estímulos, y la devolución de las respuestas que van a ser ejecutadas para funcionar de una forma adaptativa normal y cumplir con las demandas del entorno.<br />
          -Se podrá ofrecer una evidencia sobre qué subyace al desarrollo normal del sistema nervioso o qué puede explicar los síntomas que un paciente pueda presentar de una enfermedad del sistema nervioso.<br />
          -El nuevo espacio de práctica permitirá que la Universidad Surcolombiana interactúe con una red de más de 18 Centros de Investigación del Mundo para desarrollar investigaciones conjuntas que alimenten bases de datos de gran envergadura, entre ellas, la Big Data.<br />
          </p>
        </div>
      </center>
    </div>
  )
}

export default Home
