import React, { useState } from 'react';
import MenSizeGuide from './Men/MenSizeGuide';
import WomenSizeGuide from './Women/WomenSizeGuide';
import ChildrenSizeGuide from './Children/ChildrenSizeGuide';


export default function SizeGuide({ gender } : {gender : string})  {
    
  return (
    <>
    {
      gender === '1' ? <MenSizeGuide /> : gender === '2' ? <WomenSizeGuide /> : <ChildrenSizeGuide />
    }
    </>
  );
};