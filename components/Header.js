import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div style={styles.header}>
            <h1 style={styles.logo}>Movie On the TOP</h1>
            <div style={styles.authButtons}>
                <Link to="/signup">
                    <button style={styles.button}>Signup</button>
                </Link>
                <button style={styles.button}>Logout</button>
            </div>
        </div>
    );
}

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px',
        position: 'relative'
    },
    logo: {
        fontSize: '2.5rem',
        textAlign: 'center',
        width: '100%',
        padding: '20px 0'
    },
    authButtons: {
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)'
    },
    button: {
        padding: '8px 16px',
        marginLeft: '10px',
        background: 'transparent',
        border: '1px solid #000',
        cursor: 'pointer'
    }
};

export default Header;
