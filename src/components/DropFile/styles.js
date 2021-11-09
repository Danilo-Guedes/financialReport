import {makeStyles} from '@mui/styles'
import colors from '../../utils/colors'

const useStyles = makeStyles((theme) => ({
    dropFile : {
        width: '80%',
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `4px dashed ${colors.darkGray}`,
        backgroundColor: colors.lightGray,
        transition: 'border .24s ease-in-out',
        margin: '80px 0px 100px 0px'
    }
}))

export default useStyles