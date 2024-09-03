//Importamos el paquete de prisma client
import { PrismaClient } from '@prisma/client'


//Crea una funcion que retorna una nueva instancia en el caso de que no exista
const prismaClientSingleton = () => {
  return new PrismaClient()
}
//Inicializacion global para typescript le avisa que existe
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;


//Verifica si en el contexto gloval existe un prisma y si no crea uno , es para que en desarrollo no se este creando todo el tiempo
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma