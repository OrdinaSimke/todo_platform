'use client';

import Zoom from 'next-image-zoom';

const ZoomImage = (props: any) => {
  const { src, alt, width, height, className, layout } = props;
  return (
    <Zoom
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      //   layout={layout}
    />
  );
};

export default ZoomImage;
