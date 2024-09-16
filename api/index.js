require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Importa el paquete cors

const app = express();
const port = process.env.PORT || 3001;

// Configura CORS
app.use(cors({
  origin: '*',
  methods: ['GET'],
}));

// Ruta para obtener la lista de países disponibles
app.get('/api/countries', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.NAGER_API_URL}/AvailableCountries`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching countries' });
  }
});

// Ruta para obtener información de un país específico
app.get('/api/country/:code', async (req, res) => {
  const { code } = req.params;
  try {
    // Información del país (fronteras)
    const countryInfoResponse = await axios.get(`${process.env.NAGER_API_URL}/CountryInfo/${code}`);
    
    // Datos de la población
    const populationResponse = await axios.post(`${process.env.COUNTRIESNOW_API_URL}/countries/population`, {
      country: countryInfoResponse.data.commonName
    });

    // Bandera del país
    const flagResponse = await axios.post(`${process.env.COUNTRIESNOW_API_URL}/countries/flag/images`, {
      country: countryInfoResponse.data.commonName
    });

    res.json({
      country: countryInfoResponse.data,
      population: populationResponse.data.data.populationCounts,
      flag: flagResponse.data.data.flag
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching country info' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
