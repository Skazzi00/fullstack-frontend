import React, {MouseEventHandler} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconProp} from "@fortawesome/fontawesome-svg-core";

const IconButton = ({ icon, onClick, customStyle, ...props }: {icon: IconProp, onClick: MouseEventHandler, customStyle?: any}) => {
    return (
        <button style={{...styles.button, ...customStyle}} onClick={onClick} {...props}>
            <FontAwesomeIcon style={styles.icon} icon={icon}/>
        </button>
    );
};

const styles = {
    button: {
        background: 'none',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
    },
    icon: {
        fontSize: 30,
    }
}

export default IconButton;
