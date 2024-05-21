export const loadActivities = () => {
    try {
      const serializedState = localStorage.getItem('activities');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      console.error("Could not load activities from localStorage.", err);
      return undefined;
    }
  };
  
  export const saveActivities = (activities) => {
    try {
      const serializedState = JSON.stringify(activities);
      localStorage.setItem('activities', serializedState);
    } catch (err) {
      console.error("Could not save activities to localStorage.", err);
    }
  };
  