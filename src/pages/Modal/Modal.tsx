import React from "react";
import "./Modal.css";  
interface ModalProps{
    isOpen: boolean;
    onClose: ()=>void;
    children: React.ReactNode;
    X: number;
    Y:number;
}

const Modal: React.FC <ModalProps> = ({isOpen, onClose, children,X,Y})=> {
    if (!isOpen) return null;

    return(
        <div  className="overlay">
            <div className="modal" style={{width: X+'%', height: Y+'%'}} >
            {children}
                <button className="closeButton" onClick={onClose}> x </button>

            </div>
        </div>
    );
};


export default Modal;