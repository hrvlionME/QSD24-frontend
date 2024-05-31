import React, { useState } from 'react';
import MenSizeGuide from './Men/MenSizeGuide';
import WomenSizeGuide from './Women/WomenSizeGuide';
import ChildrenSizeGuide from './Children/ChildrenSizeGuide';


export default function SizeGuide()  {
    const [gender, setGender] = useState(1); //0 men, 1 women, 2 children, for now this is just a placeholder

  return (
    <>
    {
      gender === 0 ? <MenSizeGuide /> : gender === 1 ? <WomenSizeGuide /> : <ChildrenSizeGuide />
    }
    </>
  );
};