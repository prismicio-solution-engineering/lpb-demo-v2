"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export const Animation = () => {
  const svgRef1 = useRef<SVGSVGElement>(null);
  const svgRef2 = useRef<SVGSVGElement>(null);

  const animateIn = (
    direction: "left" | "right",
    duration: number,
    delay: number
  ) => ({
    from: {
      x: direction === "left" ? -500 : 500,
      opacity: 0,
    },
    to: {
      x: 0,
      opacity: 1,
      transition: {
        duration,
        delay,
      },
    },
    toOffset: {
      x: 100,
      opacity: 1,
      transition: {
        duration,
        delay,
      },
    },
  });

  const lineGrowIn = (y: number, x: number, delay: number) => ({
    from: {
      x,
      y,
      opacity: 0,
    },
    to: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay,
      },
    },
  });

  const linePulse = (
    delay: number,
    repeatDelay: number = 1,
    pathLength: number,
    reverse?: boolean
  ) => ({
    from: { strokeDashoffset: pathLength, strokeDasharray: pathLength },
    to: {
      strokeDashoffset: reverse
        ? [pathLength, pathLength * 2, pathLength * 3]
        : [pathLength * 3, pathLength * 2, pathLength],
      strokeDasharray: pathLength,
      transition: {
        strokeDashoffset: {
          duration: 0.5,
          repeat: Infinity,
          delay,
          repeatDelay,
        },
      },
    },
  });

  return (
    <div>
      <motion.svg
        width="231"
        height="423"
        viewBox="0 0 231 423"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-1/6 max-w-57.75 h-auto absolute top-0 left-0 z-10 pointer-events-none hidden lg:block"
        ref={svgRef1}
        variants={animateIn("left", 1, 0)}
        initial="from"
        animate="to"
      >
        <motion.path
          d="M84.9971 152L223.997 232"
          stroke="#E8F8F3"
          strokeWidth="14"
          strokeLinecap="round"
          variants={lineGrowIn(-35, -60, 1.5)}
          initial="from"
          animate="to"
        />
        <motion.path
          d="M84.9971 152L223.997 232"
          stroke="#3BBB96"
          strokeWidth="8"
          strokeLinecap="round"
          variants={linePulse(2, 1, 162, false)}
          initial="from"
          animate="to"
        />
        <path
          d="M185.755 125.294L-4.74817 234.16L-122 167.772L68.5037 58.9062L185.755 125.294Z"
          fill="#151515"
          fillOpacity="0.2"
        />
        <path
          d="M184.755 67.3882L-4.74825 176.254L-121 109.866L68.5036 1L184.755 67.3882Z"
          fill="#3BBB96"
          stroke="#151515"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M184.755 67.3881L-4.74823 176.254V204.273L184.755 95.4072V67.3881Z"
          fill="#151515"
          stroke="#151515"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M-8.86714 64.7612L-78.7446 104.612L4.37801 152.433L74.2554 112.582L-8.86714 64.7612Z"
          fill="#75DCC0"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M-8.86714 60.7761L-78.7446 100.627L4.37801 148.448L74.2554 108.597L-8.86714 60.7761Z"
          fill="#75DCC0"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M4.37848 148.448L-78.7441 100.627V104.612L4.37848 152.433V148.448Z"
          fill="#75DCC0"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M74.2554 108.597L4.37801 148.448V152.433L74.2554 112.582V108.597Z"
          fill="#151515"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M131.105 53.8033L73.4542 85.1858L91.1048 94.6503L148.755 63.2678L131.105 53.8033Z"
          fill="#151515"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M131.105 49.8182L73.4542 81.2007L91.1048 90.6653L148.755 59.2828L131.105 49.8182Z"
          fill="#75DCC0"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M91.105 90.6652L73.4544 81.2007V85.1858L91.105 94.6503V90.6652Z"
          fill="#75DCC0"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M148.755 59.2828L91.1048 90.6652V94.6503L148.755 63.2679V59.2828Z"
          fill="#151515"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M89.2274 34.1621C86.971 32.8643 83.3117 32.8662 81.0595 34.1665L39.122 58.378C37.0233 59.5897 36.8904 61.5245 38.8164 62.8277C40.9787 64.2907 44.8516 64.3807 47.2122 63.0229L89.2274 38.856C91.4808 37.5598 91.4808 35.4583 89.2274 34.1621Z"
          fill="#151515"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M89.2274 30.1771C86.971 28.8792 83.3117 28.8812 81.0595 30.1814L39.122 54.393C37.0233 55.6046 36.8904 57.5395 38.8164 58.8426C40.9787 60.3056 44.8516 60.3957 47.2122 59.0379L89.2274 34.8709C91.4808 33.5747 91.4808 31.4732 89.2274 30.1771Z"
          fill="#75DCC0"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M89.2275 34.8708L47.2123 59.0378V63.0229L89.2275 38.8559C90.3046 38.2363 90.8669 37.4327 90.9143 36.621L90.9175 32.5401C90.9104 33.3841 90.347 34.2269 89.2275 34.8708Z"
          fill="#151515"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M47.2124 59.0377C44.8518 60.3955 40.9789 60.3054 38.8165 58.8424C37.937 58.2474 37.4869 57.5206 37.4572 56.7911V60.7762C37.4869 61.5057 37.937 62.2324 38.8165 62.8275C40.9789 64.2905 44.8518 64.3806 47.2124 63.0227V59.0377Z"
          fill="#75DCC0"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M108.227 45.1211C105.971 43.8233 102.312 43.8252 100.059 45.1255L58.122 69.337C56.0233 70.5487 55.8904 72.4835 57.8164 73.7866C59.9787 75.2497 63.8516 75.3397 66.2122 73.9819L108.227 49.8149C110.481 48.5188 110.481 46.4173 108.227 45.1211Z"
          fill="#151515"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M108.227 41.136C105.971 39.8381 102.312 39.8401 100.059 41.1403L58.122 65.3519C56.0233 66.5635 55.8904 68.4984 57.8164 69.8015C59.9787 71.2646 63.8516 71.3546 66.2122 69.9968L108.227 45.8298C110.481 44.5337 110.481 42.4322 108.227 41.136Z"
          fill="#75DCC0"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M108.227 45.8298L66.2123 69.9968V73.9818L108.227 49.8149C109.305 49.1953 109.867 48.3917 109.914 47.58L109.917 43.4991C109.91 44.3431 109.347 45.1858 108.227 45.8298Z"
          fill="#151515"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M66.2124 69.9967C63.8518 71.3545 59.9789 71.2644 57.8165 69.8014C56.937 69.2063 56.4869 68.4796 56.4572 67.7501V71.7351C56.4869 72.4646 56.937 73.1914 57.8165 73.7865C59.9789 75.2495 63.8518 75.3396 66.2124 73.9817V69.9967Z"
          fill="#75DCC0"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M70.2274 23.2032C67.971 21.9053 64.3117 21.9073 62.0595 23.2075L20.122 47.4191C18.0233 48.6307 17.8904 50.5656 19.8164 51.8687C21.9787 53.3318 25.8516 53.4218 28.2122 52.064L70.2274 27.897C72.4808 26.6009 72.4808 24.4994 70.2274 23.2032Z"
          fill="#151515"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M70.2274 19.2181C67.971 17.9202 64.3117 17.9222 62.0595 19.2224L20.122 43.434C18.0233 44.6456 17.8904 46.5805 19.8164 47.8836C21.9787 49.3466 25.8516 49.4367 28.2122 48.0789L70.2274 23.9119C72.4808 22.6158 72.4808 20.5143 70.2274 19.2181Z"
          fill="#75DCC0"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M70.2275 23.9119L28.2123 48.0789V52.0639L70.2275 27.897C71.3046 27.2774 71.8669 26.4738 71.9143 25.6621L71.9175 21.5812C71.9104 22.4252 71.347 23.2679 70.2275 23.9119Z"
          fill="#151515"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M28.2124 48.0787C25.8518 49.4365 21.9789 49.3465 19.8165 47.8834C18.937 47.2884 18.4869 46.5616 18.4572 45.8321V49.8172C18.4869 50.5467 18.937 51.2735 19.8165 51.8685C21.9789 53.3315 25.8518 53.4216 28.2124 52.0638V48.0787Z"
          fill="#75DCC0"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M150.004 313.336L-39.4996 422.202L-92.9997 391.649L96.504 282.784L150.004 313.336Z"
          fill="#151515"
          fillOpacity="0.2"
        />
        <path
          d="M150.004 255.552L-39.4996 364.418L-92.9997 333.866L96.504 225L150.004 255.552Z"
          fill="#59B5F8"
          stroke="#151515"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M150.004 255.553L-39.4996 364.418V392.438L150.004 283.572V255.553Z"
          fill="#151515"
          stroke="#151515"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M99.3536 244.166L41.7029 275.548L59.3536 285.013L117.004 253.63L99.3536 244.166Z"
          fill="#87D9FD"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M99.3555 240.181L41.7049 271.563L59.3555 281.028L117.006 249.645L99.3555 240.181Z"
          fill="#87D9FD"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M117.006 249.645L59.3555 281.028V285.013L117.006 253.63V249.645Z"
          fill="#151515"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M59.3558 281.028L41.7051 271.563V275.548L59.3558 285.013V281.028Z"
          fill="#87D9FD"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M25.9294 295.006C23.672 293.708 20.0095 293.712 17.7616 295.016L4.13315 302.922C1.96983 304.177 1.91562 306.191 4.01037 307.484C6.21883 308.847 9.95226 308.885 12.2428 307.567L25.9294 299.695C28.1802 298.4 28.1802 296.301 25.9294 295.006Z"
          fill="#151515"
          stroke="#151515"
          strokeWidth="2"
        />
        <path
          d="M25.9294 291.021C23.672 289.723 20.0095 289.727 17.7616 291.031L4.13315 298.937C1.96983 300.192 1.91562 302.206 4.01037 303.499C6.21883 304.862 9.95226 304.9 12.2428 303.582L25.9294 295.71C28.1802 294.415 28.1802 292.316 25.9294 291.021Z"
          fill="#87D9FD"
          stroke="#151515"
          strokeWidth="2"
        />
        <path
          d="M25.9294 295.71L12.2428 303.582V307.567L25.9294 299.695C27.0601 299.044 27.6228 298.191 27.6175 297.339L27.6139 293.483C27.6188 293.403 27.6187 293.324 27.6137 293.245L27.6139 293.483C27.5644 294.292 27.0029 295.092 25.9294 295.71Z"
          fill="#151515"
        />
        <path
          d="M12.2428 303.582L25.9294 295.71C27.1083 295.032 27.6697 294.133 27.6137 293.245L27.6175 297.339C27.6228 298.191 27.0601 299.044 25.9294 299.695L12.2428 307.567V303.582Z"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M12.2425 303.582C9.95197 304.9 6.21855 304.862 4.01008 303.499C3.00161 302.876 2.49121 302.087 2.47444 301.295V301.215C2.47387 301.242 2.47387 301.268 2.47444 301.295V305.28C2.49121 306.072 3.00161 306.861 4.01008 307.484C6.21855 308.847 9.95197 308.885 12.2425 307.567V303.582Z"
          fill="#87D9FD"
        />
        <path
          d="M4.01008 303.499C6.21855 304.862 9.95197 304.9 12.2425 303.582V307.567C9.95197 308.885 6.21855 308.847 4.01008 307.484C3.00161 306.861 2.49121 306.072 2.47444 305.28V301.215C2.45709 302.033 2.96734 302.855 4.01008 303.499Z"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </motion.svg>
      <motion.svg
        width="271"
        height="472"
        viewBox="0 0 271 472"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: `${16.6666667 * 1.173}%`,
        }}
        className="max-w-67.75 h-auto absolute top-0 right-0 z-10 pointer-events-none hidden lg:block"
        ref={svgRef2}
        variants={animateIn("right", 1, 0)}
        initial="from"
        animate="to"
      >
        <motion.path
          d="M7 7L146 87"
          stroke="#F5E6FF"
          strokeWidth="14"
          strokeLinecap="round"
          variants={lineGrowIn(55, 95, 1.5)}
          initial="from"
          animate="to"
        />
        <motion.path
          d="M7 7L146 87"
          stroke="#8E44EC"
          strokeWidth="8"
          strokeLinecap="round"
          variants={linePulse(2, 1, 154, true)}
          initial="from"
          animate="to"
        />
        <path
          d="M113 362.759L302.504 471.625L372.504 431.65L183 322.784L113 362.759Z"
          fill="#151515"
          fillOpacity="0.2"
        />
        <path
          d="M113 304.975L302.504 413.841L372.504 373.866L183 265L113 304.975Z"
          fill="#ED6B22"
          stroke="#151515"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M113 304.975L302.504 413.841V441.86L113 332.994V304.975Z"
          fill="#151515"
          stroke="#151515"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M295 394.878L252 370.08L295 345.064L338 369.862L295 394.878Z"
          fill="#F39A68"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M295 390.893L252 366.095L295 341.079L338 365.877L295 390.893Z"
          fill="#F39A68"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M295 390.893L252 366.095V370.08L295 394.878V390.893Z"
          fill="#151515"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M187 331.117L144 306.319L187 281.303L230 306.101L187 331.117Z"
          fill="#F39A68"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M187 327.132L144 302.334L187 277.318L230 302.116L187 327.132Z"
          fill="#F39A68"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M187 327.131L230 302.116V306.101L187 331.117V327.131Z"
          fill="#F39A68"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M187 327.132L144 302.334V306.319L187 331.117V327.132Z"
          fill="#151515"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M241 362.997L198 338.199L241 313.184L284 337.982L241 362.997Z"
          fill="#F39A68"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M241 359.012L198 334.214L241 309.199L284 333.997L241 359.012Z"
          fill="#F39A68"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M241 359.012L284 333.997V337.982L241 362.997V359.012Z"
          fill="#F39A68"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M241 359.012L198 334.214V338.2L241 362.997V359.012Z"
          fill="#151515"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M401.906 206.649L212.402 97.7836L67.0878 180.769L256.591 289.635L401.906 206.649Z"
          fill="#151515"
          fillOpacity="0.2"
        />
        <path
          d="M67 123.015L256.504 231.881V259.9L67 151.034V123.015Z"
          fill="#151515"
          stroke="#151515"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M401.906 148.866L212.402 40L67.0878 122.985L256.591 231.851L401.906 148.866Z"
          fill="#8E44EC"
          stroke="#151515"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M401.907 176.885L401.907 148.866L256.592 231.851L256.592 259.87L401.907 176.885Z"
          fill="#B382F2"
          stroke="#151515"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M284.322 99.6526L214.444 59.8018L100.151 125.556L170.028 165.406L284.322 99.6526Z"
          fill="#B382F2"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M284.322 95.6675L214.444 55.8167L100.151 121.57L170.028 161.421L284.322 95.6675Z"
          fill="#B382F2"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M170.028 161.421L100.15 121.57V125.556L170.028 165.406V161.421Z"
          fill="#151515"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M170.027 161.421L284.321 95.6675V99.6526L170.027 165.406V161.421Z"
          fill="#B382F2"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M257.231 129.899C259.488 128.601 263.146 128.603 265.399 129.902L324.646 164.074C326.703 165.261 326.879 167.147 325.054 168.454C322.924 169.979 318.964 170.102 316.559 168.719L257.231 134.594C254.978 133.298 254.978 131.196 257.231 129.899Z"
          fill="#B382F2"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M257.231 129.899C259.488 128.601 263.146 128.603 265.399 129.902L324.646 164.074C326.703 165.261 326.879 167.147 325.054 168.454C322.924 169.979 318.964 170.102 316.559 168.719L257.231 134.594C254.978 133.298 254.978 131.196 257.231 129.899Z"
          fill="#B382F2"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M257.231 134.595L316.559 168.72V172.705L257.231 138.58C256.09 137.923 255.527 137.06 255.541 136.2V132.279C255.555 133.118 256.119 133.955 257.231 134.595Z"
          fill="#151515"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M235.231 140.858C237.488 139.56 241.146 139.562 243.399 140.861L302.646 175.033C304.703 176.22 304.879 178.106 303.054 179.413C300.924 180.938 296.964 181.061 294.559 179.678L235.231 145.553C232.978 144.256 232.978 142.154 235.231 140.858Z"
          fill="#B382F2"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M235.231 140.858C237.488 139.56 241.146 139.562 243.399 140.861L302.646 175.033C304.703 176.22 304.879 178.106 303.054 179.413C300.924 180.938 296.964 181.061 294.559 179.678L235.231 145.553C232.978 144.256 232.978 142.154 235.231 140.858Z"
          fill="#B382F2"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M235.231 145.554L294.559 179.679V183.664L235.231 149.539C234.09 148.882 233.527 148.019 233.541 147.159V143.238C233.555 144.077 234.119 144.913 235.231 145.554Z"
          fill="#151515"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </motion.svg>
    </div>
  );
};
