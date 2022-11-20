import { useAppDispatch } from "../../redux/hooks";
import { setActualTimeIndex, setGeneralData, setRequestStatus , setDayOrNight } from "../../redux/features/actions/information";
import axios from "axios";

const useGetGeneralData = async (URL) => {
  const dispatch = useAppDispatch();
  try {
    const responseAPI = await axios.get(URL);
    dispatch(setRequestStatus(responseAPI.status));
    dispatch(setGeneralData(responseAPI.data));
    const times = await responseAPI.data.hourly.time.map(item => parseInt(new Date(item).getTime())); // timestamp miliseconds
    const timeNow = parseInt(Date.now()); // now in miliseconds
    const timeIndex = await times.findIndex(item => timeNow - item < 3600000 && timeNow - item > 0);
    dispatch(setActualTimeIndex(timeIndex));
    const now = new Date();
    const actualHourForDay = parseInt(now.toLocaleTimeString ('es-ES', {hour: '2-digit'}));
    if (actualHourForDay > 6 && actualHourForDay < 20 ) {
        dispatch(setDayOrNight('day'));
    } else {
        dispatch(setDayOrNight('night'));
    };
  } catch {
    console.error(error)
  }
};

export default useGetGeneralData