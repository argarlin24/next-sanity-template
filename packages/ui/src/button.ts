export const buttonVariations = {
  primary: [
    // tw
    'bg-cool-950 dark:bg-mud-200 text-mud-100 dark:text-cool-950',
    // hover
    'hover:bg-creek-700 dark:hover:bg-mud-100',
    // group-hover
    'group-hover:bg-creek-700 dark:group-hover:bg-mud-100',
    // disabled
    'disabled:bg-neutralGrey-400 disabled:text-neutralGrey-300',
  ],
  outline: [
    // default
    'bg-transparent border text-cool-950 border-cool-950 dark:text-mud-100 dark:border-mud-100',
    // hover
    'hover:text-creek-700 hover:border-creek-700 dark:hover:bg-mud-100 dark:hover:border-mud-100 dark:hover:text-mud-900',
    // group-hover
    'group-hover:text-creek-700 group-hover:border-creek-700 dark:group-hover:bg-mud-100 dark:group-hover:border-mud-100 dark:group-hover:text-mud-900',
    // disabled
    'disabled:border-neutralGrey-400 disabled:text-neutralGrey-400',
  ],
  link: [
    // default
    'text-knapsack-800 dark:text-knapsack-400',
    // hover
    'hover:text-knapsack-600',
    // group-hover
    'group-hover:text-knapsack-600',
    // disabled
    'disabled:text-neutralGrey-400',
  ],
};

export default buttonVariations;
