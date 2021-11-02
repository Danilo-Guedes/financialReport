import DropFile from '../components/DropFile'
import { Box } from '@mui/material'
import useStyles from './styles'

function App() {
    const styles = useStyles()
    return (
        <Box className={styles.wrapper}>
            <DropFile
                dragTxt='Arraste o extrato financeiro mensal no formato .xlsx'
                droptxt='Solte o arquivo para o processamento dos dados'
            />
        </Box>
    )
}

export default App
