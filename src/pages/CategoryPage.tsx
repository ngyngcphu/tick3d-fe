import React, { useState } from 'react';
import { FilterDrawer, FilterAccordion, FilterAndSort, FilterSidebar } from '@components/category';
import { ItemsList } from '@components/category';
import { useItemStore } from '@states/home';
import { ScreenSize } from '@constants';
import { useScreenSize } from '@hooks';

export function CategoryPage() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { screenSize } = useScreenSize();
  const { itemData } = useItemStore();

  const toggleDrawer = () => setOpenDrawer((openDrawer) => !openDrawer);

  return (
    <React.Fragment>
      <FilterAndSort toggleDrawer={toggleDrawer} />
      <div className='flex mx-5'>
        {screenSize > ScreenSize.MD ? (
          <FilterSidebar visible={openDrawer}>
            <FilterAccordion />
          </FilterSidebar>
        ) : null}
        <ItemsList items={itemData} />
      </div>
      {screenSize <= ScreenSize.MD ? (
        <FilterDrawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
          <FilterAccordion closeDrawer={() => setOpenDrawer(false)} />
        </FilterDrawer>
      ) : null}
    </React.Fragment>
  );
}
