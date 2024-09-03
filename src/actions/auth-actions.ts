'use server'


import { loginUserSchema, registerUserSchema } from "@/schemas/auth.schema";
import { FormRegisterState} from "@/types/form-types";
import { comparePassword, hashPassword } from "@/utils/bcryptUtils";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { use } from "react";










export async function registerUser(formData: FormData) {

    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
 
 
   try {
 
    ///Validamos que los datos sean ingresador correctamente con zod
    const validate = registerUserSchema.safeParse({ name, email, password });
 
 
 
    if (!validate.success) {
       return { success: false, errors: validate.error.flatten().fieldErrors, message: "Campos faltantes. No se pudo crear el usuario" }
    }
 

 
     const existeEmail = await prisma.user.findUnique({
       where: {email: validate.data.email} });
 
       if (existeEmail) {
          return { success: false, errors:{email:['El correo electrónico ya está registrado.']}  ,message: "Error al registrar el usuario!" };
        }
 
 
 
       ///Hasheamos el password
        const hashPasword = await hashPassword(validate.data.password);
 
 
 
   
 
       const newUser = await prisma.user.create({
          data: {
             name: validate.data.name,
             email: validate.data.email,
             password: hashPasword
          }
       });
 
       // Eliminar el campo `password` del objeto `newUser`
       const { password: _, ...userSinPassword } = newUser;
 
        
       
       return { success: true, errors: {} , user: userSinPassword , message: "Usuario creado con exito!" };


 
 
    } catch (error: any) {
 
       console.error('Error al crear el usuario: ', error);
 
       return { success: false, errors: {}, message: "Error al crear el usuario" };
 
    }
 
 
 
 }
 
 


 

 export  async function loginUser(formData: FormData) {
    


    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();



    ///Validamos que los datos sean ingresador correctamente con zod
    const validate = loginUserSchema.safeParse({ email, password });
 
  
    if (!validate.success) {
        return { success: false, errors: validate.error.flatten().fieldErrors, message: "Campos faltantes. No se pudo iniciar sesion" }
     }



    try {


         const user = await prisma.user.findUnique({
            where: {email: validate.data.email} ,
         });


         if (!user) {
            return { success: false, errors: {email:["El email no se encuentra registrado!"]}, message: "Error al iniciar sesion" };
         }
         

         const passwordIsValid = await comparePassword(validate.data.password,user.password);


         if (!passwordIsValid) {
            return { success: false, errors: {password:["Contraseña o email incorrecto!"]}, message: "Error al iniciar sesion" };
         }



         const { password: _, ...userSinPassword } = user;
 


         return { success: true,user: userSinPassword,errors: {}, message: "Sesion iniciada!" };



        
    } catch (error:any) {
        
        return { success: true, errors: {}, message: "Campos faltantes. No se pudo iniciar sesion" };


    }
    
 };
 