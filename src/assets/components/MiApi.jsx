import { useEffect } from "react"
import Loading from "./Loading"

const MiApi = ({dbfarm, setDbFarm, busqueda}) => {
    let newArray = [];

    useEffect (()=>{
        const consultarApi = async () => {
            const url = 'https://midas.minsal.cl/farmacia_v2/WS/getLocalesTurnos.php';
            const response = await fetch(url);
            const data = await response.json();
            

            //Arreglar los nombres de farmacia que tengan un espacio al principio
            for (const i of data) {
                if (i.local_nombre.startsWith(" ")) {
                 i.local_nombre = i.local_nombre.trimStart();
                }
            }

            //Se ordenan los objetos alfabéticamente por el nombre de la farmacia
            data.sort((a, b) => a.local_nombre.toLowerCase() > b.local_nombre.toLowerCase() ? 1 : -1);
            console.log(data);
            setDbFarm(data);
            
        }
        consultarApi();
    }, []);

    //Se crea un nuevo array para agregar los logos de las farmacias
    newArray= dbfarm.map(object => {
        if (object.local_nombre.includes("AHUMADA")) {
          return {...object, url: '../../src/images/ahumada_logo.jpg'};
        } else if (object.local_nombre.includes("CRUZ VERDE")) {
          return {...object, url: '../../src/images/Logotipo_Cruz_Verde.svg'};
        } else if (object.local_nombre.includes("SALCOBRAND")) {
            return {...object, url: '../../src/images/Logo_Salcobrand.png'};
        } else if (object.local_nombre.includes("SIMI")) {
            return {...object, url: '../../src/images/logo_dr_simi.png'};
        } else if (object.local_nombre.includes("REDFARMA")) {
            return {...object, url: '../../src/images/logo_redfarma.png'};
        } else if (object.local_nombre.includes("FAMI")) {
            return {...object, url: '../../src/images/logo_famifarma.png'};
        } else if (object.local_nombre.includes("ECOFARMACIA")) {
            return {...object, url: '../../src/images/logo-eco-farmacias.jpg'};
        }
        else {
            return {...object, url: '../../src/images/placeholder_logo.png'};
        }
      });

      //Se usa un filtro con un array dummy
      let resultadoBusqueda = [];
      if(!busqueda){
          resultadoBusqueda = newArray;
      } else {
          resultadoBusqueda = newArray.filter(
              (farm) =>
              farm.comuna_nombre.toLowerCase().includes(busqueda.toLowerCase())
          );
      }

      //Mostrar advertencia cuando los datos estén cargando
      if(!newArray.length) return <Loading />

    return(
        
        <div>
            {resultadoBusqueda.map(item => (
                <div className = "card mb-3 p-2 shadow" key={item.local_id}>
                    <div className="row">
                        <div className="logo col-sm text-center">
                            <img className="card-img" src={item.url} alt="Card image cap"/>
                            <h3>{item.local_nombre}</h3>
                            <h4>{item.localidad_nombre}</h4>
                        </div>
                        <div className="col-sm text-left align-self-center">
                            <p><strong>Horario:</strong> {(item.funcionamiento_hora_cierre == "08:59:00" || item.funcionamiento_hora_cierre == "07:59:00" || item.funcionamiento_hora_cierre == "01:00:00") ? <>De {item.funcionamiento_hora_apertura} hrs. hasta {item.funcionamiento_hora_cierre} hrs. del día siguiente</> : <>De {item.funcionamiento_hora_apertura} hrs. hasta {item.funcionamiento_hora_cierre} hrs.</>}</p>
                            <p><strong>Comuna:</strong> {item.comuna_nombre}</p>
                            <p><strong>Día turno:</strong> {item.fecha == "2023-01-01" ? "Todos los días" : item.fecha}</p>
                            <p><strong>Dirección:</strong> {item.local_direccion}, {item.comuna_nombre}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        
    )
}

export default MiApi