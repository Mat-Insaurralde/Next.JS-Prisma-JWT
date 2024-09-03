
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import  jwt  from 'jsonwebtoken';


export function jwtMiddleware(request: NextRequest) {
    
    const cookieToken = request.cookies.get('access_token')?.value;

  
  if (!cookieToken || !cookieToken.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
  }

  const token = cookieToken.split(' ')[1];

  try {
    jwt.verify(token, process.env.SECRET_KEY );
    return NextResponse.next();
  } catch (err) {
    return NextResponse.json({ message: 'Token inválido' }, { status: 403 });
  }
}

export const config = {
  matcher: ['/api/protected'], // Rutas protegidas
};