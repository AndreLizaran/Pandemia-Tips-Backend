const {
  model,
  Schema,
  models
} = require('mongoose');

const PlaceSchema = new Schema ({
  title: {
    type:String,
    required:true
  },
  description: {
    type:String,
    required:true
  },
  images: {
    type:Array,
    default:[]
  },
  rate: {
    type:Number,
    required:true
  },
  address: {
    type:String,
    required:true,
  },
  tips: {
    type:Array,
    default:[],
  },
  categories: {
    type:Array,
    default:[]
  }
})

module.exports = models.Place || model('Place', PlaceSchema);