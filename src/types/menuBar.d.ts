type MenuBarStore = {
  /**
   * The currently selected menu.
   * Menu includes: `Home`, `Categories`, `Upload & print`, `Shopping Cart`, `Log in`, `Sign up`, `Stars`, `My order`.
   */
  selectedMenu: string;
  /**
   * A flag indicating whether an item is a category.
   */
  isCategoryItem: boolean;
  /**
   * The selected category item.
   * Category items include: `All things`, `Fashion`, `Hobby`, `Learning`, `Tools`, `Toys & Games`, `Art`, `Household`
   */
  selectedCategoryItem: string;
  /**
   * Set the selected menu.
   */
  setSelectedMenu: (selectedMenu: string) => void;
  /**
   * Sets the flag for category items.
   */
  setIsCategoryItem: (payload: boolean) => void;
  /**
   * Set the selected category item.
   */
  setSelectedCategoryItem: (payload: string) => void;
};
