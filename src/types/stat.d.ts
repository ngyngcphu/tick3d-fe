type StatOption = {
  /**
   * The start date of the interval
   */
  start: string;
  /**
   * The end date of the interval
   */
  end: string;
  /**
   * The unit used for interval
   */
  unit: 'day' | 'month';
  /**
   * The length of a sub-interval
   */
  interval: number;
};
