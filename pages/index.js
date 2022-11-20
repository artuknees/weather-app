import DynamicApp from '../components/DynamicComps/DynamicApp';
import useGetGeneralData from './api/useGetGeneralData';

const Home = () => {
  const URL = 'https://api.open-meteo.com/v1/forecast?latitude=-34.58&longitude=-58.49&hourly=temperature_2m,apparent_temperature,relativehumidity_2m,rain,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto&current_weather=true';
  useGetGeneralData(URL);
  return (
    <DynamicApp/>
  )
}

export default Home