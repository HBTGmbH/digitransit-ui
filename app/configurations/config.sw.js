/* eslint-disable */
import configMerger from '../util/configMerger';

const CONFIG = 'sw';
const APP_TITLE = 'Verbindungsauskunft';
const APP_DESCRIPTION = 'Verbindungsauskunft - Schweinfurt';
const API_URL = process.env.API_URL || 'https://otp-sw-staging.sandbox.aws.hbt.de/digitransit';
const MAP_URL = process.env.MAP_URL || 'https://{s}.tile.openstreetmap.de/';

const walttiConfig = require('./config.waltti').default;

const minLat = 50.018715;
const maxLat = 50.044273;
const minLon = 10.148706;
const maxLon = 10.312042;

export default configMerger(walttiConfig, {
  CONFIG,

  appBarLink: { name: 'Stadtwerke Schweinfurt', href: 'https://www.stadtwerke-sw.de' },

  URL: {
    OTP: process.env.OTP_URL || `${API_URL}/routing/v1/routers/sw/`,
    MAP_URL,
  },

  colors: {
    primary: '$livi-blue',
    iconColors: {
      'mode-bus': '$livi-blue',
    },
  },

  socialMedia: {
    title: APP_TITLE,
    description: APP_DESCRIPTION,
  },

  title: APP_TITLE,

  availableLanguages: ['de', 'en'],
  defaultLanguage: 'de',

  textLogo: true,

  feedIds: ['SW'],

  searchParams: {
    'boundary.rect.min_lat': minLat,
    'boundary.rect.max_lat': maxLat,
    'boundary.rect.min_lon': minLon,
    'boundary.rect.max_lon': maxLon,
  },

  map: {
    useRetinaTiles: true,
    tileSize: 256,
    zoomOffset: 0,
  },

  themeMap: {
    sw: 'sw',
  },

  areaPolygon: [
    [minLon, minLat],
    [minLon, maxLat],
    [maxLon, maxLat],
    [maxLon, minLat],
  ],

  defaultEndpoint: {
    address: 'Roßmarkt',
    lat: 50.04427,
    lon: 10.23041,
  },

  menu: {
    copyright: { label: `© Stadtwerke Schweinfurt ${walttiConfig.YEAR}` },
    content: [
      {
        name: 'Impressum',
        route: '/impressum',
      },
      {
        name: 'Datenschutz',
        route: '/datenschutz'
      },
    ],
  },

  aboutThisService: {
    en: [
      {
        header: 'About this service',
        paragraphs: [
          'This service is provided by Stadtwerke Schweinfurt for route planning in Schweinfurt region. The service covers public transport, walking, and some private car use. Service is built on Digitransit platform.',
        ],
      },
    ],
    de: [
      {
        header: 'Über diesen Service',
        paragraphs: [
          'Dieser Service wird von den Stadtwerken Schweinfurt bereitgestellt für die Routensuche in Schweinfurt. Der Service beauskunftet öffentlichen Nahverkehr, Fußwege und unter Umständen private Autonutzung. Der Service basiert auf der Digitransit-Plattform.',
        ],
      },
    ],
  },
});
