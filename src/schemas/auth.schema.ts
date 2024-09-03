import z from 'zod';


export const registerUserSchema = z.object({
    name: z.string({  // required_error se aplica específicamente a los campos que podrían ser undefined o no estar presentes
        required_error: "El nombre es requerido!"
    })
        .min(1, { message: "El nombre es requerido!" })  
        .max(50, { message: "El nombre no puede tener más de 50 caracteres." }),

    email: z.string({
        required_error: "El correo electrónico es requerido!"
    }).email({ message: "Debe ser un correo electrónico válido." }),

    password: z.string({
        required_error: "La contraseña es requerida!"
    }).min(6, { message: "La contraseña debe tener al menos 6 caracteres." })
        .max(50, { message: "La contraseña no puede tener más de 50 caracteres." }),
});






export const loginUserSchema = z.object({
    email: z.string({
        required_error: "El correo electrónico es requerido!"
    }).email({ message: "Debe ser un correo electrónico válido." }),

    password: z.string({
        required_error: "La contraseña es requerida!"
    }).min(6, { message: "La contraseña debe tener al menos 6 caracteres." })
        .max(50, { message: "La contraseña no puede tener más de 50 caracteres." }),
});
