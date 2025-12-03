module.exports = {
  theme: {
    extend: {
      animation: {
        slowPulse: 'slowPulse 8s ease-in-out infinite',
        softFloat: 'softFloat 6s ease-in-out infinite',
      },
      keyframes: {
        slowPulse: {
          '0%, 100%': { opacity: 0.04 },
          '50%': { opacity: 0.07 },
        },
        softFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
};
