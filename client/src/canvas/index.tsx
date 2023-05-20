import { Center, Environment } from '@react-three/drei';
import { Canvas as FiberCanvas } from '@react-three/fiber';

import Backdrop from './Backdrop';
import CameraRig from './CameraRig';
import Shirt from './Shirt';

const Canvas = () => {
  return (
    <FiberCanvas>
      <ambientLight intensity={0.5} />
      <Environment preset="city" />

      <CameraRig>
        {/* <Backdrop /> */}
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </FiberCanvas>
  );
};

export default Canvas;
