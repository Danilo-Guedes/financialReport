import {makeStyles} from '@mui/styles'
import colors from '../../utils/colors'

const useStyles = makeStyles((theme) => ({
    dropFile : {
        width: '70%',
        height: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `4px dashed ${colors.darkGray}`,
        backgroundColor: colors.lightGray,
        transition: 'border .24s ease-in-out',
        margin: '80px 80px'
    }
}))

export default useStyles