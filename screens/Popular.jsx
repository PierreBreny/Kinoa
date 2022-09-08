import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableHighlight,
  Pressable,
} from "react-native";
import { IMAGE_URL } from "../utils/api-const";

export default function Popular({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const getPopular = async () => {
    const movie_url = `https://api.themoviedb.org/3/movie/popular?api_key=c9e23b610c2f0c1040a493fc10ce5aaf&page=${page}`;
    fetch(movie_url)
      .then((res) => res.json())
      .then((json) => {
        setData((p) => [...p, ...json.results]);
        setLoading(false);
      })
      .catch();
  };

  useEffect(() => {
    if (page * 20 !== data.length) getPopular();
  }, [page]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <View style={styles.itemRow}>
          <Pressable onPress={() => navigation.navigate("Details", { item })}>
            <ImageBackground
              borderRadius={5}
              style={styles.image}
              source={{
                uri: IMAGE_URL + item.poster_path,
              }}
              resizeMode="cover"
            >
              <View style={styles.itemInfo}>
                <Text style={styles.itemText}>{item.title} </Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>
                    {Math.round(item.vote_average)}
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </Pressable>
        </View>
      </View>
    );
  };

  const handleLoadMore = () => {
    console.log("handleLoadMore");
    if (!loading) {
      setPage((p) => p + 1);
      setLoading(true);
    }
  };

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 5,
  },
  itemRow: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    marginBottom: 10,
    marginLeft: 20,
    alignItems: "center",
  },
  image: {
    width: 350,
    height: 200,
  },
  itemInfo: {
    flex: 1,
    justifyContent: "space-between",
    paddingRight: 5,
    paddingBottom: 5,
  },
  itemText: {
    // flexDirection:"row",
    textShadowColor: "rgba(0, 0, 0, 0.95)",
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 10,
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",

    //textAlign: "center",
    color: "white",
    paddingLeft: 10,
    marginTop: 15,
  },
  rating: {
    fontSize: 20,
    fontWeight: "normal",
    textTransform: "uppercase",
    textAlign: "right",
    color: "black",
    margin: 5,
    marginBottom: 8,
    paddingRight: 8,
    paddingLeft: 8,
    fontWeight: "bold",
  },
  loader: {
    marginTop: 10,
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    backgroundColor: "orange",
    borderRadius: 30,
    marginBottom: 5,
    marginRight: 5,
  },
});
