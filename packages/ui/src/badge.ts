type Badges = typeof BadgeVariations;

type BadgeVariants = {
  [K in keyof Badges]: string;
};

export const BadgeVariations = {
  color1: {
    badge: '',
    iconContainer: '',
  },
  color2: {
    badge: '',
    iconContainer: '',
  },
};

const toTwCVA = <T extends Badges>(obj: T, opt: keyof typeof BadgeVariations.color1): BadgeVariants =>
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, value[opt]])) as BadgeVariants;

export const badgeVariations = toTwCVA(BadgeVariations, 'badge');
export const badgeIconContainerVariations = toTwCVA(BadgeVariations, 'iconContainer');

export default BadgeVariations;
