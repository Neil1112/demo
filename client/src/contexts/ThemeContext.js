import React, {useState, useEffect, createContext} from 'react';

// export the ThemeContext
export const ThemeContext = createContext();


// ThemeContext Provider
export default ({ children }) => {

    const [colors, setColors] = useState({
        primaryGreen: "#01E8AC",
        primaryGreenLight: "#00CC97",
        primaryGreenDark: "#008C68",
        white: "#FFFFFF"
    })
    
    const [fontFamily, setFontFamily] = useState({
        primary: "Montserrat, sans-serif"
    })

    const [fontSize, setFontSize] = useState({
        lg: "1.2rem",
        md: "1rem",
        sm: "0.8rem"
    })

    const [fontWeight, setFontWeight] = useState({
        regular: "400",
        medium: "500",
        semiBold: "600",
        bold: "700"
    })



    const [theme, setTheme] = useState({
        
        heading: {
            marginTop: "5px",
            fontFamily: fontFamily.primary,
            fontSize: fontSize.lg,
            fontWeight: fontWeight.semiBold,
            color: colors.primaryGreen,
        },


        // form Theme
        formBodyText: {
            fontFamily: fontFamily.primary,
            fontSize: fontSize.md,
            fontWeight: fontWeight.medium
        },
        formInput: {
            borderRadius: "10px"
        },
        formSubmit: {
            borderRadius: "10px",
            fontFamily: fontFamily.primary,
            fontSize: fontSize.lg,
            fontWeight: fontWeight.semiBold,
            color: colors.white,
            backgroundColor: colors.primaryGreen,
        },
        form: {
            borderStyle: "solid",
            borderColor: "#B7B7B7",
            borderWidth: "2px",
            borderRadius: "20px",
        }
    });
    

    

    return (
        <div>

            <ThemeContext.Provider value={{theme, colors, fontSize, fontWeight, fontFamily}}>
                { children }
            </ThemeContext.Provider>
            
        </div>

    )
}