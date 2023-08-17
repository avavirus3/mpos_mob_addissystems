export const color = {
  primary: '#D71A62',
  lightPrimary: 'rgba(215, 26, 98, 0.10)',
  secondary: '#3222C6',
  lightGray: '#F9F7F7',
  gray: '#A8A8A8',
  green: '#56CA0F',
  lightGreen: '#56CA0F1A',
  lightBlue: '#3222C61A',
  black: '#000',
  white: '#fff',
  grayDark: '#A1A3A8',
};

export const textStyles = {
  heading_bold: {
    fontSize: 30,
    color: color.black,
    fontWeight: 'bold',
  },

  heading_blue: {
    fontSize: 25,
    color: color.secondary,
    fontWeight: '600',
  },

  heading_normal: {
    fontSize: 19,
    color: color.black,
    fontWeight: '600',
  },

  text_normal: {
    fontSize: 19,
    color: color.black,
    fontWeight: '500',
  },

  text_sm: {
    fontSize: 20,
    color: color.black,
  },

  text_sm_gray: {
    fontSize: 18,
    color: color.gray,
  },
};

export const containerStyles = {
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderColor: 'red',
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },

  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
};
