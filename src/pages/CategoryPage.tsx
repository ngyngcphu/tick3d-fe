import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Card,
  CardBody,
  Chip,
  IconButton,
  List,
  ListItem,
  Select,
  Option,
  Spinner,
  Typography
} from '@material-tailwind/react';
import {
  AdjustmentsHorizontalIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/solid';
import { FilterDrawer, FilterAccordion } from '@components/category';
import { ScreenSize } from '@constants';
import { useScreenSize } from '@hooks';
import { defaultModelService } from '@services';
import { useMenuBarStore, usePaginationStore } from '@states';
import { retryQueryFn } from '@utils';
import type { colors } from '@material-tailwind/react/types/generic';
import type { variant } from '@material-tailwind/react/types/components/button';

export function CategoryPage() {
  const NUMBER_ITEMS_PER_PAGE = 8;
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const { screenSize } = useScreenSize();
  const { selectedCategoryItem } = useMenuBarStore();
  const { activePage, setActivePage } = usePaginationStore();

  const { data: listModels } = useQuery({
    queryKey: ['/api/model', activePage, NUMBER_ITEMS_PER_PAGE, selectedCategoryItem.id],
    queryFn: () =>
      defaultModelService.getAll({
        start: (activePage - 1) * NUMBER_ITEMS_PER_PAGE,
        noItems: NUMBER_ITEMS_PER_PAGE,
        categoryId: selectedCategoryItem.id ? selectedCategoryItem.id : undefined
      }),
    retry: retryQueryFn
  });

  const numPages = useMemo(
    () => Math.ceil((listModels?.total ?? 0) / NUMBER_ITEMS_PER_PAGE),
    [listModels?.total]
  );

  const getItemProps = (index: number) => ({
    variant: activePage === index ? 'filled' : ('text' as variant),
    color: 'gray' as colors,
    onClick: () => setActivePage(index)
  });

  const next = () => {
    if (activePage === numPages) return;

    setActivePage(activePage + 1);
  };

  const prev = () => {
    if (activePage === 1) return;

    setActivePage(activePage - 1);
  };

  return (
    <>
      <div className='flex md:justify-between items-center md:pe-6'>
        <div className='flex gap-10 justify-center md:justify-start items-center m-5'>
          <Button
            onClick={() => setOpenDrawer(!openDrawer)}
            variant='outlined'
            size='md'
            className='flex items-center gap-2'
          >
            <AdjustmentsHorizontalIcon className='w-5 h-5' />
            Filter
          </Button>
          <div className='w-fit'>
            <Select
              label='Sort by'
              size='md'
              color='blue-gray'
              labelProps={{ className: 'text-black' }}
            >
              <Option>Most Popular</Option>
              <Option>Price</Option>
              <Option>Like</Option>
              <Option>Upload Time</Option>
            </Select>
          </div>
        </div>
        {screenSize > ScreenSize.MD ? <span>10000 results</span> : null}
      </div>
      <div className='flex mx-5'>
        {screenSize > ScreenSize.MD ? (
          <div className={openDrawer ? 'w-52 pe-5' : ''}>{openDrawer && <FilterAccordion />}</div>
        ) : null}
        {screenSize <= ScreenSize.MD ? (
          <List className='grid gap-2 w-full'>
            {listModels && listModels.models.length > 0 ? (
              listModels.models.map((item, index) => (
                <ListItem
                  key={index}
                  className='flex gap-5 border-2 border-b-gray-400 cursor-pointer rounded-lg p-4'
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className='w-40 h-40 md:w-full md:h-full'
                  />
                  <div className='flex flex-col gap-3'>
                    <Typography variant='lead' className='font-bold truncate'>
                      {item.name}
                    </Typography>
                    <Typography variant='paragraph'>{item.description}</Typography>
                    <Chip
                      color='amber'
                      value={`${item.price.toLocaleString('en-US')} VNĐ`}
                      className='w-fit'
                    />

                    <div className='flex items-center justify-between'>
                      <Typography variant='h6' className='font-bold'>
                        {`Đã mua: ${item.numberBought}`}
                      </Typography>
                      <Button className='bg-red-500 text-white normal-case truncate p-4'>
                        Đặt hàng
                      </Button>
                    </div>
                  </div>
                </ListItem>
              ))
            ) : (
              <div className='grid justify-items-center items-center'>
                <Spinner color='green' className='h-12 w-12' />
              </div>
            )}
          </List>
        ) : listModels ? (
          <div className='grid grid-cols-2 gap-2 lg:grid-cols-4 lg:py-6 lg:px-4 lg:gap-3'>
            {listModels.models.map((item, index) => (
              <Card
                key={index}
                className='border-2 border-gray-400 hover:border-gray-600 cursor-pointer rounded-lg'
              >
                <CardBody className='flex flex-col justify-between h-[500px]'>
                  <div className='line-clamp-4'>
                    <img src={item.imageUrl} />
                    <Typography variant='lead' className='font-bold'>
                      {item.name}
                    </Typography>
                    <Chip
                      color='amber'
                      value={`${item.price.toLocaleString('en-US')} VNĐ`}
                      className='w-fit'
                    />
                    <Typography variant='paragraph'>{item.description}</Typography>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <Typography variant='h6' className='font-bold'>
                      {`Đã mua: ${item.numberBought}`}
                    </Typography>
                    <Button className='bg-red-500 text-white'>Đặt hàng</Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        ) : (
          <div className='flex justify-center w-full'>
            <Spinner color='green' className='h-12 w-12' />
          </div>
        )}
      </div>
      <div className='flex items-center justify-center gap-4 py-4'>
        <Button
          variant='text'
          className='flex items-center gap-2'
          onClick={prev}
          disabled={activePage === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className='h-5 w-5' /> Previous
        </Button>
        <div className='flex items-center gap-2'>
          {numPages >= 6 && activePage > 3 && (
            <>
              <IconButton {...getItemProps(1)}>1</IconButton>
              <EllipsisHorizontalIcon className='w-6 h-6' />
            </>
          )}
          {numPages < 6 ? (
            [...Array(numPages).keys()].map((pageNumber) => (
              <IconButton key={pageNumber} {...getItemProps(pageNumber + 1)}>
                {pageNumber + 1}
              </IconButton>
            ))
          ) : activePage <= 3 ? (
            [...Array(numPages).keys()].slice(0, 3).map((pageNumber) => (
              <IconButton key={pageNumber} {...getItemProps(pageNumber + 1)}>
                {pageNumber + 1}
              </IconButton>
            ))
          ) : activePage > 3 && activePage <= numPages - 3 ? (
            <IconButton {...getItemProps(activePage)}>{activePage}</IconButton>
          ) : (
            [...Array(numPages).keys()].slice(numPages - 3).map((pageNumber) => (
              <IconButton key={pageNumber} {...getItemProps(pageNumber + 1)}>
                {pageNumber + 1}
              </IconButton>
            ))
          )}
          {numPages >= 6 && activePage <= numPages - 3 && (
            <>
              <EllipsisHorizontalIcon className='w-6 h-6' />
              <IconButton {...getItemProps(numPages)}>{numPages}</IconButton>
            </>
          )}
        </div>
        <Button
          variant='text'
          className='flex items-center gap-2'
          onClick={next}
          disabled={activePage === numPages}
        >
          Next
          <ArrowRightIcon strokeWidth={2} className='h-5 w-5' />
        </Button>
      </div>
      {screenSize <= ScreenSize.MD ? (
        <FilterDrawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
          <FilterAccordion closeDrawer={() => setOpenDrawer(false)} />
        </FilterDrawer>
      ) : null}
    </>
  );
}
