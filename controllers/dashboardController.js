const mongoose=require('mongoose')
const Notes=require('../model/Notes')


const dashboard=async(req,res)=>{
    let perPage=12
    let page = req.query.page || 1
    const locals={
        title:"Dashboard",
        description:"Nodejs Notes app.",
      
        
    }
    try{
        const notes = await Notes.aggregate([
            { $sort: { updatedAt: -1 } },
            
          
            {
              $project: {
                title: { $substr: ["$title", 0, 30] },
                body: { $substr: ["$body", 0, 100] },
              },
            }
            ])
          .skip(perPage * page - perPage)
          .limit(perPage)
          .exec(); 
          
        const count = await Notes.countDocuments();
         res.render('dashboard/index',{
            userName:req.user,
            locals,
            notes,
            layout:'../views/layouts/dashboard',
            current:page,
            pages:Math.ceil(count/perPage)
        })
    }catch(err){
        console.log(err)
    }
    
  
}

const addNotes=async(req,res)=>{
    if(req.method=='POST'){
        const {title,body}=req.body
        if(!title||!body)res.sendStatus(400)
        const newNote=await Notes.create({
            user:req.user._id,
            title,
            body


        })
        await newNote.save()
        res.redirect('/dashboard')


    }

}
const addNotePage=(req,res)=>{
    res.render('dashboard/add',{username:req.user, layout: "../views/layouts/dashboard"})

}
const viewNote=async(req,res)=>{
    let note=await Notes.findOne({_id:req.params.id})
    res.render("dashboard/view-note", {
        noteID: req.params.id,
        note,
        layout: "../views/layouts/dashboard",
      });
    // res.send({note})

}
const searchNote=async(req,res)=>{
    try {
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
    
        const searchResults = await Notes.find({
          $or: [
            { title: { $regex: new RegExp(searchNoSpecialChars, "i") } },
            { body: { $regex: new RegExp(searchNoSpecialChars, "i") } },
          ],
        }).where({ user: req.id });
    
        res.render("dashboard/search", {
          searchResults,
          layout: "../views/layouts/dashboard",
        });
      } catch (error) {
        console.log(error);
      }
}
const deleteNote=async(req,res)=>{
    try{
        // console.log(req.params.id)
        await Notes.findOneAndDelete({_id:req.params.id})
        res.redirect('/dashboard')
    }catch(err){
        console.log(err)
    }
}
const updateNote=async(req,res)=>{
    // console.log(req.body.body)
    // console.log(req.body.title)
    try{
        await Notes.findOneAndUpdate({_id:req.params.id},{
          title:req.body.title,
          body:req.body.body
        })
        res.redirect('/dashboard')
        
    }catch(err){

    }
}
module.exports={dashboard,addNotePage,addNotes,searchNote,updateNote,deleteNote,viewNote}