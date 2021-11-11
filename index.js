const express=require('express')
const members=require('./members')
const uuid=require('uuid')
const cors=require('cors') //middleware error handler
const app=express() //  json format

app.use(express.json())  //accespt all the json type objects
app.use(cors())
//get -> return all the members

app.get('/api/members',(req,res)=>{
    return res.status(200).json({members})  ///member is a key 
})

//get speecific member
app.get('/api/members/:id',(req,res)=>{
    const found=members.some(member => member.id=== parseInt(req.params.id))
   // console.log(found)  
    if(found){
        return res.json(members.filter(member => member.id===parseInt(req.params.id)))
    }else{
        return res.status(400).json({msg:`No member found with this id ${req.params.id}`})
    }
})

//post add data 

app.post('/api/members',(req,res)=>{
    const{email,name}={...req.body}  //object descurting
    //consol.log(name,email)
    const newMember={
        id:uuid.v4(),
        name,
        email,
        status:'active'
    }
    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg:`Please include email and name`})
    }else{
        members.push(newMember)
        return res.status(200).json({msg:"new Member added sucessfully",members})
    }
 })

 //put => update a member

 app.put('/api/members/:id',(req,res)=>{
    const found=members.some(member=>member.id===parseInt(req.params.id))
    //console.log(found)
    if(found){
       // console.log(req.body)
        const updMember=req.body
        members.forEach(mem=>{
            if(mem.id===parseInt(req.params.id)){
                mem.name=updMember.name;
                mem.email=updMember.email
                return res.json({msg:`Member updated`,member:mem})  // create key member
            }
        })
    }else{
        return res.status(400).json({msg:`No member found with this id ${req.params.id}`})
    }
 })

 //delete member
  app.delete('/api/members/:id',(req,res)=>{
      const found=members.some(member =>member.id===parseInt(req.params.id))
      if(found){
            return res.json({msg:`member deleted`,members:members.filter(member =>member.id!=parseInt(req.params.id))})
      }else{
          return res.json({msg:`No Member found wit thi id ${req.params.id}`})
      }
  })
 

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>console.log('server is running at server '+PORT));