import React from 'react';
import { Card as DefaultCard } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'

const styles = {
    default: {
        width: 400,
        height: 500,
        padding: 50
    }
};

const Card = (props) => {
    const { classes, children } = props;
    return (
        <DefaultCard className={classes.default}>
            {children}
        </DefaultCard>
    )
}


export default withStyles(styles)(Card);