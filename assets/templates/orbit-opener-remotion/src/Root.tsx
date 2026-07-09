import {Composition} from 'remotion';
import {OrbitOpener} from './OrbitOpener';

export const RemotionRoot = () => {
  return (
    <Composition
      id="OrbitOpener"
      component={OrbitOpener}
      durationInFrames={450}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
