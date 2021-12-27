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
  }
})

module.exports = models.Place || model('Place', PlaceSchema);