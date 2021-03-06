const mongoose = require('mongoose');
const _ = require('lodash');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  description: String,
  location: {
    address: String,
    lat: String,
    lng: String
  },
  dates: [{
    beginDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    }
  }],
  church: {
    type: Schema.Types.ObjectId,
    ref: 'Church',
    required: true
  }
}, {
  timestamps: true
});

EventSchema.methods.toJSON = function() {
  const event = this.toObject();

  delete event.__v;

  return event;
};

module.exports = mongoose.model('Event', EventSchema);