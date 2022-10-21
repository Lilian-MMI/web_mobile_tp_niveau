const mongoose = require('mongoose');

const markerSchema = new mongoose.Schema(
  {
    libelle: {
      type: String,
      required: [true, `Un libellé est requis`],
    },
    latitude: {
      type: Number,
      required: [true, `Une latitude est requise`],
    },
    longitude: {
      type: Number,
      required: [true, `Une longitude est requise`],
    },
  },
  {
    timestamps: true,
  }
);

const Marker = mongoose.model('markers', markerSchema);

module.exports = Marker;
