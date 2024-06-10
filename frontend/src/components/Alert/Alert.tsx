import { Fragment } from "react/jsx-runtime";
import { AlertColor, AlertType } from "./AlertClass";
import { Info, Question, CheckCircle, XCircle} from "@phosphor-icons/react";

const Alert = ({ message, type }: any) => {

    const alertType = AlertColor(type);
    const typeAlert = AlertType(type);
    const icon = type === 'success' ? <CheckCircle size={20} /> : type === 'danger' ? <XCircle size={20} /> : type === 'warning' ? <Question size={20} /> : <Info size={20} />;

    return (

        <Fragment>
            <div className={alertType + " flex flex-row gap-1"}>
                {icon}<span className="capitalize font-bold"> {typeAlert} !</span> {message}
            </div>
        </Fragment>
            
    
    );

}

export default Alert;