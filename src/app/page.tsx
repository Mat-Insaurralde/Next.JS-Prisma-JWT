'use client';


import { getUser, logoutUser } from "@/actions/auth-actions";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function Home() {


  const router = useRouter();

  const [user, setUser] = useState({name:""});






  useEffect(() => {
 
    const fetchUser = async () => {
      try {

        const userData = await getUser();  // Llamada asíncrona para obtener los datos del usuario
       
        setUser(userData as {name:""});   
          

      } catch (err) {
        
        console.log('No estás autenticado. Por favor, inicia sesión.');
      
      
      }
    };

    fetchUser(); 
  }, []);  // El array vacío asegura que useEffect se ejecute solo una vez al montar el componente





  const handleLogout = async () => {

    await logoutUser();

    router.push('/usuario/iniciar-sesion');
  }



  return (

    <main className="flex min-h-screen flex-col items-center justify-between p-24">



      <h1>{` Bienvenido!    ${user.name.toUpperCase()} ` }</h1> 


      <button onClick={handleLogout}
        className="w-36 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        cerrar sesion
      </button>


    </main>

  );

}
