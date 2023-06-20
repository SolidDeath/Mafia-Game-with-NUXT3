import { z } from "zod"

export default function useAuthValidator({ email, password, name }, type) {
  let body
  try{
    if(type == 'login'){
      const loginSchema = z.object({
          email: z.string().email(),
          password: z.string().min(6)
      })
      loginSchema.safeParse({ email, password })
      
    } else if(type == 'signup'){
      const signupSchema = z.object({
          email: z.string().email(),
          password: z.string().min(6),
          name: z.string().min(3)
      })
      body = signupSchema.parse({ email, password, name })
    }
    return {
      flag: true,
      ...body
    }
  } catch(err){
    
    let errors = {
      flag: false
    }
    if(err instanceof z.ZodError){
      const zodIssues = err.issues
      for(let i = 0; i < zodIssues.length; i++){
        errors[zodIssues[i].path[0]] = zodIssues[i].message
      }
    }

    return errors
  }
}
