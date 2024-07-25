import { FaExclamationCircle } from 'react-icons/fa';  

interface FormErrorProps {
    message: String;
}

export const FormError = ({ message }: FormErrorProps) => {
    if(!message){
        return null;
    }
    return (
        
        <div className="bg-destructive/15 p-3 rounded-md gap-x-2 text-sm text-destructive flex items-center text-red-500">
            <FaExclamationCircle className="mr-2" />
            <p>{message}</p>
        </div>
    )
}