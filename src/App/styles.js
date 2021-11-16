import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    wrapper: {
        margin: 20,
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        height: '80vh',
        width: '90vw',
        // justifyContent: 'center',
        alignItems: 'center',
        '& span' : {
            fontFamily : 'Montserrat',
            fontSize: 20,
        }
    },
    logoAndDrop: {
        width: '95%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}))

export default useStyles
