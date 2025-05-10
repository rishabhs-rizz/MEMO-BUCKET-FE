import { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary",
    size: "sm" | "md" | "lg",
    text: string,
    startIcon?: ReactElement,
    endIcon?: ReactElement,
    onClick?: () => void;
    wide?: boolean
    loading?: boolean
}

const variantStyles = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-300 text-purple-600"
}

const defaultStyles = "rounded-md flex justify-center items-center font-hard gap-1"

const sizeStyles = {
    "sm": "py-1 px-2 text-sm",
    "md": "py-2 px-4 text-md",
    "lg": "py-4 px-8 text-xl"
}


export const Button = (props : ButtonProps) => {
    return <button onClick={props.onClick} className={`${variantStyles[props.variant]} ${ defaultStyles} ${ sizeStyles[props.size]} ${props.wide ? " w-full" : ""} ${props.loading ? "disabled opacity-45" : ""}`}> 
    {props.startIcon}
    {props.text}
    {props.endIcon}
    
</button>
}