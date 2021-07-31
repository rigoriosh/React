import React from 'react'
import Modal from 'react-bootstrap/Modal'

export const ModalCalendar = ({openModalCalendar, setOpenModalCalendar, handleinputsChange}) => {
    
    return (
        <Modal show={openModalCalendar} onHide={()=>setOpenModalCalendar(false)} centered>
            
            <Modal.Body>
                <div className="input-group mb-3">
                    <input onChange={({target})=>handleinputsChange(target)} name="calendar" type="date" className="form-control" 
                        aria-label="CantidadProgramda" aria-describedby="basic-addon1"/>
                </div>                
            </Modal.Body>
            {/* <Modal.Footer>
                <Button variant="secondary" onClick={()=>updateStateActividades({...stateActividades, openModal:false})}>
                    Close
                </Button>
                <Button variant="primary" onClick={()=>updateStateActividades({...stateActividades, openModal:false})}>
                    Save Changes
                </Button>
            </Modal.Footer> */}
        </Modal>
    )
}
