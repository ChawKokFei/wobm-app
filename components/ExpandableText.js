import React, {useState, useCallback} from "react";
import {View, Text, TouchableOpacity, LayoutAnimation} from "react-native";

const ExpandableText = ({text, id, style}) => {
  const [expanded, setExpanded] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length > 2);
  }, []);

  const handlePress = () => {
    LayoutAnimation.configureNext({
      duration: 500,
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.7,
      },
    });
    setExpanded(!expanded);
  };

  return (
    <View>
      <Text
        style={[style, {color: "black"}]}
        numberOfLines={expanded ? undefined : 2}
        onTextLayout={onTextLayout}
      >
        {text}
      </Text>
      {lengthMore ? (
        <TouchableOpacity onPress={handlePress}>
          <Text
            style={[
              style,
              {alignSelf: "flex-end", marginVertical: 4, color: "black"},
            ]}
          >
            {expanded ? "Show less" : "Show more"}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ExpandableText;
