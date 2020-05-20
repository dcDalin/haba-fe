import React from 'react';
import { Image } from 'semantic-ui-react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import one from '../../assets/1.jpeg';
import two from '../../assets/2.jpeg';
import three from '../../assets/3.jpeg';

const CarouselInfo: React.FC = () => {
  return (
    <Carousel>
      <div>
        <Image src={one} />
        <p className="legend"></p>
      </div>
      <div>
        <Image src={two} />
        <p className="legend"></p>
      </div>
      <div>
        <Image src={three} />
        <p className="legend"></p>
      </div>
    </Carousel>
  );
};

export default CarouselInfo;
