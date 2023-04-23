/*Taken from https://www.youtube.com/watch?v=i8fAO_zyFAM*/
import './PopUp.css';

const PopUp = (props) => {
    return (props.trigger) ? (
        <>
            <div className="popup" >
                <div className="popup-inner">
                    <div className="close-btn" onClick={() => {props.setTrigger(false)} }>X</div>
                    {props.children}
                </div>
            </div>
        </>
    ) : "";
}

export default PopUp