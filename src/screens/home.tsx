/** @format */

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { routeProp } from "../types/navigation";

const Home: FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const navigation = useNavigation<NativeStackNavigationProp<routeProp>>();
  let interval: NodeJS.Timer;

  const handelPage = () => {
    setPage((p: any) => p + 1);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://hn.algolia.com/api/v1/search_by_date?query=story&page=${page}`
      );
      console.log(res.data.hits);
      setData([...data, ...res.data.hits]);
    } catch (e) {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchData();
    console.log(data);
  }, [page]);

  useEffect(() => {
    interval = setInterval(handelPage, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = () => {
    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight
    ) {
      handelPage();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <View testID="home" style={{}}>
      <>
        {data?.length > 1 ? (
          <>
            <table>
              <tr>
                <td align="center">TITLE</td>
                <td align="center">URL</td>
                <td align="center">CREATED_AT</td>
                <td align="center">AUTHOR</td>
              </tr>

              <tbody>
                {data?.map((item: any, idx: any) => {
                  return (
                    <tr
                      data-testid={`row-${idx}`}
                      onClick={() => {
                        navigation.navigate("Details", {
                          item: item,
                        });
                      }}
                    >
                      <td>
                        {item.title ? (
                          item.title
                        ) : item.story_title ? (
                          item.story_title
                        ) : (
                          <i>data not found</i>
                        )}
                      </td>
                      <td>
                        {item.url ? (
                          <a href={item.url}>{item.url}</a>
                        ) : item.story_url ? (
                          <a href={item.story_url}>{item.story_url}</a>
                        ) : (
                          <i>data not found</i>
                        )}
                      </td>
                      <td>
                        {item.created_at ? (
                          item.created_at
                        ) : (
                          <i>data not found</i>
                        )}
                      </td>
                      <td>
                        {item.author ? item.author : <i>data not found</i>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <>Loading...</>
        )}
      </>
    </View>
  );
};

export default Home;
