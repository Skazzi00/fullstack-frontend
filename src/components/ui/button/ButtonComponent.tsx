// @flow
import * as React from 'react';
import {COLORS} from "../../../theme.consts";

type Props = {
    onClick: () => void,
    text: string,
    color?: string,
    styles?: any
};
export const ButtonComponent = (props: Props) => {

    const backgroundColor = props.color ? props.color : COLORS.buttonDefaultColor;

    return (
        <button onClick={props.onClick} style={{...styles.button, backgroundColor: backgroundColor, ...props.styles}}>
            {props.text}
        </button>
    );
};

const styles = {
    button: {
        color: 'white',
        border: 'none',
        borderRadius: 10,
        padding: '5px 10px',
        cursor: 'pointer',
        minWidth: 100,
        height: 30
    }
}