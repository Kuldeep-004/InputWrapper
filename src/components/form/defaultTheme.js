export const defaultTheme = {
  form: "w-full",

  grid: `
    grid
    grid-cols-1
    md:grid-cols-2
    lg:grid-cols-3
    gap-4
    p-3 md:p-4
    w-full
  `,

  wrapper: "flex flex-col gap-1 w-full",

  label: "text-xs font-medium text-gray-700 mb-1",

  input: `
    w-full h-10
    px-3
    border border-gray-300
    rounded-md
    bg-white
    text-sm
    transition-colors
    focus:outline-none
    focus:ring-2 focus:ring-blue-500
    focus:border-blue-500
    disabled:bg-gray-100
    disabled:cursor-not-allowed
  `,

  error: "text-red-500 text-xs min-h-[16px] leading-4",

  warning: "text-yellow-600 text-xs min-h-[16px] leading-4",

  actions: "mt-6 flex gap-3 justify-end",
};

export const themes = {
  compact: {
    ...defaultTheme,
    grid: `
      grid
      grid-cols-1
      md:grid-cols-2
      lg:grid-cols-4
      gap-2
      p-2
    `,
    wrapper: "flex flex-col gap-0.5 w-full",
    input: `
      w-full h-8
      px-2
      border border-gray-300
      rounded
      bg-white
      text-xs
      focus:outline-none
      focus:ring-1 focus:ring-blue-500
    `,
    label: "text-xs text-gray-600 mb-0.5",
    error: "text-red-500 text-[10px] min-h-[12px]",
  },

  spacious: {
    ...defaultTheme,
    grid: `
      grid
      grid-cols-1
      md:grid-cols-2
      lg:grid-cols-2
      gap-6
      p-6
    `,
    wrapper: "flex flex-col gap-2 w-full",
    input: `
      w-full h-12
      px-4
      border-2 border-gray-300
      rounded-lg
      bg-white
      text-base
      focus:outline-none
      focus:ring-2 focus:ring-blue-500
      focus:border-blue-500
    `,
    label: "text-sm font-semibold text-gray-700 mb-2",
    error: "text-red-500 text-sm min-h-[20px]",
  },

  minimal: {
    ...defaultTheme,
    grid: `
      flex
      flex-col
      gap-4
      p-4
    `,
    wrapper: "flex flex-col gap-1 w-full",
    input: `
      w-full h-10
      px-3
      border-b-2 border-gray-300
      bg-transparent
      text-sm
      focus:outline-none
      focus:border-blue-500
      transition-colors
    `,
    label: "text-xs text-gray-500 mb-1",
    error: "text-red-400 text-xs min-h-[14px]",
  },

  dark: {
    ...defaultTheme,
    form: "w-full bg-gray-900",
    grid: `
      grid
      grid-cols-1
      md:grid-cols-2
      lg:grid-cols-3
      gap-4
      p-4
    `,
    wrapper: "flex flex-col gap-1 w-full",
    input: `
      w-full h-10
      px-3
      border border-gray-600
      rounded-md
      bg-gray-800
      text-white
      text-sm
      focus:outline-none
      focus:ring-2 focus:ring-blue-400
      focus:border-blue-400
    `,
    label: "text-xs font-medium text-gray-300 mb-1",
    error: "text-red-400 text-xs min-h-[16px]",
  },
};
