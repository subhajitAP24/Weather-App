// import * as Location from "expo-location";
// import { StatusBar } from "expo-status-bar";
// import { useState } from "react";
// import{
//   ActivityIndicator,
//   Keyboard,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native"; 

// interface WeatherData{
//   cod: number | string;
//   name: string;
//   main: {
//     temp: number;
//     humidity: number;
//   };
//   weather: Array<{
//     main: string;
//   }>;
//   wind:{
//     speed: number;
//   };
//   sys: {
//     sunrise: number;
//     sunset: number;
//   };
//   timezone: number;
// }

// const API_KEY = process.env.EXPO_PUBLIC_OPENWEATHERMAP_API_KEY || "";
// const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "https://api.openweathermap.org/data/2.5"

// export default function Index() {
//   const [city, setCity] = useState("");
//   const [weather, setWeather] = useState<WeatherData | null>(null);
//   const [loading, setLoading] = useState(false);
//   const[error,setError] = useState("");

//   const getWeatherByCity = async () => {
//     if(!city) return;

//     Keyboard.dismiss();
//     setLoading(true);
//     setError("");

//     try{
//       const response = await fetch(
//         `${API_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
//       );
//       const data = await response.json() as WeatherData;

//       if(data.cod !== 200){
//         setError("City not found");
//         setWeather(null);
//       }else{
//         setWeather(data);
//       }
//     } catch (err){
//       setError("Something went wrong");
//     }

//     setLoading(false);
//   };

//   const getWeatherByLocation = async () => {
//     setLoading(true);
//     setError("");

//     try{
//       const{status} = await Location.requestForegroundPermissionsAsync();
//       if(status !== "granted"){
//         setError("Location permission denied");
//         setLoading(false);
//         return;
//       }

//       const location = await Location.getCurrentPositionAsync({});
//       const {latitude, longitude} = location.coords;

//       const response = await fetch(
//         `${API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
//       );
//       const data = await response.json() as WeatherData;

//       setWeather(data);
//       setCity(data.name);

//     }catch(err){
//       setError("Unable to get location weather");
//     }

//     setLoading(false);
//   };

//   const formatTime = (unixTime: number, timezone: number): string => {
//     const localTimestampMs = (unixTime + timezone) * 1000;
//     const date = new Date(localTimestampMs);
//     return date.toLocaleTimeString("en-IN",{
//       hour: "2-digit",
//       minute: "2-digit",
//       timeZone: "UTC"
//     });
//   };



//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🌤️ Weather App</Text>


//       <TextInput
//       placeholder="Enter City Name"
//       value={city}
//       onChangeText={setCity}
//       style={styles.input}
//       />

//       <TouchableOpacity style={styles.button} onPress={getWeatherByCity}>
//         <Text style={styles.buttonText}>Get Weather</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//       style={[styles.button, styles.locationButton]}
//       onPress={getWeatherByLocation}
//       >
//         <Text style={styles.buttonText}>Use Current Location</Text>

//       </TouchableOpacity>

//       {loading && <ActivityIndicator size="large" color="#333"/>}
//       {error ? <Text style={styles.error}>{error}</Text> : null}

//       {weather &&(
//         <View style={styles.card}>
//           <Text style={styles.city}>{weather.name}</Text>
//           <Text style={styles.temp}>{Math.round(weather.main.temp)}C</Text>
//           <Text style={styles.condition}>{weather.weather[0].main}</Text>


//           <View style={styles.row}>
//             <Text> Humidity:{weather.main.humidity}%</Text>
//             <Text> Wind:{weather.wind.speed} m/s</Text>
//           </View>

//           <View style={styles.row}>
//             <Text>Sunrise {formatTime(weather.sys.sunrise, weather.timezone)}</Text>
//             <Text>Sunset {formatTime(weather.sys.sunset, weather.timezone)}</Text>

//           </View>
//         </View>  
          
//       )}



