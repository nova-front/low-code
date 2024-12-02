export const tabProps = (index: number) => {
  return {
    id: `setting-tab-${index}`,
    "aria-controls": `setting-tabpanel-${index}`,
    sx: { textTransform: "none" },
  };
};
