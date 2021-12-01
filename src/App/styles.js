import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    wrapper: {
        margin: 20,
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        height: '80vh',
        width: '90vw',
        alignItems: 'center',
    },
    logoAndDrop: {
        width: '95%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    totals: {
        fontFamily: 'Montserrat',
        fontSize: 20,
        fontWeight: 800,
        color: 'darkgreen',
        textDecoration: 'underline',
    },
    pieChartWrapper : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '100px 0 0 0'
    },
    fixedAndVarBar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '20px 0 0 0'
    }
}))

export default useStyles
