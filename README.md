# Appfahrt v 0.8.0

![Appfahrt Icon](https://github.com/antoio/appfahrt/blob/master/appfahrt/src/assets/icons/icon-384x384.png "Appfahrt")

This project is currently work in progress. 🏗  

Appfahrt lets you check the Stationboards from your nearest Location. All mayor Train, Bus and Tramstations in Switzerland are available and fetched from https://transport.opendata.ch.

As a registered User you are able to create and order Favorite stations.

visit [www.appfahrt.ch](http://appfahrt-1537907755048.firebaseapp.com) for the current Version

## Features
- Traindata API from opendata.ch
- PWA functionalities for best mobile experience
- Fully configurable Dashboard
- Find nearest station with a Google Maps integration

# 🔁 Dependencies

- angular 6
- angular material 7
- rxjs 6
- Google Maps 3
- AngularFire2 5
- Basscss 8
- momentjs 2


# ⏏️ Installation

- npm install https://github.com/antoio/appfahrt/appfahrt
- yarn install
- rename `app/config.template` to `app/config.ts` and include keys for google maps and firbease. If the developers didn't provide you with the keys, feel free to create your own: [Google Maps](https://console.cloud.google.com/google/maps-apis) and [Firebase](http://console.firebase.google.com/)
- Run dev mode: `ng serve` for a server. Navigate to `https://localhost:4200/`. The app will automatically reload if you change any of the source files. Note: For proper pwa usage the app needs to be served through https.

# ℹ️ About us

antonio galluccio, mad hobby scientist

michael burgdorfer, genius CEO
