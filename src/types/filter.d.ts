type FilterStore = {
  selectedStar: number;
  fromDay: Date | undefined;
  toDay: Date | undefined;
  setSelectedStar: (star: number) => void;
  setFromDay: (day: Date | undefined) => void;
  setToDay: (day: Date | undefined) => void;
};
