/** @format */

import React, { FC } from "react";
import { View, Text } from "react-native";
import { detailScreen } from "../types/screen";

const Details: FC<detailScreen> = (props) => {
  return (
    <View testID="details" style={{ width: "auto" }}>
      <Text> {JSON.stringify(props.route.params.item, null, 4)}</Text>
    </View>
  );
};

export default Details;
