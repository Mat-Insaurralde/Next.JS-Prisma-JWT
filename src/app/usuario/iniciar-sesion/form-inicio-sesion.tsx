'use client'


import { loginUser } from "@/actions/auth-actions";
import { FormLoginState } from "@/types/form-types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormState } from "react-dom";


 






export default  function FormInicioSesion() {

    const router = useRouter();

    const [formState, setState] = useState<FormLoginState>({ errors: {}, message: ""});



    


    const handleSubmit = async (form: FormData) => {


        const response = await loginUser(form);

         

        if(response.success){

            const userDTO = response.user;

            // Redirige al usuario a la página "/" después de 2 segundos
             const timer = setTimeout(() => {
             router.push('/');
             query: {user : userDTO};
             }, 2000);
      
            };
    

        setState(response);


    }




    return (


        <div className="max-w-md bg-white p-8 rounded-lg shadow-md align-baseline">



            <h2 className="text-2xl font-semibold mb-6 text-center">Iniciar sesion</h2>



            <form action={handleSubmit} >





                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2 border">Email</label>
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
                 
                </div>

                {formState.errors?.password &&
                        formState.errors.password.map((error: string) => (
                            <p className="text-red-600 text-sm mt-1" key={error}>
                                {error}
                            </p>
                        ))}
                        <br />

                <button type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Iniciar Sesion
                </button>
            </form>

        </div>
    );


    
};
