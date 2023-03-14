import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import ProgressBar from './src/progress_bar/progress_bar';
import MainPage from './src/main_page/main_page';
import 'expo-dev-client';
import mobileAds, { InterstitialAd, useInterstitialAd, TestIds, AdEventType} from 'react-native-google-mobile-ads';

export default function App() {
  //Можно реализовать через router тогда просто вместо setMain там где нужно, просто указываем редирект через
  // navigation.navigate(), который получаем из хука
  const [main, setMain] = useState(false)

  //Сама бибилиотека AdMob
  const {error,isClosed, isLoaded, load, show} = useInterstitialAd('ca-app-pub-3940256099942544/1033173712', {
    requestNonPersonalizedAdsOnly: true,
  });

  //Инициализируем загрузку
  useEffect(()=>{
      load()
  },[load])

  //Если объявление закрыто, сработает хук и мы переместимся на главную 
  useEffect(()=>{
    if(isClosed){
      setMain(true)
    }
  },[isClosed])


  //Если загружено - показать
  if(isLoaded){
    show()
  }

  return (
    <View style={styles.container}>
        {
          !isClosed && <ProgressBar loaded={isLoaded} error = {error} setMain = {setMain}/>
        }
        {
          main && <MainPage/>
        }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
