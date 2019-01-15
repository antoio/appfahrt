# Appfahrt v 0.8.0

![Appfahrt Icon](https://github.com/antoio/appfahrt/blob/master/appfahrt/src/assets/icons/icon-384x384.png "Appfahrt")

This project is currently work in progress. 🏗  

Appfahrt lets you check the stationboards from your nearest location. All mayor train, bus and tramstations in Switzerland are available and fetched from https://transport.opendata.ch.

As a registered user you are able to create and sor yourt Favorite stations.

visit [go.appfahrt.ch](https://go.appfahrt.ch) for the current Version

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
- `cd appfahrt`
- rename `app/config.template` to `app/config.ts` and include keys for google maps and firbease. If the developers didn't provide you with the keys, feel free to create your own: [Google Maps](https://console.cloud.google.com/google/maps-apis) and [Firebase](http://console.firebase.google.com/)
- install dependencies `yarn install`
- run dev mode: `ng serve` for a server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

# ⬆️ Deployment
For proper pwa usage the projects needs to be served via ssh (https) and in production environment.
- `ng build --prod` will build the full project onto the `dist/appfahrt` folder
- `firebase deploy` will deploy your project to firebase. Setup firebase with `firebase init` 
- Enjoy 😎!

#🔓Security
Add following rule to prevent favorites beeing modified by unauthorized Users
```javascript
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/favorites/{document=**} {
        allow read, write, update, delete: if request.auth.uid == userId;
    }
  }
}
```

# ℹ️ About us

antonio galluccio, mad hobby scientist

michael burgdorfer, genius CEO
