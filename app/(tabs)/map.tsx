import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function MapScreen() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [places, setPlaces] = useState<{ name: string; latitude: number; longitude: number; tasks: string[] }[]>([]);

  useEffect(() => {
    const getUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });
    };

    const fetchPlaces = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "locations"));
        const locationsData = querySnapshot.docs.map((doc) => ({
          name: doc.data().name,
          latitude: parseFloat(doc.data().loc.latitude),
          longitude: parseFloat(doc.data().loc.longitude),
          tasks: doc.data().tasks || [],
        }));
        setPlaces(locationsData);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    getUserLocation();
    fetchPlaces();
  }, []);

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {places.map((place, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: place.latitude, longitude: place.longitude }}
              title={place.name}
              description={place.tasks.join(", ")}
            />
          ))}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
