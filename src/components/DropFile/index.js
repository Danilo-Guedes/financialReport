import { useCallback } from 'react'
import XLSX from 'xlsx'

import { useDropzone } from 'react-dropzone'

import useStyles from './styles'

function DropFile({ dragTxt, droptxt }) {
    const styles = useStyles()

    const onDrop = useCallback(acceptedFiles => {
        const reader = new FileReader()
        const file = acceptedFiles[0]

        console.log(acceptedFiles[0])
        console.log(reader)

        reader.onload = e => {
            console.log('onload chamado')
            const binaryData = reader.result
            console.log(binaryData)
            const workbook = XLSX.read(binaryData, {cellDates: true, type: 'buffer'})
            console.log("workbook =>", workbook)
            const sheetName = workbook.SheetNames[0]


            // workbook[sheetName].forEach(e => console.log(e))

            // const cells = workbook.Sheets[sheetName].map(e => e)

            // console.log(cells)



        }

        reader.onloadend = e => {
            console.log('onloadend chamado')
        }

        reader.readAsArrayBuffer(file)
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: '.xlsx,.xls',
    })

    return (
        <div {...getRootProps({ className: styles.dropFile })}>
            <input {...getInputProps()} />
            {isDragActive ? <p>{droptxt}</p> : <p>{dragTxt}</p>}
        </div>
    )
}

export default DropFile
