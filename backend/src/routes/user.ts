import { Hono } from 'hono';
import { cors } from 'hono/cors'
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import {sign,verify} from 'hono/jwt';
import {signupInput} from '@rishitkamboj/common-zod';


export const userRouter = new Hono<{
  Bindings:{
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();


userRouter.use('/*', cors());

userRouter.post('/signup', async (c) => {
     const prisma = new PrismaClient({
       datasourceUrl: c.env.DATABASE_URL,
   }).$extends(withAccelerate())
   
     const body = await c.req.json();
     const {success}=signupInput.safeParse(body);
     if(!success){
      c.status(411);
      return c.json({message:"Invalid Input"});
     }
     try{
       const u=await prisma.user.create({
       data :{
         email: body.email,
         password: body.password,
         name:body.name
       }
     });
     const jwt=await sign({id:u.id},c.env.JWT_SECRET);
   
   return c.json({jwt});
   
   }
     catch(e){
       return c.status(403);
     }
   
   });
   
   
   userRouter.post('/signin', async (c) => {
     const prisma = new PrismaClient({
       datasourceUrl: c.env.DATABASE_URL,
   }).$extends(withAccelerate())
   
     const body = await c.req.json();
   
       const u=await prisma.user.findUnique({
     where:{ email:body.email}
     });
   
     if(!u){
       c.status(403);
       return c.json({error:"User not found"});
     }
   
     const jwt=await sign({id:u.id},c.env.JWT_SECRET);
     return  c.json({jwt});
    });
   
   