
import { Hono } from 'hono';
import { cors } from 'hono/cors'
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import {sign,verify} from 'hono/jwt';


export const blogRouter = new Hono<{
  Bindings:{
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables:{
     userId:string
  }
}>();




blogRouter.use('/*', async (c, next) => {
     try{
     const jwt = c.req.header('Authorization')||"";
        const token = jwt.split(' ')[1];
        const user = await verify(token, c.env.JWT_SECRET);
        if (!user) {
             c.status(401);
             return c.json({ error: "unauthorized" });
        }
        c.set('userId', user.id);
        await next()
     }

        catch(e){
          c.status(401);
          return c.json({ error: "unauthorized" });
        }
   })

   blogRouter.use('/*', cors());

   
   blogRouter.post('/', async (c) => {
     const userId = c.get('userId');
     const prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());


      const body=await c.req.json();
      const p=await prisma.post.create({data:{
          title: body.title,
          content: body.content,
          authorId: Number(userId)
    } });

    return c.json({id:p.id});
    });
   
    blogRouter.put('/', async (c) => {
     try {
         const userId = c.get('userId');
         const prisma = new PrismaClient({
             datasourceUrl: c.env?.DATABASE_URL,
         }).$extends(withAccelerate());
 
         const body = await c.req.json();
         await prisma.post.update({
             where: {
                 id: Number(body.id),
                 authorId: Number(userId)
             },
             data: {
                 title: body.title,
                 content: body.content
             }
         });
 
         return c.text('Updated post successfully');
     } catch (error) {
         console.error("Error updating post:", error);
         c.status(500)
         return c.json({ error: "Internal Server Error" });
     }
 })
 
      //pagination u should add you shouldnt give all the posts u should give first 10
      blogRouter.get('/bulk', async (c) => {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
       try{ const blogs = await prisma.post.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
    
        return c.json({
            blogs
        })}
           catch (error) {
              console.error("Error fetching posts:", error);
              c.status(500)
              return c.json({ error: "Internal Server Error" });
          }
      });




      blogRouter.get('/:id', async (c) => {
        const id = c.req.param("id");
        const prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
    
        try {
            const blog = await prisma.post.findFirst({
                where: {
                    id: Number(id)
                },
                select: {
                    id: true,
                    title: true,
                    content: true,
                    author: {
                        select: {
                            name: true
                        }
                    }
                }
            })
        
            return c.json({
                blog
            });
        } catch(e) {
            c.status(411); // 4
            return c.json({
                message: "Error while fetching blog post"
            });
        }
    })