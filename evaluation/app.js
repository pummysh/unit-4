const express=require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

const connect=()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/test");
}

const jobSchema = new mongoose.Schema(
    {
        city: { type: String, required: true},
        skill : {type :String, required : true},
        woh: { type : String},
        company:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"company",
            required:true
        },
        notice_period: { type : String, required : true},
        rating: {type :String, required : true}
    },
    {
        versionKey: false
    }
)

const job=mongoose.model("job", jobSchema);

const companySchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        open_jobs: { type: String, required: true },
        location: { type : String, required : true}
    }
)

const company=mongoose.model("company", companySchema);

app.get("/jobs",async(req,res)=>{
    const jobs=await job.find().populate("company").lean().exec();
    res.send(jobs);
});

app.get("/jobs/woh",async(req,res)=>{
    const jobs=await job.find({woh:{$exists: true}}).populate("company").lean().exec();
    res.send(jobs);
});

app.get("/jobs/ratings",async (req, res)=>{
    const jobs=await job.find().sort({rating:1}).populate("company").lean().exec();
    res.send(jobs);
})

app.get("/jobs/notice-period",async(req,res)=>{
    const jobs=await job.find({"notice_period":{$eq:"2-months"}}).populate("company").lean().exec();
    res.send(jobs);
})

app.get("/jobs/:city/:skill",async(req,res)=>{
    const jobs=await job.find({$and:[{"city":{$eq:req.params.city}},{"skill":{$eq:req.params.skill}}]}).populate("company").lean().exec();
    res.send(jobs);
})

app.get("/company-details",async(req,res)=>{
    const companies=await company.find().lean().exec();
    res.send(companies);
})

app.get("/company/openjobs",async(req,res)=>{
    const companies=await company.find().sort({open_jobs:1}).lean().exec()
    res.send(companies[companies.length-1]);
})

const start=async()=>{
    await connect();
    app.listen(2333,()=>{
        console.log("listening on port 2333");
    })
}

start();