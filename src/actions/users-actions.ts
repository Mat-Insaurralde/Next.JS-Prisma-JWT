'use server'

import prisma from "@/lib/prisma";












export async function updateUser(formData: FormData) {


}



export async function deleteUser() {



}



export async function findAllUsers() {

   const allusers = await prisma.user.findMany();

   return allusers;

}
