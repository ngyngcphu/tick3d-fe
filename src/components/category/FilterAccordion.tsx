import { ChangeEvent, useMemo, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Input,
  List,
  ListItem,
  Radio,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography
} from '@material-tailwind/react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

import { STAR_FILTER } from '@constants';
import { useCategoryQuery } from '@hooks';
import { useMenuBarStore, usePaginationStore, useFilterStore } from '@states';

export const FilterAccordion: Component<{
  closeDrawer?: () => void;
}> = ({ closeDrawer }) => {
  const {
    listCategories: { data: listCategories }
  } = useCategoryQuery();

  const { selectedCategoryItem, setSelectedCategoryItem } = useMenuBarStore();
  const { setActivePage } = usePaginationStore();
  const { selectedStar, fromDay, toDay, setSelectedStar, setFromDay, setToDay } = useFilterStore();

  const [open, setOpen] = useState<number>(0);

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
  const handleChangeStarFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedStar(Number(event.target.value));
    setActivePage(1);
    closeDrawer?.();
  };

  const CalendarPicker: Component<{
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
  }> = useMemo(
    () =>
      ({ date, setDate }) => {
        return (
          <Popover placement='bottom'>
            <PopoverHandler>
              <Input
                label='Select a Date'
                onChange={() => null}
                value={date ? format(date, 'PPP') : ''}
                crossOrigin=''
              />
            </PopoverHandler>
            <PopoverContent placeholder='' className='z-[10000]'>
              <DayPicker
                mode='single'
                selected={date}
                onSelect={setDate}
                showOutsideDays
                className='border-0'
                classNames={{
                  caption: 'flex justify-between py-2 mb-4 relative items-center',
                  caption_label: 'text-base font-medium text-gray-900',
                  nav: 'flex items-center gap-8',
                  nav_button:
                    'h-8 w-8 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300',
                  nav_button_previous: 'absolute left-1.5',
                  nav_button_next: 'absolute right-1.5',
                  table: 'w-full border-collapse',
                  head_row: 'flex font-medium text-gray-900',
                  head_cell: 'm-0.5 w-9 font-normal text-sm',
                  row: 'flex w-full mt-2',
                  cell: 'text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                  day: 'h-9 w-9 p-0 font-normal',
                  day_range_end: 'day-range-end',
                  day_selected:
                    'rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white',
                  day_today: 'rounded-md bg-gray-200 text-gray-900',
                  day_outside:
                    'day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10',
                  day_disabled: 'text-gray-500 opacity-50',
                  day_hidden: 'invisible'
                }}
                components={{
                  IconLeft: ({ ...props }) => (
                    <ChevronLeftIcon {...props} className='h-6 w-6 stroke-2' />
                  ),
                  IconRight: ({ ...props }) => (
                    <ChevronRightIcon {...props} className='h-6 w-6 stroke-2' />
                  )
                }}
              />
            </PopoverContent>
          </Popover>
        );
      },
    []
  );

  return (
    <div className='w-full'>
      <Accordion
        placeholder=''
        open={open === 1}
        icon={
          open === 1 ? (
            <ChevronUpIcon className='w-5 h-5' />
          ) : (
            <ChevronDownIcon className='w-5 h-5' />
          )
        }
      >
        <AccordionHeader placeholder='' onClick={() => handleOpen(1)}>
          Categories
        </AccordionHeader>
        <AccordionBody>
          <div className='flex flex-col'>
            <List placeholder='' className='p-0'>
              {[{ id: '', name: 'All things' }, ...(listCategories ?? [])].map((item, idx) => (
                <ListItem
                  placeholder=''
                  key={idx}
                  className={
                    'hover:bg-gray/1 focus:bg-blue-100 active:bg-blue-100 focus:text-blue/1 active:text-blue/1 focus:font-bold active:font-bold px-6 rounded-none text-gray/4 font-medium' +
                    (selectedCategoryItem.name === item.name
                      ? ' bg-blue-100 text-blue/1 font-bold pointer-events-none'
                      : '')
                  }
                  onClick={() => {
                    setSelectedCategoryItem(item);
                    setActivePage(1);
                    closeDrawer?.();
                  }}
                >
                  {item.name}
                </ListItem>
              ))}
            </List>
          </div>
        </AccordionBody>
      </Accordion>
      <Accordion
        placeholder=''
        open={open === 2}
        icon={
          open === 2 ? (
            <ChevronUpIcon className='w-5 h-5' />
          ) : (
            <ChevronDownIcon className='w-5 h-5' />
          )
        }
      >
        <AccordionHeader placeholder='' onClick={() => handleOpen(2)}>
          Stars
        </AccordionHeader>
        <AccordionBody className='flex flex-col'>
          {STAR_FILTER.map((item, index) => (
            <Radio
              key={index}
              label={item.label}
              value={item.value}
              onChange={handleChangeStarFilter}
              checked={selectedStar === item.value}
              crossOrigin=''
            />
          ))}
        </AccordionBody>
      </Accordion>
      <Accordion
        placeholder=''
        open={open === 3}
        icon={
          open === 3 ? (
            <ChevronUpIcon className='w-5 h-5' />
          ) : (
            <ChevronDownIcon className='w-5 h-5' />
          )
        }
      >
        <AccordionHeader placeholder='' onClick={() => handleOpen(3)}>
          Upload Date
        </AccordionHeader>
        <AccordionBody className='flex flex-col'>
          <div>
            <Typography placeholder='' variant='h6'>
              From:
            </Typography>
            <CalendarPicker date={fromDay} setDate={setFromDay} />
          </div>
          <div>
            <Typography placeholder='' variant='h6'>
              To:
            </Typography>
            <CalendarPicker date={toDay} setDate={setToDay} />
          </div>
        </AccordionBody>
      </Accordion>
    </div>
  );
};
