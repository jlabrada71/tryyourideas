export function generateTypography(itemClass, f) {
  return ` ${f(itemClass.textColor)} ${f(itemClass.fontSize)}  ${f(itemClass.fontWeight)} ${f(itemClass.fontFamily)} ${f(itemClass.letterSpacing)} ${f(itemClass.lineHeight)}  ${f(itemClass.textAlign)} ${f(itemClass.textVerticalAlign)}`
}

export function getTypographyVariables() {
  return {
    textColor: 'unset',
    fontSize: 'unset',
    fontFamily: 'unset',
    fontWeight:'unset',
    letterSpacing: 'unset',
    lineHeight: 'unset',
    textAlign: 'unset',
    textVerticalAlign: 'unset',
  }
}