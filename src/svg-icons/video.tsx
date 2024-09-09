export default function VideoIcon({ width, height }: { width: number, height: number }) {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1348_126233)">
                <path d="M3 4C1.34315 4 0 5.34315 0 7V17C0 18.6569 1.34315 20 3 20H13C14.6569 20 16 18.6569 16 17V14.5307L20.7286 18.4249C22.0334 19.4994 24.0001 18.5713 24.0001 16.8811V7.28972C24.0001 5.54447 21.9211 4.63648 20.6408 5.8226L16 10.1222V7C16 5.34315 14.6569 4 13 4H3Z" fill="#000000" />
            </g>
            <defs>
                <clipPath id="clip0_1348_126233">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}