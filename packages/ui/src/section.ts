type BgColors = typeof sectionVariations.bgColor;

type TwBgColorClasses = {
  [K in keyof BgColors]: string;
};

export const sectionVariations = {
  top: {
    none: 'pt-0',
    xs: 'pt-2',
    sm: 'pt-4',
    md: 'pt-2 sm:pt-4 lg:pt-8',
    lg: 'pt-12 sm:pt-14 lg:pt-16',
    xl: 'pt-12 sm:pt-18 lg:pt-24',
  },
  bottom: {
    none: 'pb-0',
    xs: 'pb-2',
    sm: 'pb-4',
    md: 'pb-2 sm:pb-4 lg:pb-8',
    lg: 'pb-12 sm:pb-14 lg:pb-16',
    xl: 'pb-12 sm:pb-18 lg:pb-24',
  },
  bgColor: {
    light: { class: '', value: '' },
    dark: { class: '', value: '' },
  },
};

const toTwCVA = <T extends BgColors>(obj: T): TwBgColorClasses =>
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, value.class])) as TwBgColorClasses;

export const sectionBgClasses = toTwCVA(sectionVariations.bgColor);
