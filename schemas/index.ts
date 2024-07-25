import { z , string, number, array} from "zod"
import { object} from "zod"


const loginSchema = object({
    email: string({ required_error: "Email is required" })
      .min(1, "Email is required")
      .email("Invalid email"),
    password: string({ required_error: "Password is required" })
      .min(1, "Password is required")
      .min(6, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
  })
  
  const RegisterSchema = object({
    name: string({ required_error: "Name is required" }).min(1, "Name is required"),
    email: string({ required_error: "Email is required" })
      .min(1, "Email is required")
      .email("Invalid email"),
    password: string({ required_error: "Password is required" })
      .min(1, "Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),// Ajuste conforme necessário
  });

  export { RegisterSchema }
export { loginSchema }



// Esquema para um produto individual
const productSchema = object({
  sku: string({ required_error: "SKU is required" })
    .min(1, "SKU is required"),
  qtd: number({ required_error: "Quantity is required" })
    .min(1, "Quantity must be at least 1")
});

// Esquema para o formulário de venda
const salesSchema = object({
  buyer: string({ required_error: "Buyer is required" })
    .min(1, "Buyer is required"),
  address: string({ required_error: "Address is required" })
    .min(1, "Address is required"),
  products: array(productSchema).nonempty({ message: "At least one product is required" }),
  freight: number({ required_error: "Freight is required" })
    .min(1, "Freight is required"),
  discount: number({ required_error: "Discount is required" })
    .min(1, "Discount is required"),
  maxDiscount: number({ required_error: "Max discount is required" })
    .min(1, "Max discount is required"),
  totalValue: number({ required_error: "Total value is required" })
    .min(1, "Total value is required"),
  term: string({ required_error: "Term is required" })
    .min(1, "Term is required"),
  paymentMethod: string({ required_error: "Payment method is required" })
    .min(1, "Payment method is required")
});

export { salesSchema };
export { productSchema };