import { useEffect } from "react"

const MiApi = ({dbfarm, setDbFarm, busqueda}) => {
    let newArray = []

    useEffect (()=>{
        const consultarApi = async () => {
            const url = 'https://midas.minsal.cl/farmacia_v2/WS/getLocalesTurnos.php';
            const response = await fetch(url)
            const data = await response.json()
            

            setDbFarm(data)
        }
        consultarApi()
    }, [])

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
        }
        else {
            return {...object, url: '../../src/images/placeholder_logo.png'};
        }
      });

      console.log(newArray)

      let resultadoBusqueda = []
      if(!busqueda){
          resultadoBusqueda = newArray
      } else {
          resultadoBusqueda = newArray.filter(
              (farm) =>
              farm.comuna_nombre.toLowerCase().includes(busqueda.toLowerCase())
          )
      }

    return(
        
        <div>
            {resultadoBusqueda.map(item => (
                <div className = "card mb-2 p-2" key={item.local_id}>
                    <div className="row">
                        <div className="logo col-sm text-center">
                            <img className="card-img" src={item.url} alt="Card image cap"/>
                            <h3>{item.local_nombre}</h3>
                            <h4>{item.localidad_nombre}</h4>
                        </div>
                        <div className="col-sm text-left">
                            <p><strong>Horario:</strong> {item.funcionamiento_hora_apertura} - {item.funcionamiento_hora_cierre}</p>
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