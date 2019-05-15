# React Native Mobile application, Spring Boot, ReactNative, MySQL, Hibernate, Liquibase

The application structure is as follows.
- **server-product-management** - Microservice implemented using Spring boot. [More info](server-product-management/README.md)
- **mobile-product-management** - A NodeJs application implemented using React-Native. This consumes services hosted by server side.  [More info](mobileProductManagement/README.md)

### Build

#### 1) Build Server Side
   
```
$ cd server-product-management
$ gradlew bootJar
$ gradlew bootRun
```

#### 2) Build and run mobile side

```
$ cd mobileProductManagement
$ npm install
$ react-native eject
$ react-native link
$ react-native run android or react-native run-ios
```

### Access server side using following URL

```
http://localhost:8080
```

### Access application using emulator or real device

```
$ For android; react-native run android 
$ For IOS; react-native run-ios
```

