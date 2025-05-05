// export type ButtonMode = 'outlined' | 'flat' | undefined;
// export type ButtonMode = 'outlined' | 'text' | 'contained' | 'elevated' | 'contained-tonal' | undefined

export const globalStyleButtonsColor = {
    primaryColor: '#9e0c14',
    secondaryColor: '#0e112d',
    accentDefault: '#ff4081',
    fontColor: '#fff'
}

export const papersButtonVariables = {
    primaryButton: {
        primary: globalStyleButtonsColor.primaryColor,
        accent: globalStyleButtonsColor.accentDefault,
        fontColor: globalStyleButtonsColor.fontColor,
    },
    secondaryButton: {
        primary: globalStyleButtonsColor.secondaryColor,
        accent: globalStyleButtonsColor.accentDefault,
        fontColor: globalStyleButtonsColor.fontColor
    }
};
