'use client';

import { registerUser } from "@/actions/auth-actions";
import { FormRegisterState } from "@/types/form-types";
import { useRouter } from "next/navigation";

import { useState } from "react";






export default function RegistroForm() {

    const router = useRouter();

    const [formState, setState] = useState<FormRegisterState>({ errors: {}, message: "", });




    const handleSubmit = async (form: FormData) => {

        const result = await registerUser(form);


     if(result.success){

        // Redirige al usuario a la página "/" después de 2 segundos
         const timer = setTimeout(() => {
         router.push('/');
         }, 2000);
  
        };

        
        setState(result);

   
    };






    return (


        <div className="max-w-md bg-white p-8 rounded-lg shadow-md align-baseline">

       

           <h2 className="text-2xl font-semibold mb-4 text-center">Registro</h2>



            <form action={handleSubmit} >
             
                 
             
             
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Nombre</label>
                    <input type="text" id="name" name="name"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {formState.errors?.name &&
                        formState.errors.name.map((error: string) => (
                            <p className="text-red-600 text-sm mt-1" key={error}>
                                {error}
                            </p>
                        ))}

                </div>


                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                    <input type="email" id="email" name="email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

                    {formState.errors?.email &&
                        formState.errors.email.map((error: string) => (
                            <p className="text-red-600 text-sm mt-1" key={error}>
                                {error}
                            </p>
                        ))}
                </div>




                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Contraseña</label>
                    <input type="password" id="password" name="password"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {formState.errors?.password &&
                        formState.errors.password.map((error: string) => (
                            <p className="text-red-600 text-sm mt-1" key={error}>
                                {error}
                            </p>
                        ))}
                </div>


                <button type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Registrar
                </button>
            </form>

        </div>
    );



};
