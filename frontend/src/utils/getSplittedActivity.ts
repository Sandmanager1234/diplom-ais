export const getSplittedActivity = (activity: string): string[] => {
  return activity.split('\n\n\n\n')
}
