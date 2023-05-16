import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

function RefreshableScreen({ children, onRefresh }) {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      onRefresh(); 
    });

    return unsubscribe;
  }, [navigation, onRefresh]);

  return children;
}

export default RefreshableScreen;