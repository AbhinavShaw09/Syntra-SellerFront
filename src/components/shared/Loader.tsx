export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center justify-center w-50 h-50">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <radialGradient
            id="a12"
            cx=".66"
            fx=".66"
            cy=".3125"
            fy=".3125"
            gradientTransform="scale(1.5)"
          >
            <stop offset="0" stopColor="#FB46FF"></stop>
            <stop offset=".3" stopColor="#FB46FF" stopOpacity=".9"></stop>
            <stop offset=".6" stopColor="#FB46FF" stopOpacity=".6"></stop>
            <stop offset=".8" stopColor="#FB46FF" stopOpacity=".3"></stop>
            <stop offset="1" stopColor="#FB46FF" stopOpacity="0"></stop>
          </radialGradient>
          <circle
            fill="none"
            stroke="url(#a12)"
            strokeWidth="17"
            strokeLinecap="round"
            strokeDasharray="200 1000"
            strokeDashoffset="0"
            cx="100"
            cy="100"
            r="70"
          >
            <animateTransform
              type="rotate"
              attributeName="transform"
              calcMode="spline"
              dur="2"
              values="360;0"
              keyTimes="0;1"
              keySplines="0 0 1 1"
              repeatCount="indefinite"
            ></animateTransform>
          </circle>
          <circle
            fill="none"
            opacity=".2"
            stroke="#FB46FF"
            strokeWidth="17"
            strokeLinecap="round"
            cx="100"
            cy="100"
            r="70"
          />
        </svg>
      </div>
    </div>
  );
}
