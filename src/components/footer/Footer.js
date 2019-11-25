import React from 'react';
import { Typography, Link, Box } from '@material-ui/core';

export function Footer() {
    return (
        <div>
            <Box py={5} style={{background: '#262431', color: 'grey'}}>
                <Typography variant="body2" color="textSecondary" align="center" style={{background: '#262431', color: 'grey'}}>
                    {'Copyright ©'}
                    <Link color="inherit" href="https://www.weeclik.com">Weeclik</Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Box>
        </div>
    )
}