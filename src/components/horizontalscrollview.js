import React, { useState } from "react";
import { useRef } from "react";
import { View, StyleSheet, ScrollView, useWindowDimensions, Animated } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Card1 from "./card1";
import Card2 from "./card2";
import { Dimensions } from "react-native";
import { SlidingBorder, ScalingDot, SlidingDot } from 'react-native-animated-pagination-dots';

export default function HorizontalScrollView() {


    const scrollX = useRef(new Animated.Value(0)).current;
    let { width: windowWidth, height: windowHeight } = useWindowDimensions();
    windowHeight = windowHeight - 300;

    const DATA = [
        {
            key: '1',
            title: 'Card 1',
            text: 'Card 1 Text',
        },
        {
            key: '2',
            title: 'Card 2',
            text: 'Card 2 Text',
        }
    ];

    return (

        <View>

        <ScrollView
            data={DATA}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ height: 200, }} // 200 before
            scrollEventThrottle={200}
            decelerationRate='fast'
            snapToInterval={Dimensions.get('window').width - 60}
            snapToAlignment='center'
            snapToOffsets={[0, 1]}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false },

            )}
        >

            <Card1 />
            <Card2 />
           

        </ScrollView>

        <View style={{marginTop: 43, alignContent: 'center',
        }}>
            
            <SlidingDot
                scrollX={scrollX}
                data={DATA}
                dotSize={10}
                dotStyle={{backgroundColor: 'grey',}}  
                marginHorizontal={3}
                slidingIndicatorStyle={{backgroundColor: '#0AD6F2',}}
                
            />

        </View>

</View>
        

    );
}