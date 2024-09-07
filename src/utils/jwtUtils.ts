
import { SignJWT, jwtVerify } from 'jose';



 const secret = new TextEncoder().encode(process.env.SECRET_KEY);


// Generar un JWT
export const generarToken = async (payload:{}) => {
 

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(secret);

  return token;
};




// Verificar un JWT
export const verificarToken = async (token:string) => {


  try {
    
    const { payload } = await jwtVerify(token, secret);

    return payload;


  } catch (error) {

    if (error instanceof Error) {
      console.log('FALLO AL VERIFICAR EL JWT:', error.message);
    } else {
      console.log('FALLO DESCONOCIDO EN EL JWT');
    }

    // Lanzar un nuevo error para propagar la excepción
    throw new Error('Token inválido o ha expirado');
  }
};





