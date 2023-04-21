const Buscador = ({busqueda, setBusqueda}) => {
    return(
        <>
            <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Busca por comuna" aria-label="Username" aria-describedby="basic-addon1" value={busqueda} onChange={(e) => setBusqueda(e.target.value)}/>
            <div className="input-group-prepend">
                <span className="input-group-text p-3" id="basic-addon1"><i className="fa-solid fa-magnifying-glass"></i></span>
            </div>
            </div>
        </>
    )
}

export default Buscador
