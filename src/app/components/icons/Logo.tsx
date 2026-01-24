import React from 'react';

/**
 * Custom Logo component based on the provided design.
 * @param {React.SVGProps<SVGSVGElement>} props - SVG transition properties.
 * @returns {JSX.Element} The rendered SVG logo.
 */
export const Logo = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    {/* Rounded Square Outer - slightly more rounded as per image */}
    <rect
      x="3.5"
      y="3.5"
      width="17"
      height="17"
      rx="4.5"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Precisely aligned Checkmark */}
    <path
      d="M8.5 12.5L11 15L16 9"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
