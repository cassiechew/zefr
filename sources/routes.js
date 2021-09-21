import { Router } from "express";
const router = Router();
import { * } from "&Model";


router.get("/", async (req, res) => {
   res.send("This is the user page");
});


router.get("/:id", async (req, res) => {
    try {
        const & = await *.findOne({
            %
        })

        res.send(&);
    }
    catch(ex){
        console.log(ex.errors);
        res.status(500).send(ex.message);
    }
});


router.post("/c/", async (req, res) => {
    try {
        const & = new *({
        %
        });
        await &.save();

        res.status(200).send(&);
    }
    catch(ex){
        console.log(ex.errors);
        res.status(500).send(ex.message);
    }
});


router.put("/c/", async (req, res) => {
    try {
        const & = await *.findOneAndUpdate(
        { 
            %
        },
        {
            %
        });

        if (!friend) return res.status(404).send('Friend request not found.');


        res.status(200).send(&);
    }
    catch(ex){
        console.log(ex.errors);
        res.status(500).send(ex.message);
    }
});


router.delete("/",async (req,res) => {
    
    try {
        const & = await *.findOneAndRemove({
            %
        });
        
        res.send(&);
    }
    catch(ex){
        console.log(ex.errors);
        res.status(500).send(ex.message);
    }
});