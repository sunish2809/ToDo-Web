import React, { ReactNode } from 'react';

interface RightProps {
  children: ReactNode; // Define children as a prop
}

const Right: React.FC<RightProps> = ({ children }) => {
  return (
    <div className="appright">
      {children} 
    </div>
  );
};

export default Right;


