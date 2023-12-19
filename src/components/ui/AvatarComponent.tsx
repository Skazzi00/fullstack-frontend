// @flow
import * as React from 'react';

type Props = {
    username: string
};
export const AvatarComponent = (props: Props) => {
    return (
        <div style={styles.container}>
            <img src={'https://api.dicebear.com/7.x/pixel-art/jpg?seed=' + props.username} alt="Avatar"
                 width={40} height={40}/>
        </div>
    );
};

const styles = {
    container: {
        borderRadius: '50%',
        width: 40,
        height: 40,
        overflow: 'hidden',
    }
}