import { FaCheckCircle } from 'react-icons/fa';  // Importação do ícone de sucesso

interface FormErrorProps {
    message: String;
}

export const FormSuccess = ({ message }: FormErrorProps) => {
    if(!message){
        return null;
    }
    return (
        
         <div className="bg-emerald-500/15 p-3 rounded-md gap-x-2 text-sm text-destructive flex items-center text-emerald-500">
            <FaCheckCircle className="mr-2" />
            <p>{message}</p>
        </div>
    )
}