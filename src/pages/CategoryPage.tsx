import { ChangeEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  Button,
  Card,
  CardBody,
  Chip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Input,
  List,
  ListItem,
  Select,
  Option,
  Spinner,
  Textarea,
  Typography
} from '@material-tailwind/react';
import { formatISO } from 'date-fns';
import {
  AdjustmentsHorizontalIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  EllipsisHorizontalIcon,
  TrashIcon
} from '@heroicons/react/24/solid';
import { FilterDrawer, FilterAccordion } from '@components/category';
import { ScreenSize, SORT_CRITERIA, SORT_ORDER } from '@constants';
import {
  useScreenSize,
  useCartQuery,
  useUserQuery,
  useCartMutation,
  useCategoryQuery
} from '@hooks';
import { defaultModelService } from '@services';
import { useCartStore, useFilterStore, useMenuBarStore, usePaginationStore } from '@states';
import { retryQueryFn } from '@utils';
import type { colors } from '@material-tailwind/react/types/generic';
import type { variant } from '@material-tailwind/react/types/components/button';

export function CategoryPage() {
  const NUMBER_ITEMS_PER_PAGE = 8;
  const navigate = useNavigate();

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [criteriaSort, setCriteriaSort] = useState<Partial<Record<OrderBy, string>>>({
    uploadedTime: SORT_CRITERIA['uploadedTime']
  });

  const { screenSize } = useScreenSize();
  const {
    listCategories: { data: listCategories }
  } = useCategoryQuery();
  const { listFlagIsModelAdded, setListFlagIsModelAdded, create: addModelToCart } = useCartStore();
  const { selectedStar, fromDay, toDay, setSelectedStar, setFromDay, setToDay } = useFilterStore();
  const { selectedCategoryItem, setSelectedCategoryItem } = useMenuBarStore();
  const { activePage, setActivePage } = usePaginationStore();
  const { createCart } = useCartMutation();

  const {
    info: { data: userInfo, isSuccess: isAdmin }
  } = useUserQuery();
  const { data: listModels } = useQuery({
    queryKey: [
      '/api/model',
      activePage,
      NUMBER_ITEMS_PER_PAGE,
      selectedCategoryItem.id,
      selectedStar,
      fromDay,
      toDay,
      criteriaSort
    ],
    queryFn: () =>
      defaultModelService.getAll({
        orderBy: Object.keys(criteriaSort)[0] as OrderBy,
        order: SORT_ORDER[Object.keys(criteriaSort)[0] as OrderBy],
        start: (activePage - 1) * NUMBER_ITEMS_PER_PAGE,
        noItems: NUMBER_ITEMS_PER_PAGE,
        categoryId: selectedCategoryItem.id ? selectedCategoryItem.id : undefined,
        likes_ge: selectedStar,
        uploaded_after: fromDay ? formatISO(fromDay, { representation: 'date' }) : undefined,
        uploaded_before: toDay ? formatISO(toDay, { representation: 'date' }) : undefined
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

  const handleClearFilters = () => {
    setSelectedCategoryItem({
      id: '',
      name: 'All things'
    });
    setSelectedStar(0);
    setFromDay(undefined);
    setToDay(undefined);
    setActivePage(1);
  };
  const {
    listModelsInCart: { isSuccess, refetch: refetchTotalModelsInCart }
  } = useCartQuery();
  const handleAddtoUserCart = async (data: { models: CartCreationPayload[] }) => {
    try {
      await createCart.mutateAsync(data);
      await refetchTotalModelsInCart();
    } catch (e) {
      alert(e);
    }
  };

  /*
   * UPLOAD MODEL DIALOG
   */
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(!open);

  type ErrorsState = {
    name?: string | null;
    price?: string | null;
    gcode?: string | null;
    imageUrl?: string | null;
    discount?: string | null;
    category_id?: string | null;
    description?: string | null;
    subImageUrls?: string | null;
  };
  const [errors, setErrors] = useState<ErrorsState>({});

  const [subImageUrl, setSubImageUrl] = useState('');
  const [uploadForm, setUploadForm] = useState<DefaultModel>({
    name: '',
    price: 0,
    gcode: '',
    imageUrl: '',
    category_id: '',
    description: '',
    subImageUrls: [],
    discount: 0
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    name: string
  ) => {
    const { value } = e.target;
    const errorMessage = validateInput(value, name);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    setUploadForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSelectChange = (e: string | undefined) => {
    if (e === undefined) return;
    setUploadForm((prevState) => ({ ...prevState, category_id: e }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      category_id: null
    }));
  };

  const handleImageUrlChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    try {
      await validateImageUrl(url);
      setUploadForm((prevState) => ({ ...prevState, imageUrl: url }));
      setErrors((prevErrors) => ({ ...prevErrors, imageUrl: null }));
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        imageUrl: 'URL does not point to a valid image'
      }));
    }
  };

  const handleAddSubImageUrl = async () => {
    try {
      await validateImageUrl(subImageUrl);
      setUploadForm((prevState) => ({
        ...prevState,
        subImageUrls: [...prevState.subImageUrls, subImageUrl]
      }));
      setSubImageUrl('');
      setErrors((prevErrors) => ({ ...prevErrors, subImageUrls: null }));
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        subImageUrls: 'URL does not point to a valid image'
      }));
    }
  };

  const handleDeleteSubImageUrl = (index: number) => {
    setUploadForm((prevState) => {
      const newSubImageUrls = [...prevState.subImageUrls];
      newSubImageUrls.splice(index, 1);
      return { ...prevState, subImageUrls: newSubImageUrls };
    });
  };

  const uploadModel = useMutation({
    mutationKey: ['upload'],
    mutationFn: (data: DefaultModel) => defaultModelService.uploadDefaultModel([data])
  });

  const handleSubmit = async () => {
    const nameError = validateInput(uploadForm.name, 'name');
    const priceError = validateInput(uploadForm.price, 'price');
    const gcodeError = validateInput(uploadForm.gcode, 'gcode');
    const imageUrlError = validateInput(uploadForm.imageUrl, 'imageUrl');
    const discountError = validateInput(uploadForm.discount, 'discount');
    const descriptionError = validateInput(uploadForm.description, 'description');

    setErrors({
      name: nameError,
      price: priceError,
      gcode: gcodeError,
      imageUrl: imageUrlError,
      discount: discountError,
      description: descriptionError
    });

    if (uploadForm.category_id === '' || uploadForm.category_id === null) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        category_id: 'Please select a category'
      }));
      return;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        category_id: ''
      }));
    }

    if (Object.values(errors).every((error) => error === null)) {
      await uploadModel.mutateAsync(uploadForm);
      setUploadForm({
        name: '',
        price: 0,
        gcode: '',
        imageUrl: '',
        category_id: '',
        description: '',
        subImageUrls: [],
        discount: 0
      });
      setErrors({});
      handleOpen();
    }
  };

  const validateInput = (value: string | number, name: string) => {
    if (name === 'discount') {
      const num = Number(value);
      if (num < 0 || num > 1) {
        return 'Discount should be between 0 and 1';
      }
    } else if (name === 'price') {
      if (!Number.isInteger(+value)) {
        return 'Price should be an integer';
      }
    } else {
      if (value === null || value === '') {
        return `${name.charAt(0).toUpperCase() + name.slice(1)} should not be empty`;
      }
    }
    return null;
  };

  const validateImageUrl = async (url: string) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => reject(new Error('Invalid URL'));
      img.src = url;
    });
  };

  return (
    <>
      <div className='flex md:justify-between items-center md:pe-8'>
        <div className='flex flex-col gap-2 items-start mx-5 my-2'>
          <div className='flex gap-5 justify-center md:justify-start items-center'>
            <Button
              placeholder=''
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
                placeholder=''
                label={`Sort by: ${criteriaSort[Object.keys(criteriaSort)[0] as OrderBy]}`}
                size='md'
                color='blue-gray'
                className='text-base font-medium'
                value={Object.keys(criteriaSort)[0]}
                onChange={(value) => {
                  if (value) {
                    const selectedKey = value as OrderBy;
                    setCriteriaSort({ [selectedKey]: SORT_CRITERIA[selectedKey] });
                    setActivePage(1);
                  }
                }}
                labelProps={{ className: 'text-black' }}
              >
                {Object.entries(SORT_CRITERIA).map(([value, label], index) => (
                  <Option key={index} value={value}>
                    {label}
                  </Option>
                ))}
              </Select>
            </div>
            {(selectedCategoryItem.id || selectedStar || fromDay || toDay) && (
              <div
                className='cursor-pointer hover:bg-gray-500 rounded-lg'
                onClick={handleClearFilters}
              >
                <Chip variant='ghost' value={<span className='normal-case'>Clear filters</span>} />
              </div>
            )}
          </div>
          {isAdmin && userInfo?.role === 'MANAGER' && (
            <Button placeholder='' color='red' className='normal-case text-sm' onClick={handleOpen}>
              Thêm mô hình
            </Button>
          )}
        </div>
        {screenSize > ScreenSize.MD && (
          <Chip value={<span className='normal-case'>{listModels?.total ?? 0} results</span>} />
        )}
      </div>
      <div className='flex mx-5'>
        {screenSize > ScreenSize.MD && (
          <div className={openDrawer ? 'w-[200px] pe-0' : ''}>
            {openDrawer && <FilterAccordion />}
          </div>
        )}
        {screenSize <= ScreenSize.MD ? (
          <List placeholder='' className='grid gap-2 w-full'>
            {listModels ? (
              listModels.models.length > 0 ? (
                listModels.models.map((item, index) => (
                  <ListItem
                    placeholder=''
                    key={index}
                    className='flex gap-5 border-2 border-b-gray-400 cursor-pointer rounded-lg p-4'
                    onClick={() => navigate(`/category/${item.id}`)}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className='w-40 h-40 md:w-full md:h-full'
                    />
                    <div className='flex flex-col gap-3'>
                      <Typography placeholder='' variant='lead' className='font-bold truncate'>
                        {item.name}
                      </Typography>
                      <Typography placeholder='' variant='paragraph'>
                        {item.description}
                      </Typography>
                      <Chip
                        color='amber'
                        value={`${item.price.toLocaleString('en-US')} VNĐ`}
                        className='w-fit'
                      />

                      <div className='flex items-center justify-between'>
                        <Typography placeholder='' variant='h6' className='font-bold'>
                          {`Đã mua: ${item.numberBought}`}
                        </Typography>
                        <Button
                          placeholder=''
                          className={
                            'text-white normal-case text-sm truncate p-4' +
                            (!listFlagIsModelAdded[item.id] ? ' bg-red-500 ' : ' bg-blue-500')
                          }
                          onClick={(event) => {
                            event.stopPropagation();
                            if (isSuccess && !listFlagIsModelAdded[item.id]) {
                              handleAddtoUserCart({
                                models: [
                                  {
                                    id: item.id,
                                    quantity: 1
                                  }
                                ]
                              });
                              setListFlagIsModelAdded(item.id, true);
                            } else if (!isSuccess && !listFlagIsModelAdded[item.id]) {
                              addModelToCart({
                                id: item.id,
                                image: item.imageUrl,
                                name: item.name,
                                discount: item.discount ?? 0,
                                price: item.price,
                                quantity: 1
                              });
                              setListFlagIsModelAdded(item.id, true);
                            } else {
                              navigate('/cart');
                            }
                          }}
                        >
                          {listFlagIsModelAdded[item.id] ? 'Đi đến giỏ hàng' : 'Thêm vào giỏ hàng'}
                        </Button>
                      </div>
                    </div>
                  </ListItem>
                ))
              ) : (
                <div className='w-full text-center'>
                  <Typography placeholder='' variant='h5'>
                    Không có mô hình nào
                  </Typography>
                </div>
              )
            ) : (
              <div className='grid justify-items-center items-center'>
                <Spinner color='green' className='h-12 w-12' />
              </div>
            )}
          </List>
        ) : listModels ? (
          listModels.models.length > 0 ? (
            <div className='grid grid-cols-2 gap-2 lg:grid-cols-4 lg:py-6 lg:px-4 lg:gap-3'>
              {listModels.models.map((item, index) => (
                <Card
                  placeholder=''
                  key={index}
                  className='border-2 border-gray-400 hover:border-gray-600 cursor-pointer rounded-lg'
                  onClick={() => navigate(`/category/${item.id}`)}
                >
                  <CardBody placeholder='' className='flex flex-col justify-between h-[500px]'>
                    <div className='line-clamp-4'>
                      <img src={item.imageUrl} />
                      <Typography placeholder='' variant='lead' className='font-bold'>
                        {item.name}
                      </Typography>
                      <Chip
                        color='amber'
                        value={`${item.price.toLocaleString('en-US')} VNĐ`}
                        className='w-fit'
                      />
                      <Typography placeholder='' variant='paragraph'>
                        {item.description}
                      </Typography>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <Typography placeholder='' variant='h6' className='font-bold'>
                        {`Đã mua: ${item.numberBought}`}
                      </Typography>
                      <Button
                        placeholder=''
                        className={
                          'text-white normal-case text-sm truncate p-4' +
                          (!listFlagIsModelAdded[item.id] ? ' bg-red-500 ' : ' bg-blue-500')
                        }
                        onClick={(event) => {
                          event.stopPropagation();
                          if (isSuccess && !listFlagIsModelAdded[item.id]) {
                            handleAddtoUserCart({
                              models: [
                                {
                                  id: item.id,
                                  quantity: 1
                                }
                              ]
                            });
                            setListFlagIsModelAdded(item.id, true);
                          } else if (!isSuccess && !listFlagIsModelAdded[item.id]) {
                            addModelToCart({
                              id: item.id,
                              image: item.imageUrl,
                              name: item.name,
                              discount: item.discount ?? 0,
                              price: item.price,
                              quantity: 1
                            });
                            setListFlagIsModelAdded(item.id, true);
                          } else {
                            navigate('/cart');
                          }
                        }}
                      >
                        {listFlagIsModelAdded[item.id] ? 'Đi đến giỏ hàng' : 'Thêm vào giỏ hàng'}
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          ) : (
            <div className='w-full text-center'>
              <Typography placeholder='' variant='h5'>
                Không có mô hình nào
              </Typography>
            </div>
          )
        ) : (
          <div className='flex justify-center w-full'>
            <Spinner color='green' className='h-12 w-12' />
          </div>
        )}
      </div>
      <div className='flex items-center justify-center gap-4 py-4'>
        {listModels && listModels?.models.length > 0 && (
          <Button
            placeholder=''
            variant='text'
            className='flex items-center gap-2'
            onClick={prev}
            disabled={activePage === 1}
          >
            <ArrowLeftIcon strokeWidth={2} className='h-5 w-5' /> Previous
          </Button>
        )}
        <div className='flex items-center gap-2'>
          {numPages >= 6 && activePage > 3 && (
            <>
              <IconButton placeholder='' {...getItemProps(1)}>
                1
              </IconButton>
              <EllipsisHorizontalIcon className='w-6 h-6' />
            </>
          )}
          {numPages < 6 ? (
            [...Array(numPages).keys()].map((pageNumber) => (
              <IconButton placeholder='' key={pageNumber} {...getItemProps(pageNumber + 1)}>
                {pageNumber + 1}
              </IconButton>
            ))
          ) : activePage <= 3 ? (
            [...Array(numPages).keys()].slice(0, 3).map((pageNumber) => (
              <IconButton placeholder='' key={pageNumber} {...getItemProps(pageNumber + 1)}>
                {pageNumber + 1}
              </IconButton>
            ))
          ) : activePage > 3 && activePage <= numPages - 3 ? (
            <IconButton placeholder='' {...getItemProps(activePage)}>
              {activePage}
            </IconButton>
          ) : (
            [...Array(numPages).keys()].slice(numPages - 3).map((pageNumber) => (
              <IconButton placeholder='' key={pageNumber} {...getItemProps(pageNumber + 1)}>
                {pageNumber + 1}
              </IconButton>
            ))
          )}
          {numPages >= 6 && activePage <= numPages - 3 && (
            <>
              <EllipsisHorizontalIcon className='w-6 h-6' />
              <IconButton placeholder='' {...getItemProps(numPages)}>
                {numPages}
              </IconButton>
            </>
          )}
        </div>
        {listModels && listModels?.models.length > 0 && (
          <Button
            placeholder=''
            variant='text'
            className='flex items-center gap-2'
            onClick={next}
            disabled={activePage === numPages}
          >
            Next
            <ArrowRightIcon strokeWidth={2} className='h-5 w-5' />
          </Button>
        )}
      </div>
      {screenSize <= ScreenSize.MD && (
        <FilterDrawer
          open={openDrawer}
          noItems={listModels?.total ?? 0}
          onClose={() => setOpenDrawer(false)}
        >
          <FilterAccordion closeDrawer={() => setOpenDrawer(false)} />
        </FilterDrawer>
      )}
      <Dialog
        placeholder=''
        open={open}
        handler={handleOpen}
        className='overflow-y-auto overflow-scroll'
      >
        <DialogHeader placeholder=''>Thêm mô hình</DialogHeader>
        <DialogBody placeholder='' className='flex flex-col gap-5 overflow-scroll h-[35rem]'>
          <div>
            <Input
              crossOrigin=''
              label='Name'
              onChange={(e) => handleInputChange(e, 'name')}
              error={!!errors.name}
            />
            {errors.name && (
              <Typography placeholder='' variant='small' color='red'>
                {errors.name}
              </Typography>
            )}
          </div>
          <div>
            <Input
              crossOrigin=''
              label='Price'
              onChange={(e) => handleInputChange(e, 'price')}
              error={!!errors.price}
            />
            {errors.price && (
              <Typography placeholder='' variant='small' color='red'>
                {errors.price}
              </Typography>
            )}
          </div>
          <div>
            <Input
              crossOrigin=''
              label='GCode'
              onChange={(e) => handleInputChange(e, 'gcode')}
              error={!!errors.gcode}
            />
            {errors.gcode && (
              <Typography placeholder='' variant='small' color='red'>
                {errors.gcode}
              </Typography>
            )}
          </div>
          <div>
            <Input
              crossOrigin=''
              label='Image URL'
              onChange={handleImageUrlChange}
              error={!!errors.imageUrl}
            />
            {errors.imageUrl && (
              <Typography placeholder='' variant='small' color='red'>
                {errors.imageUrl}
              </Typography>
            )}
          </div>
          <div>
            <Input
              crossOrigin=''
              label='Discount'
              onChange={(e) => handleInputChange(e, 'discount')}
              error={!!errors.discount}
            />
            {errors.discount && (
              <Typography placeholder='' variant='small' color='red'>
                {errors.discount}
              </Typography>
            )}
          </div>
          <div>
            {listCategories && (
              <Select
                placeholder=''
                label='Category'
                onChange={handleSelectChange}
                error={!!errors.category_id}
                className='h-10'
              >
                {listCategories.map((category, index) => (
                  <Option key={index} value={category.id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            )}
            {errors.category_id && (
              <Typography placeholder='' variant='small' color='red'>
                {errors.category_id}
              </Typography>
            )}
          </div>
          <div>
            <Textarea
              label='Description'
              onChange={(e) => handleInputChange(e, 'description')}
              error={!!errors.description}
            />
            {errors.description && (
              <Typography placeholder='' variant='small' color='red'>
                {errors.description}
              </Typography>
            )}
          </div>
          <div>
            <div className='flex gap-5'>
              <Input
                crossOrigin=''
                label='Sub Image URL'
                onChange={(e) => setSubImageUrl(e.target.value)}
                value={subImageUrl}
                error={!!errors.subImageUrls}
              />
              <Button placeholder='' type='button' onClick={handleAddSubImageUrl}>
                Add
              </Button>
            </div>
            {errors.subImageUrls && (
              <Typography placeholder='' variant='small' color='red'>
                {errors.subImageUrls}
              </Typography>
            )}
          </div>
          {uploadForm.subImageUrls.map((url, index) => (
            <div key={index} className='flex justify-between'>
              <p>{url}</p>
              <IconButton
                placeholder=''
                variant='text'
                color='red'
                onClick={() => handleDeleteSubImageUrl(index)}
                className='w-10 shrink-0'
              >
                <TrashIcon className='w-5' />
              </IconButton>
            </div>
          ))}
        </DialogBody>
        <DialogFooter placeholder=''>
          <Button placeholder='' variant='text' color='red' onClick={handleOpen} className='mr-1'>
            <span>Cancel</span>
          </Button>
          <Button placeholder='' variant='gradient' color='green' onClick={() => handleSubmit()}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
