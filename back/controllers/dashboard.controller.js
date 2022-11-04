const { supabase } = require('../utils/supabase.client');

exports.getWeather = async (req, res) => {
  try {
    const weather = await supabase.from('weather').select('*');

    res.status(200).json(weather);
  } catch (err) {
    res.status(500).send('Error getting weather');
  }
};

exports.getMCQ = async (req, res) => {
  try {
    const mcq = await supabase.from('mcq').select('*');

    res.status(200).json(mcq);
  } catch (err) {
    res.status(500).send('Error getting mcq');
  }
};
