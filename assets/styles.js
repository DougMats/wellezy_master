const primaryColor= '#0B4AB0'
const primaryColorContrast= '#39D9FF'

const disabledColor= '#E0E0E0'
const disabledColorContrast= '#7C7C7C'

const negativeColor = '#FC0000'
const negativeContrast = 'white'


const disabledBgColor= '#E0E0E0' // it will Refactory
const primaryTextColor= '#39D9FF' // it will Refactory

const tinyText = 10
const smallText = 16
const bigText = 20
const gigantText = 24
const superGigantText = 40
let Theme = {

    primaryColor,
    primaryColorContrast,

    disabledColor,
    disabledColorContrast,

    negativeColor,
    negativeContrast,

    tinyText,
    smallText,
    bigText,
    gigantText,
    superGigantText,

    disabledBgColor,
    primaryTextColor,
    positiveColor: '#3CB445',

    lightText: 'white',
    darkText: 'black',
    header : {
        fontSize: 18, 
        marginTop: 20,
        textAlign: 'center',
        marginBottom: 15,
        color : primaryColor
    },
    title : {
        fontSize: 16, 
        marginTop: 20,
        textAlign: 'center',
        marginBottom: 15,
        color : primaryColor
    },
    bigTitle : {
        fontSize: 22, 
        textAlign: 'center',
        color : primaryColor
    },
    miniTitle : {
        fontSize: 11, 
        textAlign: 'center',
        color : primaryColor
    },
    divider : {
        marginTop : 20,
        marginBottom : 20,
        
    }
    
};

export default Theme;