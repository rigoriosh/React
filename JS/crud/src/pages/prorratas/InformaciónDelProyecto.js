import React from 'react'

export const InformaciónDelProyecto = () => {
    const labels1 = ['Nit', 'Constructora', 'Saldo a fecha de corte', 'Saldo total', 'Saldo área constructora', 'Fecha de vencimiento póliza TRC', 'Valor lote', 'Valor último avance de obra', 'Estado']
    const datos1 = [0, '$7.266.562.54,88', 'datos1', 'datos1_1', 'datos1_2', 'datos1_3', 'datos1_4', 'datos1_5', 'BLOQUEADO_VCTO_POLIZA']
    const labels2 = ['Número crédito constructor', 'Proyecto', 'Dirección proyecto', 'Sucursal', 'Valor aprobado', 'Saldo por desembolsar', 'Valor prorrata por m2', 'Valor UVR', 'Id. garantía']
    const datos2 = ['504271100501', 'datos2_2', 'datos2_3', 'datos2_4', 'datos2_5', 'datos2_6', 'datos2_7', 'datos2_8', 'datos2_9']
    
    return (
        <>
            <h3 className="no-margen-inferior animate__animated animate__bounce texto-centrado">Información del proyecto</h3> 
            <div className="grid col-4 ml-10">
                <div>
                    { labels1.map(label => ( <p key={label} className="lh-0px fzm fwb">{label}</p> )) }
                </div>
                <div>
                    { datos1.map(dato => ( <p key={dato} className="lh-0px fzm">{dato}</p> )) }
                </div>
                <div>
                    { labels2.map(label => ( <p key={label} className="lh-0px fzm fwb">{label}</p> )) }
                </div>
                <div>
                    { datos2.map(dato => ( <p key={dato} className="lh-0px fzm">{dato}</p> )) }
                </div>
            </div>
        </>
    )
}
