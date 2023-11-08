import React, { ReactNode } from 'react';

export const FilterSidebar: Component<{ children: ReactNode; visible?: boolean }> = ({
  children,
  visible = true
}) => {
  return (
    <div className={`w-${visible ? '50' : '0'} ${visible ? 'pe-5' : '0'}`}>
      {visible && children}
    </div>
  );
};
