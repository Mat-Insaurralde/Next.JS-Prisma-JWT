'use server'


import { loginUserSchema, registerUserSchema } from "@/schemas/auth.schema";
import { FormRegisterState } from "@/types/form-types";
import { comparePassword, hashPassword } from "@/utils/bcryptUtils";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { use } from "react";
import { sign } from "crypto";
import { generarToken, verificarToken } from "@/utils/jwtUtils";
import { cookies } from "next/headers";










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
         where: { email: validate.data.email }
      });

      if (existeEmail) {
         return { success: false, errors: { email: ['El correo electrónico ya está registrado.'] }, message: "Error al registrar el usuario!" };
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
      const { password: _, ...userDTO } = newUser;

        // Generar el JWT
        const token = await generarToken({ userDTO });


        // Setear la cookie con el JWT
        cookies().set({
           name: 'access_token',
           value: token,
           httpOnly: true,
           secure: process.env.NODE_ENV !== 'development',
           maxAge: 60 * 60,
           path: '/'
        });


      return { success: true, errors: {}, user: userDTO, message: "Usuario creado con exito!" };




   } catch (error: any) {

      console.error('Error al crear el usuario: ', error);

      return { success: false, errors: {}, message: "Error al crear el usuario" };

   }



}






export async function loginUser(formData: FormData) {



   const email = formData.get("email")?.toString();
   const password = formData.get("password")?.toString();



   ///Validamos que los datos sean ingresador correctamente con zod
   const validate = loginUserSchema.safeParse({ email, password });


   if (!validate.success) {
      return { success: false, errors: validate.error.flatten().fieldErrors, message: "Campos faltantes. No se pudo iniciar sesion" }
   }



   try {


      const user = await prisma.user.findUnique({
         where: { email: validate.data.email },
      });


      if (!user) {
         return { success: false, errors: { email: ["El email no se encuentra registrado!"] }, message: "Error al iniciar sesion" };
      }


      const passwordIsValid = await comparePassword(validate.data.password, user.password);


      if (!passwordIsValid) {
         return { success: false, errors: { password: ["Contraseña o email incorrecto!"] }, message: "Error al iniciar sesion" };
      }



      const { password: _, ...userDTO } = user;


      // Generar el JWT
      const token = await generarToken({ userDTO });


      // Setear la cookie con el JWT
      cookies().set({
         name: 'access_token',
         value: token,
         httpOnly: true,
         secure: process.env.NODE_ENV !== 'development',
         maxAge: 60 * 60,
         path: '/'
      });



      return { success: true, user: userDTO, errors: {}, message: "Sesion iniciada!" };




   } catch (error: any) {

      return { success: true, errors: {}, message: "Campos faltantes. No se pudo iniciar sesion" };


   }

};








export async function logoutUser() {


  // Eliminar la cookie del token
  cookies().set('access_token', '', { maxAge: -1 });


}




export async function getUser() {
   const token = cookies().get('access_token')?.value;
 
   if (!token) {
     throw new Error('Usuario no autenticado');
   }
 
   try {
  
      const decoded = await verificarToken(token);


     return decoded.userDTO ;  // Retorna los datos del usuario
  
   } catch (error) {
     throw new Error('Token inválido o expirado');
   }
 }
 