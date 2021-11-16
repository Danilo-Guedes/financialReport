const colors = {
    lightGray: '#d3d3d3',
    darkGray: '#a9a9a9',
}

const randomColors = [
    'red',
    'blue',
    'purple',
    'orange',
    'green',
    'black',
    'gray',
    'aquamarine',
    'lime',
    'fuchsia',
    'olive',
    'navy',
    'aqua',
    'blueviolet',
    'brown',
    'chartreuse',
    'coral',
    'crimson',
    'cyan',
    'greenyellow',
    'lawngreen',
    'indigo',
    'lightcoral',
    'lightgreen',
    'lightseagreen',
    'mediumpurple',
    'mediumturquoise',
    'orangered',
    'orchid',
    'palevioletred',
    'plum',
    'skyblue',
    'slateblue',
    'slategrey',
    'springgreen',
    'indianred',
    'hotpink',
    'dodgerblue',
    'deeppink',
    'darkslateblue',
    'darkorchid',
    'chartreuse',
]

export default colors

export const randomColorGenerator = () => {
    return randomColors?.[Math.floor(Math.random() * randomColors?.length)]
}
