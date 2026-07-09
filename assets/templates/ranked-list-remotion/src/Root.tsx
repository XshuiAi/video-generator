import {Composition} from 'remotion';
import {PluginTop10} from './PluginTop10';

export const RemotionRoot = () => {
  return (
    <Composition
      id="PluginTop10"
      component={PluginTop10}
      durationInFrames={360}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
