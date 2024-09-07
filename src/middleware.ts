
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verificarToken } from './utils/jwtUtils';


const secret = process.env.SECRET_KEY || "" ;

export default async function jwtMiddleware(request: NextRequest) {
    
    const cookieToken = request.cookies.get('access_token')?.value;

  
  if (!cookieToken ) {
    
      // Redirigir al usuario a la página de login
  return NextResponse.redirect(new URL('/usuario/iniciar-sesion', request.url));
   // return NextResponse.json({ message: 'No autorizado' }, { status: 401 });

  }

  const token = cookieToken;

  try {

     await verificarToken(token);

   
    return NextResponse.next();
  
  } catch (err) {

    return NextResponse.json({ message: 'Token inválido' }, { status: 403 });
  
  }
}

export const config = {
  matcher: ['/protected'], // Rutas protegidas
};