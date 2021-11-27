const express = require('express');
const student=require('../models/student.js');

const user=require('../models/user.js');
const topic = require('../models/topic.js');
const evaluation= require('../models/evaluation.js');


const router= express.Router();

router.get('', async (req, res) => {
    try{
        const s=await student.find({}).lean().exec();
        console.log(s);
        return res.send({s});
    }catch(err){
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

router.get('/highestscorer', async (req, res) => {
    try{
        const students =await student.find().populate("user").lean().exec();
        let a1=[];
        let max=-Infinity
        for(let i=0; i<students.length; i++){
            let d=students[i].details;
            for ( let j=0; j<d.length; j++){
                console.log(d[j].marks)
                if(max<d[j].marks){
                    max=d[j].marks;
                }
            }
        }

        for(let i=0; i<students.length; i++){
            let d=students[i].details;
            for(let j=0; j<d.length; j++){
                if(d[j].marks===max){
                    a1.push(students[i]);
                }
            }
        }

        res.send(a1[0]);

    }catch(e){
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

router.get('/:evalId', async (req, res) => {
    try{
        const students =await student.find({}).lean().exec();
        let a1=[];
        for(let i=0; i<students.length; i++){
            let d=students[i].details;
            for ( let j=0; j<d.length; j++){
                if(req.params.evalId===d[j].eval){
                    a1.push(students[i]);
                }
            }
        }
        res.send(a1);

    }catch(e){
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

module.exports=router;