//        <StatusBar style="auto"/>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container:{
//     flex: 1,
//     backgroundColor:"#f2f2f2",
//     alignItems: "center",
//     paddingTop: 60,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   input: {
//     width: "80%",
//     padding: 12,
//     borderRadius: 8,
//     backgroundColor: "#fff",
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   button: {
//     width: "80%",
//     backgroundColor:"red",
//     padding: 14,
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   locationButton: {
//     backgroundColor: "#555",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   card: {
//     marginTop: 20,
//     width: "80%",
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 20,
//     alignItems: "center",
//   },
//   city: {
//     fontSize: 22,
//     fontWeight: "bold",
//   },
//   temp: {
//     fontSize: 48,
//     fontWeight: "bold",
//     marginVertical: 10,
//   },
//   condition: {
//     fontSize: 18,
//     color: "#555",
//   },
//   row: {
//     marginTop: 10,
//     width: "100%",
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   error: {
//     color: "red",
//     marginTop: 10,
//   },
// })






import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface WeatherData {
  cod: number | string;
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
  }>;
  wind: {
    speed: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  timezone: number;
}

const API_KEY =
  process.env.EXPO_PUBLIC_OPENWEATHERMAP_API_KEY || "";

const API_URL = "https://api.openweathermap.org/data/2.5";

export default function Index() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get Weather By City
  const getWeatherByCity = async () => {
    if (!city.trim()) return;

    Keyboard.dismiss();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = (await response.json()) as WeatherData;

      if (data.cod !== 200) {
        setError("City not found");
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Something went wrong");
      setWeather(null);
    }

    setLoading(false);
  };

  // Get Weather By Current Location
  const getWeatherByLocation = async () => {
    setLoading(true);
    setError("");

    try {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setError("Location permission denied");
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      const { latitude, longitude } = location.coords;

      const response = await fetch(
        `${API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );

      const data = (await response.json()) as WeatherData;

      if (data.cod !== 200) {
        setError("Unable to fetch weather");
        setWeather(null);
      } else {
        setWeather(data);
        setCity(data.name);
      }
    } catch (err) {
      setError("Unable to get location weather");
      setWeather(null);
    }

    setLoading(false);
  };

  // Format Sunrise & Sunset Time
  const formatTime = (
    unixTime: number,
    timezone: number
  ): string => {
    const localTimestampMs = (unixTime + timezone) * 1000;

    const date = new Date(localTimestampMs);

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌤️ Weather App</Text>

      <TextInput
        placeholder="Enter City Name"
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={getWeatherByCity}
      >
        <Text style={styles.buttonText}>Get Weather</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.locationButton]}
        onPress={getWeatherByLocation}
      >
        <Text style={styles.buttonText}>
          Use Current Location
        </Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator size="large" color="#333" />
      )}

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}

      {weather && (
        <View style={styles.card}>
          <Text style={styles.city}>
            📍 {weather.name}
          </Text>

          <Text style={styles.temp}>
            {Math.round(weather.main.temp)}°C
          </Text>

          <Text style={styles.condition}>
            {weather.weather[0].main}
          </Text>

          <View style={styles.row}>
            <Text style={styles.infoText}>
              💧 Humidity: {weather.main.humidity}%
            </Text>

            <Text style={styles.infoText}>
              🌬️ Wind: {weather.wind.speed} m/s
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.infoText}>
              🌅 Sunrise:{" "}
              {formatTime(
                weather.sys.sunrise,
                weather.timezone
              )}
            </Text>

            <Text style={styles.infoText}>
              🌇 Sunset:{" "}
              {formatTime(
                weather.sys.sunset,
                weather.timezone
              )}
            </Text>
          </View>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 12,
  },

  button: {
    width: "100%",
    backgroundColor: "#0077ff",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },

  locationButton: {
    backgroundColor: "#555",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  card: {
    width: "100%",
    backgroundColor: "#fff",
    marginTop: 20,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    elevation: 5,
  },

  city: {
    fontSize: 24,
    fontWeight: "bold",
  },

  temp: {
    fontSize: 56,
    fontWeight: "bold",
    marginVertical: 10,
  },

  condition: {
    fontSize: 20,
    color: "#666",
    marginBottom: 10,
  },

  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  infoText: {
    fontSize: 14,
    color: "#333",
  },

  error: {
    color: "red",
    marginTop: 10,
    fontSize: 16,
  },
});