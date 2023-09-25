import mongoose from 'mongoose'

const VideoSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title:{
        type:String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    videoUrl:{
         type:String,
         required: true,
        },
    views:{
        type:[String],
        default:[]
    },
    tags:{
        type:[String],
        default:[]
    },
    likes:{
        type: [String],
        default:[]
    },
    dislikes:{
        type: [String],
        default:[]
    }
},
{ timestamps: true}
);

export default mongoose.model("Video", VideoSchema)