import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function NewsApi() {
  const [searchTerm, setSearchTerm] = useState("");
  const [newsData, setNewsData] = useState([]);

  const searchNews = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${searchTerm}&from=2023-09-05&sortBy=publishedAt&apiKey=b6cd6cb6df3d430eb7ce51dc729bacb3`
      );

      if (response.data.status === "ok") {
        setNewsData(response.data.articles);
      } else {
        console.error("API Error:", response.data.message);
        setNewsData([]);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setNewsData([]);
    }
  };

  // useEffect(() => {
  //   const apiUrl =
  //     "https://newsapi.org/v2/everything?q=tesla&from=2023-09-05&sortBy=publishedAt&apiKey=b6cd6cb6df3d430eb7ce51dc729bacb3";

  //   fetch(apiUrl)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.status === "ok") {
  //         setNewsData(data.articles);
  //       } else {
  //         console.log("Api Error: ", error);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // });

  const truncateTitle = (title) => {
    const words = title.split(" ");
    return words.slice(0, 5).join(" ");
  };

  const truncateDescription = (description) => {
    const words = description.split(" ");
    return words.slice(0, 20).join(" ");
  };

  const opneUrl = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search News :</Text>
      <TextInput
        style={styles.input}
        placeholder="Search News Keyword"
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
      />
      <Button title="News Search" onPress={searchNews} />
      <Text style={styles.header}>News About Tesla :</Text>
      <View>
        <FlatList
          data={newsData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => opneUrl(item.url)}>
              <View style={styles.item}>
                <Text style={styles.itemTitle}>
                  {truncateTitle(item.title)}
                </Text>
                <Image
                  source={{ uri: item.urlToImage }}
                  style={{ width: 500, height: 200 }}
                />
                <View>
                  <Text>{truncateDescription(item.description)}</Text>
                  <View>
                    <Text style={styles.author}>Author: {item.author}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        ></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    marginBottom: 16,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "black",
    textTransform: "capitalize",
  },
  input: {
    marginBottom: 10,
    padding: 8,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
  },
  authorText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  author: {
    fontSize: 15,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
