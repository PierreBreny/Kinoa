import axios from "axios";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Switch,
  ToastAndroid,
  Linking,
} from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { deleteFavorite, getFavById, insertFavorites } from "../db/db";
import { REACT_APP_MOVIEDB_API_KEY } from "../env";
import { IMAGE_URL } from "../utils/api-const";

export default function Details({ route }) {
  const [isEnabled, setIsEnabled] = useState(false);

  const isInFavorite = () => {
    getFavById(item.id).then((data) => {
      if (data.rows._array.length > 0) {
        setIsEnabled(true);
      } else {
        setIsEnabled(false);
      }
    });
  };

  const showAddToast = () => {
    ToastAndroid.show(
      `${item.title} has been added to Favorites`,
      ToastAndroid.SHORT
    );
  };

  const showRemoveToast = () => {
    ToastAndroid.show(
      `${item.title} has been removed from Favorites`,
      ToastAndroid.SHORT
    );
  };

  const toggleSwitch = () => {
    if (!isEnabled) {
      insertFavorites(
        item.id,
        item.title,
        item.vote_average,
        item.poster_path,
        item.release_date,
        item.overview
      )
        .then(() => {
          showAddToast();
        })
        .catch((err) => console.log(err));
    } else {
      deleteFavorite(item.id).then(() => {
        showRemoveToast();
      });
    }
    setIsEnabled((previousState) => !previousState);
  };

  const { item } = route.params;

  const [genres, setGenres] = useState([]);

  const movie_id = item.id;

  const api_key = REACT_APP_MOVIEDB_API_KEY;

  const getGenres = () => {
    const details_url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${api_key}`;
    axios
      .get(details_url)
      .then(({ data }) => {
        const genresMap = data.genres.map((g) => g.name);
        setGenres(genresMap);
      })
      .catch();
  };

  //Handle trailer video
  const handlePress = () => {
    const video_url = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=c9e23b610c2f0c1040a493fc10ce5aaf`;
    const youtube_url = "https://www.youtube.com/watch?v=";
    axios
      .get(video_url)
      .then(({ data }) => {
        const trailer_key = data.results[0].key;
        const trailer_url = youtube_url + trailer_key;
        console.log(trailer_url);
        Linking.canOpenURL(trailer_url).then((canOpen) => {
          if (canOpen) {
            Linking.openURL(trailer_url);
          }
        });
      })
      .catch();
  };

  useEffect(() => {
    getGenres();
    isInFavorite();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={{ uri: IMAGE_URL + item.poster_path }}
      >
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.date}>{item.release_date}</Text>
            <Text style={styles.genres}>{genres.join(", ")}</Text>
          </View>
          <Text style={styles.summary}>{item.overview}</Text>
          <View style={styles.videoNfav}>
            <Pressable style={styles.video} onPress={handlePress}>
              <Text style={styles.textVideo}>Video</Text>
            </Pressable>
            <View style={styles.favorites}>
              <Switch
                style={styles.switch}
                trackColor={{ false: "#767577", true: "orange" }}
                thumbColor={isEnabled ? "white" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              <Text style={styles.textFav}>Favorites</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 5,
    color: "white",
  },
  title: {
    color: "white",
    fontSize: 30,
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: "bold",
    marginRight: 20,
    marginLeft: 20,
  },
  image: {
    resizeMode: "contain",
    width: 400,
    height: 700,
  },
  card: {
    width: 394,
    height: 700,
    backgroundColor: "rgba(0,0,0,0.75)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  summary: {
    marginTop: 20,
    fontSize: 18,
    color: "#F8F8FF",
    marginRight: 20,
    marginLeft: 20,
    textAlign: "justify",
  },
  infoContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  date: {
    fontSize: 15,
    color: "#DCDCDC",
  },
  genres: {
    fontSize: 15,
    color: "#DCDCDC",
  },
  videoNfav: {
    marginRight: 25,
    marginLeft: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  favorites: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  textFav: {
    fontSize: 15,
    color: "white",
  },
  video: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "orange",
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    maxHeight: 40,
  },
  textVideo: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    textTransform: "uppercase",
  },
});
