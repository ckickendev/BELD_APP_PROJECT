import React from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native'

export default function CardDesign() {
    return (
      <View style={mainView}>
        <Text>ATTENTION</Text>
        <View>
          <View>
            <View>If you lost this, do inform FPT University immediately</View>
            <View>Carry this with you when you are in the University</View>
            <View>
              If you find this card, please return it to FPT University
            </View>
          </View>
          <View>
            {/* <Image /> */}
            <Text>TAP HERE</Text>
          </View>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({})
