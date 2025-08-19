import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
      colors: {
        // 기존 설정 유지
        background: "var(--background)",
        foreground: "var(--foreground)",

        // Atomic 컬러 시스템
        blue: {
          50: "var(--blue-50)",
          100: "var(--blue-100)",
          200: "var(--blue-200)",
          300: "var(--blue-300)",
          400: "var(--blue-400)",
          500: "var(--blue-500)",
          600: "var(--blue-600)",
          700: "var(--blue-700)",
          800: "var(--blue-800)",
          900: "var(--blue-900)",
        },
        neutral: {
          50: "var(--neutral-50)",
          100: "var(--neutral-100)",
          200: "var(--neutral-200)",
          300: "var(--neutral-300)",
          400: "var(--neutral-400)",
          500: "var(--neutral-500)",
          600: "var(--neutral-600)",
          700: "var(--neutral-700)",
          800: "var(--neutral-800)",
          900: "var(--neutral-900)",
          1000: "var(--neutral-1000)",
        },
        orange: {
          50: "var(--orange-50)",
          100: "var(--orange-100)",
          200: "var(--orange-200)",
          300: "var(--orange-300)",
          400: "var(--orange-400)",
          450: "var(--orange-450)",
          500: "var(--orange-500)",
          600: "var(--orange-600)",
          700: "var(--orange-700)",
          800: "var(--orange-800)",
          900: "var(--orange-900)",
        },
        red: {
          50: "var(--red-50)",
          100: "var(--red-100)",
          200: "var(--red-200)",
          300: "var(--red-300)",
          400: "var(--red-400)",
          500: "var(--red-500)",
          600: "var(--red-600)",
          700: "var(--red-700)",
          800: "var(--red-800)",
          900: "var(--red-900)",
        },
        yellow: {
          50: "var(--yellow-50)",
          100: "var(--yellow-100)",
          200: "var(--yellow-200)",
          300: "var(--yellow-300)",
          400: "var(--yellow-400)",
          500: "var(--yellow-500)",
          600: "var(--yellow-600)",
          700: "var(--yellow-700)",
          800: "var(--yellow-800)",
          900: "var(--yellow-900)",
        },

        // Common 컬러
        common: {
          black: "var(--common-black)",
          white: "var(--common-white)",
        },

        // Semantic 컬러 시스템
        bg: {
          alternative: "var(--bg-alternative)",
          main: "var(--bg-main)",
          normal: "var(--bg-normal)",
        },
        line: {
          alternative: "var(--line-alternative)",
          neutral: "var(--line-neutral)",
          normal: "var(--line-normal)",
          primary: "var(--line-primary)",
        },
        primary: {
          alternative: "var(--primary-alternative)",
          assistive: "var(--primary-assistive)",
          disabled: "var(--primary-disabled)",
          neutral: "var(--primary-neutral)",
          normal: "var(--primary-normal)",
          strong: "var(--primary-strong)",
        },
        secondary: {
          alternative: "var(--secondary-alternative)",
          neutral: "var(--secondary-netural)",
          normal: "var(--secondary-normal)",
          bg: "var(--secondary-bg)",
        },
        status: {
          cautionary: "var(--status-cautionary)",
          destructive: "var(--status-destructive)",
          positive: "var(--status-positive)",
        },
        material: {
          dimmer: "var(--material-dimmer)",
        },
      },

      // Spacing 시스템 (opacity 변수들을 활용)
      spacing: {
        "opacity-0": "var(--opacity-0)",
        "opacity-5": "var(--opacity-5)",
        "opacity-8": "var(--opacity-8)",
        "opacity-12": "var(--opacity-12)",
        "opacity-16": "var(--opacity-16)",
        "opacity-22": "var(--opacity-22)",
        "opacity-28": "var(--opacity-28)",
        "opacity-35": "var(--opacity-35)",
        "opacity-43": "var(--opacity-43)",
        "opacity-52": "var(--opacity-52)",
        "opacity-61": "var(--opacity-61)",
        "opacity-74": "var(--opacity-74)",
        "opacity-88": "var(--opacity-88)",
        "opacity-97": "var(--opacity-97)",
        "opacity-100": "var(--opacity-100)",
      },
    },
  },
  plugins: [],
};
export default config;
