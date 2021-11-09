const colors = {
    lightGray: '#d3d3d3',
    darkGray: '#a9a9a9',
}

const randomColors = [
    { classicBlue: '#4B66EA' },
    { blue: '#4F6DE6' },
    { backGround: '#FFF' },
    { pageBackGround: '#F7F8F9' },
    { white: '#FFFFFF' },
    { semiWhite: '#F2F2F2' },
    { black: '#000' },
    { black1: '#131313' },
    { black2: '#4A4A4A' },
    { secondBlue: '#0084F4' },
    { secondBlueOpacity: 'rgba(0}, 132, 244, 0.2)' },
    { secondRed: '#F23A56' },
    { dimGray: '#6D5F6F' },
    { gray: '#666666' },
    { lightGray: '#C4C4C4' },
    { lighterGray: '#C4C4C4' },
    { darkGray: '#333333' },
    { green: '#00C48C' },
    { green3: '#6fcf97' },
    { greenHover: '#7AE3A6' },
    { secondGreen: '#27AE60' },
    { orange: '#FFAA28' },
    { orangeHover: '#FFBA52' },
    { darkOrange: '#E69112' },
    { yellow: '#FFCF5C' },
    { silverChalice: '#ABA4AC' },
    { silverChaliceOpacity: 'rgba(171}, 164, 172, 0.2)' },
    { platinum: '#EAE8EA' },
    { blueAccent: '#6979F8' },
    { bluePrimary: '#0F4C81' },
    { oldBurgundy: '#433246' },
    { semiBlack: '#1A051D' },
    { frame: '#F7F8F9' },
    { brown: '#969696' },
    { brown1: '#696969' },
    { line: '#E5E5E5' },
    { red: 'red' },
    { circle: '#2D90F5' },
    { darkPurple: '#3E254A' },
    { textPurple: '#553264' },
    { purpleHover: '#734487' },
    { perfectRed: '#BE1E1E' },
    { exclusionRed: '#EB5757' },
    { exclusionRedHover: '#FF7373' },
]

export default colors

export const randomColorGenerator = () => {
    return Object.values(randomColors?.[Math.floor(Math.random() * randomColors?.length)])
}
