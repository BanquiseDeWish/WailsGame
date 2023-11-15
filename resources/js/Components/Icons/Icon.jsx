export default function Icon({children, width, height, ...otherProps}) {
    return (
        <svg {...otherProps} width={width ? width : 64} height={height ? height : 64} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            {children}
        </svg>
    );
}