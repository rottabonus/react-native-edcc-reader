# react-native-edcc-reader
 React Native implementation of <strong>[European Digital Covid Certificate](https://ec.europa.eu/info/live-work-travel-eu/coronavirus-response/safe-covid-19-vaccines-europeans/eu-digital-covid-certificate_en) reader</strong>
 
<strong>Not verifying signature!</strong>, only decoding the certificate!

### dependencies

* [node-cbor](https://github.com/hildjj/node-cbor)
* [pako](https://github.com/nodeca/pako)
* [fp-ts](https://github.com/gcanti/fp-ts)
* [io-ts](https://github.com/gcanti/io-ts)
* [buffer](https://github.com/feross/buffer)
* [typescript](https://github.com/microsoft/TypeScript)
* [react-native-camera-kit](https://github.com/teslamotors/react-native-camera-kit)

### development

1. Clone the project
2. [Set up react-native development environment](https://reactnative.dev/docs/environment-setup)

 ```console
$ cd react-native-edcc-reader
$ npm i
```
### Start the metro bundler server 

```console
$ npx react-native start
```
#### for Android target

On a different terminal
```console
$ npx react-native run-android
```

#### for iOS target

```console
$ cd ios && pod install && cd ..
```

On a different terminal
```console
$ npx react-native run-ios
```

### resources

* [European Digital Covid Certificate JSON-schema repository](https://github.com/ehn-dcc-development/ehn-dcc-schema)
* [Test-data](https://github.com/ehn-dcc-development/dcc-testdata)

