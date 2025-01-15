import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import colors from '../constants/colors';
import commonStyles from '../constants/commonStyles';

const StartupScreen = () => {
   return (
      <View style={commonStyles.center}>
         <ActivityIndicator size={'large'} color={colors.primary} />
      </View>
   );
};

export default StartupScreen;
