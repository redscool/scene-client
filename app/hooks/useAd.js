import {useEffect, useRef, useState} from 'react';
import MobileAds, {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.REWARDED
  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const useAd = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const rewarded = useRef();
  const unsubscribeLoaded = useRef(null);
  const unsubscribeEarned = useRef(null);

  const destroy = () => {
    if (unsubscribeLoaded.current) unsubscribeLoaded.current();
    if (unsubscribeEarned.current) unsubscribeEarned.current();
    rewarded.current = null;
    setIsLoaded(false);
    setIsLoading(false);
  };

  const play = callback => {
    try {
      destroy();
      setIsLoading(true);

      rewarded.current = RewardedAd.createForAdRequest(adUnitId, {
        requestNonPersonalizedAdsOnly: true,
        keywords: ['fashion', 'clothing'],
      });

      unsubscribeLoaded.current = rewarded.current.addAdEventListener(
        RewardedAdEventType.LOADED,
        () => {
          setIsLoaded(true);
          setIsLoading(false);
        },
      );

      unsubscribeEarned.current = rewarded.current.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD,
        reward => {
          callback();
          destroy();
        },
      );

      rewarded.current.load();
    } catch (e) {
      setIsLoading(false);
      console.error(e);
      throw e;
    }
  };

  const openAdInspector = () => MobileAds().openAdInspector();

  useEffect(() => {
    if (isLoaded && rewarded.current) rewarded.current.show();
  }, [isLoaded]);

  useEffect(() => {
    return destroy;
  }, []);

  return {
    isLoading,
    isLoaded,
    play,
    openAdInspector,
  };
};

export default useAd;
