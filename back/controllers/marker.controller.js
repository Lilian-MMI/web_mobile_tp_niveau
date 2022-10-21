const Marker = require('../models/marker.model.js');
const User = require('../models/user.model.js');

/* Custom handle errors */
const handleErrors = (err) => {
  let errors = {};

  if (err.message.includes('markers validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return Object.keys(errors).length ? { errors } : { errors: err.message };
};

exports.createMarker = async (req, res) => {
  try {
    const { libelle, lat: latitude, lng: longitude } = req.body;
    const marker = new Marker({ libelle, latitude, longitude });
    const savedMarker = await marker.save();

    const user = await User.findById(req.userId);
    user.markers.push(savedMarker._id);
    await user.save();

    res.status(200).json(savedMarker);
  } catch (err) {
    res.status(500).send(handleErrors(err));
  }
};

exports.getMarkers = async (req, res) => {
  try {
    const markers = await User.find(
      { _id: req.userId },
      {
        markers: 1,
      }
    ).populate('markers');
    res.status(200).json(markers[0].markers);
  } catch (err) {
    res.status(500).send(handleErrors(err));
  }
};

exports.editMarker = async (req, res) => {
  try {
    const marker = await Marker.findById(req.params.markerId);
    marker.libelle = req.body.libelle;
    const savedMarker = await marker.save();
    res.status(200).json(savedMarker);
  } catch (err) {
    res.status(500).send(handleErrors(err));
  }
};

exports.deleteMarker = async (req, res) => {
  try {
    const marker = await Marker.findById(req.params.markerId);
    const user = await User.findById(req.userId);
    user.markers = user.markers.filter((markerId) => markerId != marker._id);
    await user.save();
    await marker.delete();
    res.status(200).json({ message: 'Marker deleted' });
  } catch (err) {
    res.status(500).send(handleErrors(err));
  }
};
