import {
FaReact,
FaJava,
FaDocker
} from "react-icons/fa";

import {
SiSpringboot,
SiPostgresql,
SiOllama
} from "react-icons/si";

function TechStack(){

const tech=[

{
icon:<FaReact size={45}/>,
name:"React"
},

{
icon:<SiSpringboot size={45}/>,
name:"Spring Boot"
},

{
icon:<FaJava size={45}/>,
name:"Java"
},

{
icon:<SiPostgresql size={45}/>,
name:"PostgreSQL"
},

{
icon:<SiOllama size={45}/>,
name:"Ollama"
},

{
icon:<FaDocker size={45}/>,
name:"Docker"
}

];

return(

<section className="tech-section">

<div className="container">

<div className="text-center mb-5">

<h2 className="section-title">
Tech Stack
</h2>

<p className="section-subtitle">
Built using modern Full Stack technologies.
</p>

</div>

<div className="row g-4">

{
tech.map((item,index)=>(

<div className="col-6 col-md-4 col-lg-2" key={index}>

<div className="tech-card">

<div className="mb-3">

{item.icon}

</div>

<h6>{item.name}</h6>

</div>

</div>

))
}

</div>

</div>

</section>

)

}

export default TechStack;